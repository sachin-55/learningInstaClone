const file = e.currentTarget.files[0];

const formData = new FormData();
const url = process.env.API_URL;
const token = localStorage.getItem('jwtToken');

const config = {
  headers: {
    'content-type': 'multipart/form-data',
    authorization: `Bearer ${token}`,
  },
};
formData.append('file', file);

axios
  .post(`${url}/api/blogs/uploadImage`, formData, config)
  .then((response) => {
    console.log(response);

    if (response.data.status === 'success') {
    } else {
      return alert('failed to upload file');
    }
  });
