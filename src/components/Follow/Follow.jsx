import React, { useState, useEffect } from "react";

import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import Account from "../Accounts/Account";
import { fetchListUser } from "../../storeActions/userList";
import UserItem from "../ListUser/UserItem";
import { useUserAuth } from "../../AuthContext/userAuthContext";
const Follow = () => {
  const [accounts, setAccounts] = useState([]);
  const [users, setUsers] = useState([]);
  const { user } = useUserAuth();
  useEffect(() => {
    const q = query(collection(db, "follows"), orderBy("createAt", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      setAccounts(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    });

    return () => unsub();
  }, []);

  useEffect(() => {
    async function getListUsers() {
      const data = await fetchListUser();
      setUsers(data);
    }

    getListUsers();
  }, []);

  return (
    <>
      <div className="w-full mt-8 mb-4">
        <div className="flex justify-between items-center">
          <h4 className="font-semibold">Gợi ý cho bạn</h4>
          <p className="font-bold cursor-pointer">Xem tất cả </p>
        </div>
      </div>

      {accounts &&
        accounts.map((account, index) => (
          <Account key={index} data={account} />
        ))}

      <p className="mt-6 font-semibold">Những người liên hệ</p>
      {users.map((account) =>
        account.userId !== user?.uid ? (
          <UserItem key={account.id} data={account} />
        ) : null
      )}
    </>
  );
};

export default Follow;
