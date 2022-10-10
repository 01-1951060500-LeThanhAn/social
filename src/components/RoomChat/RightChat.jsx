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
    <div className="w-full mb-4 px-6 flex justify-end">
      <div className="flex items-center">
      <p className="text-xs text-slate-400 pr-2">
          {formatDate(mess.createAt?.seconds)}
        </p>
        <p className="bg-blue-400  arrow-right rounded-md py-1 px-2 text-white">
          {mess.caption}
        </p>
        <div className="image">
          <img className="w-12 h-12 rounded-full ml-3" src={mess.avatar} alt="" />
        </div>
      </div>
    </div>
  );
};

export default RightChat;
