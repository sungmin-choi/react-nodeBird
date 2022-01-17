import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Slider from "react-slick";
import { Overlay,Global,SliderWrapper,Indicator,CloseBtn,Header,ImgWrapper } from './styles';
import { SERVER_URL } from '../../constants';

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
                    <img src={`${SERVER_URL}/${image.src}`} alt={image.src} style={{maxWidth:"800px"}}/>
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
