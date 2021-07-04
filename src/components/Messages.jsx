import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';

import APIClient from '../../services/backend.services';
import { useAuth } from '../../hooks/auth';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '90%',
    height: '80vh',
    margin: 'auto',
  },
  headBG: {
    backgroundColor: '#e0e0e0',
  },
  borderRight500: {
    borderRight: '1px solid #e0e0e0',
  },
  messageArea: {
    height: '70vh',
    overflowY: 'auto',
  },
  header: {
    margin: '15px 5px',
    color: '#3f51b5',
    textAlign: 'center',
    marginBottom: '20px',
  },
});

const Chat = () => {
  const classes = useStyles();
  const { user } = useAuth();

  const [messageToSend, setValue] = React.useState('');
  const [users, setUsers] = React.useState('');

  React.useEffect(() => {
    APIClient.get(`users/${user.id}/messages/received/`, {
      headers: { Authorization: `Bearer ${user.token}` },
    }).then((res) => {
      setUsers(res.data);
    });
  }, []);
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleClick = () => {
    const payload = {
      subject: 'nada',
      content: messageToSend,
      to_user: 2,
    };
    APIClient.post(`/users/${user.id}/messages/`, payload, {
      headers: { Authorization: `Bearer ${user.token}` },
    })
      .then(() => {
        console.log('actualizado con exito');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5" className={classes.header}>
            Messages
          </Typography>
        </Grid>
      </Grid>
      <Grid container component={Paper} className={classes.chatSection}>
        <Grid item xs={3} className={classes.borderRight500}>
          <List>
            {users &&
              users
                .filter((userInfo) => userInfo.to_user === user.id)
                .map((item) => (
                  <ListItem button key={users.from_id}>
                    <ListItemIcon>
                      <Avatar
                        alt={users.from_user_first_name}
                        src="https://material-ui.com/static/images/avatar/1.jpg"
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={`${item.from_user_first_name} ${item.from_user_last_name}`}
                      secondary={item.subject}
                    />
                  </ListItem>
                ))}
          </List>
        </Grid>
        <Grid item xs={9}>
          <List className={classes.messageArea}>
            <ListItem key="1">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText align="right" primary="Hey man, What's up ?" />
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="right" secondary="09:30" />
                </Grid>
              </Grid>
            </ListItem>
            <ListItem key="2">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText
                    align="left"
                    primary="Hey, Iam Good! What about you ?"
                  />
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="left" secondary="09:31" />
                </Grid>
              </Grid>
            </ListItem>
            <ListItem key="3">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText
                    align="right"
                    primary="Cool. i am good, let's catch up!"
                  />
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="right" secondary="10:30" />
                </Grid>
              </Grid>
            </ListItem>
          </List>
          <Divider />
          <Grid container style={{ padding: '20px' }}>
            <Grid item xs={11}>
              <TextField
                id="outlined-basic-email"
                label="Type Something"
                value={messageToSend}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid xs={1} align="right">
              <Fab color="primary" aria-label="add" onClick={handleClick}>
                <SendIcon />
              </Fab>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Chat;
