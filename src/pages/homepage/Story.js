import React, { useState } from 'react';
import { Box, Image } from 'theme-ui';
import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@material-ui/icons/ChevronRightRounded';

const story = [
  {
    id: 1,
    username: 'ramesh',
    image:
      'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png',
  },
  {
    id: 2,
    username: 'suresh',
    image:
      'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png',
  },
  {
    id: 3,
    username: 'dinesh',
    image:
      'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png',
  },
  {
    id: 4,
    username: 'ramesh',
    image:
      'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png',
  },
  {
    id: 5,
    username: 'suresh',
    image:
      'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png',
  },
  {
    id: 6,
    username: 'dinesh',
    image:
      'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png',
  },
  {
    id: 7,
    username: 'ramesh',
    image:
      'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png',
  },
  {
    id: 8,
    username: 'suresh',
    image:
      'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png',
  },
  {
    id: 9,
    username: 'dinesh',
    image:
      'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png',
  },
  {
    id: 10,
    username: 'ramesh',
    image:
      'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png',
  },
  {
    id: 11,
    username: 'suresh',
    image:
      'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png',
  },
  {
    id: 12,
    username: 'dinesh',
    image:
      'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png',
  },
];
const Story = () => {
  const onLeftArrowClick = () => {
    document.getElementById('story').scrollBy(-120, 0);
  };

  const onRightArrowClick = () => {
    document.getElementById('story').scrollBy(120, 0);
  };

  const handleStoryClick = (id) => {
    alert(`${id} id story is loading ...`);
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        sx={{
          width: '100%',
          bg: '#fff',
          height: '115px',
          paddingX: '10px',
          marginBottom: '30px',
          border: '1px solid #dbdbdb',
          overflowX: 'scroll',
          overflowY: 'hidden',
        }}
        className="story"
        id="story"
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            margin: '0 5px',
            paddingRight: '100px',
          }}
        >
          {story.map((s) => {
            return (
              <Box
                key={s.id}
                sx={{
                  margin: '18px 8px 0 8px',
                  minWidth: '66px',
                  cursor: 'pointer',
                }}
                onClick={() => handleStoryClick(s.id)}
              >
                <Box
                  sx={{
                    width: '66px',
                    height: '66px',
                    borderRadius: '100%',
                    background:
                      // 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%) 1',
                      'linear-gradient(-135deg,#515bd4,#8134af,#dd2a7b,#feda77,#f58529) ',
                    boxSizing: 'border-box',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Box
                    sx={{
                      width: '62px',
                      height: '62px',
                      borderRadius: '50%',
                      border: '2px solid white',
                    }}
                  >
                    <Image
                      sx={{
                        width: '100%',
                        borderRadius: '50%',
                        height: '100%',
                      }}
                      src={s.image}
                    />
                  </Box>
                </Box>
                <Box sx={{ fontSize: '12px', textAlign: 'center' }}>
                  {s.username}
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          left: 0,
          backgroundColor: '#fff',
          cursor: 'pointer',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
        }}
        onClick={onLeftArrowClick}
      >
        <ChevronLeftRoundedIcon />
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          right: 0,
          backgroundColor: '#fff',
          cursor: 'pointer',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
        }}
        onClick={onRightArrowClick}
      >
        <ChevronRightRoundedIcon />
      </Box>
    </Box>
  );
};

export default Story;
