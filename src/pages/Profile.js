import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  makeStyles,
  Typography,
  TextField,
  FormLabel,
  Divider,
} from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { useLazyQuery, useMutation } from '@apollo/client';
import ProfilePosts from '../components/ProfilePosts';
import ProfileSaved from '../components/ProfileSaved';
import ProfileTagged from '../components/ProfileTagged';
import ProfileIgtv from '../components/ProfileIgtv';
import PopupDialog from '../components/PopupDialog';
import ButtonCustom from '../components/ButtonCustom';
import WholePageLoading from '../components/WholePageLoading';

import {
  addUserProfileImage,
  getUserProfile,
} from '../queries/queries';
import uploadImage from '../utils/uploadImage';
import FollowingDialog from '../components/FollowingDialog';

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
    cursor: 'pointer',
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
    width: '100%',
  },
  logoutAndInfoWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  logOutBtn: {
    fontSize: 14,
    height: 30,
    width: 10,
    padding: '0px',
    background: 'inherit',
    color: '#000',
    '&:hover': {
      background: '#dbdbdb',
    },
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
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  profileValues: {
    fontWeight: 'bold',
    marginRight: 4,
  },
  fullname: {
    fontWeight: 'bold',
  },
  postWrapper: {
    width: '950px',
    margin: '0 auto',
  },
  menuWrapper: {
    display: 'flex',
    alignItems: 'center',
    margin: '0 auto',
    paddingLeft: '27%',
  },
  menuPost: {
    marginRight: 80,
    paddingTop: 15,
    fontWeight: 'bold',
    fontSize: 13.5,
    letterSpacing: 1,
    transform: 'translateY(-1px)',
    borderTop: (props) =>
      props.active === 'post' ? '1px solid #000' : 'none',
    cursor: 'pointer',
  },
  menuIGTV: {
    marginRight: 80,
    paddingTop: 15,
    fontWeight: 'bold',
    fontSize: 13.5,
    letterSpacing: 1,
    transform: 'translateY(-1px)',
    borderTop: (props) =>
      props.active === 'igtv' ? '1px solid #000' : 'none',
    cursor: 'pointer',
  },
  menuSaved: {
    marginRight: 80,
    paddingTop: 15,
    fontWeight: 'bold',
    fontSize: 13.5,
    letterSpacing: 1,
    transform: 'translateY(-1px)',
    borderTop: (props) =>
      props.active === 'saved' ? '1px solid #000' : 'none',
    cursor: 'pointer',
  },
  menuTagged: {
    marginRight: 80,
    paddingTop: 15,
    fontWeight: 'bold',
    fontSize: 13.5,
    letterSpacing: 1,
    transform: 'translateY(-1px)',
    borderTop: (props) =>
      props.active === 'tagged' ? '1px solid #000' : 'none',
    cursor: 'pointer',
  },
  textField: {
    display: 'none',
  },
  browseButton: {
    width: '100%',
    background: 'inherit',
    cursor: 'pointer',
    textAlign: 'center',
    border: '1px solid #dbdbdb',
    margin: '10px 0px',
    height: '30px',
    '&:hover': {
      background: 'inherit',
      color: '#000',
    },
  },
});

const noProfileImage =
  'https://res.cloudinary.com/nihcas/image/upload/v1587544195/blank-profile-picture-973460_960_720_qkds5q.png';

