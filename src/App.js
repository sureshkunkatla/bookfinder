import { Provider } from "react-redux";
import Loader from "./components/Loader";
import { useLoader } from "./context/LoaderContext";
import Home from "./pages/Home";
import store from "./store/store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookDetails from "./pages/BookDetails";
import NoPageFound from "./pages/NoPageFound";


function App() {
  const { loading } = useLoader();

  return (
    <Provider store={store}>
      <Router>
    <div className="relative">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/book-details/:bookId' element={<BookDetails/>}/>
        <Route path='*' element={<NoPageFound/>}/>
      </Routes>
      {loading && (
        <div className="h-[100vh] w-[100vw] absolute z-50 inset-0 bg-[#000000aa] flex flex-row justify-center items-center">
          <Loader />
        </div>
      )}
    </div>
    </Router>
    </Provider>
  );
}

export default App;
