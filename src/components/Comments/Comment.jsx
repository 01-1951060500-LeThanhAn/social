import React, { useState, useEffect } from "react";
import { fetchComments, postComment } from "../../storeActions";
import Picker from "emoji-picker-react";
import { Timestamp } from "firebase/firestore";

import { useUserAuth } from "../../AuthContext/userAuthContext";

import CommentItem from "./CommentItem";
import { toast } from "react-toastify";

const Comment = ({ id }) => {
  const { user } = useUserAuth();
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const [showPicker, setShowPicker] = useState(false);

  const onEmojiClick = (event, emojiObject) => {
    setNewComment((prevInput) => prevInput + emojiObject.emoji);
    setShowPicker(false);
  };

  const handlePostComment = async (e) => {
    e.preventDefault();
    if (!user) {
      return;
    }
    if (newComment.length === 0) {
      return toast.warning("Vui lòng điền bình luận")
    }
    
    const res = await postComment({
      id: id,
      userId: user.uid,
      userName: user.displayName,
      avatar: user.photoURL,
      comment: newComment,
      createAt: Timestamp.now(),
    });

    setComments([...comments, res]);
    setLoading(false);
    setNewComment("");
  };

  useEffect(() => {
    async function getComment() {
      const data = await fetchComments(id);
      setComments(data);
    }

    getComment();
  }, [id]);

  return (
    <>
      {comments &&
        comments.map((comment) => (
          <CommentItem 
            user={user}
            data={comments}
            id={comment.id}
            key={comment.id}
            comment={comment}
            comments={comments}
            setComments={setComments}
          />
        ))}

      {/* input field for comment */}
      <div className="relative">
        <form className="flex justify-between items-center" onSubmit={handlePostComment}>
          <span style={{cursor: "pointer"}} onClick={() => setShowPicker(!showPicker)}>
            <i className="bx bx-smile text-xl cursor-pointer"></i>
          </span>
          <input
            className="w-full ml-1 outline-none"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            type="text"
            placeholder="Thêm bình luận..."
          />
          {showPicker && (
            <Picker
              pickerStyle={{
                width: "300px",
                position: "absolute",
                bottom: "100%",
                zIndex: "10",
                
              }}
              onEmojiClick={onEmojiClick}
            />
          )}
          <button className="btn btn-post-comment text-blue-600 font-semibold cursor-pointer">Đăng</button>
        </form>
      </div>
    </>
  );
};

export default Comment;
