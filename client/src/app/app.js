import React, { useState } from "react";
import Header from "../header/header";
import Footer from "../footer/footer";
import { BrowserRouter as Router, Route } from "react-router-dom";
import UserInfo from "../userInfo/userInfo";
import "../style.css";

function App() {
  const [showUpdate, setShowUpdate] = useState(false);

  const [showSignup, setShowSignup] = useState(false);

  const [userInfo, setUserInfo] = useState({
    username: "default user",
    tagline: "default tagline",
    avatar:
      "https://res.cloudinary.com/hokdebgd8/image/upload/v1641661830/ufvn4j2pqphlqt4eddtb.jpg",
  });

  const [loggedIn, setLoggedIn] = useState(false);
  const toggleLoggedIn = () => {
    setLoggedIn(!loggedIn);
  };

  return (
    <main>
      <Router>
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
          <div className="userProfile">
            <UserInfo
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              setShowUpdate={setShowUpdate}
              showUpdate={showUpdate}
            />
          </div>
        </div>
        <Footer toggleLoggedIn={toggleLoggedIn} />
      </Router>
    </main>
  );
}

export default App;
