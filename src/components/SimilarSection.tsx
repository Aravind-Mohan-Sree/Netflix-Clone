import { Movie } from "../types";
import { IMG_URL, BASE_URL, API_KEY } from "../constants";
import { useEffect, useState } from "react";
import { Play } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const SimilarSection = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const params = useParams();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/movie/${params.id}/similar?api_key=${API_KEY}`
        );
        const data = await response.json();

        if (data.results) {
          setMovies(data.results);
          window.scroll({ top: 0, behavior: "smooth" });
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [params.id]);

  return (
    <div className="px-30 mt-15">
      <h1 className="text-4xl font-semibold mb-8 text-white">Similar Movies</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {movies.length ? (
          movies.slice(0, 12).map((movie) => (
            <Link to={`/overview/${movie.id}`} key={movie.id}>
              <div className="relative group cursor-pointer">
                <img
                  src={`${IMG_URL}/w300/${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full aspect-[2/3] object-cover rounded transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded">
                  <Play className="w-12 h-12 text-white" />
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="relative group cursor-pointer text-white">
            <p>Nothing to show here!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimilarSection;
