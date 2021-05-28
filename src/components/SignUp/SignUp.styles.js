import { createStyles, makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {},
    paper: {
      padding: theme.spacing(8, 4),
    },
    container: {
      margin: theme.spacing(9, "auto", "auto", "auto"),
    },
    title: {
      color: '#3f51b5',
      textAlign: 'center',
      margin: 'auto',
      marginTop: '60px',
    },
  })
);

export default useStyles;
