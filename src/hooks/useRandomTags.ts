import { useCallback } from 'react';
import popularTags from "../data/popularTags.json";
// const mockTags = [
//   'tentacles', 'catgirl', 'elf', 'maid', 'yuri', 'futa', 'bondage',
//   'monster', 'school_uniform', 'latex', 'milf'
// ];
// TODO maybe fetch via api new tags? or purely api call without static tags
export function useRandomTags() {
  // const getRandomTag = () => mockTags[Math.floor(Math.random() * mockTags.length)];
  // const getRandomTag = () => popularTags[Math.floor(Math.random() * popularTags.length)];
  const getRandomTag = () => {
    const limitedTags = popularTags.slice(0, 200);
    return limitedTags[Math.floor(Math.random() * limitedTags.length)];
  };

  const generateTags = useCallback(() => {
    let startTag = getRandomTag();
    let endTag = getRandomTag();
    while (endTag === startTag) endTag = getRandomTag();
    return { startTag, endTag };
  }, []);

  return { generateTags };
}