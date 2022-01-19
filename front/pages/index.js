import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { LOAD_POSTS_REQUEST } from '../reducers/post';
import {LOAD_MY_INFO_REQUEST} from '../reducers/user';
function Home() {
  const dispatch = useDispatch();

  const { me } = useSelector((state) => state.user);
  const { mainPosts, loadPostsLoading, isLoadPosts, retweetError} = useSelector((state) => state.post);

  useEffect(()=>{
    if(retweetError){
      alert(retweetError);
    }
  },[retweetError]);
  useEffect(()=>{
    dispatch({
      type:LOAD_MY_INFO_REQUEST,
    });
    dispatch({
      type:LOAD_POSTS_REQUEST,
      lastId:0,
    });
  },[]);

  useEffect(()=>{
    const onScroll=()=>{
      const scrollY = window.scrollY;
      const clientHeight = document.documentElement.clientHeight;
      const scrollHeight = document.documentElement.scrollHeight;
      if(scrollY+clientHeight > scrollHeight-300 ){
      if(!loadPostsLoading && isLoadPosts){
        console.log(loadPostsLoading);
        const lastId = mainPosts[mainPosts.length -1]?.id;
        dispatch({
          type:LOAD_POSTS_REQUEST,
          lastId,
        })
      }
    }
    }
    window.addEventListener('scroll',onScroll);
    return ()=> {
      window.removeEventListener('scroll',onScroll);
    }
  },[loadPostsLoading,isLoadPosts,mainPosts]);
  return (
    <div>
      <AppLayout>
        {me && <PostForm />}
        {mainPosts.map((post) => <PostCard key={post.id} post={post} />) }
      </AppLayout>
    </div>
  );
}

export default Home;
