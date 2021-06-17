import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
} from 'react';
import { Box, Container, Image, Text, Input, Button } from 'theme-ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import {
  faSmile,
  faHeart,
  faImage,
} from '@fortawesome/free-regular-svg-icons';

import penPaper from '../../images/pen-paper.png';
import { useLazyQuery } from '@apollo/client';
import {
  getGroup,
  getUniqueUsers,
  getUserConversations,
} from '../../queries/queries';
import { useSockets } from '../../contexts/socketContext';
import { Avatar } from '@material-ui/core';
import { format, formatDistanceToNowStrict } from 'date-fns';

const MessagePage = () => {
  const socket = useSockets();
  const [message, setMessage] = useState('');
  const [messageHistory, setMessageHistory] = useState([]);
  const [userContacts, setUserContacts] = useState([]);
  const [uniqueUsers, setUniqueUsers] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [commonUsers, setCommonUsers] = useState([]);
  const [noFollowingIds, setNoFollowingIds] = useState([]);
  const [noFollowBackIds, setNoFollowBackIds] = useState([]);
  const [activeUser, setActiveUser] = useState({});
  const [messageReceived, setMessageReceived] = useState({});

  const [
    activeUserConversation,
    setActiveUserConversation,
  ] = useState([]);

  const [
    nonActiveUserConversation,
    setNonActiveUserConversation,
  ] = useState({});

  const setRef = useCallback((node) => {
    if (node) {
      node.scrollIntoView({ smooth: true });
    }
  }, []);

  const [
    getUserContacts,
    { loading: contactsLoading, data: contactsData },
  ] = useLazyQuery(getUniqueUsers, {
    fetchPolicy: 'cache-and-network',
  });

  const [
    getUserGroups,
    { loading: groupLoading, data: groupData },
  ] = useLazyQuery(getGroup, {
    fetchPolicy: 'cache-and-network',
  });

  const [
    getUserConversation,
    { loading: conversationLoading, data: conversationData },
  ] = useLazyQuery(getUserConversations, {
    fetchPolicy: 'cache-and-network',
  });

  const [info, setInfo] = useState({});
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    let collectUsersIds;

    if (socket) {
      socket.on('connect', () => {
        console.log('User Is Connected', socket.id);
      });

      socket.on('message', (data) => {
        setMessageHistory((msg) => [...msg, data]);
      });

      socket.emit('collect-online-users', {
        userId: user.id,
      });
      collectUsersIds = setInterval(() => {
        socket.emit('collect-online-users', {
          userId: user.id,
        });
      }, 30000);

      socket.on('online-users', (data) => {
        if (data && data.onlineUsers) {
          // all users that are followed or following
          if (data.onlineUsers.uniqueUserIds) {
            setUniqueUsers(data.onlineUsers.uniqueUserIds);
          }
          // online users
          if (data.onlineUsers.onlineUserIds) {
            setOnlineUsers(data.onlineUsers.onlineUserIds);
          }
          // users that are both followed and following
          if (data.onlineUsers.commonUserIds) {
            setCommonUsers(data.onlineUsers.commonUserIds);
          }

          // user that have not followed back
          if (data.onlineUsers.noFollowBackIds) {
            setNoFollowBackIds(data.onlineUsers.noFollowBackIds);
          }
          // users that you have not followed
          if (data.onlineUsers.noFollowingIds) {
            setNoFollowingIds(data.onlineUsers.noFollowingIds);
          }
        }
      });

      socket.on('receive-message', (data) => {
        console.log({ data });
        setMessageReceived(data);
      });
    }
    return () => {
      clearInterval(collectUsersIds);
    };
  }, []);

  useEffect(() => {
    try {
      if (uniqueUsers && uniqueUsers.length > 0) {
        getUserContacts({
          variables: {
            userIds: uniqueUsers,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, [uniqueUsers]);

  useEffect(() => {
    try {
      getUserGroups({
        variables: {
          userId: user.id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }, [contactsData]);

  useEffect(() => {
    if (
      contactsData &&
      contactsData.uniqueUsers &&
      contactsData.uniqueUsers.length > 0 &&
      groupData &&
      groupData.getUserGroup
    ) {
      const groups = groupData.getUserGroup;
      const users = contactsData.uniqueUsers.map((uqUser) => {
        const grUser = groups.find((x) => {
          if (x.groupType === 'Duo') {
            const gUser = x.members.find((y) => y.id === uqUser.id);
            if (gUser && gUser.id) {
              return true;
            }
            return false;
          }
          return false;
        });
        return {
          id: uqUser.id,
          fullname: uqUser.fullname,
          username: uqUser.username,
          online: onlineUsers.includes(uqUser.id),
          image:
            uqUser.userProfile.userProfileImages &&
            uqUser.userProfile.userProfileImages.url,
          lastSeen: Date.now(),
          groupId: grUser.id,
          bgImage: grUser.backgroundImage,
          members: grUser.members,
          groupType: grUser.groupType,
        };
      });
      setUserContacts(users);

      setActiveUser((x) => (!x.id ? users[0] : x));
    }
  }, [contactsData, onlineUsers, groupData]);

  useEffect(() => {
    try {
      if (activeUser && activeUser.id) {
        getUserConversation({
          variables: {
            groupId: activeUser.groupId,
          },
        });
        setNonActiveUserConversation((messages) =>
          Object.keys(messages).filter(
            (x) => x !== activeUser.groupId,
          ),
        );
      }
    } catch (error) {
      console.log(error);
    }
  }, [activeUser]);

  useEffect(() => {
    if (conversationData && conversationData.getUserConversations) {
      setActiveUserConversation(
        conversationData.getUserConversations,
      );
    }
  }, [conversationData]);

  useEffect(() => {
    if (messageReceived && messageReceived._id) {
      const updatedMessage = {
        id: messageReceived._id,
        created_at: Date.parse(messageReceived.created_at),
        groupId: {
          id: messageReceived.groupId,
        },
        senderId: {
          id: messageReceived.senderId,
        },
        message: messageReceived.message,
        seen: messageReceived.seen,
      };

      if (messageReceived.groupId === activeUser.groupId) {
        const copyChat = [...activeUserConversation];
        copyChat.push(updatedMessage);
        setActiveUserConversation(copyChat);
      } else {
        const gid = messageReceived.groupId;
        setNonActiveUserConversation((messages) => ({
          ...messages,
          [gid]: updatedMessage,
        }));
      }
    }
  }, [messageReceived]);

  const handleMessageSent = () => {
    socket.emit(
      'send-message',
      {
        message,
        senderId: user.id,
        groupId: activeUser.groupId,
        receiverId: activeUser.id,
      },
      (msg) => {
        const copyChat = [...activeUserConversation];
        const updatedMessage = {
          id: msg._id,
          created_at: Date.parse(msg.created_at),
          groupId: {
            id: activeUser.groupId,
          },
          senderId: {
            id: msg.senderId,
          },
          message: msg.message,
          seen: msg.seen,
        };

        console.log({ updatedMessage });
        copyChat.push(updatedMessage);
        setActiveUserConversation(copyChat);
        setMessage('');
      },
    );
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      handleMessageSent();
    }
  };

  const getDate = (value) => {
    if (value) {
      const date = new Date(parseInt(value, 10));

      return formatDistanceToNowStrict(date, {
        addSuffix: true,
      });
    }
  };

  const getUserInfo = (members, senderId) => {
    let userInfo = {};
    if (senderId === user.id) {
      const u = members.find((x) => x.id === user.id);
      userInfo = {
        ...u,
        status: 'sender',
        url:
          (u.userProfile &&
            u.userProfile.userProfileImages &&
            u.userProfile.userProfileImages.url) ||
          'noImage',
      };
    } else {
      const u = members.find((x) => x.id !== user.id);
      userInfo = {
        ...u,
        status: 'receiver',
        url: activeUser.image,
      };
    }

    return userInfo;
  };

  const getActualDate = (value) => {
    const date = new Date(parseInt(value, 10));

    return format(date, "yyyy/MM/dd','hh:mm:ss");
  };

  const isUserValidToChat = (userId) => {
    if (commonUsers.includes(userId)) {
      return { status: true };
    } else {
      if (noFollowingIds.includes(userId)) {
        return {
          message:
            'You have not followed user, follow user to have conversation',
          status: false,
        };
      }
      if (noFollowBackIds.includes(userId)) {
        return {
          message:
            'Your have not been follow back by this user to have conversation.',
          status: false,
        };
      }
    }
  };

  return (
    <Box>
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

          <Box>
            {userContacts.length > 0 &&
              userContacts.map((userContact) => (
                <Box
                  key={userContact.id}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '10px',
                    margin: '5px',
                    borderBottom: '1px solid #bdbdbd',
                    backgroundColor:
                      activeUser.id === userContact.id
                        ? ' rgba(100,100,200,0.2)'
                        : userContact.online
                        ? 'rgba(0,100,0,0.1)'
                        : 'rgba(100,100,100,0.1)',

                    '&:hover': {
                      backgroundColor: 'rgba(66,103,178,0.2)',
                      cursor: 'pointer',
                    },
                  }}
                  onClick={() => setActiveUser(userContact)}
                >
                  <Box mr="10px">
                    <Avatar
                      src={userContact.image}
                      style={{
                        width: '60px',
                        height: '60px',
                        border: `3px solid ${
                          userContact.online ? 'green' : '#808080'
                        }`,
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      fontWeight: Object.keys(
                        nonActiveUserConversation,
                      ).includes(userContact.groupId)
                        ? '700'
                        : '400',
                    }}
                  >
                    <Text>{userContact.fullname}</Text>
                    <Text>{userContact.username}</Text>
                  </Box>
                </Box>
              ))}
          </Box>
        </Box>

        {/* Messages */}
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
              <Avatar
                variant="inboxProfileImg"
                src={activeUser && activeUser.image}
                style={{
                  border: `3px solid ${
                    activeUser && activeUser.online
                      ? 'green'
                      : '#dbdbdb'
                  }`,

                  marginRight: '18px',
                }}
              />
              <Box>
                <Text>{activeUser && activeUser.fullname}</Text>
                <Text
                  sx={{
                    color: 'darkGray',
                    fontSize: '12px',
                    fontWeight: 400,
                  }}
                >
                  {activeUser &&
                    ((activeUser.online && 'Online') ||
                      getDate(activeUser.lastSeen))}
                </Text>
              </Box>
            </Box>
            <Box sx={{ paddingRight: '20px', fontSize: '25px' }}>
              <FontAwesomeIcon icon={faInfoCircle} />
            </Box>
          </Box>
          {isUserValidToChat(activeUser.id) &&
          isUserValidToChat(activeUser.id).status ? (
            <Box sx={{ position: 'relative', height: '90%' }}>
              <Box
                sx={{
                  height: '80%',
                  bg: '#fff',
                  padding: '10px',
                  overflowY: 'scroll',
                  overflowX: 'hidden',
                  wordBreak: 'break-all',
                }}
                id="messageList"
              >
                {activeUserConversation &&
                  activeUserConversation.length > 0 &&
                  activeUserConversation.map((msg, index) => {
                    const lastMessage =
                      activeUserConversation.length - 1 === index;
                    return (
                      <Box
                        key={msg.id}
                        ref={lastMessage ? setRef : null}
                      >
                        <Box
                          sx={{
                            mb: '10px',
                            display: 'flex',
                            justifyContent: `${
                              getUserInfo(
                                activeUser.members,
                                msg.senderId.id,
                              ).status === 'sender'
                                ? 'flex-end'
                                : 'flex-start'
                            }`,
                            alignItems: 'center',
                            wordWrap: 'break-word',
                            wordBreak: 'break-all',
                            width: '100%',
                          }}
                        >
                          <Box
                            sx={{
                              my: '5px',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: `${
                                getUserInfo(
                                  activeUser.members,
                                  msg.senderId.id,
                                ).status === 'sender'
                                  ? 'flex-end'
                                  : 'flex-start'
                              }`,
                            }}
                          >
                            <Box
                              sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: `${
                                  getUserInfo(
                                    activeUser.members,
                                    msg.senderId.id,
                                  ).status === 'sender'
                                    ? 'flex-end'
                                    : 'flex-start'
                                }`,
                                backgroundColor: `${
                                  getUserInfo(
                                    activeUser.members,
                                    msg.senderId.id,
                                  ).status === 'sender'
                                    ? 'rgba(50,50,100,0.9)'
                                    : 'rgba(20,150,50,0.9)'
                                }`,
                                color: `${
                                  getUserInfo(
                                    activeUser.members,
                                    msg.senderId.id,
                                  ).status === 'sender'
                                    ? '#fff'
                                    : '#fcfcfc'
                                }`,
                                borderRadius: '5px',
                                padding: '5px',
                              }}
                            >
                              <Text
                                sx={{
                                  fontSize: '10px',
                                  color: `${
                                    getUserInfo(
                                      activeUser.members,
                                      msg.senderId.id,
                                    ).status === 'sender'
                                      ? '#bdbdbd'
                                      : '#fcfcfc'
                                  }`,
                                }}
                              >
                                {getActualDate(msg.created_at)}
                              </Text>
                              <Text>{msg.message}</Text>
                            </Box>
                            <Box
                              sx={{
                                display: 'flex',
                                flexDirection: `${
                                  getUserInfo(
                                    activeUser.members,
                                    msg.senderId.id,
                                  ).status === 'sender'
                                    ? 'row'
                                    : 'row-reverse'
                                }`,
                                alignItems: 'baseline',
                              }}
                            >
                              <Text
                                sx={{
                                  fontSize: '10px',
                                  color: '#a0a0a0',
                                }}
                              >
                                {
                                  getUserInfo(
                                    activeUser.members,
                                    msg.senderId.id,
                                  ).fullname
                                }
                              </Text>
                              <Avatar
                                src={
                                  getUserInfo(
                                    activeUser.members,
                                    msg.senderId.id,
                                  ).url
                                }
                                style={{
                                  width: '15px',
                                  height: '15px',
                                }}
                              />
                            </Box>
                          </Box>
                        </Box>
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
          ) : (
            <Box>
              <Text sx={{ margin: '100px 0px', textAlign: 'center' }}>
                {isUserValidToChat(activeUser.id) &&
                  isUserValidToChat(activeUser.id).message}
              </Text>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default MessagePage;
