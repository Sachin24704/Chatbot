import React from "react";

const Msg = ({ props }) => {
  return (
    <>
      {props.isUser === "user" ? (
        <div className="bg-blue-500  text-white py-2 px-4 rounded-lg">
          <p className="text-right">{props.text}</p>
        </div>
      ) : (
        <div className="bg-blue-500  text-white py-2 px-4 rounded-lg">
          <p className="text-left">{props.text}</p>
        </div>
      )}
    </>
  );
};

export default Msg;
