import React from "react";

function Update({ showUpdate, setShowUpdate, userInfo, setUserInfo }) {
  const handleChange = (event) => {
    const { name, value } = event.target;

    return name === "tagline"
      ? setUserInfo({ ...userInfo, tagline: value })
      : setUserInfo({ ...userInfo, avater: value });
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
