import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import getSongs from "./getSongs";
import { data } from "autoprefixer";

const getSongsByTitle = async (title: string): Promise<Song[]> => {
  const supabaseClient = createServerComponentClient({
    cookies: cookies,
  });

  if (!title) {
    const allSongs = await getSongs();
    return allSongs;
  }

  const { data, error } = await supabaseClient
    .from("songs")
    .select("*")
    .ilike("title", `%${title}%`);

  if (error) {
    console.log(`ERROR GET SONGS BY TITLE ${error}`);
    return [];
  }

  return data || [];
};

export default getSongsByTitle;
