import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  CardMedia,
  FormLabel,
  Input,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import { useLazyQuery, useMutation } from '@apollo/client';
import { addUserPost, getUserAllPosts } from '../queries/queries';
import WholePageLoading from './WholePageLoading';

const imgs = [
  {
    id: '1',
    postUrl: 'https://picsum.photos/500/500',
  },
  {
    id: '2',
    postUrl: 'https://picsum.photos/600/600',
  },
  {
    id: '3',
    postUrl: 'https://picsum.photos/700/600',
  },
  {
    id: '4',
    postUrl: 'https://picsum.photos/800/800',
  },
];
const useStyles = makeStyles({
  profilePostsContainer: {
    backgroundColor: '#fff',
    marginTop: 15,
    padding: 10,
  },
  postImageWrapper: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  postImage: {
    height: 300,
    width: 300,
    marginBottom: 30,
    cursor: 'pointer',
  },
  newPostBtnWrapper: {
    padding: 20,
  },
  inputFile: {
    display: 'none',
  },
  newPostWrapper: {
    padding: 20,
  },
  browseBtn: {
    border: '1px solid #dbdbdb',
    textAlign: 'center',
    borderRadius: 3,
    width: 80,
    padding: '3px 0px',
    cursor: 'pointer',
  },
  browseBtnText: {
    fontWeight: 300,
    color: '#000',
    fontSize: 14,
    letterSpacing: 1,
  },
  uploadBtn: {
    fontWeight: 300,
    color: '#000',
    fontSize: 14,
    letterSpacing: 1,
    backgroundColor: '#fff',
    padding: '0px',
    '&:hover': {
      color: '#000',
      backgroundColor: '#fff',
    },
  },
  uploadBtnWrapper: {
    border: '1px solid #dbdbdb',
    textAlign: 'center',
    borderRadius: 3,
    padding: '3px 0px',
    cursor: 'pointer',
  },
  selectedFileName: {
    margin: '10px 0px',
  },
  imagePreviewWrapper: {
    marginLeft: '50%',
    transform: 'translateX(-50%)',
    width: '100%',
  },
  inputFieldWrapper: {
    display: 'flex',
    margin: '20px 0px',
    alignItems: 'center',
  },
  imageWrapper: {
    position: 'relative',
    overflow: 'hidden',
  },
  imageHoverBox: {
    position: 'absolute',
    top: '0px',
    bottom: '0px',
    left: '0px',
    right: '0px',
    backgroundColor: 'rgba(50,30,50,0.9)',
    marginBottom: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    opacity: '0',
    transition: '0.5s',
    '&:hover': {
      opacity: '1',
    },
  },
  imageHoverText: {
    color: '#fff',
    padding: '30px',
  },
});

const ProfilePosts = ({ setPostsCount }) => {
  const classes = useStyles();
  const [openNewPost, setOpenNewPost] = useState(false);
  const [selectedFile, setSelectedFile] = useState('');
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');
  const [mentions, setMentions] = useState([]);
  const [
    wholePageLoadingStatus,
    setWholePageLoadingStatus,
  ] = useState(false);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [images, setImages] = useState(imgs);

  const user = JSON.parse(localStorage.getItem('user'));

  const [
    getUserPosts,
    { loading, error, data: userPostsData },
  ] = useLazyQuery(getUserAllPosts);
  const [addPost] = useMutation(addUserPost);

  useEffect(() => {
    getUserPosts({ variables: { userId: user.id } });
  }, []);

  useEffect(() => {
    if (userPostsData) {
      setImages(userPostsData.userPosts);
      setPostsCount(userPostsData.userPosts.length);
    }
  }, [userPostsData]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleFileUpload = async () => {
    if (selectedFile) {
      try {
        setWholePageLoadingStatus(true);
        setLoadingUpload(true);
        // eslint-disable-next-line no-undef
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append(
          'upload_preset',
          process.env.CLOUDINARY_PRESET,
        );

        // eslint-disable-next-line no-undef
        const result = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_NAME}/image/upload`,
          {
            method: 'post',
            body: formData,
          },
        );
        const res = await result.json();
        if (res && res.secure_url) {
          console.log(res.secure_url);
          addPost({
            variables: {
              caption,
              postUrl: res.secure_url,
              location,
              user: user.id,
              mentions,
            },
            refetchQueries: [
              {
                query: getUserAllPosts,
                variables: { userId: user.id },
              },
            ],
          });
          setSelectedFile('');
          setCaption('');
          setLocation('');
          setMentions('');
          setWholePageLoadingStatus(false);
        }
        setLoadingUpload(false);
      } catch (err) {
        console.log(err);
        setLoadingUpload(false);
        setWholePageLoadingStatus(false);
      }
    }
  };
  return (
    <Box className={classes.profilePostsContainer}>
      <WholePageLoading status={wholePageLoadingStatus} />
      <Box className={classes.newPostBtnWrapper}>
        <Button
          variant="outlined"
          onClick={() => setOpenNewPost(!openNewPost)}
        >
          New Post
        </Button>
      </Box>
      {openNewPost && (
        <Box className={classes.newPostWrapper}>
          {loadingUpload && <Typography>Loading...</Typography>}
          <FormLabel>
            <Input
              type="file"
              className={classes.inputFile}
              onChange={handleFileChange}
            />
            <Box className={classes.browseBtn}>
              <Typography className={classes.browseBtnText}>
                Select
              </Typography>
            </Box>
          </FormLabel>
          {selectedFile && (
            <>
              <Box className={classes.imagePreviewWrapper}>
                <img
                  alt=""
                  src={URL.createObjectURL(selectedFile)}
                  style={{
                    height: '400px',
                    maxWidth: '100%',
                    marginLeft: '50%',
                    transform: 'translateX(-50%)',
                  }}
                />
              </Box>
              <Typography className={classes.selectedFileName}>
                {selectedFile.name}
              </Typography>

              <Box className={classes.inputFieldWrapper}>
                <Typography>Caption</Typography>
                <TextField
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Caption"
                  variant="outlined"
                  className={classes.inputField}
                />
              </Box>
              <Box className={classes.inputFieldWrapper}>
                <Typography>Location</Typography>
                <TextField
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Location"
                  variant="outlined"
                  className={classes.inputField}
                />
              </Box>
              <Box className={classes.uploadBtnWrapper}>
                <Button
                  className={classes.uploadBtn}
                  onClick={handleFileUpload}
                  disabled={!selectedFile}
                >
                  Upload Post
                </Button>
              </Box>
            </>
          )}
        </Box>
      )}
      <Box className={classes.postImageWrapper}>
        {images.length > 0 &&
          images.map((image) => (
            <Box key={image.id} className={classes.imageWrapper}>
              <CardMedia
                image={image.postUrl}
                className={classes.postImage}
              />
              <Box className={classes.imageHoverBox}>
                <Typography className={classes.imageHoverText}>
                  {image.caption}
                </Typography>
              </Box>
            </Box>
          ))}
      </Box>
    </Box>
  );
};

export default ProfilePosts;
