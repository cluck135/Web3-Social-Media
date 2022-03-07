import React from "react";
import { REMOVE_POST } from "../utils/mutations.js";
import { QUERY_SINGLE_USER } from "../utils/queries.js";
import { useMutation, useQuery} from "@apollo/client";
import Auth from "../utils/auth.js";

function MyPosts({ userPosts, username }) {
  const [deletePost] = useMutation(REMOVE_POST);

  const currentUser = Auth.getProfile();
  const {loading: loadingMe, data: dataMe} = useQuery(QUERY_SINGLE_USER, {variables: {username: currentUser.username}});

  const handleDelete = async (username, postId) => {
    const { data } = await deletePost({
      variables: {
        username: username,
        postId: postId,
      },
    });
    console.log(data);
    window.location.reload();
  };

  if (loadingMe) {
    <div className="loading"> 
      Loading Your Posts Please Wait
    </div>
  }
  return (
    <div className="myPosts">
      <h2>My Posts</h2>

      {userPosts.map((post) => {
        return (
          <div className="postDiv" key={post._id}>
            <h3>{post.description}</h3>
            <img src={post.nft.image} alt="" />
            <button onClick={() => handleDelete(username, post._id)}>
              Delete Post
            </button>
          </div>
        );
      })}
    </div>
  );
}
export default MyPosts;
