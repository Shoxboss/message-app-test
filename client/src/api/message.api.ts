export const fetchMessages = async () => {
  const response = await fetch("http://localhost:3001/api/messages");
  return response.json();
};

export const createMessage = async (content: string) => {
  const response = await fetch("http://localhost:3001/api/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content }),
  });
  return response.json();
};
