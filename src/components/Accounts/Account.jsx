import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

const Account = ({ data }) => {
  const [follow, setFollow] = useState(false);

  return (
    <>
      <div className="flex mt-3 justify-between items-center">
        <div className="flex items-center flex-1">
          <div className="avatar">
            <Avatar src={data?.avatar} />
          </div>
          <div className="pl-3">
            <h4 className="font-bold">
              {data.nickname}
              <CheckCircleIcon
                style={{
                  fontSize: "14px",
                  marginLeft: "6px",
                  color: "rgb(29, 166, 247)",
                }}
              />
            </h4>
            <p className="">{data.userName}</p>
          </div>
        </div>

        <div onClick={() => setFollow(!follow)} className="text-blue-600 font-semibold cursor-pointer">
          {follow ? "Đang Theo dõi" : "Theo dõi"}
        </div>
      </div>
    </>
  );
};

export default Account;
