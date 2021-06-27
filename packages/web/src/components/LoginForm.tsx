/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { DevTool } from "@hookform/devtools";
import { ErrorMessage } from "@hookform/error-message";
import React from "react";
import { useForm } from "react-hook-form";

interface Props {
  onLogin: (formValue: FormValues) => void;
}

export type FormValues = {
  email: string;
  password: string;
};

const LoginForm = ({ onLogin }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>();
  return (
    <div className="leading-loose">
      <DevTool control={control} placement="bottom-left" />
      <form
        onSubmit={handleSubmit(onLogin)}
        className="max-w-sm p-10 m-4 bg-white bg-opacity-25 rounded shadow-xl"
      >
        <p className="text-lg font-medium text-center text-white">LOGIN</p>
        <div>
          <label className="block text-sm text-white" htmlFor="email">
            Email
          </label>
          <input
            className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
            type="email"
            {...register("email", { required: true })}
          />
          <ErrorMessage errors={errors} name="email" />
        </div>
        <div className="mt-2">
          <label className="block text-sm text-white">Password</label>
          <input
            className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
            type="password"
            {...register("password", { required: true })}
          />
          <ErrorMessage errors={errors} name="password" />
        </div>
        <div className="flex items-center justify-between mt-4">
          <button
            className="px-4 py-1 font-light tracking-wider text-white bg-gray-900 rounded hover:bg-gray-800"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
