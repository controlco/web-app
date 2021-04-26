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
  })
);

export default useStyles;
