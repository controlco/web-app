import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    // root: {},
    // container: {},
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
    },
    addPadding: {
      paddingTop: '16px',
    },
    imageBorder: {
      borderRadius: '5px',
    },
    input: {
      display: 'none',
    },
    uploaderContainer: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    centerLabel: {
      margin: '0 auto',
    },
  })
);
export default useStyles;
