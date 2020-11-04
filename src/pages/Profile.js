import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  makeStyles,
  Typography,
  Input,
} from '@material-ui/core';

const useStyles = makeStyles({
  profileHeaderWrapper: {
    width: '950px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    padding: '20px 0 50px 70px',
    borderBottom: '1px solid #dbdbdb',
  },
  avatarWrapper: {
    marginRight: 100,
  },
  avatar: {
    width: 150,
    height: 150,
    border: '1px solid #dbdbdb',
  },
  profileInfo: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: -10,
  },
  usernameWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  username: {
    fontSize: 28,
    fontWeight: 300,
    marginRight: 20,
  },
  editProfileBtn: {
    fontSize: 14,
    height: 30,
    width: 95,
    padding: '0px 9px',
    fontWeight: 'bold',
  },
  profileData: {
    display: 'flex',
    alignItems: 'center',
    margin: '18px 0px 15px',
  },
  profilePost: {
    marginRight: 50,
    display: 'flex',
    alignItems: 'center',
  },
  profileValues: {
    fontWeight: 'bold',
    marginRight: 4,
  },
  fullname: {
    fontWeight: 'bold',
  },
});

const Profile = () => {
  const classes = useStyles();

  const history = useHistory();
  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
    setTimeout(() => {
      window.location.reload();
    }, 400);
  };
  return (
    <Box style={{ marginTop: '60px' }}>
      <Box className={classes.profileHeaderWrapper}>
        <Box className={classes.avatarWrapper}>
          <Avatar
            className={classes.avatar}
            src="https://picsum.photos/500/600"
          />
        </Box>

        <Box className={classes.profileInfo}>
          <Box className={classes.usernameWrapper}>
            <Typography className={classes.username}>
              Username
            </Typography>
            <Button
              className={classes.editProfileBtn}
              variant="outlined"
            >
              Edit Profile
            </Button>
          </Box>
          <Box className={classes.profileData}>
            <Typography className={classes.profilePost}>
              <Typography className={classes.profileValues}>
                0
              </Typography>{' '}
              posts
            </Typography>
            <Typography className={classes.profilePost}>
              <Typography className={classes.profileValues}>
                0
              </Typography>{' '}
              followers
            </Typography>
            <Typography className={classes.profilePost}>
              <Typography className={classes.profileValues}>
                0
              </Typography>{' '}
              following
            </Typography>
          </Box>
          <Typography className={classes.fullname}>
            Full name
          </Typography>
        </Box>
      </Box>
      <Box className={classes.postWrapper}>
        <Box>
          <Typography>Posts</Typography>
          <Box>
            <Input type="file" />
          </Box>
        </Box>
      </Box>
      <Button
        onClick={handleLogout}
        style={{
          width: '100px',
          marginX: '45%',
          cursor: 'pointer',
          marginTop: '100px',
          '&:active': { bg: 'green' },
        }}
      >
        Logout
      </Button>
    </Box>
  );
};

export default Profile;
