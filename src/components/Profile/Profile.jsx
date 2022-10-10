import {
  Box,
  Button,

  Modal,
  Tab,
  TextField,
  
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useUserAuth } from "../../AuthContext/userAuthContext";
import Header from "../Header/Header";
import { FiSettings } from "react-icons/fi";

import TabConText from "@material-ui/lab/TabContext";
import TabPanel from "@material-ui/lab/TabPanel";
import TabList from "@material-ui/lab/TabList";
import SavePost from "../Profile/SavePost";
import "react-loading-skeleton/dist/skeleton.css";
import { fetchMyPost, getProfile } from "../../storeActions";
import { useParams } from "react-router-dom";
import MyPost from "./MyPost";
import {
  
  doc,
 
  setDoc,
  updateDoc,
 
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { toast } from "react-toastify";
import Helmet from "../Helmet/Helmet";
import { updateProfile } from "firebase/auth";
const tabStyles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};


const Profile = () => {
  const { user, setUser } = useUserAuth();
  const [value, setValue] = useState("1");
  const [myPost, setMyPost] = useState([]);
  const [profile, setProfile] = useState({});
  const [open, setOpen] = useState(false);
  
  const { id } = useParams();
  console.log(id);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    async function getMyPost(uid) {
      const data = await fetchMyPost(uid);

      setMyPost(data);
    }

    getMyPost(id);
  }, [id]);

  useEffect(() => {
    async function fetchProfile() {
      const data = await getProfile(id);

      setProfile(data);
    }

    fetchProfile(id);
  }, [id]);

  const handleFollower = async () => {
    let followRef = doc(db, `users/${profile.id}`);
    try {
      if (profile.follower.some((item) => item === user.uid)) {
        const newProfile = profile.follower.filter((item) => item !== user.uid);
        setDoc(followRef, {
          ...profile,
          follower: newProfile,
        });

        setProfile({ ...profile, follower: newProfile });
      } else {
        const ProfileNew = [...profile.follower, user.uid];
        updateDoc(followRef, {
          follower: ProfileNew,
        });

        setProfile({ ...profile, follower: ProfileNew });
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleUpdateProfile = async () => {
    
    try {
     
      await updateProfile(user, {
        displayName: profile.displayName
      })
      setProfile(profile)
      setUser({ ...user, displayName: profile.displayName });
      setOpen(false);
      toast.success("Updated profile success")
    } catch (error) {
      toast.error(error.message)
    }
  };

  

  return (
    <>
      <Header />
      <Helmet title={profile.displayName} />
      <div className="mt-24">
        <div className="lg:flex-row flex flex-col text-center justify-center items-center">
          <div className="">
            <img className="w-36 h-36 rounded-full " src={profile?.photoURL} alt="" />
          </div>

          <div className="flex justify-center flex-col">
            <div className="lg:flex-row flex align-items-center justify-start flex-col">
              <h2 className="font-bold">{profile?.email}</h2>
              <div className="flex items-center">
                {user?.uid === id ? (
                  <Button variant="outlined" onClick={() => setOpen(!open)}>
                    Edit Profile
                  </Button>
                ) : (
                  <Button variant="outlined" onClick={handleFollower}>
                    {profile.follower &&
                    profile.follower.some((fol) => fol === user?.uid)
                      ? "Followed"
                      : "Follow"}
                  </Button>
                )}

                <div className="ml-8">
                  <FiSettings />
                </div>
              </div>
            </div>
            <div className=" mt-3 md:mt-0 lg:mt-0 flex align-items-center justify-center">

              <p className="pr-4">
                <span className="font-bold">{myPost.length}</span> bài viết
              </p>
              <p className="pr-4">
                <span>{profile?.follower?.length}</span> người theo dõi
              </p>
              <p>
                Đang theo dõi <span>0</span>
              </p>
            </div>
            <div className="">
              <h4 className="font-bold text-2xl">{profile?.displayName}</h4>
            </div>
          </div>
        </div>
      </div>
 
      <Box
        style={{ marginTop: "30px" }}
        sx={{ width: "100%", typography: "body1" }}
      >
        <TabConText value={value}>
          <Box
            style={tabStyles}
            sx={{ borderBottom: 1, borderColor: "divider" }}
          >
            <TabList onChange={handleChange}>
              <Tab label="Bài viết" value="1" />
              <Tab label="Đã lưu" value="2" />
              <Tab label="Được gắn thẻ" value="3" />
            </TabList>
          </Box>
          <TabPanel style={{ textAlign: "center" }} value="1">
            <>
              {myPost.length > 0 &&
                myPost.map((mypost) => (
                  <MyPost key={mypost.id} data={mypost} />
                ))}
            </>
          </TabPanel>
          <TabPanel style={{ textAlign: "center" }} value="2">
            <SavePost />
          </TabPanel>
          <TabPanel style={{ textAlign: "center" }} value="3">
            Item Three
          </TabPanel>
        </TabConText>
      </Box>

      <div> 
        <Modal
          open={open}
          onClose={() => setOpen(!open)}
          className="relative"
     
        >
          <Box
         className="bg-white w-96 h-48 border-2 border-black text-center absolute top-1/2 left-1/2 -translate-y-2/4 -translate-x-2/4"
          >
            <TextField
           className="px-4 mt-16"
              style={{ width: "100%", marginTop: 40 }}
              variant="outlined"
              name="displayName"
              value={profile?.displayName}
              onChange={(e) => setProfile({...profile, [e.target.name]: e.target.value})}
            />
            <Button
              style={{ marginTop: 30 }}
              variant="outlined"
              onClick={handleUpdateProfile}
            >
              Update Profile
            </Button>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default Profile;
