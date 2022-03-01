import React from "react";
import Cloudinary from "../cloudinary/cloudinary";

function Update({ showUpdate, setShowUpdate, userInfo, setUserInfo }) {
  const handleChange = (event) => {
    const { value } = event.target;

    return setUserInfo({ ...userInfo, tagline: value });
  };
  if (!showUpdate) {
    return null;
  }
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">Update User Info</h4>
        </div>
        <div className="modal-body">
          <label>Tagline: </label> <br />
          <input
            name="tagline"
            value={userInfo.tagline}
            onChange={handleChange}
          />
          <Cloudinary setUserInfo={setUserInfo} userInfo={userInfo} />
        </div>
        <div className="modal-footer">
          <button className="button" onClick={() => setShowUpdate(false)}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
export default Update;
