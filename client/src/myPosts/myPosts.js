import React from "react";
import { REMOVE_POST } from "../utils/mutations.js";
import { QUERY_SINGLE_USER } from "../utils/queries.js";
import { useMutation, useQuery} from "@apollo/client";
import Auth from "../utils/auth.js";

function MyPosts({ userInfo, setUserInfo }) {
  const [removePost] = useMutation(REMOVE_POST);

  // const currentUser = Auth.getProfile();
  // const {loading: loadingMe, data: dataMe} = useQuery(QUERY_SINGLE_USER, {variables: {username: currentUser.data.username}});

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
    await setUserInfo({
      user: {               
        ...userInfo.user,   
        posts: [data.addUser.user.username]                 
    }})
  };


  // if (loadingMe) {
  //   <div className="loading"> 
  //     Loading Your Posts Please Wait
  //   </div>
  // }
  return (
    <div className="myPosts">
      <h2>My Posts</h2>

      {userInfo.user.posts.map((post) => {
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
  );
}
export default MyPosts;
