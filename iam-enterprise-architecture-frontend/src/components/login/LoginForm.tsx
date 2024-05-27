/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import {
    Card,
    Input,
    Button,
    Typography,
  } from "@material-tailwind/react";
  import { FaEye, FaEyeSlash } from "react-icons/fa";
  import { useState } from "react";
  import { FieldValues, UseFormRegister } from "react-hook-form";
  import { ErrorObject } from "../../types/ErrorObject";
  
  type LoginFormProps = {
    handleClick: () => void;
    isLoading: boolean;
    loginData: UseFormRegister<FieldValues>;
    errors: ErrorObject[];
  };
  
  export default function LoginForm({ handleClick, isLoading, loginData, errors }: LoginFormProps) {
    const [showPassword, setShowPassword] = useState(false);
    const IconComponent = showPassword ? FaEyeSlash : FaEye;
  
    function toggleShowPassword() {
      setShowPassword(!showPassword);
    }
  
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();
      handleClick();
    }
  
    return (
      <Card color="transparent" className="p-6 items-center rounded-md border border-gray-500 shadow-xl bg-gray-100">
        <Typography variant="h4" color="blue-gray">
          Log in
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Email
            </Typography>
            {errors && Array.isArray(errors) && errors.find(error => error.field === 'email')?.message && (
              <span className="text-red-900">
                {errors.find(error => error.field === 'email')?.message}
              </span>
            )}
            <Input
              {...loginData("email")}
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900 bg-white"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>
            {errors && Array.isArray(errors) && errors.find(error => error.field === 'password')?.message && (
              <span className="text-red-900">
                {errors.find(error => error.field === 'password')?.message}
              </span>
            )}
            <Input
              {...loginData("password")}
              type={showPassword === false ? "password" : "text"}
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900 bg-white"
              icon={<IconComponent onClick={toggleShowPassword} />}
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <Button
            className="mt-6 justify-center"
            fullWidth
            variant="gradient"
            loading={isLoading}
            type="submit"
          >
            Log in
          </Button>
        </form>
      </Card>
    );
  }
  