import type { Post } from "@/types"

export interface GameState {
  currentPost: Post
  goalTag: string
  visitedPostIds: Set<number>
  path: string[]
  isGameOver: boolean
  history: Post[]
  deadEndOptions: Post[] | null
}

export function createInitialState(post: Post, goalTag: string): GameState {
  return {
    currentPost: post,
    goalTag,
    visitedPostIds: new Set([post.id]),
    path: [],
    isGameOver: false,
    history: [post],
    deadEndOptions: null
  }
}

export function applyTagSelection(
  state: GameState,
  newPost: Post,
  selectedTag: string
): GameState {
  // Loop-check: Post already seen?
  if (state.visitedPostIds.has(newPost.id)) {
    // return state
  }

  const hasReachedGoal = newPost.tags.includes(state.goalTag)

  return {
    ...state,
    currentPost: newPost,
    visitedPostIds: new Set(state.visitedPostIds).add(newPost.id),
    history: [...state.history, newPost],
    path: [...state.path, selectedTag],
    isGameOver: hasReachedGoal,
    deadEndOptions: null
  }
}

export const GO_BACK = "go-back-step"

export function goBackOneStep(state: GameState): GameState {
  if (state.history.length <= 1) return state

  const newHistory = state.history.slice(0, -1)
  const previousPost = newHistory[newHistory.length - 1]

  return {
    ...state,
    currentPost: previousPost,
    history: newHistory,
    path: [...state.path, GO_BACK],
    isGameOver: false
  }
}

