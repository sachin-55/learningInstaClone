import React from 'react';
import { Box, Image, Input, Button } from 'theme-ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import {
  faHeart,
  faPaperPlane,
  faBookmark,
  faComment,
} from '@fortawesome/free-regular-svg-icons';

const Post = () => {
  return (
    <Box
      sx={{
        bg: '#fff',
        border: '1px solid #dbdbdb',
        marginBottom: '50px',
      }}
    >
      <Box
        sx={{
          paddingX: '20px',
          height: '60px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
          }}
        >
          <Image
            variant="postProfileImg"
            src="https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png"
            sx={{ border: '1px solid #dbdbdb', marginRight: '18px' }}
          />
          <Box sx={{ fontWeight: 'bold', fontSize: '14px' }}>
            Fullname
          </Box>
        </Box>
        <Box sx={{ fontSize: '14px', cursor: 'pointer' }}>
          <FontAwesomeIcon icon={faEllipsisH} />
        </Box>
      </Box>
      <Box>
        <Image
          sx={{ width: '100%', height: '100%' }}
          // src="https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png"
          src="https://images.pexels.com/photos/1236701/pexels-photo-1236701.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '10px 20px',
        }}
      >
        <Box
          sx={{ fontSize: '25px', display: 'flex', fontWeight: 100 }}
        >
          <Box sx={{ marginRight: '10px', cursor: 'pointer' }}>
            <FontAwesomeIcon icon={faHeart} />
          </Box>
          <Box sx={{ marginRight: '10px', cursor: 'pointer' }}>
            <FontAwesomeIcon icon={faComment} />
          </Box>
          <Box sx={{ cursor: 'pointer' }}>
            <FontAwesomeIcon icon={faPaperPlane} />
          </Box>
        </Box>
        <Box sx={{ fontSize: '25px', cursor: 'pointer' }}>
          <FontAwesomeIcon icon={faBookmark} />
        </Box>
      </Box>
      <Box>
        <Box
          sx={{
            padding: '0 20px 10px',
            fontWeight: 'bold',
            fontSize: '14px',
          }}
        >
          1234 likes
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: '0 20px 5px',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              display: 'flex',
            }}
          >
            <Box
              sx={{
                fontWeight: 'bold',
                marginRight: '10px',
                cursor: 'pointer',
              }}
            >
              username
            </Box>
            <Box>this is comment for above post ....hahaha</Box>
          </Box>
          <Box sx={{ fontWeight: 100, cursor: 'pointer' }}>
            <FontAwesomeIcon icon={faHeart} />
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: '0 20px 5px',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              display: 'flex',
            }}
          >
            <Box
              sx={{
                fontWeight: 'bold',
                marginRight: '10px',
                cursor: 'pointer',
              }}
            >
              username
            </Box>
            <Box>this is comment for above post ....hahaha</Box>
          </Box>
          <Box sx={{ fontWeight: 100, cursor: 'pointer' }}>
            <FontAwesomeIcon icon={faHeart} />
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: '0 20px 5px',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              display: 'flex',
            }}
          >
            <Box
              sx={{
                fontWeight: 'bold',
                marginRight: '10px',
                cursor: 'pointer',
              }}
            >
              username
            </Box>
            <Box>this is comment for above post ....hahaha</Box>
          </Box>
          <Box sx={{ fontWeight: 100, cursor: 'pointer' }}>
            <FontAwesomeIcon icon={faHeart} />
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: '0 20px 5px',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              display: 'flex',
            }}
          >
            <Box
              sx={{
                fontWeight: 'bold',
                marginRight: '10px',
                cursor: 'pointer',
              }}
            >
              username
            </Box>
            <Box>this is comment for above post ....hahaha</Box>
          </Box>
          <Box sx={{ fontWeight: 100, cursor: 'pointer' }}>
            <FontAwesomeIcon icon={faHeart} />
          </Box>
        </Box>
        <Box
          sx={{
            fontSize: '10px',
            fontWeight: 100,
            padding: '0 20px 10px',
          }}
        >
          3 HOURS AGO
        </Box>
        <Box
          sx={{
            display: 'flex',
            padding: '0 5px',
            borderTop: '1px solid #dbdbdb',
          }}
        >
          <Input
            sx={{ flex: 1, border: 'none', outline: 'none' }}
            placeholder="Add a comment..."
          />
          <Button variant="clearBtn" sx={{}}>
            Post
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Post;
