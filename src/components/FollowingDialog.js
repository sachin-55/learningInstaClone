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
  getFollowings,
  getUserNewsFeedPosts,
  getUserProfile,
  unfollowUserMutation,
} from '../queries/queries';

const FollowingDialog = ({
  userId,
  setDialogStatus,
  dialogStatus,
}) => {
  const [unfollowingIds, setUnfollowingIds] = useState([]);

  const [unfollowUser, { loading: unfollowLoading }] = useMutation(
    unfollowUserMutation,
  );
  const [getUserFollowings, { loading, data }] = useLazyQuery(
    getFollowings,
    {
      fetchPolicy: 'network-only',
    },
  );

  const [followings, setFollowings] = useState([]);

  useEffect(() => {
    const getAllFollowingUsers = async () => {
      try {
        getUserFollowings({ variables: { userId } });
      } catch (error) {
        console.log(error);
      }
    };
    getAllFollowingUsers();
  }, []);

  useEffect(() => {
    if (data) {
      setFollowings(data.followings);
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
          {
            query: getUserNewsFeedPosts,
            variables: { userId },
          },
        ],
      });

      setFollowings((x) => x.filter((f) => f.id !== unfollowingId));

      setUnfollowingIds((x) => x.filter((f) => f !== unfollowingId));
    } catch (error) {
      console.log(error);
    }
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
          <Typography>Followings {followings.length}</Typography>
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
        {followings &&
          followings.length > 0 &&
          followings.map((user) => (
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

              {unfollowLoading && unfollowingIds.includes(user.id) ? (
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
                    handleUnfollowUser(user.id);
                    setUnfollowingIds((x) => [...x, user.id]);
                  }}
                >
                  Unfollow
                </Button>
              )}
            </Box>
          ))}
        {followings && followings.length === 0 && (
          <Typography> No Followings </Typography>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FollowingDialog;
