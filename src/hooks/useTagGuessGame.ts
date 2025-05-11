import { Post } from "@/types";
import { useState } from "react";

export function useTagGuessGame() {
    const defaultTagCount = 3;
    const maxLives = 10;
  
    const [lives, setLives] = useState(maxLives);
    const [round, setRound] = useState(0);
    const [targetTags, setTargetTags] = useState<string[]>([]);
    const [guessList, setGuessList] = useState<string[]>([]);
    const [post, setPost] = useState<Post | null>(null);
    const [options, setOptions] = useState<string[]>([]);

    const onSelectTag = (tag: string) => {}
  
    return { lives, post, guessList, targetTags, options, onSelectTag, round };
  }