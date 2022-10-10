import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";

import { formatRelative } from "date-fns/esm";
import Comment from "../Comments/Comment";

import { toast } from "react-toastify";
import { useUserAuth } from "../../AuthContext/userAuthContext";

import { deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { addPostPlayList } from "../../storeActions";
import { Link } from "react-router-dom";
import { Box, Modal, TextField, Button } from "@material-ui/core";

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

const Post = ({ data, posts, setPosts }) => {
  const { user } = useUserAuth();
  const [loading, setLoading] = useState(false);
  const [savedPost, setSavedPost] = useState([]);
  const [open, setOpen] = useState(false);
  const [editPost, setEditPost] = useState(data.caption);
  const handleLike = () => {
    const docRef = doc(db, `posts/${data.id}`);

    if (data.likes?.some((p) => p === user.uid)) {
      const unLike = data.likes.filter((p) => p !== user.uid);
      setDoc(docRef, {
        ...data,
        likes: unLike,
      });

      const unLikPost = posts.map((p) => {
        if (p.id === data.id) return { ...data, likes: unLike };
        return p;
      });

      return setPosts(unLikPost);
    }

    setDoc(docRef, {
      ...data,
      likes: [...data.likes, user.uid],
    });

    // const likePostNew = posts.map((p) => {
    //   if (p.id === data.id)
    //     return { ...data, likes: [...data.likes, user.uid] };

    //   return p;
    // });

    // return setPosts(likePostNew);
  };

  const deletePost = async (idPost) => {
    if (window.confirm("Are you want to delete post ?")) {
      const Ref = doc(db, "posts", data.id);
      if (data.userId === user.uid) {
        try {
          await deleteDoc(Ref);
          const newListPost = posts.filter((post) => post.id !== idPost);
          setPosts(newListPost);
          setLoading(true);
        } catch (err) {
          alert(err.message);
        }
        setLoading(false);
        return toast.success("Delete this post successfully");
      } else {
        return toast.error("Delete post failed");
      }
    }
  };

  const handleSavePost = async () => {
    if (savedPost) {
      const postSaved = savedPost.some((item) => item.post.id === data.id);
      if (postSaved) {
        return toast.error("Post already exist");
      }
    }

    setLoading(true);
    const newSavedPost = await addPostPlayList(user.uid, data);
    setSavedPost([...savedPost, newSavedPost]);
    setLoading(false);
    toast.success("Save post success");
  };

  const handleEditPost = async () => {
    const titleRef = doc(db, `posts/${data.id}`);
    if (!editPost.trim()) return toast.error("Please enter title post!");
    try {
      await updateDoc(titleRef, {
        caption: editPost,
      });

      setOpen(false);
      toast.success("Updated title post success");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {!loading && (
        <div className="w-full lg:w-90 2xl:w-90 px-2  mx-auto mt-4 border-2 border-slate-100 ">
          {/* Header -> Username + Avatar + Local */}
          <div className="flex justify-between items-center">
            <div className="">
              <div className="flex justify-center items-center ">
                <Link className="pl-2" to={`/profile/${data.userId}`}>
                  <Avatar alt="Remy Sharp" src={data.avatar} />
                </Link>
                <div className="leading-4 pl-2">
                  <Link className="font-bold" to={`/profile/${data.userId}`}>
                    {data.userName}
                  </Link>
                  <p className="pb-2">{formatDate(data?.createAt?.seconds)}</p>
                </div>
              </div>
            </div>
            <div className="ml-auto">
              {user.uid === data.userId ? (
                <div className="post__header--more-option">
                  <span
                    className="text-xl cursor-pointer pr-3"
                    onClick={() => setOpen(!open)}
                    style={{ color: "#9835b1" }}
                  >
                    <i className="bx bx-pencil"></i>
                  </span>
                  <span
                    className="text-xl cursor-pointer pr-3 text-red-500"
                    onClick={() => deletePost(data.id)}
                  >
                    <i className="bx bx-trash"></i>
                  </span>
                </div>
              ) : null}
            </div>
          </div>
          {/* image */}
          <div className="post__image">
            <img src={data.imageURL} alt="p-1" />
          </div>
          <div className="">
            {/* Group of interactive icons */}
            <div className="mt-2">
              <div className="flex justify-between items-center">
                <div className="icons-left">
                  <span>
                    <i
                      onClick={handleLike}
                      style={
                        data?.likes && data?.likes.some((p) => p === user.uid)
                          ? { color: "#F82C55" }
                          : { color: "black" }
                      }
                      className="text-2xl cursor-pointer bx bxs-heart pr-2"
                    ></i>
                  </span>

                  <span>
                    <i className="text-2xl cursor-pointer bx bx-message-rounded"></i>
                  </span>
                  <span>
                    <i className="text-2xl ml-2 cursor-pointer bx bx-paper-plane"></i>
                  </span>
                </div>
                <div className="pr-3" onClick={handleSavePost}>
                  <span>
                    <i className="text-2xl cursor-pointer bx bx-bookmark"></i>
                  </span>
                </div>
              </div>
              <div className="pl-2">
                <p>
                  <span className="font-bold">{data.likes.length}</span> lượt
                  thích
                </p>
              </div>
            </div>
            {/* Username + Caption */}
            <div className="px-2 py-2 flex justify-between items-center">
              <div className="flex items-center">
                <span className="font-bold">
                  <p>{data.userName}</p>
                </span>
                &nbsp;
                <span className="caption">{data.caption}</span>
              </div>
 
              <p className="text-slate-500">
                {formatDate(data?.createAt?.seconds)}
              </p>
            </div>
            {/* Comments */}

            <Comment id={data.id} data={data} />
          </div>
        </div>
      )}

      <Modal open={open} onClose={() => setOpen(!open)} className="relative">
        <Box className="bg-white w-96 h-48 border-2 border-black text-center absolute top-1/2 left-1/2 -translate-y-2/4 -translate-x-2/4">
          <TextField
            className="px-4 mt-16"
            style={{ width: "100%", marginTop: 40 }}
            variant="outlined"
            name="displayName"
            value={editPost}
            onChange={(e) => setEditPost(e.target.value)}
          />
          <Button
            style={{ marginTop: 30 }}
            variant="outlined"
            onClick={handleEditPost}
          >
            Update Title Post
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default Post;
