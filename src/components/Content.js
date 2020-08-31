import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import CoffeeCard from './CoffeeCard';
import coffeeList from '../constants';

const useStyles = makeStyles({
  container: {
    marginTop: '30px',
  },
});

const Content = () => {
  const classes = useStyles();

  const getCoffeMakerCard = (coffeMakerObj) => {
    return (
      <Grid item xs={12} sm={4}>
        <CoffeeCard {...coffeMakerObj} />
      </Grid>
    );
  };

  return (
    <div>
      <Grid container spacing={3} className={classes.container}>
        {coffeeList.map((coffeMakerObj) =>
          getCoffeMakerCard(coffeMakerObj),
        )}
      </Grid>
    </div>
  );
};

export default Content;
