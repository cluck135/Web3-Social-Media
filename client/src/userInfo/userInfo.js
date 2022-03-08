import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_USER } from "../utils/queries";
import Auth from "../utils/auth";
import Update from "../updateUser/updateUser";

function UserInfo({userInfo, setUserInfo, showUpdate, setShowUpdate}) {

  const currentUser = Auth.getProfile();
  const {loading: loadingMe, data: dataMe, refetch: refetchUser} = useQuery(QUERY_SINGLE_USER, {variables: {username: currentUser.data.username}});

  useEffect(() => { // re fetches our data after the userinfo has been changed so we get up to date myUser posts
    refetchUser()
  }, [userInfo]);

  const makeActive = () => {
    const accordion = document.querySelector(".accordionContent");
    if (accordion.style.display === "") {
      accordion.style.display = "block";
      accordion.style.height = "0";
      accordion.style.height = "auto";
    } else {
      accordion.style.height = "0";
      accordion.style.display = "";
    }
  };

  if (loadingMe) {
    return (
      <div className="loading">
        <h1>Loading your User Info one sec</h1>
      </div>
    );
  }

  return (
    <div className="accordionItem">
      <button className="accordionBtn" onClick={makeActive}>
        <h1>{dataMe.user.username}</h1>
      </button>
      <div className="accordionContent">
        <ul>
          <li>
            <img src={dataMe.user.avatar} alt="avatar" />
          </li>
          <li>{dataMe.user.tagline}</li>
          <li>
            {dataMe.user.posts[0] ? (
              <img src={dataMe.user.posts[0].nft.image} alt="newest NFT" />
            ) : (
              <h4>No NFT's Minted</h4>
            )}
          </li>
          <button onClick={() => setShowUpdate(true)}>
            Update User Info
          </button>
          <Update
            showUpdate={showUpdate}
            setShowUpdate={setShowUpdate}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
          />
        </ul>
      </div>
    </div>
  );
}

export default UserInfo;
