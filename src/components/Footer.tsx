import language from "../assets/images/language.svg";
import arrowDown from "../assets/images/arrow_down.svg";

const Footer = () => {
  return (
    <div className="w-full bg-zinc-900 bg-opacity-75 text-zinc-300 py-16 px-1 mt-16 pt-18">
      <div className="max-w-6xl mx-43">
        <p className="mb-5.5">Questions? Call 000-800-919-1743 (Toll-Free)</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 text-sm">
          <span className="!underline">FAQ</span>
          <span className="!underline">Help Centre</span>
          <span className="!underline">Terms of Use</span>
          <span className="!underline">Privacy</span>
          <span className="!underline">Cookie Preferences</span>
          <span className="!underline">Corporate Information</span>
        </div>

        <div className="relative inline-block mt-7 mb-2">
          <span className="absolute top-1/2 transform -translate-y-1/2 pointer-events-none ml-3">
            <img src={language} alt="" />
          </span>
          <select className="appearance-none text-white bg-black border border-gray-500 rounded-full pl-8 py-[3.2px] pr-7.5 cursor-pointer font-medium">
            <option>English</option>
            <option>French</option>
            <option>Spanish</option>
          </select>
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <img src={arrowDown} alt="" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
