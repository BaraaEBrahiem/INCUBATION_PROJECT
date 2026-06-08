import { useParams } from "react-router-dom";

import {
  useGetConversationDetailQuery,
} from "../../../api/endpoints/conversationApi";

import {
  useGetConversationMessagesQuery,
} from "../../../api/endpoints/messageApi";

import useConversationSubscription from "../hooks/useConversationSubscription";

import useMarkConversationRead from "../hooks/useMarkConversationRead";

import ChatWindow from "../components/ChatWindow";

export default function ConversationPage() {
  const { id } = useParams();

  useConversationSubscription(id);

  useMarkConversationRead(id);

  const {
    data: conversation,
    isLoading:
      conversationLoading,
  } =
    useGetConversationDetailQuery(id);

  const {
    data: messagesData,
    isLoading:
      messagesLoading,
  } =
    useGetConversationMessagesQuery({
      conversationId: Number(id),
    });

  if (
    conversationLoading ||
    messagesLoading
  ) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <ChatWindow
        conversation={conversation}
        messages={
          messagesData?.results || []
        }
      />
    </div>
  );
}