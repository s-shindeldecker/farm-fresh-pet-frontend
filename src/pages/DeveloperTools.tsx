import { useState, useEffect } from 'react';
import { useLDClient } from 'launchdarkly-react-client-sdk';
import { SimulationService, type SimulationProgress, type SimulationResults } from '../services/simulationService';
import styled from '@emotion/styled';

const Container = styled.div`
  max-width: 1200px;
  margin: 2em auto;
  padding: 0 1em;
`;

const Card = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
  padding: 2em;
  margin-bottom: 2em;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 1em;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  background: ${props => props.variant === 'primary' ? '#4caf50' : '#f5f5f5'};
  color: ${props => props.variant === 'primary' ? 'white' : '#333'};
  border: none;
  padding: 0.75em 1.5em;
  border-radius: 8px;
  font-size: 1em;
  cursor: pointer;
  margin-right: 1em;
  transition: background 0.2s;
  
  &:hover {
    background: ${props => props.variant === 'primary' ? '#388e3c' : '#e0e0e0'};
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 20px;
  background: #f0f0f0;
  border-radius: 10px;
  overflow: hidden;
  margin: 1em 0;
`;

const ProgressFill = styled.div<{ percentage: number }>`
  height: 100%;
  background: linear-gradient(90deg, #4caf50, #66bb6a);
  width: ${props => props.percentage}%;
  transition: width 0.3s ease;
`;

const Status = styled.div`
  font-size: 1.1em;
  margin: 1em 0;
  padding: 1em;
  background: #f8f8f8;
  border-radius: 8px;
`;

const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1em;
  margin-top: 1em;
`;

const ResultsCard = styled.div`
  background: #f8f8f8;
  padding: 1em;
  border-radius: 8px;
`;

const ResultsTitle = styled.h3`
  margin: 0 0 0.5em 0;
  color: #333;
`;

const MetricItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5em;
  font-size: 0.9em;
`;

export const DeveloperTools = () => {
  const ldClient = useLDClient();
  const [simulationService, setSimulationService] = useState<SimulationService | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState<SimulationProgress | null>(null);
  const [results, setResults] = useState<SimulationResults | null>(null);

  useEffect(() => {
    if (ldClient) {
      setSimulationService(new SimulationService(ldClient));
    }
  }, [ldClient]);

  const handleStartSimulation = () => {
    if (!simulationService) return;
    setIsRunning(true);
    setProgress(null);
    setResults(null);
    simulationService.startSimulation(
      (progress) => setProgress(progress),
      (results) => {
        setResults(results);
        setIsRunning(false);
      }
    );
  };

  const handleStopSimulation = () => {
    if (!simulationService) return;
    simulationService.stopSimulation();
    setIsRunning(false);
  };

  return (
    <Container>
      <Title>Developer Tools - Traffic Simulation</Title>
      <Card>
        <h2>LaunchDarkly Experiment Traffic Generator</h2>
        <p>
          This tool generates realistic user traffic to help populate your LaunchDarkly experiments with data.
          It simulates users from different countries evaluating feature flags and generating conversion events.
        </p>
        <div>
          <Button 
            variant="primary" 
            onClick={handleStartSimulation}
            disabled={isRunning || !simulationService}
          >
            {isRunning ? 'Running...' : 'Start Simulation'}
          </Button>
          <Button 
            onClick={handleStopSimulation}
            disabled={!isRunning}
          >
            Stop Simulation
          </Button>
        </div>
        {progress && (
          <Status>
            <div>Progress: {progress.currentRecord} / {progress.totalRecords} users</div>
            <ProgressBar>
              <ProgressFill percentage={progress.percentage} />
            </ProgressBar>
            <div>Percentage: {progress.percentage.toFixed(1)}%</div>
          </Status>
        )}
      </Card>
      {results && (
        <Card>
          <h2>Simulation Results</h2>
          <div>Total Users: {results.totalUsers}</div>
          <div>Duration: {(results.duration / 1000).toFixed(1)} seconds</div>
          <ResultsGrid>
            <ResultsCard>
              <ResultsTitle>Events Generated</ResultsTitle>
              {Object.entries(results.events).map(([event, count]) => (
                <MetricItem key={event}>
                  <span>{event}:</span>
                  <span>{count}</span>
                </MetricItem>
              ))}
            </ResultsCard>
            <ResultsCard>
              <ResultsTitle>Flag Evaluations</ResultsTitle>
              {Object.entries(results.flagEvaluations).map(([flag, values]) => (
                <div key={flag}>
                  <strong>{flag}:</strong>
                  {Object.entries(values).map(([value, count]) => (
                    <MetricItem key={value}>
                      <span>{value}:</span>
                      <span>{count}</span>
                    </MetricItem>
                  ))}
                </div>
              ))}
            </ResultsCard>
          </ResultsGrid>
        </Card>
      )}
    </Container>
  );
}; 