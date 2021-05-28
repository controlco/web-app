import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    title: {
      color: '#3f51b5',
      textAlign: 'center',
      margin: 'auto',
      marginBottom: '20px',
    },
  })
);
export default useStyles;
