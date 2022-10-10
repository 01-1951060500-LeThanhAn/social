import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import "../../App.css";
import { v4 as uuidv4 } from "uuid";
import Header from "../Header/Header";
import Post from "../Post/Post";
import { db, storage } from "../../firebase/firebase";
import { FaInstagramSquare } from "react-icons/fa"
import Modal from "@material-ui/core/Modal";
import { Input, Button } from "@material-ui/core";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useUserAuth } from "../../AuthContext/userAuthContext";
import { Spin } from "react-cssfx-loading";
import Follow from "../Follow/Follow";
import Personal from "../Accounts/Personal";
import AccountTrailer from "../Accounts/AccountTrailer";
import { toast } from "react-toastify";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { user } = useUserAuth();
  const [modalStyle] = React.useState(getModalStyle);
  const [loading, setLoading] = useState(false);
  const [openModalUpload, setOpenModalUpload] = useState(false);
  const [image, setImage] = useState("");

  const [caption, setCaption] = useState("");
  const [file, setFile] = useState();

  const handleClickAddNewPost = (childData) => {
    setOpenModalUpload(childData);
  };

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createAt", "desc"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      setPosts(
        querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
      setLoading(true);
    });

    return () => unsub();
  }, []);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    } else {
      setFile(null);
    }

    const preview = URL.createObjectURL(e.target.files[0]);
    setImage(preview);
  };

  useEffect(() => {
    return () => {
      image && URL.revokeObjectURL(image);
    };
  }, [image]);

  useEffect(() => {
   
    setLoading(true);

    const timing = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timing);
  }, []);

  const handleUpload = async () => {

    if(!caption.trim() || !file) {
      return toast.error("Vui lòng thêm ảnh và tiêu đề")
    }
    setLoading(true)

    try {
      const storageRef = ref(storage, `images/${file.name}`);
      await uploadBytesResumable(storageRef, file);
      const url = await getDownloadURL(storageRef);

      await addDoc(collection(db, "posts"), {
        createAt: Timestamp.now(),
        caption: caption,
        avatar: user.photoURL,
        imageURL: url,
        userName: user.displayName,
        id: uuidv4(),
        likes: [],
        follow: [],
        userId: user.uid,
      });
      
      setLoading(false);
     toast.success("Tạo post thành công")
      setImage(null);
      setCaption("");
      setOpenModalUpload(false);
    } catch (err) {
      setLoading(false);
      setImage(null);
      setCaption("");
      setOpenModalUpload(false);
    }
  };

  return (
    <>
      <Header handleClickAddNewPost={handleClickAddNewPost} />
      <div className="container_main lg:px-0 2xl:px-16">
        <div className="Post__list">
          <div className="fake_account">
            <AccountTrailer />
          </div>

          {posts.map((post) => (
            <Post posts={posts} setPosts={setPosts} key={post.id} data={post} />
          ))}
        </div>
        <div className="profile pr-14 lg:pr-0 2xl:pr-16">
          <Personal />
          <Follow />
        </div>
      </div>
      <Modal open={openModalUpload} onClose={() => setOpenModalUpload(false)}>
        <div style={modalStyle} className="form__upload">
          <form className="form__signup">
          <div className="flex items-center">
              <div className="text-4xl text-orange-600">
                <FaInstagramSquare />
              </div>
              <p className="ml-2 font-semibold ">FakeIg App</p>
            </div>
           
            <div className="form__group">
              <Input
                className="form__field"
                placeholder="Enter a caption"
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
            </div>
            <div className="form__group">
              <label
                style={{ fontSize: "25px", cursor: "pointer" }}
                htmlFor="upload-image"
              >
                <i className="bx bx-upload"></i>
              </label>
              <input
                className="form__field"
                id="upload-image"
                hidden
                type="file"
                onChange={handleChange}
              />
              {image && (
                <img
                  style={{ width: "100%", height: "100px", objectFit: "cover" }}
                  src={image}
                  alt=""
                />
              )}
            </div>

            <Button
              style={{
                marginTop: "30px",
                width: "100%",
                padding: "12px",
                cursor: "pointer",
                backgroundColor: "#45aaf2",
                color: "white",
                fontSize: "16px",
                border: "none",
                fontWeight: 600,
              }}
              onClick={handleUpload}
            >
              {
                loading ? (
                  <Spin color="#FF0000" width="40px" height="40px" />
                ) : (
                  <p>Loading</p>
                )
              }
            </Button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default Home;
