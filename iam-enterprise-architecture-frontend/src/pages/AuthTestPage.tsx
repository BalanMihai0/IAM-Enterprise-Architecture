/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { getTokenResponse } from '../authService';
import { useNavigate } from 'react-router';
import { useMsal } from '@azure/msal-react';

const AuthTestPage: React.FC = () => {
    const navigate = useNavigate();
    const [tokenResponse, setTokenResponse] = useState({ loading: true, data: null });
    const { instance } = useMsal();

    useEffect(() => {
        const fetchToken = async () => {
            setTokenResponse(prevState => ({ ...prevState, loading: true }));
            const loginData = await getTokenResponse("admin");
            setTokenResponse({ loading: false, data: loginData });
        };

        if (instance) {
            fetchToken();
        }
    }, [instance]);
    return (
        <div>
            {tokenResponse.loading ? (
                <div>Loading...</div>
            ) : tokenResponse.data === null ? (
                <div>
                    <div>Please Login!</div>
                    <div className='underline font-bold cursor-pointer' onClick={() => navigate("/login")}>Login Here!</div>
                </div>
            ) : (
                <div>
                    <div className='mb-5'>Access token: {tokenResponse.data.accessToken}</div>
                    <div>Scope: {tokenResponse.data.scopes[0]}</div>
                </div>
            )}
        </div>
    );
};

export default AuthTestPage;
