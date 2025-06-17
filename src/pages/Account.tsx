import React from 'react';
import { useUser } from '../context/UserContext';
import styled from '@emotion/styled';

const Card = styled.div`
  max-width: 400px;
  margin: 2em auto;
  padding: 2em;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
  text-align: left;
`;

const Title = styled.h2`
  margin-bottom: 1em;
`;

const InfoRow = styled.div`
  margin-bottom: 0.7em;
  font-size: 1.1em;
`;

export const Account = () => {
  const { user, isLoggedIn } = useUser();

  if (!isLoggedIn) {
    return <Card><Title>Account</Title><div>You are not logged in.</div></Card>;
  }

  return (
    <Card>
      <Title>Account Profile</Title>
      <InfoRow><strong>Name:</strong> {user.name}</InfoRow>
      <InfoRow><strong>Country:</strong> {user.country}</InfoRow>
      <InfoRow><strong>State/Province:</strong> {user.state}</InfoRow>
      <InfoRow><strong>Pet Type:</strong> {user.petType}</InfoRow>
      <InfoRow><strong>Plan Type:</strong> {user.planType}</InfoRow>
      <InfoRow><strong>Payment Type:</strong> {user.paymentType}</InfoRow>
      <InfoRow><strong>User Key:</strong> {user.key}</InfoRow>
      <InfoRow><strong>Anonymous:</strong> {user.anonymous ? 'Yes' : 'No'}</InfoRow>
    </Card>
  );
}; 