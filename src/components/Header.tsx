import netflix from "../assets/images/netflix_logo.svg";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import arrowDown from "../assets/images/arrow_down.svg";
import language from "../assets/images/language.svg";

const Header = () => {
  const { signout, user } = useAuth();

  return (
    <div className="w-full py-6 px-43.5 flex justify-between items-center">
      <Link to={"/"}>
        <img src={netflix} alt="" width={148} />
      </Link>
      {user && (
        <div>
          <div className="relative inline-block">
            <span className="absolute top-1/2 transform -translate-y-1/2 pointer-events-none ml-3">
              <img src={language} alt="" />
            </span>
            <select className="appearance-none cursor-pointer bg-black text-white font-medium border border-gray-500 rounded-full pl-8 py-[3.2px] pr-7.5">
              <option>English</option>
              <option>French</option>
              <option>Spanish</option>
            </select>
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <img src={arrowDown} alt="" />
            </span>
          </div>
          <button
            className="font-medium bg-white p-1 px-4 ml-3 rounded-full hover:bg-white/70 transition duration-300 cursor-pointer"
            onClick={signout}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
