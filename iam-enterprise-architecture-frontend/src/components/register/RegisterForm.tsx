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
        <Card color="transparent" shadow={false} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} className="p-6 items-center rounded-md border border-gray-500 shadow-xl bg-gray-100">
            <Typography variant="h4" color="blue-gray" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                Sign Up
            </Typography>
            <Typography color="gray" className="mt-1 font-normal" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                Nice to meet you! Enter your details to register.
            </Typography>
            <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                <div className="mb-1 flex flex-col gap-6">
                    <Typography variant="h6" color="blue-gray" className="-mb-3" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
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
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                        crossOrigin={undefined}
                    />
                    <Typography variant="h6" color="blue-gray" className="-mb-3" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
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
                        }} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />
                    <Typography variant="h6" color="blue-gray" className="-mb-3" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
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
                        }} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />
                    <Typography variant="h6" color="blue-gray" className="-mb-3" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
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
                        }} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />
                </div>
                <Checkbox
                    label={<Typography
                        variant="small"
                        color="gray"
                        className="flex items-center font-normal" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                    >
                        I agree the
                        <Modal header="Terms & Conditions" body={termsAndConditionsBody} triggerButton={<a
                            className="font-medium transition-colors hover:text-gray-900"
                        >
                            &nbsp;Terms and Conditions
                        </a>} />
                    </Typography>}
                    checked={termsAgreed}
                    onClick={toggleTerms}
                    containerProps={{ className: "-ml-2.5" }} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />
                <Button className="mt-6 justify-center" fullWidth placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} onClick={handleClick} loading={isLoading}>
                    sign up
                </Button>
                <Typography color="gray" className="mt-4 text-center font-normal" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    Already have an account?{" "}
                    <a onClick={() => navigate("/login")} className="font-medium text-gray-900">
                        Sign In
                    </a>
                </Typography>
            </form>
        </Card>
    );
}