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
