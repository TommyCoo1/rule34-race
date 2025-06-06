import { Post } from "@/types";
import { useEffect, useState } from "react";

import popularTags from "../data/popularTags.json";
import { fetchPostByTagViaProxy } from "./useRule34Api";

export function useTagGuessGame() {
  const defaultTagCount = 3;
  const maxLives = 4;

  const [lives, setLives] = useState(maxLives); // TODO set to a another gamestate
  const [round, setRound] = useState(0);
  const [targetTags, setTargetTags] = useState<string[]>([]);
  const [post, setPost] = useState<Post | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [correctGuesses, setCorrectGuesses] = useState<string[]>([]);
  const [wrongGuesses, setWrongGuesses] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [countCorrectGuesses, setCountCorrectGuesses] = useState(0);


  const fetchNextPost = async () => {
    setLoading(true);
    try {

    const otherTagsToChoose = popularTags
      .sort(() => Math.random() - 0.5)
      .slice(0, 300);

    const res = await fetchPostByTagViaProxy('');
    const data = await res;

    const available = data.tags.split(" ");
    const count = Math.min(defaultTagCount, available.length, 5);

    const selected = available
      .slice()
      .sort(() => Math.random() - 0.5)
      .slice(0, count);

    // const sampleSize = Math.min(popularTags.length, 50);
    // const sampledPopular = shuffle(popularTags).slice(0, sampleSize);

    const options = Array.from(new Set([...otherTagsToChoose, ...available])); // change order

    setTargetTags(selected);
    setCorrectGuesses([]);
    setWrongGuesses([]);
    setPost({ id: data.id, file_url: data.file_url, tags: data.tags });
    setOptions(options);
    }
    catch (error) {
      console.error("Error fetching post :c ", error);
      setPost(null);
    } finally {
      setRound((r) => r + 1);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNextPost();
  }, []);

  const onSelectTag = (tag: string) => {
    if (
      correctGuesses.includes(tag) ||
      wrongGuesses.includes(tag)   ||
      !post
    ) return;
  
    if (post.tags.includes(tag)) {
      setCorrectGuesses(prev => [...prev, tag]);
      setCountCorrectGuesses(prev => prev + 1);
      if (correctGuesses.length + 1 === targetTags.length) {
        setCorrectGuesses([]);
        setWrongGuesses([]);
        fetchNextPost();
      }
    } else {
      setWrongGuesses(prev => [...prev, tag]);
      setLives(prev => prev - 1);
    }
  };
  

  return { lives, post, correctGuesses, wrongGuesses, targetTags, options, onSelectTag, round , loading, countCorrectGuesses};
}
