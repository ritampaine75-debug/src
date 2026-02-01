export const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);
  
  const url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`;
  
  try {
    const res = await fetch(url, { method: "POST", body: formData });
    const data = await res.json();
    if (data.success) {
      return data.data.url;
    } else {
      throw new Error("Image upload failed");
    }
  } catch (error) {
    console.error("ImgBB Error:", error);
    throw error;
  }
};
