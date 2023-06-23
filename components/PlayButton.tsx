import usePlayer from "@/hooks/usePlayer";
import { FaPause, FaPlay } from "react-icons/fa";

export const PlayButton = () => {
  const player = usePlayer();

  return (
    <button className="transition opacity-0 rounded-full flex items-center bg-green-500 p-4 drop-shadow-md translate-y-1/4 group-hover:opacity-100 group:hover:translate-y-0 hover:scale-110">
      {!player.activeId ? (
        <FaPlay className="text-black" />
      ) : (
        <FaPause className="text-black" />
      )}
    </button>
  );
};
