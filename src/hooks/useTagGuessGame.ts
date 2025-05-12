import { Post } from "@/types";
import { useEffect, useState } from "react";

import popularTags from "../data/popularTags.json";

export function useTagGuessGame() {
  const defaultTagCount = 3;
  const maxLives = 10;

  const [lives, setLives] = useState(maxLives);
  const [round, setRound] = useState(0);
  const [targetTags, setTargetTags] = useState<string[]>([]);
  const [guessList, setGuessList] = useState<string[]>([]);
  const [post, setPost] = useState<Post | null>(null);
  const [options, setOptions] = useState<string[]>([]);

  const shuffle = <T>(arr: T[]): T[] =>
    [...arr].sort(() => Math.random() - 0.5);

  const fetchNextPost = async () => {
    const res = await fetch("/api/rule34?random=1");
    const dataArray = (await res.json()) as Post[];
    const data = dataArray[0];

    const available = data.tags.split(" ");
    const count = Math.min(defaultTagCount, available.length, 5);

    const selected = available
      .slice()
      .sort(() => Math.random() - 0.5)
      .slice(0, count);

    const sampleSize = Math.min(popularTags.length, 50);
    const sampledPopular = shuffle(popularTags).slice(0, sampleSize);

    const pool = Array.from(new Set([...available, ...sampledPopular]));

    setTargetTags(selected);
    setGuessList([]);
    setPost({ id: data.id, file_url: data.file_url, tags: data.tags });
    setOptions(pool);
    setRound((r) => r + 1);
  };

  useEffect(() => {
    fetchNextPost();
  }, []);

  const onSelectTag = (tag: string) => {
    if (guessList.includes(tag) || !post) return;
    if (post.tags.includes(tag)) {
      setGuessList((prev) => [...prev, tag]);
      if (guessList.length + 1 === targetTags.length) fetchNextPost();
    } else {
      setLives((prev) => prev - 1);
    }
  };

  return { lives, post, guessList, targetTags, options, onSelectTag, round };
}
