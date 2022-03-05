import React from "react";
import { REMOVE_POST } from "../utils/mutations.js";
import { useMutation } from "@apollo/client";

function MyPosts({ userPosts, username }) {
  const [deletePost] = useMutation(REMOVE_POST);

  const handleDelete = async (username, postId) => {
    const { data } = await deletePost({
      variables: {
        username: username,
        postId: postId,
      },
    });
    window.location.reload();
  };
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
