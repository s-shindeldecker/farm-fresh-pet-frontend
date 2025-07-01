import type { VercelRequest, VercelResponse } from '@vercel/node';
import snowflake from 'snowflake-sdk';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req: VercelRequest, res: VercelResponse) {
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

  // Prepare Snowflake connection
  const privateKey = process.env.SNOWFLAKE_PRIVATE_KEY;
  if (!privateKey) {
    console.error('[API] SNOWFLAKE_PRIVATE_KEY is not set');
    return res.status(500).json({ error: 'SNOWFLAKE_PRIVATE_KEY is not set' });
  }

  const connection = snowflake.createConnection({
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
    connection.destroy();
  }
} 