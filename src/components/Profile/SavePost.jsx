import { useEffect, useState } from "react";

 
import {
  collection,
  
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

import { db } from "../../firebase/firebase";

import SavePostItem from "./SavePostItem";
const FavouriteMovie = () => {
  const [savedPosts, setSavedPosts] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const q = query(
      collection(db, "favouritePost"),
      orderBy("createAt", "desc")
    );
    const unsub = onSnapshot(q, (querySnapshot) => {
      setSavedPosts(
        querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    });

    return () => unsub();
  }, []);

  return (
    <>
      {!loading && (
        <div className="saved_posts">
          <div className="saved_posts">
            {savedPosts.length > 0 ? ( 
              savedPosts &&
              savedPosts.map((savePost) => (
                <SavePostItem
                  savedPosts={savedPosts}
                  setSavedPosts={setSavedPosts}
                  data={savePost}
                  key={savePost.id}
                  id={savePost.post?.id}
                  imageURL={savePost.post?.imageURL}
                  avatar={savePost.post?.avatar}
                  userName={savePost.post?.userName}
                  caption={savePost.post?.caption}
                  createAt={savePost.post?.createAt?.seconds}
                />
              ))
            ) : (
              <h3
                style={{
                  color: "#333",
                }}
              >
                No favourite Movies
              </h3>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FavouriteMovie;
