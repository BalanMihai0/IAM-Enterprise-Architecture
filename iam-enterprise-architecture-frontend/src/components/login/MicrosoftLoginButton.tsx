/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { useMsal } from "@azure/msal-react";
import { Button } from "@material-tailwind/react";
import { FaMicrosoft } from 'react-icons/fa';
import microsoftLogo from '../../assets/microsoft.png'
import { useNavigate } from "react-router-dom";

const MicrosoftLoginButton = () => {
 const { instance } = useMsal();
 const navigate = useNavigate()

 const handleSignIn = async () => {
    try {
      const loginResponse = await instance.loginPopup({scopes: [`api://${process.env.MSAL_API_CLIENT_ID}/admin`]});

      if (loginResponse) {
        console.log(loginResponse)
        const account = loginResponse.account;
        await instance.setActiveAccount(account);
        navigate("/test")
      }
    } catch (err) {
      console.log('+++ Login error : ', err);
      navigate("/login")
    }
 };

 return (
    <div>
      <Button color="white" size="lg" onClick={handleSignIn} className="mt-5 flex gap-[12px] items-center border-[1px] border-gray-700 rounded-md text-gray-600">
        <img src={microsoftLogo} className="h-8" />
        <span className="font-sans" style={{ fontFamily: 'Segoe UI, Frutiger, Frutiger Linotype, Dejavu Sans, Helvetica Neue, Arial, sans-serif', fontSize: '15px', textTransform: 'none' }}>
          Administrator login with Microsoft
        </span>
      </Button>
    </div>
 );
};

export default MicrosoftLoginButton;
