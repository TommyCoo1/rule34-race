import { Skeleton } from "./skeleton";

export function ImageGameSkeleton() {
  return (
    <div className="flex flex-wrap gap-2">
      <Skeleton className="w-full h-72 rounded-md animate-pulse bg-gray-400" />
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton
          key={i}
          className="h-8 w-20 rounded-full animate-pulse bg-gray-400"
        />
      ))}
    </div>
  );
}
