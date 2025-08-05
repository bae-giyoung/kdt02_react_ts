export type completedT = "O" | "X"
export interface Todo {
  "id": string,
  "text": string,
  "completed": completedT
}