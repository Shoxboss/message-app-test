import { IMessage, WS_MESSAGE_TYPE } from "../../../shared/types";
const messageLimit = Number(process.env.MESSAGE_LIMIT) || 9;

const createMessageService = (limit: number) => {
  let messages: IMessage[] = [];

  const listeners = new Map<
    Number,
    (event: { type: string; message?: IMessage }) => void
  >();

  const addListener = (
    key: number,
    callback: (event: { type: string; message?: IMessage }) => void
  ) => {
    listeners.set(key, callback);
  };

  const removeListener = (key: number) => {
    listeners.delete(key);
  };

  const isFull = () => messages.length >= limit;

  const addNewMessage = (message: IMessage) => {
    if (isFull()) {
      removeOldestMessage();
    }

    messages.push(message);

    listeners.forEach((listener) => {
      listener({ type: WS_MESSAGE_TYPE.ADDED, message });
    });
  };

  const removeOldestMessage = () => {
    const message = messages.shift();
    if (message) {
      listeners.forEach((listener) => {
        listener({ type: WS_MESSAGE_TYPE.REMOVED, message });
      });
    }
  };

  const getMessages = () => messages;

  return {
    isFull,
    addMessage: addNewMessage,
    removeOldestMessage,
    getMessages,
    addListener,
    removeListener,
  };
};

const createMessageServiceFactory = (limit: number) => {
  let instance: ReturnType<typeof createMessageService> | null = null;

  return {
    getInstance: function () {
      if (!instance) {
        instance = createMessageService(limit);
      }
      return instance;
    },
  };
};

export const messageService = createMessageServiceFactory(messageLimit);

export type MessageService = ReturnType<typeof createMessageService>;
