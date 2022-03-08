import React, { useState } from "react";
import Cloudinary from "../cloudinary/cloudinary";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../utils/mutations.js";

function Update({ showUpdate, setShowUpdate, userInfo, setUserInfo }) {
  const [url, setUrl] = useState("");
  const [update] = useMutation(UPDATE_USER);
  if (!showUpdate) {
    return null;
  }

  const handleUpdate = async (userInfo, newAvatar) => {
    const newTagline =
      document.getElementById("taglineInput").value || userInfo.user.tagline;
    console.log(newTagline);
    await setUserInfo({
      user: {               
        ...userInfo.user,   
        tagline: newTagline,
        avatar: url               
    }})
    try {
      const { data } = await update({
        variables: {
          username: userInfo.user.username,
          newTagline: newTagline || userInfo.user.tagline,
          newAvatar: url || userInfo.user.avatar,
        },
      });
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">Update User Info</h4>
        </div>
        <div className="modal-body">
          <label>Tagline: </label> <br />
          <input
            type="text"
            id="taglineInput"
            name="tagline"
            placeholder={userInfo.user.tagline}
          />
          <Cloudinary userInfo={userInfo} url={url} setUrl={setUrl} />
        </div>
        <div className="modal-footer">
          <button
            className="button"
            onClick={() => {
              setShowUpdate(false);
              handleUpdate(userInfo);
            }}
          >
            Save and Close
          </button>
        </div>
      </div>
    </div>
  );
}
export default Update;
