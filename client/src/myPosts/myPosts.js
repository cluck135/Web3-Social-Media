import React, { useEffect } from "react";
import { REMOVE_POST } from "../utils/mutations.js";
import { QUERY_SINGLE_USER } from "../utils/queries.js";
import { useMutation, useQuery} from "@apollo/client";
import Auth from "../utils/auth.js";

function MyPosts({ userInfo, setUserInfo }) {
  const [removePost] = useMutation(REMOVE_POST);

  const currentUser = Auth.getProfile();
  const {loading: loadingMe, data: dataMe, refetch: refetchUser} = useQuery(QUERY_SINGLE_USER, {variables: {username: currentUser.data.username}});

  const handleRemove = async (username, postId) => {
    const { data } = await removePost({
      variables: {
        username: username,
        postId: postId,
      },
    });
    console.log(data);
    const newPosts = userInfo.user.posts.filter(post => {
      if (post._id !== data.removePost._id) {
        return post
      }
    });
    await setUserInfo({ // CHECK THIS make sure the newPosts data is every post but the one that was deleted.
                        // check database to make sure the post got deleted and 
      user: {               
        ...userInfo.user,   
        posts: [newPosts]                 
    }})
  };

  useEffect(() => { // re fetches our data after the userinfo has been changed so we get up to date myUser posts
    refetchUser()
  }, [userInfo]);


  if (loadingMe) {
    return (
      <div className="loading">
        <h1>Loading your posts one sec</h1>
      </div>
    );
  }
  return (
    <div className="myPosts">
      <h2>My Posts</h2>

      {dataMe.user.posts.map((post) => { // Adding dataMe broke it switch to userInfo to fix but it may be inconsistent
        return (
          <div className="postDiv" key={post._id}>
            <h3>{post.description}</h3>
            <img src={post.nft.image} alt="" />
            <button onClick={() => handleRemove(userInfo.user.username, post._id)}>
              Remove Post
            </button>
          </div>
        );
      })}
    </div>
  )
}
export default MyPosts;
