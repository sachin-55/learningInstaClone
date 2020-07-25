import React from 'react';
import { Box, Container, Image } from 'theme-ui';
import Header from './Header';
import Story from './Story';

const Homepage = () => {
  return (
    <Box>
      <Header />
      <Container
        sx={{
          width: '71%',
          marginTop: '85px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{ bg: 'pink', flex: 1, height: '200vh', width: '100%' }}
        >
          <Story />
        </Box>
        <Box sx={{ width: '320px' }}>
          <Box
            sx={{
              position: 'fixed',
              top: '80px',
              width: '320px',
              padding: '30px 0  0 30px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                fontSize: '13px',
              }}
            >
              <Image
                variant="profileLink"
                src="https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png"
              />
              <Box sx={{ padding: '15px' }}>
                <Box sx={{ fontWeight: 'bold' }}> Username</Box>
                <Box sx={{ color: 'darkGray' }}>FullName</Box>
              </Box>
              <Box />
            </Box>
            <Box sx={{ bg: 'black', color: '#fff', width: '100%' }}>
              Suggestions
            </Box>
            <Box className="sideFooter">
              <a>About</a>
              <a>Help</a>
              <a>Press</a>
              <a>API</a>
              <a>Jobs</a>
              <a>Privacy</a>
              <a>Terms</a>
              <a>Locations</a>
              <a>Top Accounts</a>
              <a>Hashtags</a>
              <a>Language</a>
            </Box>
            <Box
              sx={{
                color: '#dbdbdb',
                fontSize: '12px',
              }}
            >
              &copy; 2020 INSTAGRAM FROM FACEBOOK
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Homepage;
