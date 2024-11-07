import React from "react";

const Button = ({ onClick, title }) => {
  return (
    <button
      onClick={onClick}
      className="bg-[#7ED321] ml-2 pl-2 pr-2 pt-1 pb-1 rounded-[5px] max-w-[200px]"
    >
      {title}
    </button>
  );
};

export default Button;
