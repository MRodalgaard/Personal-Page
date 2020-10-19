import * as React from 'react';
import { useContext } from 'react';
import {
  ImageProps,
  LazyImage,
  LazyImageRenderPropArgs,
  RefArg,
} from 'react-lazy-images';
import styled from 'styled-components';
import backgroundColorsImg from '../../assets/img/background-colors.jpg';
import backgroundLowImg from '../../assets/img/background-low.jpg';
import backgroundImg from '../../assets/img/background.jpg';
import { AppBackground } from '../../util/constants';
import AppContext from '../App/AppContext';

const Img = styled.img`
  height: 100%;
  width: 100%;
  position: fixed;
  z-index: -1;
  object-fit: cover;

  animation-duration: 4s;
  animation-fill-mode: both;
`;

const ImgFadeIn = styled(Img)`
  animation-name: fadeIn;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }
`;

const ImgFadeOut = styled(Img)`
  animation-name: fadeOut;

  @keyframes fadeOut {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
    }
  }
`;

const Background = () => {
  const { background } = useContext(AppContext);

  const placeholder = ({
    imageProps,
    ref,
  }: LazyImageRenderPropArgs & RefArg) => (
    <ImgFadeIn ref={ref} src={backgroundLowImg} alt={imageProps.alt} />
  );

  // Do not render background on phone size screens
  if (window.innerWidth < 500) {
    return null;
  }

  const actualFadeIn = ({ imageProps }: { imageProps: ImageProps }) => (
    <ImgFadeIn {...imageProps} />
  );

  const actualFadeOut = ({ imageProps }: { imageProps: ImageProps }) => (
    <ImgFadeOut hidden={background === AppBackground.default} {...imageProps} />
  );

  return (
    <>
      <LazyImage
        src={backgroundImg}
        placeholder={placeholder}
        actual={actualFadeIn}
        alt="Background"
      />
      <LazyImage
        src={backgroundColorsImg}
        placeholder={placeholder}
        actual={
          background === AppBackground.colored ? actualFadeIn : actualFadeOut
        }
        alt="Background Color"
      />
    </>
  );
};

export default Background;