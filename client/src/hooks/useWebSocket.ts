import { useEffect, useState } from "react";

export const useWebSocket = (url: string) => {
  const [socket, setSocket] = useState<WebSocket>();
  useEffect(() => {
    setSocket(new WebSocket(url));
  }, [url]);

  return socket;
};
