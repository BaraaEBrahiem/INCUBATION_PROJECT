import { useGetMeQuery } from "../api/endpoints/authApi";

const TestMe = () => {
  const { data, error, isLoading } = useGetMeQuery();

  console.log("ME DATA:", data);
  console.log("ME ERROR:", error);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        صار خطأ بجلب بيانات المستخدم
      </div>
    );
  }

  return (
    <div>
      <h2>Current User</h2>

      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
};

export default TestMe;