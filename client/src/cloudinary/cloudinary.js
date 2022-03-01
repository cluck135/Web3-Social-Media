import React, { useState } from "react";

const Cloudinary = ({ userInfo, setUserInfo }) => {
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  const uploadImage = () => {
    const data = new FormData();

    data.append("file", image);
    data.append("upload_preset", "userImage");
    data.append("cloud_name", "hokdebgd8");

    fetch("  https://api.cloudinary.com/v1_1/hokdebgd8/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setUserInfo({ ...userInfo, avatar: data.url });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        ></input>
        <button onClick={uploadImage}>Upload</button>
      </div>
      <div>
        <h1>Uploaded image will be displayed here</h1>
        <img src={userInfo.avatar} alt="New Avatar" />
      </div>
    </div>
  );
};
export default Cloudinary;
