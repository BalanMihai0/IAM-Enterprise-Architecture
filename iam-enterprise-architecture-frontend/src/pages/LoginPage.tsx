/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { useState } from "react";
import { useForm } from "react-hook-form";
import LoginForm from "../components/login/LoginForm";
import { ErrorObject } from "../types/ErrorObject";
import { LoginUserData } from "../types/LoginUserData";
import { z } from "zod";
import MicrosoftLoginButton from "../components/login/MicrosoftLoginButton";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

export default function LoginPage() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ErrorObject[]>();
  const { login } = useAuth();

  async function handleClick(d: unknown) {
    try {
      LoginUserData.parse(d);
      setIsLoading(!isLoading);
      await login("local", {
        email: d.email,
        password: d.password,
      });
      navigate("/");
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(
          error.errors.map((e) => ({
            field: e.path.join("."),
            message: e.message,
          }))
        );
      }
    }
  }

  return (
    <div className="page-center-items flex-col">
      <img
        onClick={() => navigate("/")}
        src="./black-logo-no-bg.png"
        className="pb-5 hover:cursor-pointer"
      />
      <LoginForm
        handleClick={handleSubmit(handleClick)}
        isLoading={isLoading}
        loginData={register}
        errors={errors as ErrorObject[]}
      />
      <MicrosoftLoginButton />
    </div>
  );
}
