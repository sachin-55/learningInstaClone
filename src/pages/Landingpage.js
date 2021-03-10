import React, { useState } from 'react';
import { Box, Container, Input, Button, Image } from 'theme-ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import { Link, useHistory } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { Typography } from '@material-ui/core';
import ios from '../images/ios-download.png';
import android from '../images/android-download.png';
import backgroundImg from '../images/background.png';
import firstImage from '../images/firstimage.jpg';
import secondImage from '../images/secondImage.jpg';
import ButtonCustom from '../components/ButtonCustom';
import Footer from '../components/Footer';
import { loginMutation } from '../queries/queries';

function validateEmail(email) {
  const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return re.test(String(email).toLowerCase());
}

function checkPassword(str) {
  const re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return re.test(str);
}

const Landingpage = (props) => {
  const [imageMob, setImageMob] = useState(firstImage);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailStatusMessage, setEmailStatusMessage] = useState('');

  const [login] = useMutation(loginMutation);
  const history = useHistory();

  const toggleImage = () => {
    setTimeout(() => {
      setImageMob((i) =>
        i === firstImage ? secondImage : firstImage,
      );
    }, 5000);
  };

  const handlePasswordChange = (event) => {
    const { value } = event.target;
    setPassword(value);
  };

  const handleEmailChange = (event) => {
    const { value } = event.target;
    setEmail(value);
    if (validateEmail(value)) {
      setEmailStatusMessage('');
    } else {
      setEmailStatusMessage('Please enter valid email.');
    }
  };

  const handleLogin = async () => {
    try {
      if (!email && !password && emailStatusMessage) {
        return;
      }

      const response = await login({
        variables: {
          email,
          password,
        },
      });
      setEmail('');
      setEmail('');
      setPassword('');
      const userData = await response.data;
      const data = {
        id: userData.login.id,
        fullname: userData.login.fullname,
        username: userData.login.username,
        email: userData.login.email,
      };
      props.setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
      localStorage.setItem('token', userData.login.token);
      localStorage.setItem('login', true);
      history.push('/');
      setTimeout(() => {
        window.location.reload();
      }, 400);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Box onLoad={toggleImage}>
      <Container
        sx={{
          width: '70%',
          maxWidth: '850px',
          height: '90vh',
          marginTop: '50px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            flexBasis: ['450px'],
            height: '100%',
            marginTop: '-40px',
            position: 'relative',
          }}
          className="left-side-mobile"
        >
          <Box
            sx={{
              position: 'absolute',
              top: '97px',
              left: '150px',
              right: '63px',
              bottom: '89px',
            }}
          >
            <Image
              sx={{ position: 'absolute' }}
              variant="mobileImage"
              src={imageMob}
            />
          </Box>
        </Box>
        <Box
          sx={{
            flexBasis: ['350px'],
            marginLeft: '-15px',
            marginRight: '50px',
          }}
        >
          <Box
            sx={{
              backgroundColor: 'secondaryBackground',
              border: '1px solid #dbdbdb',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                fontFamily: 'Engagement , cursive',
                fontSize: '6',
                fontWeight: 400,
                letterSpacing: '2px',
                textAlign: 'center',
                margin: '22px auto 12px',
              }}
            >
              Instagram
            </Box>
            <Box
              sx={{
                width: '78%',
              }}
            >
              <Input
                type="email"
                placeholder="Phone number, username, or email "
                sx={{
                  fontSize: '12px',
                  '&::placeholder': { color: '#94979b' },
                }}
                value={email}
                onChange={handleEmailChange}
              />
              <Typography style={{ fontSize: '10px', color: 'red' }}>
                {emailStatusMessage}
              </Typography>

              <Input
                type="password"
                placeholder="Password"
                sx={{
                  fontSize: '12px',
                  '&::placeholder': { color: '#94979b' },
                }}
                value={password}
                onChange={handlePasswordChange}
              />

              <ButtonCustom
                disabled={!email || !password}
                onClick={handleLogin}
              >
                Log In
              </ButtonCustom>
            </Box>
            <Box
              sx={{
                width: '100%',
                padding: '10px 40px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  height: '0px',
                  borderTop: '1px solid #dbdbdb',
                  width: '40%',
                }}
              />
              <Box
                sx={{
                  color: '#8e8e8e',
                  fontSize: '13px',
                  fontWeight: '700',
                }}
              >
                OR
              </Box>
              <Box
                sx={{
                  height: '0px',
                  borderTop: '1px solid #dbdbdb',
                  width: '40%',
                }}
              />
            </Box>
            <Box
              sx={{
                padding: '0 40px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '18px',
                marginTop: '15px',
              }}
            >
              <FontAwesomeIcon
                icon={faFacebookSquare}
                color="#385084"
              />
              <Box
                sx={{
                  color: '#37548b',
                  fontSize: '14px',
                  fontWeight: 700,
                  padding: '0 10px',
                  cursor: 'pointer',
                }}
              >
                Log in with Facebook
              </Box>
            </Box>
            <Box
              sx={{
                color: '#183f73',
                textAlign: 'center',
                fontSize: '12px',
                margin: '15px 0',
                cursor: 'pointer',
              }}
            >
              Forgot password?
            </Box>
          </Box>
          <Box
            sx={{
              width: '100%',
              backgroundColor: 'secondaryBackground',
              border: '1px solid #dbdbdb',
              display: 'flex',
              justifyContent: 'center',
              marginY: '10px',
              paddingY: '15px',
              fontSize: '15px',
              fontWeight: 300,
            }}
          >
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="signup-link">
              Sign up
            </Link>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              fontSize: '15px',
              marginY: '15px',
            }}
          >
            Get the app.
            <Box
              sx={{
                width: '80%',
                marginTop: '15px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Box sx={{ marginRight: '5px' }}>
                <Image variant="primary" src={ios} />
              </Box>
              <Box sx={{ marginLeft: '5px' }}>
                <Image variant="primary" src={android} />
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default Landingpage;
