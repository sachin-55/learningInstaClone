import React from 'react';
import { Box, Container } from 'theme-ui';

const Footer = () => {
  return (
    <Container
      sx={{
        width: '77%',
        paddingY: '50px',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <ul className="footerList">
        <li className="listItem">
          <a>ABOUT</a>
        </li>
        <li className="listItem">
          <a>HELP</a>
        </li>
        <li className="listItem">
          <a>PRESS</a>
        </li>
        <li className="listItem">
          <a>API</a>
        </li>
        <li className="listItem">
          <a>JOBS</a>
        </li>
        <li className="listItem">
          <a>PRIVACY</a>
        </li>
        <li className="listItem">
          <a>TERMS</a>
        </li>
        <li className="listItem">
          <a>LOCATIONS</a>
        </li>
        <li className="listItem">
          <a>TOP ACCOUNTS</a>
        </li>
        <li className="listItem">
          <a>HASHTAGS</a>
        </li>
        <li className="listItem">
          <a>LANGUAGE</a>
        </li>
      </ul>
      <Box
        sx={{
          color: '#908f95',
          fontSize: '12px',
          fontWeight: '700',
        }}
      >
        &copy; 2020 INSTAGRAM FROM FACEBOOK
      </Box>
    </Container>
  );
};

export default Footer;
