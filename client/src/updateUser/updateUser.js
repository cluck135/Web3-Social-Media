import React, { useState } from "react";
import Cloudinary from "../cloudinary/cloudinary";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../utils/mutations.js";
import Auth from "../utils/auth";

function Update({ showUpdate, setShowUpdate, userInfo }) {
  const [url, setUrl] = useState("");
  const [update, { error, data }] = useMutation(UPDATE_USER);
  if (!showUpdate) {
    return null;
  }

  const handleUpdate = async (userInfo, newAvatar) => {
    const newTagline =
      document.getElementById("taglineInput").value || userInfo.tagline;
    console.log(newTagline);
    userInfo = { ...userInfo, tagline: newTagline };
    try {
      const { data } = await update({
        variables: {
          username: userInfo.username,
          newTagline: userInfo.tagline,
          newAvatar: url || userInfo.avatar,
        },
      });
      console.log(data);
      window.location.reload();
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
            placeholder={userInfo.tagline}
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
