import React from "react";

function Signup({ showSignup, setShowSignup }) {
  if (!showSignup) {
    return null;
  }
  return (
    <div className="signup modal">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">New User Signup</h4>
        </div>
        <div className="modal-body">
          <h3>Username </h3> <br />
          <input name="username" />
          <h3>Password </h3> <br />
          <input name="password" />
        </div>
        <div className="modal-footer">
          <button>Signup</button>
          <button className="button" onClick={() => setShowSignup(false)}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
export default Signup;
