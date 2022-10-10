
import { useUserAuth } from "../../AuthContext/userAuthContext";

const Personal = () => {
  const { user } = useUserAuth();

  return (
    <>
      <div className="profile__admin">
        <div className="flex justify-start items-center">
          <div className="">
            <img className="w-16 h-16 rounded-full" src={user?.photoURL} alt="" />
          </div>
          <div className="ml-3">
            <p className="font-bold">{user?.displayName}</p>
            <span className="text-slate-500">{user?.email}</span>
          </div>
        </div>
      </div>

    
    </>
  );
};

export default Personal;
