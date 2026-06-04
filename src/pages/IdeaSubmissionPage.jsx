import IdeaForm from "../components/Forms/IdeaForm";

export default function IdeaSubmissionPage() {
  const handleSuccess = (data) => {
    console.log("Idea submitted:", data);
  };

  return (
    <div className="container mx-auto py-6">
      <IdeaForm
        seasonId={1}
        onSubmit={handleSuccess}
      />
    </div>
  );
}