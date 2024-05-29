/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { Button } from "@material-tailwind/react";
import microsoftLogo from "../../assets/microsoft.png";
import { useAuth } from "../../context/AuthContext";

const MicrosoftLoginButton = () => {
  const { login } = useAuth();

  const handleSignIn = async () => {
    await login("Microsoft");
  };

  return (
    <div>
      <Button
        color="white"
        size="lg"
        onClick={handleSignIn}
        className="mt-5 flex gap-[12px] items-center border-[1px] border-gray-700 rounded-md text-gray-600"
      >
        <img src={microsoftLogo} className="h-8" />
        <span
          className="font-sans"
          style={{
            fontFamily:
              "Segoe UI, Frutiger, Frutiger Linotype, Dejavu Sans, Helvetica Neue, Arial, sans-serif",
            fontSize: "15px",
            textTransform: "none",
          }}
        >
          Administrator login with Microsoft
        </span>
      </Button>
    </div>
  );
};

export default MicrosoftLoginButton;
