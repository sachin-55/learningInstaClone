import React from 'react';
import { Typography } from '@material-ui/core';

import BookList from '../components/BookList';
import AddBook from '../components/AddBook';

const Profile = () => {
  return (
    <div>
      Profile
      <Typography variant="h1">Reading List</Typography>
      <BookList />
      <AddBook />
    </div>
  );
};

export default Profile;
