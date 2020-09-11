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
});

export default theme;
