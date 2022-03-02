import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import Header from "../header/header";
import Footer from "../footer/footer";
import UserInfo from "../userInfo/userInfo";
import { QUERY_SINGLE_USER, QUERY_USERS } from "../utils/queries";
import "../style.css";

function App() {
  const [showUpdate, setShowUpdate] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  // const { loading, data } = useQuery(QUERY_USERS);
  const { loading, data } = useQuery(QUERY_SINGLE_USER, {
    variables: {username: "casen2"}
  });
  const setUserInfo="";
  const userInfo = data?.user || {};

  const [loggedIn, setLoggedIn] = useState(false);
  const toggleLoggedIn = () => {
    setLoggedIn(!loggedIn);
  };

  if (loading) {
    return <div>Loading...</div>
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
            loggedIn={loggedIn}
            userInfo={userInfo}
            showSignup={showSignup}
            setShowSignup={setShowSignup}
          />
        </div>
        <div className="mainSection">
          <div className="leftSection">
            <div>10 newest NFTS</div>
            <button>Make New NFT</button>
          </div>
          {loggedIn ? (
            <div className="userProfile">
              <UserInfo
                userInfo={userInfo}
                setUserInfo={setUserInfo}
                setShowUpdate={setShowUpdate}
                showUpdate={showUpdate}
              />
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <Footer toggleLoggedIn={toggleLoggedIn} />
      </main>
  );
}

export default App;
