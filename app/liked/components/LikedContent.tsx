"use client";

import { useUser } from "@/hooks/useUser";
import { Song } from "@/types";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { LikedButton } from "@/components/LikedButton";
import { MediaItem } from "@/components/MediaItem";
import useOnPlay from "@/hooks/useOnPlay";

interface LikedContent {
  songs: Song[];
}

export const LikedContent: React.FC<LikedContent> = ({ songs }) => {
  const router = useRouter();
  const onPlay = useOnPlay(songs);

  const { isLoading, user } = useUser();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [isLoading, user, router]);

  if (songs.length === 0) {
    return (
      <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
        No Liked Songs!
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-2 w-full p-6">
      {songs.map((song) => (
        <div key={song.id} className="flex items-center gap-x-4 w-full ">
          <div className="flex-1">
            <MediaItem onClick={(id: string) => onPlay(id)} data={song} />
          </div>
          <LikedButton
            songAuthor={song.author}
            songId={song.id}
            songTitle={song.title}
          />
        </div>
      ))}
    </div>
  );
};
