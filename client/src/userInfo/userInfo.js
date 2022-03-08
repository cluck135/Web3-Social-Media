import React from "react";
import Update from "../updateUser/updateUser";

function userInfo(props) {
  const { username, avatar, tagline, posts } = props.userInfo.user;
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
  return (
    <div className="accordionItem">
      <button className="accordionBtn" onClick={makeActive}>
        <h1>{username}</h1>
      </button>
      <div className="accordionContent">
        <ul>
          <li>
            <img src={avatar} alt="avatar" />
          </li>
          <li>{tagline}</li>
          <li>
            {posts[0] ? (
              <img src={posts[0].nft.image} alt="newest NFT" />
            ) : (
              <h4>No NFT's Minted</h4>
            )}
          </li>
          <button onClick={() => props.setShowUpdate(true)}>
            Update User Info
          </button>
          <Update
            showUpdate={props.showUpdate}
            setShowUpdate={props.setShowUpdate}
            userInfo={props.userInfo}
            setUserInfo={props.setUserInfo}
          />
        </ul>
      </div>
    </div>
  );
}

export default userInfo;
