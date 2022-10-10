import React from "react";
import { formatRelative } from "date-fns/esm";
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

const RightChat = ({ mess }) => {
  return (
    <div className="w-full mb-4 px-6 flex justify-start">
      <div className="flex items-center">
        <div className="image pr-3">
          <img
            className="w-12 h-12 rounded-full ml-3"
            src={mess.avatar}
            alt=""
          />
        </div>
        <p className="bg-blue-400 mr-3 arrow-right rounded-md py-1 px-2 text-white">
          {mess.caption}
        </p>
        <p className="text-xs text-slate-400 pr-2">
          {formatDate(mess.createAt?.seconds)}
        </p>
      </div>
    </div>
  );
};

export default RightChat;
