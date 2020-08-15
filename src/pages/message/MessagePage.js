import React, { useEffect, useState, useRef } from 'react';
import { Box, Container, Image, Text, Input, Button } from 'theme-ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import {
  faSmile,
  faHeart,
  faImage,
} from '@fortawesome/free-regular-svg-icons';

import socketIOClient from 'socket.io-client';

import Header from '../../components/Header';
import penPaper from '../../images/pen-paper.png';

let socket;
const MessagePage = () => {
  const [message, setMessage] = useState('');
  const [messageHistory, setMessageHistory] = useState([]);

  const [info, setInfo] = useState({});

  useEffect(() => {
    if (socket) {
      socket.on('message', (data) => {
        setMessageHistory((msg) => [...msg, data]);
      });
      return () => {
        socket.disconnect();
      };
    }
  }, [socket]);

  const joinRoom = () => {
    socket = socketIOClient('https://instatwo.herokuapp.com/');

    socket.emit(
      'join',
      {
        name: info.name,
        room: info.room,
      },
      () => {
        console.log('Room joined');
        setMessageHistory((msg) => [
          ...msg,
          {
            user: 'admin',
            text: `${info.name}, Welcome to ${info.room} room`,
          },
        ]);
      },
    );
  };

  const handleMessageSent = () => {
    socket.emit('sendMessage', {
      message,
      name: info.name,
      room: info.room,
    });
    setMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      handleMessageSent();
    }
  };

  return (
    <Box>
      <Header />
      <Container
        sx={{
          width: '71%',
          marginTop: '85px',
          display: 'flex',
          bg: '#fff',
          border: '1px solid lightGray',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '35%',
            height: '550px',
            borderRight: '1px solid lightGray',
          }}
        >
          <Box
            sx={{
              position: 'relative',
            }}
          >
            <Text
              sx={{
                borderBottom: '1px solid lightGray',
                textAlign: 'center',
                padding: '20px 0',
                fontWeight: '700',
                fontSize: '16px',
              }}
            >
              Direct
            </Text>
            <Image
              src={penPaper}
              sx={{
                position: 'absolute',
                top: '15px',
                right: '20px',
                cursor: 'pointer',
              }}
            />
          </Box>
          <Box sx={{}}>
            Contacts List
            <Box>
              <Input
                type="text"
                placeholder="Name"
                onChange={(e) => {
                  const { value } = e.target;
                  setInfo((i) => {
                    i.name = value;
                    return i;
                  });
                }}
              />
              <Input
                type="text"
                placeholder="Room"
                onChange={(e) => {
                  const { value } = e.target;

                  setInfo((i) => {
                    i.room = value;
                    return i;
                  });
                }}
              />
              <Button onClick={joinRoom}>Join Room</Button>
            </Box>
          </Box>
        </Box>

        <Box sx={{ width: '65%', height: '550px' }}>
          <Box
            sx={{
              borderBottom: '1px solid lightGray',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                fontWeight: '700',
                fontSize: '16px',
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                padding: '11px 20px',
              }}
            >
              <Image
                variant="inboxProfileImg"
                src="https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png"
                sx={{
                  border: '1px solid #dbdbdb',
                  marginRight: '18px',
                }}
              />
              <Box>
                <Text>FullName</Text>
                <Text
                  sx={{
                    color: 'darkGray',
                    fontSize: '12px',
                    fontWeight: 400,
                  }}
                >
                  Active 3h ago
                </Text>
              </Box>
            </Box>
            <Box sx={{ paddingRight: '20px', fontSize: '25px' }}>
              <FontAwesomeIcon icon={faInfoCircle} />
            </Box>
          </Box>
          <Box sx={{ position: 'relative', height: '90%' }}>
            <Box
              sx={{
                height: '80%',
                bg: '#fff',
                padding: '10px',
                overflowY: 'scroll',
              }}
              id="messageList"
            >
              {messageHistory &&
                messageHistory.length > 0 &&
                messageHistory.map((msg, index) => {
                  return (
                    <Box key={index + 1}>
                      {msg.user === info.name ? (
                        <Box
                          sx={{
                            mb: '20px',
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            wordWrap: 'break-word',
                            wordBreak: 'break-all',
                            width: '100%',
                          }}
                        >
                          <Box
                            sx={{
                              border: '1px solid #808080',
                              width: '75%',
                              display: 'flex',
                              justifyContent: 'flex-end',
                              alignItems: 'center',
                              borderTopLeftRadius: '50px',
                              borderBottomLeftRadius: '50px',
                              paddingLeft: '20px',
                            }}
                          >
                            <Box>{msg.text}</Box>
                            <Box
                              sx={{
                                ml: '10px',
                                bg: 'green',
                                color: '#fcfcfc',
                                padding: '10px 5px',
                                width: '100px',
                                textAlign: 'right',
                              }}
                            >
                              {msg.user}
                            </Box>
                          </Box>
                        </Box>
                      ) : (
                        <Box
                          sx={{
                            backgroundColor:
                              msg.user === 'admin'
                                ? '#dbdbdb'
                                : '#fcfcfc',
                            border: '1px solid #808080',
                            display: 'flex',
                            alignItems: 'center',
                            mb: '20px',
                            width: '75%',
                            wordWrap: 'break-word',
                            wordBreak: 'break-all',
                            borderTopRightRadius: '50px',
                            borderBottomRightRadius: '50px',
                          }}
                        >
                          <Box
                            sx={{
                              mr: '10px',
                              bg:
                                msg.user === 'admin'
                                  ? '#898989'
                                  : 'blue',
                              color: '#fcfcfc',
                              padding: '10px 5px',
                              width: '100px',
                            }}
                          >
                            {msg.user}
                          </Box>
                          <Box>{msg.text}</Box>
                        </Box>
                      )}
                    </Box>
                  );
                })}
            </Box>
            <Box
              sx={{
                position: 'absolute',
                bottom: '20px',
                margin: '0 25px',
                padding: '0 30px',
                borderRadius: '50px',
                border: '1px solid lightGray',
                display: 'flex',
                alignItems: 'center',
                fontSize: '30px',
                justifyContent: 'space-evenly',
                width: '90%',
              }}
            >
              <FontAwesomeIcon icon={faSmile} />
              <Input
                placeholder="Message..."
                type="text"
                value={message}
                sx={{
                  fontSize: '16px',
                  border: 'none',
                  outline: 'none ',
                  background: 'none',
                  width: '70%',
                }}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                onKeyPress={handleKeyPress}
              />
              <FontAwesomeIcon icon={faImage} />
              <FontAwesomeIcon icon={faHeart} />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default MessagePage;
