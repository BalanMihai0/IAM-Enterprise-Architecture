import RegisterForm from "../components/register/RegisterForm";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RegisterUserData } from "../types/RegisterUserData";
import Swal from "sweetalert2";
import { z } from "zod";
import { ErrorObject } from "../types/ErrorObject";
import { registerUser } from "../api/AxiosAuthentication";
import { useNavigate } from "react-router";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const { register, handleSubmit } = useForm();
  const [errors, setErrors] = useState<ErrorObject[]>();
  const navigate = useNavigate();

  async function handleClick(d: unknown) {
    if (!termsAgreed) {
      Swal.fire({
        icon: "error",
        title: "Whoops...",
        text: "You must agree to the terms and conditions first!",
      });
    } else {
      try {
        RegisterUserData.parse(d);
        setIsLoading(!isLoading);
        await registerUser(d);
        navigate("/login");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (error instanceof z.ZodError) {
          setErrors(
            error.errors.map((e) => ({
              field: e.path.join("."),
              message: e.message,
            }))
          );
        } else if (
          error.response.data.message === "User with this email already exists"
        ) {
          Swal.fire({
            icon: "error",
            title: "Whoops...",
            text: error.response.data.message + "!",
          });
          setIsLoading(false);
        }
      }
    }
  }

  function toggleTerms() {
    setTermsAgreed(!termsAgreed);
  }

  return (
    <div className="page-center-items flex-col">
      <img src="./black-logo-no-bg.png" className="pb-5" />
      <RegisterForm
        handleClick={handleSubmit(handleClick)}
        isLoading={isLoading}
        termsAgreed={termsAgreed}
        toggleTerms={toggleTerms}
        registerData={register}
        errors={errors as ErrorObject[]}
      />
    </div>
  );
}
