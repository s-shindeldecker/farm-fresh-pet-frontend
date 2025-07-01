import type { VercelRequest, VercelResponse } from '@vercel/node';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const snowflake = await import('snowflake-sdk');

  console.log('[API] Received request:', { method: req.method, body: req.body });

  if (req.method !== 'POST') {
    console.log('[API] Method not allowed:', req.method);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { eventName, context } = req.body;
  if (!eventName || !context || !context.key) {
    console.log('[API] Missing required fields:', { eventName, hasContext: !!context, hasContextKey: !!context?.key });
    return res.status(400).json({ error: 'Missing eventName or context.key' });
  }

  // Validate all required environment variables
  const requiredEnvVars = {
    SNOWFLAKE_ACCOUNT: process.env.SNOWFLAKE_ACCOUNT,
    SNOWFLAKE_USER: process.env.SNOWFLAKE_USER,
    SNOWFLAKE_PRIVATE_KEY: process.env.SNOWFLAKE_PRIVATE_KEY,
    SNOWFLAKE_WAREHOUSE: process.env.SNOWFLAKE_WAREHOUSE,
    SNOWFLAKE_DATABASE: process.env.SNOWFLAKE_DATABASE,
    SNOWFLAKE_SCHEMA: process.env.SNOWFLAKE_SCHEMA,
    SNOWFLAKE_ROLE: process.env.SNOWFLAKE_ROLE,
  };

  console.log('[API] Environment variables check:', {
    SNOWFLAKE_ACCOUNT: requiredEnvVars.SNOWFLAKE_ACCOUNT ? 'SET' : 'MISSING',
    SNOWFLAKE_USER: requiredEnvVars.SNOWFLAKE_USER ? 'SET' : 'MISSING',
    SNOWFLAKE_PRIVATE_KEY: requiredEnvVars.SNOWFLAKE_PRIVATE_KEY ? 'SET' : 'MISSING',
    SNOWFLAKE_WAREHOUSE: requiredEnvVars.SNOWFLAKE_WAREHOUSE ? 'SET' : 'MISSING',
    SNOWFLAKE_DATABASE: requiredEnvVars.SNOWFLAKE_DATABASE ? 'SET' : 'MISSING',
    SNOWFLAKE_SCHEMA: requiredEnvVars.SNOWFLAKE_SCHEMA ? 'SET' : 'MISSING',
    SNOWFLAKE_ROLE: requiredEnvVars.SNOWFLAKE_ROLE ? 'SET' : 'MISSING',
  });

  // Check for missing environment variables
  const missingVars = Object.entries(requiredEnvVars)
    .filter(([key, value]) => !value)
    .map(([key]) => key);

  if (missingVars.length > 0) {
    console.error('[API] Missing environment variables:', missingVars);
    return res.status(500).json({ 
      error: 'Missing environment variables', 
      missing: missingVars 
    });
  }

  // Validate private key format
  const privateKey = process.env.SNOWFLAKE_PRIVATE_KEY;
  if (!privateKey.includes('-----BEGIN PRIVATE KEY-----')) {
    console.error('[API] SNOWFLAKE_PRIVATE_KEY format appears incorrect');
    return res.status(500).json({ error: 'SNOWFLAKE_PRIVATE_KEY format appears incorrect' });
  }

  console.log('[API] All environment variables validated successfully');

  const connection = snowflake.default.createConnection({
    account: process.env.SNOWFLAKE_ACCOUNT,
    username: process.env.SNOWFLAKE_USER,
    privateKey: privateKey,
    warehouse: process.env.SNOWFLAKE_WAREHOUSE,
    database: process.env.SNOWFLAKE_DATABASE,
    schema: process.env.SNOWFLAKE_SCHEMA,
    role: process.env.SNOWFLAKE_ROLE,
    authenticator: 'SNOWFLAKE_JWT',
  });

  // Connect to Snowflake
  console.log('[API] Connecting to Snowflake...');
  try {
    await new Promise<void>((resolve, reject) => {
      connection.connect((err) => {
        if (err) {
          console.error('[API] Snowflake connection failed:', err);
          reject(err);
        } else {
          console.log('[API] Successfully connected to Snowflake');
          resolve();
        }
      });
    });
  } catch (err) {
    console.error('[API] Connection error:', err);
    return res.status(500).json({ error: 'Failed to connect to Snowflake', details: err });
  }

  // Insert event
  const sql = `INSERT INTO METRIC_EVENTS
    (EVENT_ID, EVENT_KEY, CONTEXT_KIND, CONTEXT_KEY, EVENT_VALUE, RECEIVED_TIME)
    VALUES (?, ?, ?, ?, NULL, ?)`;
  const eventId = uuidv4();
  const contextKey = context.key;
  const receivedTime = new Date().toISOString();

  console.log('[API] Inserting event:', { eventId, eventName, contextKey, receivedTime });

  try {
    await new Promise<void>((resolve, reject) => {
      connection.execute({
        sqlText: sql,
        binds: [eventId, eventName, 'user', contextKey, receivedTime],
        complete: (err) => {
          if (err) {
            console.error('[API] Insert failed:', err);
            reject(err);
          } else {
            console.log('[API] Event successfully inserted to Snowflake');
            resolve();
          }
        }
      });
    });
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('[API] Insert error:', err);
    res.status(500).json({ error: 'Failed to insert event', details: err });
  } finally {
    connection.destroy(() => {});
  }
} 