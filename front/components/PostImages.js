import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types';
import {PlusOutlined} from '@ant-design/icons';
import ImagesZoom from './imagesZoom';
import { SERVER_URL } from '../constants';


const PostImages = ({images}) => {

    const [showImageZone,setShowImageZone] = useState(false);

    const onZoom = useCallback(()=>{
        setShowImageZone(true);
    },[])

    const onClose = useCallback(()=>{
        setShowImageZone(false);
    },[])

    if(images.length === 1){
        return(
            <>
            <img src={`${SERVER_URL}/${images[0].src}`} alt={images[0].src} style={{maxWidth:"100%"}}  onClick={onZoom}></img>
            {showImageZone && <ImagesZoom images={images} onClose={onClose}/>}
            </>
        )
    }
    if(images.length === 2){
        return(
            <div style={{width:"100%"}}>
            <img src={`${SERVER_URL}/${images[0].src}`} alt={images[0].src} style={{width:"50%",display:"inline-block"}} onClick={onZoom}></img>
            <img src={`${SERVER_URL}/${images[1].src}`} alt={images[1].src} style={{width:"50%",display:"inline-block"}} onClick={onZoom}></img>
            {showImageZone && <ImagesZoom images={images} onClose={onClose}/>}
            </div>
        )
    }
    return (
        <div style={{width:"100%"}}>
            <img src={`${SERVER_URL}/${images[0].src}`} alt={images[0].src} style={{display:"inline-block",width:'50%'}}></img>
            <div style={{display:"inline-block",width:'50%',textAlign:"center",verticalAlign:"middle"}} onClick={onZoom}>
            <PlusOutlined />
                <br/>
                {images.length}개의 사진 더 보기
            </div>
            {showImageZone && <ImagesZoom images={images} onClose={onClose}/>}
        </div>
    )
}

PostImages.protoTypes={
    images:PropTypes.arrayOf(PropTypes.object),
}

export default PostImages
