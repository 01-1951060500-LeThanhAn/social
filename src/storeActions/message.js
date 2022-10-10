import { addDoc, collection, getDocs, onSnapshot, orderBy, query, where } from 'firebase/firestore';

import { db } from '../firebase/firebase';

// const useFireStore = (table, index) => {
//   const [messages, setMessages] = useState([])

//   useEffect(() => {
//     const q = query(collection(db, table),  where("id", "==", index));
//     const unsub = onSnapshot(q, (snapshot) => {
//       setMessages(
//         snapshot.docs.map((doc) => ({
//           ...doc.data(),
//           id: doc.id,
//         }))
//       );
//     });
  
//     return () => unsub();
//   }, [table, index]);
//  return {messages, setMessages}
// }

// export default useFireStore
export const fetchmessages = async (id) => {
    try {
      const q = query(collection(db, "message"), where("id", "==", id));
      const querySnapshot = await getDocs(q);
      const messageList = [];
      querySnapshot.forEach((doc) => {
        messageList.push({ ...doc.data(), id: doc.id });
      });
      return messageList;
    } catch (error) {
      console.log(error.message);
    }
  };

  export const postMessages = async (newComment) => {
    try {
      const response = await addDoc(collection(db, "message"), newComment);
      return {
        ...newComment,
        id: response.id,
      };
    } catch (err) {
      alert(err.message);
    }
  };
