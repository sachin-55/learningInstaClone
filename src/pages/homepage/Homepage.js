import React from 'react';
import { Box, Container, Image } from 'theme-ui';
import { Link } from 'react-router-dom';
import Story from './Story';
import Suggestions from './Suggestions';
import Post from './Post';

const Homepage = () => {
  return (
    <Box>
      <Container
        sx={{
          width: '71%',
          marginTop: '85px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ flex: 1, width: '100%' }}>
          <Story />
          <Post srcUrl="https://picsum.photos/id/301/500/600" />
          <Post srcUrl="https://picsum.photos/id/10/500/600" />
          <Post srcUrl="https://picsum.photos/id/200/500/600" />
          <Post srcUrl="https://picsum.photos/id/400/500/600" />
        </Box>

        <Box sx={{ width: '320px' }}>
          <Box
            sx={{
              position: 'fixed',
              top: '65px',
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
              <Box sx={{ padding: '15px', marginBottom: '20px' }}>
                <Box sx={{ fontWeight: 'bold' }}> Username</Box>
                <Box sx={{ color: 'darkGray' }}>FullName</Box>
              </Box>
              <Box />
            </Box>
            <Box sx={{ width: '100%' }}>
              <Suggestions />
            </Box>
            <Box className="sideFooter">
              <Link to="/">About</Link>
              <Link to="/">Help</Link>
              <Link to="/">Press</Link>
              <Link to="/">API</Link>
              <Link to="/">Jobs</Link>
              <Link to="/">Privacy</Link>
              <Link to="/">Terms</Link>
              <Link to="/">Locations</Link>
              <Link to="/">Top Accounts</Link>
              <Link to="/">Hashtags</Link>
              <Link to="/">Language</Link>
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
