export interface Post {
    id: number
    file_url: string
    tags: string
  }
  
  export type GameMode = {
    id: string;
    title: string;
    description: string;
    icon: JSX.Element;
  };
  
  export type TagPair = {
    startTag: string;
    endTag: string;
  };

  type CheckedState = boolean | "indeterminate";