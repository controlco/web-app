import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) =>
  createStyles({
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
  })
);
export default useStyles;
