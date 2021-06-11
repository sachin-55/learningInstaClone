/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Box, Image, Input, Button } from 'theme-ui';
import { CircularProgress } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsisH,
  faHeart as filledHeart,
} from '@fortawesome/free-solid-svg-icons';
import { formatDistanceToNowStrict } from 'date-fns';
import {
  faHeart,
  faPaperPlane,
  faBookmark,
  faComment,
} from '@fortawesome/free-regular-svg-icons';
import { useMutation } from '@apollo/client';

import { addNewComment, addLike } from '../../queries/queries';

const Post = ({
  id,
  srcUrl,
  caption,
  location,
  fullname,
  userProfileImage,
  comments,
  likes,
  createdAt,
  getUserNewsFeedPostsData,
}) => {
  const [newComment, setNewComment] = useState('');

  const [addComment, { loading }] = useMutation(addNewComment);
  const [addPostLike, { loading: likeLoading }] = useMutation(
    addLike,
  );

  const user = JSON.parse(localStorage.getItem('user'));

  const submitNewComment = async () => {
    if (newComment) {
      await addComment({
        variables: {
          comment: newComment,
          userId: user.id,
          postId: id,
        },
        refetchQueries: [
          {
            query: getUserNewsFeedPostsData,
            variables: { userId: user.id },
          },
        ],
      });
      setNewComment('');
    }
  };

  const toggleLike = async () => {
    await addPostLike({
      variables: {
        userId: user.id,
        postId: id,
      },
      refetchQueries: [
        {
          query: getUserNewsFeedPostsData,
          variables: { userId: user.id },
        },
      ],
    });
    setNewComment('');
  };

  const didHaveLiked = () => {
    const isUser =
      likes && likes.find((x) => x.userId.id === user.id);
    if (isUser) {
      return true;
    }
    return false;
  };

  const getDate = (value) => {
    const date = new Date(parseInt(value, 10));

    return formatDistanceToNowStrict(date, {
      addSuffix: true,
    });
  };

  return (
    <Box
      sx={{
        bg: '#fff',
        border: '1px solid #dbdbdb',
        marginBottom: '50px',
      }}
    >
      <Box
        sx={{
          paddingX: '20px',
          height: '60px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
          }}
        >
          <Image
            variant="postProfileImg"
            src={userProfileImage}
            sx={{ border: '1px solid #dbdbdb', marginRight: '18px' }}
          />
          <Box sx={{ fontWeight: 'bold', fontSize: '14px' }}>
            {fullname}
          </Box>
        </Box>
        <Box sx={{ fontSize: '14px', cursor: 'pointer' }}>
          <FontAwesomeIcon icon={faEllipsisH} />
        </Box>
      </Box>
      <Box>
        <Image
          sx={{ width: '100%', height: '100%' }}
          // src="https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png"
          src={srcUrl}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '10px 20px',
        }}
      >
        <Box
          sx={{ fontSize: '25px', display: 'flex', fontWeight: 100 }}
        >
          <Box sx={{ marginRight: '10px', cursor: 'pointer' }}>
            {likeLoading ? (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <CircularProgress color="#183f73" size="15px" />
              </Box>
            ) : (
              <FontAwesomeIcon
                icon={didHaveLiked() ? filledHeart : faHeart}
                onClick={toggleLike}
              />
            )}
          </Box>
          <Box sx={{ marginRight: '10px', cursor: 'pointer' }}>
            <FontAwesomeIcon icon={faComment} />
          </Box>
          <Box sx={{ cursor: 'pointer' }}>
            <FontAwesomeIcon icon={faPaperPlane} />
          </Box>
        </Box>
        <Box sx={{ fontSize: '25px', cursor: 'pointer' }}>
          <FontAwesomeIcon icon={faBookmark} />
        </Box>
      </Box>
      <Box>
        <Box sx={{ paddingBottom: '10px' }}>
          <Box
            sx={{
              padding: '0px 20px ',
              fontWeight: '300',
              fontSize: '11px',
            }}
          >
            {createdAt && getDate(createdAt)}
          </Box>

          <Box
            sx={{
              padding: '0 20px ',
              fontWeight: 'bold',
              fontSize: '14px',
            }}
          >
            {likes && likes.length} likes
          </Box>
          <Box
            sx={{
              padding: '0 20px ',
              fontSize: '14px',
            }}
          >
            {caption}
          </Box>
        </Box>

        {comments &&
          comments.length > 0 &&
          comments.map((comment) => (
            <Box
              key={comment.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: '0 20px 5px',
                justifyContent: 'space-between',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                }}
              >
                <Box
                  sx={{
                    fontWeight: 'bold',
                    marginRight: '10px',
                    cursor: 'pointer',
                  }}
                >
                  {comment.userId.username}
                </Box>
                {comment.comment}
                <Box></Box>
              </Box>
              <Box sx={{ fontWeight: 100, cursor: 'pointer' }}>
                <FontAwesomeIcon icon={faHeart} />
              </Box>
            </Box>
          ))}

        <Box
          sx={{
            fontSize: '10px',
            fontWeight: 100,
            padding: '0 20px 10px',
          }}
        >
          3 HOURS AGO
        </Box>
        <Box
          sx={{
            display: 'flex',
            padding: '0 5px',
            borderTop: '1px solid #dbdbdb',
          }}
        >
          <Input
            sx={{ flex: 1, border: 'none', outline: 'none' }}
            placeholder="Add a comment..."
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
          />
          {loading ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CircularProgress color="#183f73" size="15px" />
            </Box>
          ) : (
            <Button
              variant="clearBtn"
              sx={{ cursor: 'pointer' }}
              disabled={!newComment}
              onClick={submitNewComment}
            >
              Post
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Post;
