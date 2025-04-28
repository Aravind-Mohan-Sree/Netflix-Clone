import { useRouteError } from "react-router-dom";
import netflix from "../assets/images/netflix_logo.svg";

const Error = () => {
  const error = useRouteError() as Error;

  return (
    <div
      className="w-full h-screen bg-cover bg-center flex flex-col items-center justify-center text-center px-4 text-white"
      style={{
        backgroundImage:
          'radial-gradient(ellipse at center,rgba(0,0,0,.9) 0,rgba(0,0,0,.2) 45%,rgba(0,0,0,.1) 55%,transparent 70%), url("/src/assets/images/bg-lost-in-space.png")',
      }}
    >
      {/* Netflix Logo */}
      <div className="fixed top-0 left-0 w-full p-5.5 pl-10 bg-black">
        <img src={netflix} alt="" width={88} />
      </div>
      <h1 className="text-6xl md:text-7xl font-bold mb-4 pt-13">
        Lost your way?
      </h1>
      {error?.message ? (
        <p className="text-xl md:text-[25px] mb-8 max-w-3xl pt-6">
          {error.message}
        </p>
      ) : (
        <p className="text-xl md:text-[25px] mb-8 max-w-3xl pt-6">
          Sorry, we can't find that page. You'll find lots to explore on the
          home page.
        </p>
      )}
      <button
        className="bg-white text-black px-8 py-2 rounded flex items-center gap-2 font-medium cursor-pointer text-lg hover:bg-gray-200 transition-colors"
        onClick={() => (window.location.href = "/")}
      >
        Netflix Home
      </button>

      {/* From Movie Title */}
      <div className="absolute bottom-10 text-[16px] right-19 text-sm text-gray-400">
        <span className="tracking-[3px] font-thin">FROM </span>
        <span className="text-gray-300 font-bold tracking-wide">
          LOST IN SPACE
        </span>
      </div>
    </div>
  );
};

export default Error;
