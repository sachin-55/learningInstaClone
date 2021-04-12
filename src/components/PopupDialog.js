import React from 'react';
import {
  Box,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@material-ui/core';

const PopupDialog = ({ openDialog, title, content, actions }) => {
  return (
    <Box>
      <Dialog
        onClose={() => setOpenDialog(false)}
        aria-labelledby="check profile is created"
        open={openDialog}
        maxWidth="md"
      >
        <DialogTitle
          style={{
            textAlign: 'center',
            backgroundColor: '#fb876b',
            padding: '5px 0',
            color: '#fff',
          }}
        >
          {title}
        </DialogTitle>
        <DialogContent style={{ margin: '20px 0' }}>
          {content}
        </DialogContent>
        <DialogActions
          style={{
            borderTop: '1px solid lightgray',
            display: 'flex',
            justifyContent: 'space-evenly',
          }}
        >
          {actions}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PopupDialog;
