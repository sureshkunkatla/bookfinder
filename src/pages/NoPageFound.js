import { useNavigate } from "react-router-dom";
import libraryImage from "../assets/library.jpg";
import Button from "../components/Button";

const NoPageFound = () => {

  const navigate = useNavigate()

  return (
    <>
      <div
        className=" h-[100vh] w-full bg-cover bg-no-repeat bg-center relative overflow-hidden"
        style={{
          backgroundImage: `url(${libraryImage})`,
        }}
      ></div>
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="absolute inset-0 flex flex-col h-[100vh] p-5 overflow-hidden justify-center items-center">
        <p className="text-white text-3xl text-bold mb-4">Page Not Found</p>
        <Button title="Navigate To Home" onClick={() => navigate('/')}></Button>
      </div>
    </>
  );
};

export default NoPageFound;
