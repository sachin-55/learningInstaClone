import React from 'react';
import { TextField, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  wrapper: {
    marginTop: '85px',
    marginLeft: '100px',
    marginRight: 'auto',
  },
  root: {
    color: 'red',
    '&$focused': {
      padding: '20px',
      background: 'red',
      color: 'red',
    },
  },
  underline: {
    textDecoration: 'underline',
  },
});

const Notification = () => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <TextField
        placeholder="ll"
        className={{
          root: classes.root,
          underline: classes.underline,
        }}
      />
    </div>
  );
};

export default Notification;
