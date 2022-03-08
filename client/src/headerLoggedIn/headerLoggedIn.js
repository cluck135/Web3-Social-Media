import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import Auth from "../utils/auth";

import { QUERY_SINGLE_USER } from "../utils/queries";
import Nft from "../nft/nft";


function HeaderLoggedIn({ userInfo, setUserInfo }) {

  const currentUser = Auth.getProfile();
  const { loading: loadingMe, data: dataMe, refetch: refetchHeaderUser } = useQuery(QUERY_SINGLE_USER, {variables: {username: currentUser.data.username}});

  const handleLogOut = async () => {
    localStorage.removeItem("id_token");
    window.location.reload();
  };

  useEffect(() => {
    refetchHeaderUser()
  }, [userInfo]);

  if(loadingMe) {
    return(
      <div className="loading"> 
        Loading User Info Please Wait
      </div>
    )
  }

  return(
    <ul>
    <li>{dataMe.user.username}</li>
    <li>{dataMe.user.posts.length} NFT's Created</li>
    <li>
      <Nft username={userInfo.user.username} userInfo={userInfo} setUserInfo={setUserInfo}/>
    </li>
    <li>
      <button onClick={handleLogOut}>Logout</button>
    </li>
  </ul>
  )

}

export default HeaderLoggedIn;
