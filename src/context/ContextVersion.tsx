import { createContext, useContext } from 'react';

export const ContextVersionContext = createContext<number>(0);
export const useContextVersion = () => useContext(ContextVersionContext); 