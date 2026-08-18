import TeamCard from "./TeamCard";
import useConversationLauncher from "../features/messaging/hooks/useConversationLauncher";

const CurrentTeamList = ({ members }) => {
  const {
    launchConversation,
    isLoading,
  } = useConversationLauncher();

  return (
    <div className="grid grid-cols-2 gap-6">
      {members.map((m) => (
        <TeamCard
          key={m.user_id}
          name={m.name}
          email={m.email}
          buttonLabel={isLoading ? "جاري الفتح..." : "مراسلة"}
          onButtonClick={() => launchConversation(m.user_id)}
        />
      ))}
    </div>
  );
};

export default CurrentTeamList;