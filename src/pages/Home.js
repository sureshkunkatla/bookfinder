import { useRef, useState } from "react";
import libraryImage from "../assets/library.jpg";
import { motion } from "framer-motion";
import { subjects } from "../data/subjects";
import BookCard from "../components/BookCard";
import Button from "../components/Button";
import { useLoader } from "../context/LoaderContext";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setBooks, resetBooks, setSelectedBook } from "../store/bookSlice";

function Home() {
  const [focused, setFocused] = useState(false);
  const [search, setSearch] = useState("");
  const [offset, setOffset] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [subject, setSubject] = useState();
  const [currentPath, setCurrentPath] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.books);
  const { startLoading, stopLoading } = useLoader();
  const inputRef = useRef();

  const fetchBooksData = async (path) => {
    startLoading();
    const getBooksData = await fetch(
      `https://openlibrary.org/${path}&&limit=10&&offset=${offset}`
    );
    const data = await getBooksData.json();
    if (data?.docs?.length > 0 || data?.works?.length > 0) {
      dispatch(setBooks([...(data.docs || data.works)]));
      setOffset(offset + 10);
    }
    stopLoading();
  };

  const onClickBook = (clickedBook) => {
    const id = clickedBook?.key.split('/')[2]
    dispatch(resetBooks())
    dispatch(setSelectedBook(clickedBook))
    navigate(`/book-details/${id}`)
  }

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
          <h1 className="text-[#7ED321] text-3xl font-bold text-left">
            Book Finder
          </h1>
          <motion.div
            className="absolute right-0 top-0 border border-white cursor-pointer bg-[#000000aa] z-10"
            initial={{ width: "auto", height: "auto" }}
            animate={{ width: isExpanded ? "200px" : "auto" }}
            transition={{ duration: 0.5 }}
            onClick={() => setIsExpanded(true)}
          >
            <div className="flex flex-row justify-between items-center pl-1 pr-3">
              <p className="text-white text-base p-1 sm:text-lg md:text-xl lg:text-xl xl:text-xl">
                Subjects
              </p>
              {isExpanded && (
                <div
                  onClick={(e) => [e.stopPropagation(), setIsExpanded(false)]}
                >
                  <svg width="15px" height="15px" viewBox="0 0 24 24">
                    <path
                      d="M20 20L4 4.00003M20 4L4.00002 20"
                      stroke="#ffffff"
                      strokeWidth={2}
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              )}
            </div>
            {isExpanded && <hr className="ml-2 mr-2" />}
            {isExpanded && (
              <ul>
                {subjects.map((each) => {
                  return (
                    <li
                      key={each.name}
                      className="text-white text-sm p-1 hover:bg-white hover:text-black"
                      onClick={(e) => [
                        dispatch(resetBooks([])),
                        setSubject(each.name),
                        setSearch(""),
                        setOffset(0),
                        fetchBooksData(each.endpoint),
                        setCurrentPath(each.endpoint),
                        e.stopPropagation(),
                        setIsExpanded(false),
                      ]}
                    >
                      {each.name}
                    </li>
                  );
                })}
              </ul>
            )}
          </motion.div>
        </div>
        <motion.div
          className={`flex-grow flex flex-col justify-${
            focused || subject ? "start" : "center"
          } items-${focused || subject ? "start" : "center"}`}
        >
          {
            <>
              <p
                className={`text-white sm:text-[30px] md:text-[36px] lg:text[48px] ${
                  (focused || subject) && "hidden"
                }`}
              >
                {"ARE YOU SEARCHING FOR A BOOK ?"}
              </p>
              {subject && (
                <div className="flex flex-row justify-center items-center">
                  <p className="text-white text-base sm:text-xl md:text-2xl lg:text-3xl">
                    {subject}
                  </p>
                  <Button
                    onClick={() => [
                      setFocused(false),
                      dispatch(resetBooks([])),
                      setSearch(""),
                      setSubject(),
                    ]}
                    title={"Quit"}
                  />
                </div>
              )}
              <div
                className={`flex flex-row justify-${
                  focused ? "start" : "center"
                } items-center`}
              >
                {!subject && (
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs h-[40px] p-3 bg-transparent border border-white outline-none text-white"
                    ref={inputRef}
                    onFocus={() => setFocused(true)}
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                  />
                )}
                {(focused || subject) && (
                  <div className="ml-4 flex flex-row items-center">
                    {!subject && (
                      <>
                        <Button
                          onClick={() => [
                            dispatch(resetBooks([])),
                            fetchBooksData(`search.json?title=${search}`),
                            setCurrentPath(`search.json?title=${search}`),
                          ]}
                          title={"Search"}
                        />
                        <Button
                          onClick={() => [
                            setFocused(false),
                            dispatch(resetBooks([])),
                            setSearch(""),
                          ]}
                          title={"Quit"}
                        />
                      </>
                    )}
                  </div>
                )}
              </div>
            </>
          }
          {(focused || subject) && (
            <div className="no-scrollbar h-[85vh] overflow-y-scroll w-full">
              <>
                <div
                  className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-4 `}
                >
                  {books?.length > 0 &&
                    books.map((each) => {
                      return <BookCard key={each.key} book={each} onClick={() => onClickBook(each)}/>;
                    })}
                </div>
                {books?.length > 0 && (
                  <div className="grid gird-cols-1">
                    <div className="flex flex-col justify-center items-center">
                      <Button
                        onClick={() => fetchBooksData(currentPath)}
                        title={"Load More"}
                      />
                    </div>
                  </div>
                )}
              </>
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
}

export default Home;
