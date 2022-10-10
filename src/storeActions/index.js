import { async } from "@firebase/util";
import {
  collection,
  addDoc,
  where,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  doc,
  Timestamp,
  getDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../firebase/firebase";

export const postComment = async (newComment) => {
  try {
    const response = await addDoc(collection(db, "comments"), newComment);
    return {
      ...newComment,
      id: response.id,
    };
  } catch (err) {
    alert(err.message);
  }
};

export const fetchComments = async (id) => {
  try {
    const q = query(collection(db, "comments"), where("id", "==", id));
    const querySnapshot = await getDocs(q);
    const commentList = [];
    querySnapshot.forEach((doc) => {
      commentList.push({ ...doc.data(), id: doc.id });
    });
    return commentList;
  } catch (error) {
    console.log(error.message);
  }
};

export const handleDeleteComment = async (id) => {
  try {
    const docRef = doc(db, `comments/${id}`);
    await deleteDoc(docRef);

    toast.success("Delete this comment successfully");
  } catch (err) {
    toast.error(err.message);
  }
};

export const addPostPlayList = async (uid, post) => {
  try {
    const data = {
      uid,
      post: {
        id: post.id,
        caption: post.caption,
        imageURL: post.imageURL,
        avatar: post.avatar,
        userName: post.userName,
      },
      createAt: Timestamp.now(),
    };

    const res = await addDoc(collection(db, "favouritePost"), data);

    return { ...data, id: res.id };
  } catch (error) {
    return toast.error(error.message);
  }
};

export const fetchMyPost = async (uid) => {
  try {
    const q = query(
      collection(db, "posts"),
      where("userId", "==", uid),
      orderBy("createAt", "desc")
    );

    const postList = [];

    const querySnap = await getDocs(q);

    querySnap.forEach((doc) => {
      postList.push({ ...doc.data(), id: doc.id });
    });

    return postList;
  } catch (error) {
    toast.error(error.message);
  }
};

export const getProfile = async (uid) => {
  try {
    const userRef = doc(db, `users/${uid}`);

    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      return { ...docSnap.data(), id: docSnap.id };
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};