import React from "react";
import DefaultCoverImg from "../assets/DefaultBookCover.jpg";

const BookCard = ({book, onClick}) => {
  return (
    <div
      className="bg-white m-auto w-[180px] h-[275px] relative"
      onClick={onClick}
      style={{
        backgroundImage: `url(${
          book.cover_i || book.cover_id
            ? `https://covers.openlibrary.org/b/id/${
                book.cover_i || book.cover_id
              }-M.jpg`
            : DefaultCoverImg
        })`,
        backgroundSize: "cover",
      }}
    >
      <p className="absolute bottom-0 text-white text-center w-full bg-[#000000aa]">
        {book.title.toUpperCase()}
      </p>
    </div>
  );
};

export default BookCard;
