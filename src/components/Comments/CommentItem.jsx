import React, { useState } from "react";
import avatar from "../../assets/avatar.jpg";
import { formatRelative } from "date-fns/esm";
import { deleteDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { BiDotsVerticalRounded } from "react-icons/bi";

import { db } from "../../firebase/firebase";
const formatDate = (date) => {
  let formattedDate = "";
  if (date) {
    // Convert the date in words relative to the current date
    formattedDate = formatRelative(new Date(date * 1000), new Date());
    // Uppercase the first letter
    formattedDate =
      formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }
  return formattedDate;
};

const CommentItem = ({ comment, id, user }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleDeleteComment = async () => {
    const Ref = doc(db, "comments", comment.id);
    if (comment.userId === user.uid) {
      try {
        await deleteDoc(Ref);
        setLoading(true);
      } catch (err) {
        alert(err.message);
      }
      return toast.success("Delete this comment successfully");
    } else {
      return toast.error("Delete comment failed");
    } 
  };

  return (
    <>
      {!loading && (
        <div className="flex justify-between items-center">
          <div className="flex justify-start items-center py-2">
            <img
              className="w-10 h-10 rounded-full"
              src={user ? comment?.avatar : avatar}
              alt=""
            />
            <div className="">
              <div className="ml-2">
              <div className=" flex justify-start items-center">
                  <span className="font-bold">{comment.userName}</span>
                  <p className="font-semibold ml-3">{comment?.comment}</p>
                </div>
                <p className=" text-slate-500">
                  {formatDate(comment?.createAt?.seconds)}
                </p>
              </div>
            </div>
          </div>

          <div
            onClick={() => handleDeleteComment(id)}
            className="pr-4 pb-2 font-semibold cursor-pointer"
          >
             {
              comment.userId === user?.uid ? (
                <p>Xoá</p>
              ) : null
             }
          </div>
        </div>
      )}
    </>
  );
};

export default CommentItem;
