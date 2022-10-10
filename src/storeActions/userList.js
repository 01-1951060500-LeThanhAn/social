import { collection, getDocs, query } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../firebase/firebase";

export const fetchListUser = async () => {
  try {
    const q = query(collection(db, "users"));
    const listUser = [];
    const querySnap = await getDocs(q);
    querySnap.docs.map((doc) => {
      listUser.push({ ...doc.data(), id: doc.id });
    });

    return listUser
  } catch (error) {
    toast.error(error.message)
  }
};
