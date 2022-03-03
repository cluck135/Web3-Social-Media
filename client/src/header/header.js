import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations.js";
import Signup from "../signup/signup.js";
import Auth from "../utils/auth.js";

function Header({ userInfo, showSignup, setShowSignup }) {
  const [formState, setFormState] = useState({ username: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      username: "",
      password: "",
    });
  };
  const handleLogOut = async () => {
    localStorage.removeItem("id_token");
    window.location.reload();
  };

  return (
    <header className="header">
      <div id="name">
        <h1>WEB 3 Social</h1>
      </div>

      {Auth.loggedIn() ? (
        <ul>
          <li>{userInfo.username}</li>
          <li>{userInfo.posts.length} NFT's Created</li>
          <li>
            <button>Connect Wallet</button>
          </li>
          <li>
            <button onClick={handleLogOut}>Logout</button>
          </li>
        </ul>
      ) : (
        <ul>
          <form onSubmit={handleFormSubmit}>
            <li>
              <input
                type="text"
                name="username"
                placeholder="username"
                onChange={handleChange}
              ></input>
            </li>
            <li>
              <input
                type="password"
                name="password"
                placeholder="password"
                onChange={handleChange}
              ></input>
            </li>
            <li>
              <input type="submit" className="btn" value="Login" />
            </li>
          </form>
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
