import React from 'react';
import { Box, Container, Input, Avatar, Image } from 'theme-ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeart,
  faCompass,
  faPaperPlane,
} from '@fortawesome/free-regular-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Box
      sx={{
        width: '100%',
        bg: '#fff',
        borderBottom: '1px solid #dbdbdb ',
        position: 'fixed',
        top: '0',
        zIndex: 10,
      }}
    >
      <Container
        sx={{
          width: '70%',
          minWidth: '950px',
          paddingY: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '54px',
        }}
      >
        <Box
          sx={{
            fontFamily: 'Engagement, cursive',
            fontSize: '30px',
            cursor: 'pointer',
            '&:active': {
              color: 'darkGray',
            },
          }}
        >
          <Link to="/">Instagram</Link>
        </Box>
        <Box>
          <Input
            sx={{
              height: '18px',
              outline: 'none',
              fontFamily: 'FontAwesome',
              textAlign: 'center',
              fontWeight: 100,
              fontSize: '12px',
              width: '200px',
              '&::placeholder': {
                color: '#8e8e8e',
              },
            }}
            placeholder="&#xf002;  Search"
          />
        </Box>
        <Box
          sx={{
            fontSize: '24px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Link to="/" className="marginLeft">
            <FontAwesomeIcon icon={faHome} />
          </Link>
          <Link to="/direct/inbox" className="marginLeft">
            <FontAwesomeIcon icon={faPaperPlane} />
          </Link>
          <Link to="/" className="marginLeft">
            <FontAwesomeIcon icon={faCompass} />
          </Link>
          <Link to="/" className="marginLeft">
            <FontAwesomeIcon icon={faHeart} />
          </Link>
          <Link to="/" className="marginLeft">
            <Image
              sx={{ marginTop: '10px' }}
              variant="navBar"
              src="https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png"
            />
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Header;
