import { useParams } from "react-router-dom";

import ConversationsPage from "./ConversationsPage";

import ConversationPage from "./ConversationPage";

export default function MessagesPage() {
  const { id } = useParams();

  if (id) {
    return (
      <ConversationPage />
    );
  }

  return (
    <ConversationsPage />
  );
}