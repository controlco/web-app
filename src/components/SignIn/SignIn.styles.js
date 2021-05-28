import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(4),
    },
    container: {
      margin: theme.spacing(9, 'auto', 'auto', 'auto'),
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
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
