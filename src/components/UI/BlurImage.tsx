'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Post } from '@/types';
import { Skeleton } from './skeleton';

interface BlurImageProps {
  post: Post;
  blur?: boolean;
  width?: number;
  height?: number;
}

export function BlurImage({
  post,
  blur = false,
  width = 800,
  height = 600,
}: BlurImageProps) {
  const [loaded, setLoaded] = useState(false);
  // Berechne paddingBottom in Prozent für das Seitenverhältnis
  const paddingBottom = (height / width) * 100 + '%';

  return (
    <div
      className="relative mx-auto my-4 w-full overflow-hidden rounded-md"
      style={{ paddingBottom }}
    >
      {/* Skeleton und Image liegen übereinander */}
      {!loaded && (
        <div className="absolute inset-0">
          <Skeleton className="w-full h-full animate-pulse bg-gray-400" />
        </div>
      )}

      <div className="absolute inset-0">
        <Image
          src={post.file_url}
          alt="Bild"
          width={800}
          height={600}
          className={`${blur ? 'blur-3xl' : ''} transition-opacity duration-300 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoadingComplete={() => setLoaded(true)}
          onError={() => setLoaded(true)}
        />
      </div>
    </div>
  );
}
