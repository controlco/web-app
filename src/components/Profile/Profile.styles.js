import { createStyles, makeStyles } from '@material-ui/core/styles';

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles((theme) =>
  createStyles({
    title: {
      color: '#3f51b5',
      textAlign: 'center',
      margin: 'auto',
      marginTop: '60px',
      marginBottom: '20px',
    },
    image: {
      width: 'maxWitdh',
    },
    addMargin: {
      marginTop: '20px',
    },
  })
);

export default useStyles;
