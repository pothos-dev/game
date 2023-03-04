export type ServerEvent =
  | { type: "user connected" }
  | { type: "user disconnected" }
  | { type: "chat message"; message: string; playerName: string }

export type ClientEvent = { type: "connect"; playerName: string }
