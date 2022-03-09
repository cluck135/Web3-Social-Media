import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import Header from "../header/header";
import Footer from "../footer/footer";
import UserInfo from "../userInfo/userInfo";
import PostFeed from "../postFeed/postFeed";
import { QUERY_USERS, GET_POSTS } from "../utils/queries";
import "../style.css";
import Auth from "../utils/auth";
import MyPosts from "../myPosts/myPosts";

function Home({ data, user }) {
  // CHANGE this to be HOME component and make APP componet which is parent of HOme containt a return
  // That displays the loggin for the user if they are not logged in, Then once they are logged in
  // have HOME compnent display, make sure to keep setUserInfo inside of Home Component
  const [showUpdate, setShowUpdate] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showPostInfo, setShowPostInfo] = useState(false);
  const [userInfo, setUserInfo] = useState(
    data.filter((loggedInUser) => loggedInUser.username === user.username)[0]
  );

  const {
    loading: loadingPosts,
    data: dataPosts,
    refetch: refetchPosts,
  } = useQuery(GET_POSTS);

  // const setUserInfo = "";
  // if (Auth.loggedIn() && !loading) {
  //   let tempUser = [];
  //   const loggedInUser = Auth.getProfile();
  //   tempUser = data.users.filter((user) => {
  //     return user.username === loggedInUser.data.username;
  //   });
  //   userInfo = tempUser[0];
  // }

  if (loadingPosts) {
    return (
      <div className="loading">
        <h1>Loading...hold on a sec.</h1>
      </div>
    );
  }

  return (
    <main>
      <div id="headerBox">
        <Header
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          showSignup={showSignup}
          setShowSignup={setShowSignup}
        />
      </div>
      <div className="mainSection">
        <div className="leftSection">
          <PostFeed
            userInfo={userInfo}
            dataPosts={dataPosts}
            loadingPosts={loadingPosts}
            refetchPosts={refetchPosts}
            showPostInfo={showPostInfo}
            setShowPostInfo={setShowPostInfo}
          />
        </div>
        {Auth.loggedIn() ? (
          <div className="rightSection">
            <MyPosts userInfo={userInfo} setUserInfo={setUserInfo} />
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

export default Home;
