import { useState } from "react";
import { formatRelative } from "date-fns/esm";
import { Avatar } from "@material-ui/core";
import Comment from "../Comments/Comment";
import { Link } from "react-router-dom";
import { useUserAuth } from "../../AuthContext/userAuthContext";
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

const MyPost = ({ data }) => {
  const { user } = useUserAuth();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="w-full md:w-2/3 lg:w-1/2 mx-auto mt-4 border-2 border-slate-100 ">

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
                <span className="text-xl cursor-pointer pr-3 text-red-500">
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
          <div className="mt-2">
            <div className="flex justify-between items-center">
              <div className="icons-left">
                <span>
                  <i
                    style={
                      data?.likes && data?.likes.some((p) => p === user.uid)
                        ? { color: "#F82C55" }
                        : { color: "black" }
                    }
                    className="text-2xl cursor-pointer bx bxs-heart bx-border"
                  ></i>
                </span>

                <span>
                  <i className="text-2xl cursor-pointer bx bx-message-rounded"></i>
                </span>
                <span>
                  <i className="text-2xl ml-2 cursor-pointer bx bx-paper-plane"></i>
                </span>
              </div>
              <div className="pr-3">
                <span>
                  <i className="text-2xl cursor-pointer bx bx-bookmark"></i>
                </span>
              </div>
            </div>
            <div className="pl-2">
              <a href="/#">
                <span className="font-bold">{data.likes.length}</span> lượt
                thích
              </a>
            </div>
          </div>
          {/* Username + Caption */}
          <div className="px-2 flex justify-between items-center">
            <div className="">
              <span className="font-bold">
                <a href="/#">{data.userName}</a>
              </span>
              &nbsp;
              <span className="caption">{data.caption}</span>
            </div>

            <p className="text-slate-500">
              {formatDate(data?.createAt?.seconds)}
            </p>
          </div>

          <Comment id={data.id} data={data} />
        </div>
      </div>
    </>
  );
};

export default MyPost;
