import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  AppBar,
  Typography,
  Toolbar,
  IconButton,
  Box,
  Container,
  Avatar,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useLazyQuery } from '@apollo/client';
import HomeIcon from '@material-ui/icons/Home';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import SendIcon from '@material-ui/icons/Send';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import ExploreIcon from '@material-ui/icons/Explore';
import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import { getUserProfile } from '../queries/queries';

const useStyles = makeStyles((theme) => ({
  instagram: {
    color: '#000',
    fontSize: '30px',
    fontFamily: 'Engagement, cursive',
  },
  appBar: {
    backgroundColor: '#fff',
    borderBottom: `1px solid #dbdbdb`,
    height: '54px',
  },
  toolbar: {
    margin: '-5px 0',
    padding: '0px',
  },
  wrapper: {
    width: '70%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    color: '#000',
    fontSize: '28px',
  },
  avatarIcon: {
    marginLeft: '10px',
    height: '28px',
    width: '28px',
    border: (props) =>
      props.path === '/profile' ? '2px solid black' : 'none',
  },
}));

const noProfileImage =
  'https://res.cloudinary.com/nihcas/image/upload/v1587544195/blank-profile-picture-973460_960_720_qkds5q.png';

const Header2 = () => {
  const location = useLocation();
  const classes = useStyles({ path: location.pathname });
  const [activePage, setActivePage] = useState(location.pathname);
  const [userInfo, setUserInfo] = useState('');

  const [
    getUserProfileInfo,
    { loading: userProfileInfoLoading, data: userProfile },
  ] = useLazyQuery(getUserProfile);

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    setActivePage(location.pathname);
  }, [location]);

  useEffect(() => {
    try {
      getUserProfileInfo({ variables: { userId: user.id } });
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    if (userProfileInfoLoading) {
      console.log('Loading');
    }
    if (userProfile) {
      setUserInfo(userProfile.userProfile[0]);
    }
  }, [userProfileInfoLoading, userProfile]);

  return (
    <AppBar position="fixed" className={classes.appBar} elevation={0}>
      <Toolbar className={classes.toolbar}>
        <Container className={classes.wrapper} disableGutters>
          <Link to="/">
            <Typography className={classes.instagram}>
              Instagram
            </Typography>
          </Link>
          <Box className={classes.iconWrapper}>
            <Link to="/">
              <IconButton
                disableRipple
                style={{ background: 'none' }}
              >
                {activePage === '/' ? (
                  <HomeIcon className={classes.icon} />
                ) : (
                  <HomeOutlinedIcon className={classes.icon} />
                )}
              </IconButton>
            </Link>
            <Link to="/inbox">
              <IconButton
                disableRipple
                style={{ background: 'none' }}
              >
                {activePage === '/inbox' ? (
                  <SendIcon className={classes.icon} />
                ) : (
                  <SendOutlinedIcon className={classes.icon} />
                )}
              </IconButton>
            </Link>

            <Link to="/explore">
              <IconButton
                disableRipple
                style={{ background: 'none' }}
              >
                {activePage === '/explore' ? (
                  <ExploreIcon className={classes.icon} />
                ) : (
                  <ExploreOutlinedIcon className={classes.icon} />
                )}
              </IconButton>
            </Link>

            <Link to="/notification">
              <IconButton
                disableRipple
                style={{ background: 'none' }}
              >
                {activePage === '/notification' ? (
                  <FavoriteIcon className={classes.icon} />
                ) : (
                  <FavoriteBorderOutlinedIcon
                    className={classes.icon}
                  />
                )}
              </IconButton>
            </Link>

            <Link to="/profile">
              <Avatar
                className={classes.avatarIcon}
                alt="Profile"
                src={
                  userInfo &&
                  userInfo.userProfileImages &&
                  userInfo.userProfileImages.url
                    ? userInfo.userProfileImages.url
                    : noProfileImage
                }
              />
            </Link>
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Header2;
