import React from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../constexts/AuthContext';
import { IonLoading } from '@ionic/react';

export const AuthGuard: React.FC<{ children: React.ReactNode}> = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <IonLoading isOpen={true} message="กำลังตรวจสอบ"></IonLoading>
    }
    
    if (!user) {
        return <Redirect to="/login"></Redirect>
    }

    return <>{children}</>
}

export const PublicRoute: React.FC<{ children: React.ReactNode}> = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) return null;

    if (user) {
        return <Redirect to="/tabs/tab1"/>
    }

    return <>{children}</>
}