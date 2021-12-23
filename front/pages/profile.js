import React from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';
const Profile = () => {
    const followerList = [{nickname:'zerocho'},{nickname:'nicolas'},{nickname:'ellie'}];
    const folloingList = [{nickname:'zerocho'},{nickname:'nicolas'},{nickname:'ellie'}];
    return (
        <div>
            <Head>
                <title>내 프로필 | NodeBird</title>
            </Head>
            <AppLayout>
                    <NicknameEditForm />
                    <FollowList name="팔로워" data={followerList}/>
                    <FollowList name="팔로잉" data={folloingList}/>
            </AppLayout>
        </div>
    )
}

export default Profile
