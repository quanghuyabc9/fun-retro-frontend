import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const AppTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#000000',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#f3f3f3',
    },
  },
});

export default AppTheme;