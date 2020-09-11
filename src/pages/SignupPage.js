import React, { useState } from 'react';
import { Box, Input, Button, Image } from 'theme-ui';
import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';

import { useMutation } from '@apollo/client';
import ios from '../images/ios-download.png';
import android from '../images/android-download.png';
import ButtonCustom from '../components/ButtonCustom';
import Footer from '../components/Footer';
import { signupMutation } from '../queries/queries';

const SignupPage = (props) => {
  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [signup] = useMutation(signupMutation);
  const history = useHistory();

  const handleSignUp = async () => {
    try {
      const response = await signup({
        variables: {
          fullname,
          username,
          email,
          password,
        },
      });
      setEmail('');
      setPassword('');
      setFullname('');
      setUsername('');

      const data = {
        id: response.data.id,
        fullname: response.data.fullname,
        username: response.data.username,
        email: response.data.email,
      };
      props.setUser(data);

      localStorage.setItem('user', JSON.stringify(data));
      localStorage.setItem('token', response.data.token);
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
    <>
      <Box
        sx={{
          width: '380px',
          marginTop: '10px',
          marginLeft: '52%',
          transform: 'translateX(-50%)',
        }}
      >
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
                padding: '0 40px 15px 40px',
                fontWeight: 'bold',
                fontSize: '17px',
                color: '#8e8e8e',
                textAlign: 'center',
              }}
            >
              Sign up to see photos and videos from your friends.
            </Box>
            <Box
              sx={{
                width: '100%',
                paddingX: '40px',
              }}
            >
              <ButtonCustom
                sx={{}}
                onClick={() => {
                  alert('hello');
                }}
              >
                <Box sx={{ fontSize: '20px' }}>
                  <FontAwesomeIcon
                    icon={faFacebookSquare}
                    color="#fff"
                  />
                </Box>
                &nbsp;&nbsp;Log in with Facebook
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
                width: '78%',
              }}
            >
              <Input
                type="text"
                placeholder="Mobile number or email "
                sx={{
                  fontSize: '12px',
                  '&::placeholder': { color: '#94979b' },
                }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Full Name "
                sx={{
                  fontSize: '12px',
                  '&::placeholder': { color: '#94979b' },
                }}
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Username "
                sx={{
                  fontSize: '12px',
                  '&::placeholder': { color: '#94979b' },
                }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Password"
                sx={{
                  fontSize: '12px',
                  '&::placeholder': { color: '#94979b' },
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <ButtonCustom
                disabled={
                  !fullname || !email || !password || !username
                }
                onClick={handleSignUp}
              >
                Sign Up
              </ButtonCustom>
            </Box>

            <Box
              sx={{
                color: '#8e8e8e',
                textAlign: 'center',
                fontSize: '12px',
                margin: '15px 0',
                paddingX: '3rem',
              }}
            >
              By signing up, you agree to our
              <span className="boldText"> Terms </span> ,
              <span className="boldText"> Data Policy </span>
              and
              <span className="boldText"> Cookies Policy </span>.
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
            Have an account?{' '}
            <Link to="/" className="signup-link">
              Log in
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
      </Box>
      <Footer />
    </>
  );
};

export default SignupPage;
