import React from "react";
import Signup from "../signup/signup.js";

function Header({ loggedIn, userInfo, showSignup, setShowSignup }) {
  return (
    <header className="header">
      <div id="name">
        <h1>WEB 3 Social</h1>
      </div>

      {loggedIn ? (
        <ul>
          <li>{userInfo.username}</li>
          <li># of NFT's Made</li>
          <li>
            <button>Connect Wallet</button>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <input type="text" placeholder="username"></input>
          </li>
          <li>
            <input type="text" placeholder="password"></input>
          </li>
          <li>
            <button>Log In</button>
          </li>
          <li>
            <button onClick={() => setShowSignup(true)}>Signup</button>
            <Signup showSignup={showSignup} setShowSignup={setShowSignup} />
          </li>
        </ul>
      )}
    </header>
  );
}

export default Header;
