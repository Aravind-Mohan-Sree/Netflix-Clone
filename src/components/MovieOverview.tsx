import { Info, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_KEY, BASE_URL, IMG_URL, YT_URL } from "../constants";
import { Movie, Video } from "../types";
import ReactPlayer from "react-player";
import { toast } from "react-toastify";

const MovieOverview = () => {
  const [movie, setMovie] = useState<Movie | undefined>(undefined);
  const [isPlaying, setIsPlaying] = useState(false);
  const [src, setSrc] = useState("");
  const params = useParams();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/movie/${params.id}?api_key=${API_KEY}`
        );
        const data = await response.json();

        setMovie(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovie();
  }, [params.id]);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/movie/${params.id}/videos?api_key=${API_KEY}`
        );
        const data = await response.json();

        const video = data.results.find(
          (video: Video) => video.site === "YouTube"
        );

        setIsPlaying(false);
        setSrc(`${YT_URL}/${video?.key}`);
      } catch (error) {
        console.error("Error fetching video:", error);
      }
    };

    fetchVideo();
  }, [params.id]);

  const playVideo = () => {
    if (src.includes("undefined"))
      return toast.info("Video is unavailable!", {
        theme: "dark",
        position: "bottom-right",
      });

    setIsPlaying(true);
    window.scroll({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative h-screen w-full">
      {(!isPlaying || src.includes("undefined")) && (
        <>
          <div className={`absolute inset-0`}>
            <img
              src={`${IMG_URL}/w1280/${movie?.backdrop_path}`}
              alt="Hero Background"
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>
          </div>

          <div className={`relative pt-[30vh] px-4 md:px-16`}>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white">
              {movie?.title}
            </h1>
            <p className="text-lg max-w-3xl mb-8 text-white">
              {movie?.overview}
            </p>
            <div className="flex space-x-4">
              <button
                className="flex items-center px-8 py-2 bg-white text-black rounded hover:bg-white/80 cursor-pointer"
                onClick={playVideo}
              >
                <Play className="w-6 h-6 mr-2" />
                Play
              </button>
              <button className="flex items-center px-8 py-2 bg-gray-500/70 text-white rounded hover:bg-gray-500/50 cursor-pointer">
                <Info className="w-6 h-6 mr-2" />
                More Info
              </button>
            </div>
          </div>
        </>
      )}

      {isPlaying && !src.includes("undefined") && (
        <div className="relative w-full h-full">
          <ReactPlayer
            url={src}
            className=""
            controls={true}
            muted={true}
            onPlay={() => window.scroll({ top: 0, behavior: "smooth" })}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
            width="100%"
            height="100%"
          />

          <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black to-transparent pointer-events-none"></div>

          <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
        </div>
      )}
    </div>
  );
};

export default MovieOverview;
