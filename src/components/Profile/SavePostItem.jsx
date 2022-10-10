import { Avatar } from "@material-ui/core";
import { useState } from "react";
import Comment from "../Comments/Comment";
import { formatRelative } from "date-fns/esm";

import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";


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
const SavePostItem = ({
  avatar,
  imageURL,
  caption,
  userName,
  id,
  data,
  savedPosts,
  setSavedPosts,
}) => {
  
  const [loading, setLoading] = useState(false);
  const handleDeletePostSaved = async (idPost) => {
    try {
      const savePostRef = doc(db, "favouritePost", idPost.id);
      await deleteDoc(savePostRef);
      const newListPost = savedPosts.filter((post) => post.id !== idPost.id);
      setSavedPosts(newListPost);
      setLoading(true);
    } catch (error) {
      return toast.error(error.message);
    }

    setLoading(false);
    return toast.success("Delete this post successfully");
  };

  return (
    <>
      {!loading && (
        <div className="w-2/4 mx-auto border-main border-2">
          <div className="saved__post__item">
            <div className="flex justify-between items-center">
              <div className="">
                <div className="flex justify-center items-center ">
                  <Link className="pl-2" to={`/profile/${data.userId}`}>
                    <Avatar alt="Remy Sharp" src={avatar} />
                  </Link>
                  <div className="leading-4 pl-2">
                    <Link className="font-bold" to={`/profile/${data.userId}`}>
                      {userName}
                    </Link>
                    <p className="pb-2">
                      {formatDate(data?.createAt?.seconds)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="ml-auto">
                <div className="post__header--more-option">
                  <span
                    className="text-xl cursor-pointer pr-3"
                    style={{ color: "#9835b1" }}
                  >
                    <i className="bx bx-pencil"></i>
                  </span>
                  <span
                    onClick={() => handleDeletePostSaved(data)}
                    className="text-xl cursor-pointer pr-3 text-red-500"
                  >
                    <i className="bx bx-trash"></i>
                  </span>
                </div>
              </div>
            </div>

            <div className="post__image">
              <img src={imageURL} alt="p-1" />
            </div>
            <div className="">
              <div className="mt-2">
                <div className="flex justify-between items-center">
                  <div className="icons-left">
                    <span>
                      <i
                        // style={
                        //   data?.likes && data?.likes.some((p) => p === user.uid)
                        //     ? { color: "#F82C55" }
                        //     : { color: "black" }
                        // }
                        className="text-2xl cursor-pointer bx bxs-heart bx-border"
                      ></i>
                    </span>

                    <span>
                      <i className="text-2xl cursor-pointer bx bx-message-rounded"></i>
                    </span>
                    <span>
                      <i className="text-2xl ml-2 cursor-pointer bx bx-paper-plane"></i>
                    </span>
                  </div>
                  <div className="pr-3">
                    <span>
                      <i className="text-2xl cursor-pointer bx bx-bookmark"></i>
                    </span>
                  </div>
                </div>
                <div className="pl-2">
                  <a href="/#">
                    <span className="font-bold">0</span> lượt
                    thích
                  </a>
                </div>
              </div>
              {/* Username + Caption */}
              <div className="px-2 flex justify-between items-center">
                <div className="">
                  <span className="font-bold">
                    <a href="/#">{userName}</a>
                  </span>
                  &nbsp;
                  <span className="caption">{caption}</span>
                </div>

                <p className="text-slate-500">
                  {formatDate(data?.createAt?.seconds)}
                </p>
              </div>

              <Comment id={data.id} data={data} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SavePostItem;
