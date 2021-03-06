import { createStyles, makeStyles } from '@material-ui/core/styles';

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(4),
    },
    container: {
      margin: theme.spacing(9, 'auto', 'auto', 'auto'),
    },
    title: {
      color: '#3f51b5',
      textAlign: 'center',
      margin: 'auto',
      marginBottom: '20px',
    },
    addMargin: {
      marginTop: '20px',
      display: 'flex',
    },
    addPadding: {
      paddingTop: '16px',
    },
    imageBorder: {
      borderRadius: '5px',
    },
  })
);

export default useStyles;
