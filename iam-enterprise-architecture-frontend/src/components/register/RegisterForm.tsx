/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";
import 'reactjs-popup/dist/index.css';
import Modal from "../Modal";
import { useNavigate } from "react-router";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { ErrorObject } from "../../types/ErrorObject";

type RegisterFormsProps = {
    handleClick: () => void;
    isLoading: boolean;
    termsAgreed: boolean;
    toggleTerms: () => void;
    registerData: UseFormRegister<FieldValues>;
    errors: ErrorObject[];
};

export default function RegisterForm({ handleClick, isLoading, termsAgreed, toggleTerms, registerData, errors }: RegisterFormsProps) {
    const navigate = useNavigate();
    const termsAndConditionsBody = "Nothing for now :D";
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const PassIconComponent = showPassword ? FaEyeSlash : FaEye;
    const ConfirmPassIconComponent = showConfirmPassword ? FaEyeSlash : FaEye;

    function toggleShowPassword() {
        setShowPassword(!showPassword);
    }

    function toggleShowConfirmPassword() {
        setShowConfirmPassword(!showConfirmPassword);
    }

    return (
        <Card color="transparent" className="p-6 items-center rounded-md border border-gray-500 shadow-xl bg-gray-100">
            <Typography variant="h4" color="blue-gray">
                Sign Up
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
                Nice to meet you! Enter your details to register.
            </Typography>
            <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                <div className="mb-1 flex flex-col gap-6">
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                        Your Name
                    </Typography>
                    {errors && Array.isArray(errors) && errors.find(error => error.field === 'fullName')?.message && (
                        <span className="text-red-900">
                            {errors.find(error => error.field === 'fullName')?.message}
                        </span>
                    )}
                    <Input
                        {...registerData("fullName")}
                        size="lg"
                        placeholder="John Doe"
                        className="!border-t-blue-gray-200 focus:!border-t-gray-900 bg-white"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                    />
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                        Your Email
                    </Typography>
                    {errors && Array.isArray(errors) && errors.find(error => error.field === 'email')?.message && (
                        <span className="text-red-900">
                            {errors.find(error => error.field === 'email')?.message}
                        </span>
                    )}
                    <Input
                        {...registerData("email")}
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
                        {...registerData("password")}
                        type={showPassword === false ? "password" : "text"}
                        size="lg"
                        placeholder="********"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900 bg-white"
                        icon={<PassIconComponent onClick={toggleShowPassword} />}
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                    />
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                        Confirm Password
                    </Typography>
                    {errors && Array.isArray(errors) && errors.find(error => error.field === 'confirmPassword')?.message && (
                        <span className="text-red-900">
                            {errors.find(error => error.field === 'confirmPassword')?.message}
                        </span>
                    )}
                    <Input
                        {...registerData("confirmPassword")}
                        type={showConfirmPassword === false ? "password" : "text"}
                        size="lg"
                        placeholder="********"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900 bg-white"
                        icon={<ConfirmPassIconComponent onClick={toggleShowConfirmPassword} />}
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                    />
                </div>
                <div className="flex flex-row justify-left items-center underline">
                    <Checkbox
                        checked={termsAgreed}
                        onChange={toggleTerms}
                        containerProps={{ className: "-ml-2.5" }}
                    />
                    <Modal header="Terms & Conditions" body={termsAndConditionsBody} triggerButton={
                        <Typography
                            variant="small"
                            color="gray"
                            className="flex items-center font-normal"
                            style={{
                                cursor: "pointer",
                            }}
                        >
                            I agree the terms and conditions
                        </Typography>
                    }
                    />
                </div>
                <Button className="mt-2 justify-center" fullWidth onClick={handleClick} loading={isLoading}>
                    sign up
                </Button>
                <Typography color="gray" className="mt-4 text-center font-normal">
                    Already have an account?{" "}
                    <a onClick={() => navigate("/login")} className="font-medium text-gray-900">
                        Sign In
                    </a>
                </Typography>
            </form>
        </Card>
    );
}