const Profile = () => {
  const [active, setActive] = useState('post');
  const classes = useStyles({ active });
  const [userInfo, setUserInfo] = useState('');
  const [profilePicture, setProfilePicture] = useState(
    noProfileImage,
  );
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [postsCount, setPostsCount] = useState(0);

  const [enabledFollowingDialog, setEnableFollowingDialog] = useState(
    false,
  );

  const [
    wholePageLoadingStatus,
    setWholePageLoadingStatus,
  ] = useState(false);

  const [
    enableChangeProfilePopup,
    setEnableChangeProfilePopup,
  ] = useState(false);

  const [
    getUserProfileInfo,
    { loading: userProfileInfoLoading, data: userProfile },
  ] = useLazyQuery(getUserProfile);

  const [addUserPP] = useMutation(addUserProfileImage);

  const user = JSON.parse(localStorage.getItem('user'));

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
    if (userProfile && userProfile.userProfile[0]) {
      setUserInfo(userProfile.userProfile[0]);
      setFollowers(userProfile.userProfile[0].followers);
      setFollowing(userProfile.userProfile[0].following);
      if (
        userProfile.userProfile[0].userProfileImages &&
        userProfile.userProfile[0].userProfileImages.url
      ) {
        setProfilePicture(
          userProfile.userProfile[0].userProfileImages.url,
        );
      }
    }
  }, [userProfileInfoLoading, userProfile]);

  const history = useHistory();
  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
    setTimeout(() => {
      window.location.reload();
    }, 400);
  };

  const uploadProfileImage = async (event) => {
    try {
      setWholePageLoadingStatus(true);
      setTimeout(() => {
        setWholePageLoadingStatus(false);
      }, 10000);
      const file = event.target.files[0];
      if (file) {
        const res = await uploadImage(file);
        if (res && res.secure_url) {
          addUserPP({
            variables: {
              name: 'Profile Picture',
              url: res.secure_url,
              userProfile: userInfo.id,
            },
            refetchQueries: [
              {
                query: getUserProfile,
                variables: { userId: user.id },
              },
            ],
          });
        }
        setWholePageLoadingStatus(false);
        setEnableChangeProfilePopup(false);
      }
    } catch (error) {
      console.log(error);
      setWholePageLoadingStatus(false);
    }
  };

  const removeProfileImage = async () => {
    try {
      setWholePageLoadingStatus(true);
      setTimeout(() => {
        setWholePageLoadingStatus(false);
      }, 10000);
      addUserPP({
        variables: {
          name: 'Profile Picture',
          url: noProfileImage,
          userProfile: userInfo.id,
        },
        refetchQueries: [
          {
            query: getUserProfile,
            variables: { userId: user.id },
          },
        ],
      });
      setEnableChangeProfilePopup(false);
      setWholePageLoadingStatus(false);
    } catch (error) {
      console.log(error);
      setWholePageLoadingStatus(false);
    }
  };

  return (
    <Box style={{ marginTop: '60px' }}>
      <WholePageLoading status={wholePageLoadingStatus} />

      <Box className={classes.profileHeaderWrapper}>
        <Box
          className={classes.avatarWrapper}
          onClick={() => setEnableChangeProfilePopup(true)}
        >
          <Avatar className={classes.avatar} src={profilePicture} />
        </Box>

        <Box className={classes.profileInfo}>
          <Box className={classes.logoutAndInfoWrapper}>
            <Box className={classes.usernameWrapper}>
              <Typography className={classes.username}>
                {userInfo && userInfo.user && userInfo.user.username}
              </Typography>
              <Button
                className={classes.editProfileBtn}
                variant="outlined"
              >
                Edit Profile
              </Button>
            </Box>
            <Button
              onClick={handleLogout}
              className={classes.logOutBtn}
            >
              <ExitToAppIcon />
            </Button>
          </Box>
          <Box className={classes.profileData}>
            <Typography className={classes.profilePost}>
              <Typography className={classes.profileValues}>
                {postsCount}
              </Typography>
              posts
            </Typography>
            <Typography className={classes.profilePost}>
              <Typography className={classes.profileValues}>
                {followers.length}
              </Typography>
              followers
            </Typography>
            <Typography
              className={classes.profilePost}
              onClick={() => setEnableFollowingDialog(true)}
            >
              <Typography className={classes.profileValues}>
                {following.length}
              </Typography>
              following
            </Typography>
          </Box>
          <Typography className={classes.fullname}>
            {userInfo && userInfo.user && userInfo.user.fullname}
          </Typography>
        </Box>
      </Box>
      <Box className={classes.postWrapper}>
        <Box className={classes.menuWrapper}>
          <Typography
            className={classes.menuPost}
            onClick={() => setActive('post')}
          >
            POSTS
          </Typography>
          <Typography
            className={classes.menuIGTV}
            onClick={() => setActive('igtv')}
          >
            IGTV
          </Typography>
          <Typography
            className={classes.menuSaved}
            onClick={() => setActive('saved')}
          >
            SAVED
          </Typography>
          <Typography
            className={classes.menuTagged}
            onClick={() => setActive('tagged')}
          >
            TAGGED
          </Typography>
        </Box>
        <Box>
          {
            {
              post: <ProfilePosts setPostsCount={setPostsCount} />,
              igtv: <ProfileIgtv />,
              saved: <ProfileSaved />,
              tagged: <ProfileTagged />,
            }[active]
          }
        </Box>
      </Box>

      <PopupDialog
        openDialog={enableChangeProfilePopup}
        title={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <Typography
            style={{
              fontWeight: 'bold',
              width: '300px',
            }}
          >
            Change Profile Photo
          </Typography>
        }
        content={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <Box>
            <Divider style={{ margin: '20px 0px' }} />
            <FormLabel>
              <TextField
                type="file"
                name="profilePicture"
                onChange={uploadProfileImage}
                className={classes.textField}
              />
              <ButtonCustom
                style={{
                  padding: '0px 30px',
                  background: 'none',
                  color: '#000',
                  fontWeight: '400',
                }}
              >
                Upload Photo
              </ButtonCustom>
            </FormLabel>
            <Divider style={{ margin: '20px 0px' }} />
            <Button
              style={{
                padding: '0px 30px',
                background: 'none',
                color: '#000',
                fontWeight: '400',
              }}
              onClick={removeProfileImage}
            >
              Remove Current Photo
            </Button>
            <Divider style={{ margin: '20px 0px' }} />
          </Box>
        }
        actions={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <ButtonCustom
            onClick={() => setEnableChangeProfilePopup(false)}
            style={{
              background: 'inherit',
              color: '#000',
            }}
          >
            Cancel
          </ButtonCustom>
        }
        setOpenDialog={setEnableChangeProfilePopup}
      />
      <FollowingDialog
        dialogStatus={enabledFollowingDialog}
        setDialogStatus={setEnableFollowingDialog}
        userId={user.id}
      />
    </Box>
  );
};

export default Profile;
