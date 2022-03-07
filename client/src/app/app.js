import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import Header from "../header/header";
import Footer from "../footer/footer";
import UserInfo from "../userInfo/userInfo";
import PostFeed from "../postFeed/postFeed";
import { QUERY_USERS, GET_POSTS } from "../utils/queries";
import "../style.css";
import Auth from "../utils/auth";
import MyPosts from "../myPosts/myPosts";

function App() {
  const [showUpdate, setShowUpdate] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showPostInfo, setShowPostInfo] = useState(false);
  const [userInfo, setUserInfo] = useState({
    username: "default user",
    tagline: "default tagline",
    avatar:
      "https://res.cloudinary.com/hokdebgd8/image/upload/v1641661830/ufvn4j2pqphlqt4eddtb.jpg",
  });  

  const {loading: loadingUsers, data: dataUsers } = useQuery(QUERY_USERS);
  const {loading: loadingPosts, data: dataPosts } = useQuery(GET_POSTS);

  // const setUserInfo = "";
  // if (Auth.loggedIn() && !loading) {
  //   let tempUser = [];
  //   const loggedInUser = Auth.getProfile();
  //   tempUser = data.users.filter((user) => {
  //     return user.username === loggedInUser.data.username;
  //   });
  //   userInfo = tempUser[0];
  // }

  if (loadingUsers, loadingPosts) {
    return (
      <div className="loading">
        <h1>Loading...hold on a sec.</h1>
      </div>
    );
  }



  return (
    // const [userInfo, setUserInfo] = useState({
    //   username: "default user",
    //   tagline: "default tagline",
    //   avatar:
    //     "https://res.cloudinary.com/hokdebgd8/image/upload/v1641661830/ufvn4j2pqphlqt4eddtb.jpg",
    // });

    <main>
      <div id="headerBox">
        <Header
          userInfo={userInfo}
          showSignup={showSignup}
          setShowSignup={setShowSignup}
        />
      </div>
      <div className="mainSection">
        <div className="leftSection">
          <PostFeed
            dataPosts={dataPosts}
            loadingPosts={loadingPosts}
            showPostInfo={showPostInfo}
            setShowPostInfo={setShowPostInfo}
          />
        </div>
        {Auth.loggedIn() ? (
          <div className="rightSection">
            <MyPosts userPosts={userInfo.posts} username={userInfo.username} />
            <div className="userProfile">
              <UserInfo
                userInfo={userInfo}
                setUserInfo={setUserInfo}
                setShowUpdate={setShowUpdate}
                showUpdate={showUpdate}
              />
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <Footer />
    </main>
  );
}

export default App;
