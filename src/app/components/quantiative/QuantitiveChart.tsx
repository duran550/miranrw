'use client'

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/app/hooks/useAuth';

const QuantitiveChart = () => {
    const [loading, setIsLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        if (!user?.token) {
            console.error('User token is missing');
            setIsLoading(false);
        }
    }, [user]);

    const handleIframeLoaded = () => {
        setIsLoading(false);
    };

    if (!user?.token) {
        return <div></div>;
    }

    return (
        <div>
            {loading && <div>Loading...</div>}
            <iframe
                onLoad={handleIframeLoaded}
                loading="lazy"
                src={`https://dashboard.kaeyros.org/#!/quantitative?token=${user.token}`}
                className="w-full h-screen"
            />
        </div>
    )
}

export default QuantitiveChart;
