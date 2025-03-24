import React, { useEffect } from "react";
import { XCircle, CheckCircle, AlertCircle, Info } from "lucide-react";

const Toast = ({ message, type = "info", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const toastStyles = {
    success: "bg-green-100 border-green-500 text-green-700",
    error: "bg-red-100 border-red-500 text-red-700",
    warning: "bg-yellow-100 border-yellow-500 text-yellow-700",
    info: "bg-blue-100 border-blue-500 text-blue-700",
  };

  const icons = {
    success: <CheckCircle className="text-green-600" />,
    error: <XCircle className="text-red-600" />,
    warning: <AlertCircle className="text-yellow-600" />,
    info: <Info className="text-blue-600" />,
  };

  return (
    <div
      className={`flex items-center justify-between w-80 px-4 py-3 border-l-4 rounded-lg shadow-md ${toastStyles[type]} fixed top-5 right-5`}
    >
      <div className="flex items-center gap-3">
        {icons[type]}
        <span className="font-medium">{message}</span>
      </div>
      <button onClick={onClose} className="text-gray-600 hover:text-black cursor-pointer">
        ✖
      </button>
    </div>
  );
};

export default Toast;
