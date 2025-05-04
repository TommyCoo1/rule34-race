import { useCallback } from 'react';

const mockTags = [
  'tentacles', 'catgirl', 'elf', 'maid', 'yuri', 'loli', 'futa', 'bondage',
  'monster_girl', 'schoolgirl_uniform', 'latex', 'milf'
];

// TODO maybe fetch via api new tags? or purely api call without static tags
export function useRandomTags() {
  const getRandomTag = () => mockTags[Math.floor(Math.random() * mockTags.length)];

  const generateTags = useCallback(() => {
    let startTag = getRandomTag();
    let endTag = getRandomTag();
    while (endTag === startTag) endTag = getRandomTag();
    return { startTag, endTag };
  }, []);

  return { generateTags };
}