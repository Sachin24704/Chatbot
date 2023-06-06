import React from "react";

const Msg = ({ props }) => {
  return (
    <>
      {props.sender === "user" ? (
        <div className="bg-blue-500  text-white py-2 px-4 rounded-lg">
          {props.msg}
        </div>
      ) : (
        <div className="bg-blue-500  text-white py-2 px-4 rounded-lg">
          {props.msg}
        </div>
      )}
    </>
  );
};

export default Msg;
