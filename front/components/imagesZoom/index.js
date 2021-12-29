import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Slider from "react-slick";
import styled,{createGlobalStyle}from 'styled-components';
import { CloseOutlined } from '@ant-design/icons';

const Overlay = styled.div`
    position: fixed;
    z-index:5000;
    top:0;
    left:0;
    right:0;
    bottom:0;
`;

const Header = styled.header`
    height: 44px;
    background: white;
    position:relative;
    padding: 0;
    text-align: center;

    & h2{
        margin: 0;
        font-size:17px;
        color:#333;
        line-height: 44px;
    }


`;

const CloseBtn = styled(CloseOutlined)`
        position: absolute;
        right: 0;
        top: 0;
        padding: 15px;
        line-height: 14px;
        cursor: pointer;
`;

const SliderWrapper = styled.div`
    height: calc(100% -44px);
    background-color: rgba(0, 0, 0, 0.7);

`;

const ImgWrapper  = styled.div`
    padding: 32px;
    text-align:center;

    & img{
        margin: 0 auto;
        max-height: 750px;
    }

`;

const Indicator = styled.div`
    text-align: center;

    & > div{
        width: 75px;
        height: 30px;
        line-height: 30px;
        border-radius: 15px;
        background: #313131;
        display: inline-block;
        text-align: center;
        color: white;
        font-size: 15px;
    }
`;

const Global = createGlobalStyle`
    .slick-slide {
        display: inline-block;
    }
    .ant-card-cover{
        transform: none !important;
    }
    .slick-dots{
        display: none !important;
    }

`;

const ImagesZoom =({images,onClose}) => {
    const [currentSlide,setCurrentSlide] = useState(0);

    return (
        <Overlay>
            <Global />
            <Header>
                <h2>이미지 자세히 보기</h2>
                <CloseBtn onClick={onClose}>X</CloseBtn>
            </Header>
            <SliderWrapper style={{height:"100%"}}>
            <div>
            <Slider 
            initialSlide={0}
            afterChange={(slide)=>setCurrentSlide(slide)}
            infinite={true}
            dots={true}
            speed={500}
            slidesToShow={1}
            slidesToScroll={1}
            arrows={false}
            >
            {images.map((image)=>{
                return(
                <ImgWrapper  key={image.src}>
                    <img src={image.src} alt={image.src} style={{maxWidth:"800px"}}/>
                </ImgWrapper>)
            })}
            </Slider>
            <Indicator>
                <div>
                    {currentSlide +1}
                    {' '}
                    /
                    {images.length}
                </div>
            </Indicator>
            </div>
            </SliderWrapper>
        </Overlay>
    )
}

ImagesZoom.propTypes = {
    images:PropTypes.arrayOf(PropTypes.object).isRequired,
    onClose:PropTypes.func.isRequired
}

export default ImagesZoom
