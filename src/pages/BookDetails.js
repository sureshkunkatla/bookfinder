import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import libraryImage from "../assets/library.jpg";
import LabelValueComp from "../components/LabelValueComp"


const BookDetails = () => {
  const { bookId } = useParams();
  const [bookData, setBookData] = useState({});
  const navigate = useNavigate()
  const selectedBook = useSelector((state) => state.books.selectedBook);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(
          `https://openlibrary.org/works/${bookId}.json`
        );
        const data = await response.json();
        setBookData(data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchBookDetails();
  }, [bookId]);



  return (
    <>
      <div
        className=" h-[100vh] w-full bg-cover bg-no-repeat bg-center relative overflow-hidden"
        style={{
          backgroundImage: `url(${libraryImage})`,
        }}
      ></div>
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="absolute inset-0 flex flex-col h-[100vh] p-5 overflow-hidden">
        <div className="relative flex flex-row justify-between items-center">
          <h1 className="text-[#7ED321] text-3xl font-bold text-left cursor-pointer" onClick={() => navigate('/')}>
            Book Finder
          </h1>
        </div>
        <div className="overflow-y-scroll no-scrollbar">
          <img
            alt={selectedBook.cover_i || selectedBook.cover_id}
            className="w-[200px] ml-auto mr-auto mt-3"
            src={`https://covers.openlibrary.org/b/id/${
              selectedBook.cover_i || selectedBook.cover_id
            }-M.jpg`}
          />
          <p className="text-white text-3xl text-center mt-2 font-semibold">
            {selectedBook.title}
          </p>
          <div className="text-white">
            <LabelValueComp label={'Description'} value={bookData?.description?.value || bookData?.description || "Description Not Available"}/>
            <LabelValueComp label={'Author'} value={(selectedBook?.authors?.[0]?.name) || (selectedBook?.author_name?.[0]) || "Author not available" }/>
            <LabelValueComp label={'Subjects'} value={bookData?.subjects || "Subjects not available"}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookDetails;
