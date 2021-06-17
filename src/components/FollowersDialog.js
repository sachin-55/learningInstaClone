import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import { CloseRounded } from '@material-ui/icons';
import { Image } from 'theme-ui';
import { useLazyQuery, useMutation } from '@apollo/client';
import {
  followUserMutation,
  getFollowers,
  getUserNewsFeedPosts,
  getUserProfile,
  unfollowUserMutation,
} from '../queries/queries';

const FollowersDialog = ({
  userId,
  setDialogStatus,
  dialogStatus,
  followingUsers,
}) => {
  const [unfollowingIds, setUnfollowingIds] = useState([]);
  const [followingIds, setFollowingIds] = useState([]);

  const [unfollowUser, { loading: unfollowLoading }] = useMutation(
    unfollowUserMutation,
  );
  const [followUser, { loading: followLoading }] = useMutation(
    followUserMutation,
  );

  const [getUserFollowers, { loading, data }] = useLazyQuery(
    getFollowers,
    {
      fetchPolicy: 'network-only',
    },
  );

  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    const getAllFollowerUsers = async () => {
      try {
        getUserFollowers({ variables: { userId } });
      } catch (error) {
        console.log(error);
      }
    };
    getAllFollowerUsers();
  }, []);

  useEffect(() => {
    if (data) {
      setFollowers(data.followers);
    }
  }, [data]);

  const handleUnfollowUser = async (unfollowingId) => {
    try {
      await unfollowUser({
        variables: {
          userId,
          unfollowingId,
        },
        refetchQueries: [
          {
            query: getUserProfile,
            variables: { userId },
          },
        ],
      });

      setUnfollowingIds((x) => x.filter((f) => f !== unfollowingId));
    } catch (error) {
      console.log(error);
    }
  };

  const handleFollowUser = async (followingUserId) => {
    try {
      await followUser({
        variables: {
          userId,
          followingId: followingUserId,
        },
        refetchQueries: [
          {
            query: getUserProfile,
            variables: { userId },
          },
        ],
      });

      setFollowingIds((x) => x.filter((f) => f !== followingUserId));
    } catch (error) {
      console.log(error);
    }
  };

  const isUserFollowed = (user) => {
    const userStatus = followingUsers.find((x) => x.id === user);

    if (userStatus && userStatus.id) {
      return true;
    }
    return false;
  };

  return (
    <Dialog
      open={dialogStatus}
      onClose={() => {
        setDialogStatus(false);
      }}
      fullWidth
    >
      <DialogTitle>
        <Box
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography>Followings {followers.length}</Typography>
          <CloseRounded
            style={{
              cursor: 'pointer',
            }}
            onClick={() => {
              setDialogStatus(false);
            }}
          />
        </Box>
      </DialogTitle>
      <DialogContent>
        {followers &&
          followers.length > 0 &&
          followers.map((user) => (
            <Box
              key={user.id}
              style={{
                backgroundColor: '#fafafa',
                marginBottom: '10px',
                padding: '5px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Box
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Box>
                  <Image
                    variant="suggestionProfileImg"
                    src={
                      (user &&
                        user.userProfile &&
                        user.userProfile.userProfileImages &&
                        user.userProfile.userProfileImages.url) ||
                      'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png'
                    }
                  />
                </Box>
                <Box style={{ marginLeft: '10px' }}>
                  <Typography>{user.fullname}</Typography>
                  <Typography variant="caption">
                    {user.username}
                  </Typography>
                </Box>
              </Box>

              {(unfollowLoading &&
                unfollowingIds.includes(user.id)) ||
              (followLoading && followingIds.includes(user.id)) ? (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <CircularProgress color="#183f73" size="15px" />
                </Box>
              ) : (
                <Button
                  variant="text"
                  style={{
                    color: '#0195f6',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    padding: '0 2px',
                    cursor: 'pointer',
                    width: '100px',
                  }}
                  onClick={() => {
                    if (isUserFollowed(user.id)) {
                      handleUnfollowUser(user.id);
                      setUnfollowingIds((x) => [...x, user.id]);
                    } else {
                      handleFollowUser(user.id);
                      setFollowingIds((x) => [...x, user.id]);
                    }
                  }}
                >
                  {isUserFollowed(user.id)
                    ? 'Unfollow'
                    : 'Follow Back'}
                </Button>
              )}
            </Box>
          ))}
        {followers && followers.length === 0 && (
          <Typography> No Followings </Typography>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FollowersDialog;
