import React from "react";

interface Props {
  type: "ERROR" | "SUCCESS";
  message: string;
}

const ToastMessage: React.FC<Props> = ({ type, message }) => {
  if (type === "ERROR")
    return (
      <div className="flex items-center w-full max-w-sm mx-auto overflow-hidden text-white bg-red-400 rounded-lg shadow-md">
        <div className="w-10 px-2 border-r">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
            />
          </svg>
        </div>

        <div className="flex items-center px-2 py-3">
          <div className="mx-3">
            <p>{message}</p>
          </div>
        </div>
      </div>
    );

  return (
    <div className="flex items-center w-full max-w-sm mx-auto overflow-hidden text-white bg-green-400 rounded-lg shadow-md">
      <div className="w-10 px-2 border-r">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
          />
        </svg>
      </div>

      <div className="flex items-center px-2 py-3">
        <div className="mx-3">
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default ToastMessage;
