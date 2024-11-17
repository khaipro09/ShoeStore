import { env } from "../constants/config";

export const ImageUpload = async (images) => {
  let imgArr = [];
  for (const item of images) {
    const formData = new FormData();
    formData.append("file", item);
    formData.append("upload_preset", env.CLOUD_UPDATE_PRESET);
    formData.append("cloud_name", env.CLOUD_NAME);

    const res = await fetch(env.CLOUD_API, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log(data);
    imgArr.push({ public_id: data.public_id, url: data.secure_url });
  }
  return imgArr;
};
