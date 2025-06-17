import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { faker } from '@faker-js/faker';

export type UserProfile = {
  key: string;
  anonymous: boolean;
  name?: string;
  country?: string;
  state?: string;
  petType?: string;
  planType?: string;
  paymentType?: string;
};

interface UserContextType {
  user: UserProfile;
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const getRandomUserProfile = (): UserProfile => {
  const country = faker.helpers.arrayElement(['US', 'CA', 'FR', 'UK']);
  const petType = faker.helpers.arrayElement(['dog', 'cat', 'bird', 'reptile']);
  const planType = faker.helpers.arrayElement(['basic', 'premium', 'deluxe']);
  const paymentType = faker.helpers.arrayElement(['credit_card', 'paypal', 'apple_pay']);
  let state = '';
  if (country === 'US') state = faker.location.state();
  else if (country === 'CA') state = faker.helpers.arrayElement(['ON', 'QC', 'BC', 'AB', 'MB', 'SK', 'NS', 'NB', 'NL', 'PE', 'YT', 'NT', 'NU']);
  else if (country === 'FR') state = faker.helpers.arrayElement(['Paris', 'Bouches-du-Rhône', 'Nord', 'Rhône', 'Haute-Garonne']);
  else if (country === 'UK') state = faker.helpers.arrayElement(['Greater London', 'West Midlands', 'Greater Manchester', 'West Yorkshire', 'Kent']);
  return {
    key: faker.internet.userName() + '-' + faker.string.uuid(),
    anonymous: false,
    name: faker.person.fullName(),
    country,
    state,
    petType,
    planType,
    paymentType,
  };
};

const getAnonymousProfile = (): UserProfile => ({
  key: Math.random().toString(36).substring(2) + Date.now(),
  anonymous: true,
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile>(getAnonymousProfile());
  const isLoggedIn = !user.anonymous;

  const login = () => setUser(getRandomUserProfile());
  const logout = () => setUser(getAnonymousProfile());

  return (
    <UserContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within a UserProvider');
  return ctx;
}; 