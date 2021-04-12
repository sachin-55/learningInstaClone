import React, { useContext, useEffect } from 'react';
import { Box, Container, Image } from 'theme-ui';
import { Link } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';

import Story from './Story';
import Suggestions from './Suggestions';
import Post from './Post';
import { getUserNewsFeedPosts } from '../../queries/queries';

const Homepage = (props) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [
    getUserNewsFeedPostsData,
    { loading: userNewsFeedLoading, data: userNewsFeed },
  ] = useLazyQuery(getUserNewsFeedPosts);

  useEffect(() => {
    try {
      getUserNewsFeedPostsData({ variables: { userId: user.id } });
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    if (userNewsFeed) {
      console.log({ userNewsFeed });
    }
  }, [userNewsFeed]);
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
          {userNewsFeed &&
            userNewsFeed.userNewsFeedPosts &&
            userNewsFeed.userNewsFeedPosts.length > 0 &&
            userNewsFeed.userNewsFeedPosts.map((val) => (
              <Post
                key={val.id}
                srcUrl={val.postUrl}
                caption={val.caption}
                location={val.location}
                fullname={val.user.fullname}
                userProfileImage={
                  val.userProfile &&
                  val.userProfile.userProfileImages &&
                  val.userProfile.userProfileImages.url
                    ? val.userProfile.userProfileImages.url
                    : 'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png'
                }
              />
            ))}
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
                <Box sx={{ fontWeight: 'bold' }}>{user.username}</Box>
                <Box sx={{ color: 'darkGray' }}>{user.fullname}</Box>
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
