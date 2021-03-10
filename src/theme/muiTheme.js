import { createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import { grey, blue, red } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#fb876b',
    },
    secondary: {
      main: green[500],
    },
    lightGray: {
      main: '#dbdbdb',
    },
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: 'none',
      },
      contained: {
        backgroundColor: '#0195f6',
        color: '#fff',
        '&:hover': {
          backgroundColor: '#0195f6',
          color: '#fff',
        },
      },
    },
    MuiTextField: {
      root: {
        width: '100%',
      },
    },
    MuiOutlinedInput: {
      root: {
        '&$focused $notchedOutline': {
          border: '2px solid black',
          borderColor: '#dbdbdb',
        },
        '&$disabled $notchedOutline': {
          border: '1px solid black',
          borderColor: '#dbdbdb',
        },
      },
      input: {
        color: 'black',
        borderRadius: 'none',
        '&::placeholder': {
          color: '#0008',
        },
        padding: '10px',
        '&:disabled': {
          color: '#0007',
          cursor: 'not-allowed',
        },
      },
      notchedOutline: {
        borderWidth: '1px',
        borderColor: '#dbdbdb',
        borderRadius: '3px',
      },
    },
  },
  props: {
    MuiButton: {
      variant: 'contained',
      fullWidth: 'true',
      disableElevation: 'true',
      disableFocusRipple: 'true',
      disableTouchRipple: 'true',
      disableRipple: 'true',
    },
  },
});

export default theme;
