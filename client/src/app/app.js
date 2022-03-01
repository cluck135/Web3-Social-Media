import React, { useState } from "react";
import Header from "../header/header";
import Footer from "../footer/footer";
import UserInfo from "../userInfo/userInfo";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import "../style.css";

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

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
    <ApolloProvider client={client}>
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
    </ApolloProvider>
  );
}

export default App;
