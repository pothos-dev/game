export type ServerEvent =
  | { type: "user connected"; playerName: string }
  | { type: "user disconnected"; playerName: string }
  | { type: "chat message"; message: string; playerName: string }

export type ClientEvent = { type: "connect"; sessionId: string; playerName: string }
