import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Box, Button } from 'theme-ui';

const Profile = () => {
  const history = useHistory();
  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
    setTimeout(() => {
      window.location.reload();
    }, 400);
  };
  return (
    <Box sx={{ marginTop: '60px' }}>
      <Button
        onClick={handleLogout}
        sx={{
          width: '100px',
          marginX: '45%',
          cursor: 'pointer',
          '&:active': { bg: 'green' },
        }}
      >
        Logout
      </Button>
    </Box>
  );
};

export default Profile;
