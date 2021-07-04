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
import { SentimentSatisfiedOutlined } from '@material-ui/icons';

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

  // mensaje escrito en el input
  const [messageToSend, setValue] = React.useState('');
  // todos los mensajes que le han llegado al usuario actual
  const [allMessages, setAllMessages] = React.useState('');
  // id del usuario especifico que estamos viendo
  const [actualUserChat, setActualUserChat] = React.useState('');
  // principal info de personas que mandan
  const [sendersMainData, setSendersMainData] = React.useState('');

  APIClient.get(`users/${user.id}/messages/`, {
    headers: { Authorization: `Bearer ${user.token}` },
  }).then((res) => {
    setAllMessages(res.data);
    const senderIds = [];
    const sendersData = [];
    res.data.forEach((element) => {
      if (!senderIds.includes(element.from_id)) {
        senderIds.push(element.from_id);
        sendersData.push({
          id: element.from_id,
          to_user: element.to_user,
          from_user_first_name: element.from_user_first_name,
          from_user_last_name: element.from_user_last_name,
          from_id: element.from_id,
        });
      }
    });
    setSendersMainData(sendersData);
  }, []);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSendMessage = () => {
    const payload = {
      subject: 'probando',
      content: messageToSend,
      to_user: actualUserChat,
    };
    APIClient.post(`/users/${user.id}/messages/`, payload, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
  };

  const handleClick = (userId) => {
    setActualUserChat(userId);
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
            {sendersMainData &&
              sendersMainData
                .filter((message) => message.to_user === user.id)
                .map((item) => (
                  <ListItem
                    button
                    key={item.id}
                    selected={item.from_id === actualUserChat}
                  >
                    <ListItemIcon>
                      <Avatar
                        alt={item.from_user_first_name}
                        src="https://material-ui.com/static/images/avatar/1.jpg"
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={`${item.from_user_first_name} ${item.from_user_last_name}`}
                    />
                    <Fab
                      aria-label="see"
                      onClick={() => handleClick(item.from_id)}
                    />
                  </ListItem>
                ))}
          </List>
        </Grid>
        <Grid item xs={9}>
          <List className={classes.messageArea}>
            {allMessages &&
              allMessages
                .filter(
                  (message) =>
                    (message.from_id === actualUserChat &&
                      message.to_user === user.id) ||
                    (message.to_user === actualUserChat &&
                      message.from_id === user.id)
                )
                .map((item) => (
                  <ListItem key={item.id}>
                    <Grid container>
                      <Grid item xs={12}>
                        <ListItemText
                          align={
                            item.from_id === actualUserChat ? 'left' : 'right'
                          }
                          primary={item.content}
                        />
                      </Grid>
                    </Grid>
                  </ListItem>
                ))}
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
              <Fab
                color="primary"
                aria-label="add"
                onClick={handleSendMessage}
                href="/messages"
              >
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
