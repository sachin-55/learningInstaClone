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
import HomeIcon from '@material-ui/icons/Home';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import SendIcon from '@material-ui/icons/Send';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import ExploreIcon from '@material-ui/icons/Explore';
import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';

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

const Header2 = () => {
  const location = useLocation();
  const classes = useStyles({ path: location.pathname });
  const [activePage, setActivePage] = useState(location.pathname);
  useEffect(() => {
    setActivePage(location.pathname);
  }, [location]);
  return (
    <AppBar position="fixed" className={classes.appBar} elevation={0}>
      <Toolbar className={classes.toolbar}>
        <Container className={classes.wrapper} disableGutters>
          <Typography className={classes.instagram}>
            Instagram
          </Typography>
          <Box className={classes.iconWrapper}>
            <Link to="/">
              <IconButton>
                {activePage === '/' ? (
                  <HomeIcon className={classes.icon} />
                ) : (
                  <HomeOutlinedIcon className={classes.icon} />
                )}
              </IconButton>
            </Link>
            <Link to="/inbox">
              <IconButton>
                {activePage === '/inbox' ? (
                  <SendIcon className={classes.icon} />
                ) : (
                  <SendOutlinedIcon className={classes.icon} />
                )}
              </IconButton>
            </Link>

            <Link to="/explore">
              <IconButton>
                {activePage === '/explore' ? (
                  <ExploreIcon className={classes.icon} />
                ) : (
                  <ExploreOutlinedIcon className={classes.icon} />
                )}
              </IconButton>
            </Link>

            <Link to="/notification">
              <IconButton>
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
                src="https://cdn.iconscout.com/icon/free/png-512/avatar-372-456324.png"
              />
            </Link>
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Header2;
