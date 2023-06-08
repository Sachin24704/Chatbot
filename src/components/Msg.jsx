import React from "react";

const Msg = ({ props }) => {
  return (
    <>
      {props.sender === "user" ? (
        <div className="bg-blue-500 whitespace-normal break-words text-white py-2 px-4 rounded-lg">
          <p className="break-words text-right">{props.message}</p>
        </div>
      ) : (
        <div className="bg-blue-500 whitespace-normal text-white py-2 px-4 rounded-lg">
          <p className="break-words text-left">{props.message}</p>
        </div>
      )}
    </>
  );
};

export default Msg;
