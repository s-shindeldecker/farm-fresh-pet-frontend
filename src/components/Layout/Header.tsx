import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const NavBar = styled.nav`
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  padding: 0.5em 2em;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Logo = styled.div`
  font-weight: bold;
  font-size: 1.5em;
  color: #4caf50;
  margin-right: 2em;
`;

const NavLinks = styled.ul`
  list-style: none;
  display: flex;
  gap: 1.5em;
  margin: 0;
  padding: 0;
`;

const NavLink = styled.li`
  a {
    text-decoration: none;
    color: #333;
    font-weight: 500;
    transition: color 0.2s;
    &:hover {
      color: #4caf50;
    }
  }
`;

interface HeaderProps {
  isLoggedIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
  onAccount?: () => void;
}

export const Header = ({ isLoggedIn, onLogin, onLogout, onAccount }: HeaderProps) => {
  return (
    <NavBar>
      <Logo><Link to="/" style={{ color: '#4caf50', textDecoration: 'none' }}>Farm Fresh Pet</Link></Logo>
      <NavLinks>
        <NavLink><Link to="/">Home</Link></NavLink>
        <NavLink><a href="#">Reviews</a></NavLink>
        <NavLink><a href="#">About Us</a></NavLink>
        <NavLink><a href="#">Why Fresh?</a></NavLink>
        <NavLink><a href="#">FAQ</a></NavLink>
        <NavLink><a href="#">For Vet Professionals</a></NavLink>
        {isLoggedIn && (
          <NavLink><a href="#" onClick={onAccount}>Account</a></NavLink>
        )}
        <NavLink>
          {isLoggedIn ? (
            <a href="#" onClick={onLogout}>Log Out</a>
          ) : (
            <a href="#" onClick={onLogin}>Log In</a>
          )}
        </NavLink>
      </NavLinks>
    </NavBar>
  );
}; 