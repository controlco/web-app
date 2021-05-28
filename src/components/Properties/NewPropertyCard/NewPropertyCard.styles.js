import { createStyles, makeStyles } from '@material-ui/core/styles';

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles((theme) =>
  createStyles({
    cardContainer: {
      '&:hover': { cursor: 'pointer' },
      marginBottom: '20px',
    },
    newPropertyCard: {
      flexDirection: 'column',
      borderRadius: '50%',
      width: '80px',
      height: '80px',
      alignItems: 'center',
      border: '1px solid lightgrey',
      padding: '10px',
    },
  })
);
export default useStyles;
