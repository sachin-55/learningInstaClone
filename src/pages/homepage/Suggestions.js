import React from 'react';
import { Box, Image } from 'theme-ui';

const Suggestions = () => {
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            color: 'darkGray',
            fontSize: '14px',
            fontWeight: 'bold',
          }}
        >
          Suggestions For You
        </Box>
        <Box sx={{ fontSize: '12px', fontWeight: 'bold' }}>
          See All
        </Box>
      </Box>
      {/* ------------------------------------------------- */}

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between  ',
          marginY: '10px',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Image
            variant="suggestionProfileImg"
            src="https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png"
          />
          <Box sx={{ paddingLeft: '12px' }}>
            <Box sx={{ fontSize: '14px', fontWeight: 'bold' }}>
              Fullname
            </Box>
            <Box
              sx={{
                fontSize: '12px',
                color: 'darkGray',
                overflow: 'hidden',
                width: '100%',
                height: '20px',
              }}
            >
              Followed By Ramesh Uncle ko Choro ani aru
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            color: '#0195f6',
            fontSize: '12px',
            fontWeight: 'bold',
            padding: '0 2px',
          }}
        >
          Follow
        </Box>
      </Box>
      {/* ------------------------------------------------- */}

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between  ',
          marginY: '10px',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Image
            variant="suggestionProfileImg"
            src="https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png"
          />
          <Box sx={{ paddingLeft: '12px' }}>
            <Box sx={{ fontSize: '14px', fontWeight: 'bold' }}>
              Fullname
            </Box>
            <Box
              sx={{
                fontSize: '12px',
                color: 'darkGray',
              }}
            >
              New to Instagram
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            color: '#0195f6',
            fontSize: '12px',
            fontWeight: 'bold',
          }}
        >
          Follow
        </Box>
      </Box>
      {/* ------------------------------------------------- */}

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between  ',
          marginY: '10px',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Image
            variant="suggestionProfileImg"
            src="https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png"
          />
          <Box sx={{ paddingLeft: '12px' }}>
            <Box sx={{ fontSize: '14px', fontWeight: 'bold' }}>
              Fullname
            </Box>
            <Box
              sx={{
                fontSize: '12px',
                color: 'darkGray',
              }}
            >
              Follows you
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            color: '#0195f6',
            fontSize: '12px',
            fontWeight: 'bold',
          }}
        >
          Follow
        </Box>
      </Box>
      {/* ------------------------------------------------- */}
    </Box>
  );
};

export default Suggestions;
