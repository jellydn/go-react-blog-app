/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";
import { useAtom } from "jotai";
import { navigate, RouteComponentProps } from "@reach/router";

import LoginForm, { FormValues } from "../components/LoginForm";
import logger from "../logger";
import ToastMessage from "../components/ToastMessage";
import { tokenAtom } from "../store";

const Login: React.FC<RouteComponentProps> = () => {
  const [, setToken] = useAtom(tokenAtom);
  const [message, setMessage] = useState<{
    status: "SUCCESS" | "ERROR";
    message: string;
  }>({ status: "ERROR", message: "" });
  const onLogin = async (formValue: FormValues) => {
    logger.warn(formValue);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: "POST",
        body: JSON.stringify(formValue),
        headers: {
          "content-type": "application/json; charset=UTF-8",
        },
      });
      if (response.ok) {
        const result = await response.json();
        logger.warn(result);
        setToken(result.token);
        setMessage({ message: "Login successful!", status: "SUCCESS" });
        navigate("/");
      } else {
        const result = await response.json();
        setMessage({ message: result.message, status: "ERROR" });
      }
    } catch (error) {
      logger.error(error);
    }
  };
  return (
    <div className="h-screen font-sans bg-cover login">
      <div className="grid items-center justify-center grid-cols-1 gap-2">
        {message.message && (
          <ToastMessage message={message.message} type={message.status} />
        )}
      </div>
      <div className="container flex items-center justify-center flex-1 h-full mx-auto">
        <LoginForm onLogin={onLogin} />
      </div>
    </div>
  );
};

export default Login;
