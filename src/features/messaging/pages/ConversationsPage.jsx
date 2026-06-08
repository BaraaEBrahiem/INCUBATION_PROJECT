import {
  useGetConversationsQuery,
} from "../../../api/endpoints/conversationApi";

import ConversationList from "../components/ConversationList";

const ConversationsPage = () => {
  const {
    data = [],
    isLoading,
    isError,
    refetch,
  } =
    useGetConversationsQuery("");

  if (isLoading) {
    return (
      <div className="p-6">
        جاري تحميل المحادثات...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6">
        <p>حدث خطأ</p>

        <button
          onClick={refetch}
          className="
            mt-2
            px-4
            py-2
            border
            rounded
          "
        >
          إعادة المحاولة
        </button>
      </div>
    );
  }

  return (
    <div
      className="
        max-w-5xl
        mx-auto
        p-6
      "
    >
      <h1
        className="
          text-2xl
          font-bold
          mb-6
        "
      >
        المحادثات
      </h1>

      <ConversationList
        conversations={data}
      />
    </div>
  );
};

export default ConversationsPage;