import React from "react";
import PostInfo from "../postInfo/postInfo";

function PostFeed({ posts, showPostInfo, setShowPostInfo }) {
  let currentPost = 0;
  if (posts.loading) {
    return (
      <div>
        <h1>Loading Posts</h1>
      </div>
    );
  } else {
    return (
      <div className="postFeed">
        <h2>Newest Posts</h2>
        {posts.data.posts.slice(0, 10).map((post, index) => {
          return (
            <div className="postDiv" key={post._id}>
              <h3>{post.description}</h3>
              <img
                src={post.nft.image}
                alt=""
                onClick={() => {
                  setShowPostInfo(true);
                  currentPost = index;
                }}
              />
            </div>
          );
        })}
        <PostInfo
          showPostInfo={showPostInfo}
          setShowPostInfo={setShowPostInfo}
          currentPost={currentPost}
          posts={posts}
        />
      </div>
    );
  }
}

export default PostFeed;
