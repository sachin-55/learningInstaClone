import React, { useEffect, useState } from 'react';
import {
  Box,
  CircularProgress,
  makeStyles,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  loadingContainer: {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 99999999,
    background: 'rgba(255,255,255,0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const WholePageLoading = ({ status = false }) => {
  const classes = useStyles();
  const [loadingStatus, setLoadingStatus] = useState(status);
  useEffect(() => {
    setLoadingStatus(status);
  }, [status]);
  return (
    <>
      {loadingStatus && (
        <Box className={classes.loadingContainer}>
          <CircularProgress color="secondary" size={100} />
        </Box>
      )}
    </>
  );
};
export default WholePageLoading;
