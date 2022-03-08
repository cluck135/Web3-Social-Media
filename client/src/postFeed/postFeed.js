import React, {useEffect, useState} from "react";
import PostInfo from "../postInfo/postInfo";

function PostFeed({ userInfo, dataPosts, loadingPosts, refetchPosts, showPostInfo, setShowPostInfo }) {
  const [currentPost, setCurrentPost] = useState(0)
  useEffect(() => {
    refetchPosts()
  }, [userInfo]);

  if (loadingPosts) {
    return (
      <div>
        <h1>Loading Posts</h1>
      </div>
    );
  } else {
    return (
      <div className="postFeed">
        <h2>Newest Posts</h2>
        {dataPosts.posts.slice(0, 10).map((post, index) => {
          return (
            <div className="postDiv" key={post._id}>
              <h3>{post.description}</h3>
              <img
                src={post.nft.image}
                alt=""
                onClick={() => {
                  setShowPostInfo(true);
                  setCurrentPost(index);
                }}
              />
            </div>
          );
        })}
        <PostInfo
          showPostInfo={showPostInfo}
          setShowPostInfo={setShowPostInfo}
          currentPost={currentPost}
          dataPosts={dataPosts}
        />
      </div>
    );
  }
}

export default PostFeed;
