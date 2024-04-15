import { useNavigate } from "react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import LoginForm from "../components/login/LoginForm";
import { ErrorObject } from "../types/ErrorObject";
import { LoginUserData } from "../types/LoginUserData";
import { z } from "zod";

export default function LoginPage() {
  const navigate = useNavigate();
  const {register, handleSubmit} = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ErrorObject[]>();

  function handleClick(d: unknown) {
    try {
      LoginUserData.parse(d);
      setIsLoading(!isLoading);
      console.log(d);
      // Handle Data
      navigate("");
  } catch (error) {
      if (error instanceof z.ZodError) {
          setErrors(error.errors.map(e => ({
              field: e.path.join('.'),
              message: e.message,
          })));
      }
  }
  }

  return (
    <div className="page-center-items flex-col">
      <img src="./black-logo-no-bg.png" className="pb-5" />
      <LoginForm handleClick={handleSubmit(handleClick)} isLoading={isLoading} loginData={register} errors={errors as ErrorObject[]} />
    </div>
  );
}