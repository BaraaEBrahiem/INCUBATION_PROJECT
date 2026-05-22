import React, { useState } from "react";
import Button from "./Button";

const ApprovalActions = ({ onApprove, onReject }) => {
  const [status, setStatus] = useState("pending");
  const [isLoading, setIsLoading] = useState(false);

  const handleApprove = async () => {
    if (!onApprove || isLoading) return;
    
    try {
      setIsLoading(true);
      await onApprove();
      setStatus("approved"); 
    } catch (error) {
      console.error("فشلت عملية الموافقة:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReject = async () => {
    if (!onReject || isLoading) return;
    
    try {
      setIsLoading(true);
      await onReject(); 
      setStatus("rejected");
    } catch (error) {
      console.error("فشلت عملية الرفض:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-4">

      {status === "pending" && (
        <div className="flex flex-col items-center justify-between">
          <Button
            label={isLoading ? "جاري الحفظ..." : "موافقة"}
            onClick={handleApprove}
            disabled={isLoading}
            className={`${isLoading ? "bg-gray-400" : "bg-main-color"} w-70 mx-2`}
          />

          <Button
            label={isLoading ? "جاري الحفظ..." : "رفض"}
            onClick={handleReject}
            disabled={isLoading}
            className={`${isLoading ? "bg-gray-400" : "bg-main-color"} w-70 mt-4 mx-2`}
          />
        </div>
      )}

      {status === "approved" && (
        <div className="flex items-center justify-center">
          <Button label="تمت الموافقة" className="bg-green-color w-70 mx-2" disabled={true} />
        </div>
      )}

      {status === "rejected" && (
        <div className="flex items-center justify-center">
          <Button label="مرفوض" className="bg-red-color w-70 mx-2" disabled={true} />
        </div>
      )}

    </div>
  );
};

export default ApprovalActions;