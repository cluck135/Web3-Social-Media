import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import Header from "../header/header";
import Footer from "../footer/footer";
import UserInfo from "../userInfo/userInfo";
import { QUERY_SINGLE_USER, QUERY_USERS } from "../utils/queries";
import "../style.css";
import Auth from "../utils/auth";

function App() {
  const [showUpdate, setShowUpdate] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const { loading, data } = useQuery(QUERY_USERS);
  let userInfo = {};

  const setUserInfo = "";
  if (Auth.loggedIn() && !loading) {
    let tempUser = [];
    const loggedInUser = Auth.getProfile();
    tempUser = data.users.filter((user) => {
      return user.username === loggedInUser.data.username;
    });
    userInfo = tempUser[0];
  }

  if (loading) {
    return <div>Loading...</div>;
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
          <div>10 newest NFTS</div>
          <button>Make New NFT</button>
        </div>
        {Auth.loggedIn() ? (
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
      <Footer />
    </main>
  );
}

export default App;
