export interface IMessage {
  id: string | number;
  content: string;
}

export const WS_MESSAGE_TYPE = {
  ADD: "message:add",
  ADDED: "message:added",
  REMOVE: "message:remove",
  REMOVED: "message:removed",
} as const;

export type WSMessageType = keyof typeof WS_MESSAGE_TYPE;
