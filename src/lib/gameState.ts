import type { Post } from "@/types"

export interface GameState {
  currentPost: Post
  goalTag: string
  visitedPostIds: Set<number>
  path: string[]
  steps: number // TODO maybe remove this and use path.length instead
  isGameOver: boolean
}

export function createInitialState(post: Post, goalTag: string): GameState {
  return {
    currentPost: post,
    goalTag,
    visitedPostIds: new Set([post.id]),
    path: [],
    steps: 0,
    isGameOver: false
  }
}

export function applyTagSelection(state: GameState, newPost: Post, selectedTag: string): GameState {
  const hasReachedGoal = newPost.tags.includes(state.goalTag)
  return {
    ...state,
    currentPost: newPost,
    visitedPostIds: state.visitedPostIds.add(newPost.id),
    path: [...state.path, selectedTag],
    steps: state.steps + 1,
    isGameOver: hasReachedGoal
  }
}
