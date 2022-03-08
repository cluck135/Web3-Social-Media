import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations.js";
import Signup from "../signup/signup.js";
import HeaderLoggedIn from "../headerLoggedIn/headerLoggedIn.js";
import Auth from "../utils/auth.js";

function Header({ userInfo, setUserInfo, showSignup, setShowSignup }) {
  const [formState, setFormState] = useState({ username: "", password: "" });
  const [login] = useMutation(LOGIN_USER);

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
      await setUserInfo({
        user: {
          username: data.login.user.username,
          tagline: data.login.user.tagline,
          posts: data.login.user.posts,
          avatar: data.login.user.avatar             
      }})
    } catch (e) {
      alert("Invalid Username or Password");
      console.error(e);
    }

    // clear form values
    setFormState({
      username: "",
      password: "",
    });
  };


  return (
    <header className="header">
      <div id="name">
        <h1>WEB 3 Social</h1>
      </div>

      {Auth.loggedIn() ? ( // Since useQuery needs a variable from Auth.getProfile() which can only be called when a user 
                          // is logged in, we need to create a new component that only loads if a user is logged in <HeaderLoggedIn />
      <HeaderLoggedIn userInfo={userInfo} setUserInfo={setUserInfo} />
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
            <Signup showSignup={showSignup} setShowSignup={setShowSignup} userInfo={userInfo} setUserInfo={setUserInfo}/>
          </li>
        </ul>
      )}
    </header>
  );
}

export default Header;
