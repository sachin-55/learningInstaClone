const uploadImage = async (selectedFile) => {
  try {
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('upload_preset', process.env.CLOUDINARY_PRESET);

    const result = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_NAME}/image/upload`,
      {
        method: 'post',
        body: formData,
      },
    );
    const res = await result.json();
    return res;
  } catch (error) {
    console.log(error);
  }
};

export default uploadImage;
