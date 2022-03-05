import React from "react";

function PostInfo({ showPostInfo, setShowPostInfo, posts, currentPost }) {
  const post = posts.data.posts[currentPost];
  if (!showPostInfo) {
    return null;
  }
  return (
    <div className="postInfo modal">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">{post.description}</h4>
        </div>
        <div className="modal-body">
          <img src={post.nft.image} alt="" />
        </div>
        <div className="modal-footer">
          <button className="button" onClick={() => setShowPostInfo(false)}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
export default PostInfo;
