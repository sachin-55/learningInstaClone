import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Content from '../components/Content';

const useStyles = makeStyles({
  welcome: {
    fontSize: '3.5rem',
    fontWeight: 'bolder',
  },
});

const Explore = () => {
  const classes = useStyles();
  return (
    <div>
      <Grid container direction="column">
        <Grid item />
        <Grid item container>
          <Grid item xs={1} sm={2} />
          <Grid item xs={10} sm={8}>
            <Content />
          </Grid>
          <Grid item xs={1} sm={2} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Explore;
