import React, { useEffect } from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
const Profile = () => {
    const router = useRouter();
    const {me} = useSelector((state)=>state.user);

    useEffect(()=>{
        if(!(me && me.id)){
            router.push('/');
        }
    },[me && me.id]);

    if(!me){
        return null;
    }

    return (
        <div>
            <Head>
                <title>내 프로필 | NodeBird</title>
            </Head>
            <AppLayout>
                    <NicknameEditForm />
                    <FollowList name="팔로워" data={me.Followers}/>
                    <FollowList name="팔로잉" data={me.Followings}/>
            </AppLayout>
        </div>
    )
}

export default Profile
