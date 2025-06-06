import { Post } from '@/types';
import Image from 'next/image';

function BlurImage({ post, blur }: { post: Post; blur?: boolean }) {
  return (
    <Image
      src={post.file_url}
      alt="Bild"
      width={800}
      height={600}
      className={`mx-auto my-4 max-h-144 object-contain rounded ${
        blur ? "blur-3xl" : ""
      }`}
      // Optionale Props ..
    />
  );
}

export { BlurImage };