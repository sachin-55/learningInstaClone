import React, { useEffect, useState } from 'react';
import { Box, Image } from 'theme-ui';
import { useLazyQuery, useMutation } from '@apollo/client';
import {
  queryRecentlyAddedUsers,
  followUserMutation,
} from '../../queries/queries';

const Suggestions = () => {
  const [recentlyAddedUsers, setRecentlyAddedUsers] = useState([]);

  const [
    getRecentlyAddedUsers,
    { data: recentlyAddedUsersData },
  ] = useLazyQuery(queryRecentlyAddedUsers);

  const [followUser] = useMutation(followUserMutation);

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    try {
      getRecentlyAddedUsers({ variables: { userId: user.id } });
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    if (
      recentlyAddedUsersData &&
      recentlyAddedUsersData.recentlyAddedUsers &&
      recentlyAddedUsersData.recentlyAddedUsers.length > 0
    ) {
      setRecentlyAddedUsers(
        recentlyAddedUsersData.recentlyAddedUsers,
      );
    } else {
      setRecentlyAddedUsers([]);
    }
  }, [recentlyAddedUsersData]);

  const handleFollowUser = (followingUserId) => {
    try {
      followUser({
        variables: {
          userId: user.id,
          followingId: followingUserId,
        },
        refetchQueries: [
          {
            query: queryRecentlyAddedUsers,
            variables: { userId: user.id },
          },
        ],
      });
    } catch (error) {
      console.log(error);
    }
  };

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
      {recentlyAddedUsers &&
        recentlyAddedUsers.length > 0 &&
        recentlyAddedUsers.map((userInfo) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between  ',
              marginY: '10px',
            }}
            key={userInfo.id}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Image
                variant="suggestionProfileImg"
                src="https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png"
              />
              <Box sx={{ paddingLeft: '12px' }}>
                <Box sx={{ fontSize: '14px', fontWeight: 'bold' }}>
                  {userInfo.fullname}
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
                  Followed By{' '}
                  {userInfo.userProfile &&
                    userInfo.userProfile.followers &&
                    userInfo.userProfile.followers.length}
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                color: '#0195f6',
                fontSize: '12px',
                fontWeight: 'bold',
                padding: '0 2px',
                cursor: 'pointer',
              }}
              onClick={() => handleFollowUser(userInfo.id)}
            >
              Follow
            </Box>
          </Box>
        ))}
    </Box>
  );
};

export default Suggestions;
