import React from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';

const Profile = () => {
    return (
        <div>
            <Head>
                <title>내 프로필 | NodeBird</title>
            </Head>
            <AppLayout>
            <div>내 프로필</div>
            </AppLayout>
        </div>
    )
}

export default Profile
