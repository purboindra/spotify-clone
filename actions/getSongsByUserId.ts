import { Song } from "@/types";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getSongsByUserId = async (): Promise<Song[]> => {
  const supabase = createServerActionClient({
    cookies: cookies,
  });

  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  if (sessionError) {
    console.log(`ERROR GET SONG BY USER ID SESSION ERROR ${sessionError}`);
    return [];
  }

  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .eq("user_id", sessionData.session?.user.id)
    .order("created_at", { ascending: false });
  if (error) {
    console.log(`ERROR GET SONG BY USER ID ${error.message}`);
    return [];
  }
  return (data as any) || [];
};

export default getSongsByUserId;
