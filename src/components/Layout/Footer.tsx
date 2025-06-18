import styled from '@emotion/styled';

const FooterBar = styled.footer`
  width: 100%;
  background: #f8f8f8;
  border-top: 1px solid #eee;
  padding: 2em 0 1em 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.95em;
  color: #555;
`;

const FooterLinks = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 1.5em;
  margin: 0 0 1em 0;
  padding: 0;
  justify-content: center;
`;

const FooterLink = styled.li`
  a {
    text-decoration: none;
    color: #555;
    transition: color 0.2s;
    &:hover {
      color: #4caf50;
    }
  }
`;

const Copyright = styled.div`
  font-size: 0.85em;
  color: #aaa;
`;

export const Footer = () => (
  <FooterBar>
    <FooterLinks>
      <FooterLink><a href="#">Reviews</a></FooterLink>
      <FooterLink><a href="#">About Us</a></FooterLink>
      <FooterLink><a href="#">FAQ</a></FooterLink>
      <FooterLink><a href="#">Careers</a></FooterLink>
      <FooterLink><a href="#">Affiliates</a></FooterLink>
      <FooterLink><a href="#">For Vet Professionals</a></FooterLink>
      <FooterLink><a href="#">Privacy</a></FooterLink>
      <FooterLink><a href="#">Terms</a></FooterLink>
      <FooterLink><a href="#">Accessibility</a></FooterLink>
      <FooterLink><a href="#">Do Not Sell My Personal Information</a></FooterLink>
    </FooterLinks>
    <Copyright>
      © {new Date().getFullYear()} Farm Fresh Pet. All rights reserved.
    </Copyright>
  </FooterBar>
); 