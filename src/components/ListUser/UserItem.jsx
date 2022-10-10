
import Avatar from "@material-ui/core/Avatar";
import { Link} from "react-router-dom";


const Account = ({ data }) => {

  return (
    <>
      <div className="flex mt-3 justify-between items-center">
        <div className="flex items-center flex-1">
          <div className="avatar">
            <Avatar src={data?.photoURL} />
          </div>
          <div className="pl-3">
            <h4 className="font-bold">
              {data.nickname}
             
            </h4>
            <p className="">{data?.displayName}</p>
          </div>
        </div>

       <Link to={`/room/${data.id}`}>
          <div className="text-blue-600 font-semibold cursor-pointer">
           Chat
          </div>
       </Link>
      </div>
    </>
  );
};

export default Account;
