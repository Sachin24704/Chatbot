import React from "react";

const Msg = ({ props }) => {
  return (
    <>
      {props.sender === "user" ? (
        <div className="bg-blue-500 whitespace-normal text-white py-2 px-4 rounded-lg">
          <p className="text-right">{props.message}</p>
        </div>
      ) : (
        <div className="bg-blue-500 whitespace-normal text-white py-2 px-4 rounded-lg">
          <p className="text-left">{props.message}</p>
        </div>
      )}
    </>
  );
};

export default Msg;
