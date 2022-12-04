import React, { useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import styled from "styled-components";

const EmblaCarousel = ({ options = { loop: false } }) => { 
  const [state, setState] = useState(null); // use state to reload component
  const autoplay = useRef( 
    Autoplay(
      { delay: 5000, stopOnInteraction: false }, 
      (emblaRoot) => emblaRoot.parentElement  // emblaRoot is the carousel container
    )
  );

  const [emblaRef] = useEmblaCarousel(options, [autoplay.current]);  // here we pass the autoplay instance to the hook

  useEffect(() => {
    setState("reload"); // trigger reload to start autoplay of embla carousel
  }, []);

  return (
    <>
      <EmblaSlideshowWrapper>
      <div className="embla__viewport" ref={emblaRef}>
        <EmblaContainer>
          <img className="embla__slide"
              src="https://res.cloudinary.com/dojn5va73/image/upload/v1670079028/PC234576_ywohyu.jpg" 
              alt="slide"
          />
          <img className="embla__slide"
              src="https://res.cloudinary.com/dojn5va73/image/upload/v1670080361/74493144_2499866990334987_1757053528607555584_o_pwsfc0.jpg" 
              alt="slide" 
          />
          <img className="embla__slide"
              src="https://res.cloudinary.com/dojn5va73/image/upload/v1670079028/PC234596_kot4on.jpg" 
              alt="slide" 
          />
        </EmblaContainer>
      </div>
      </EmblaSlideshowWrapper>
    </>
  );
};

const EmblaSlideshowWrapper = styled.div`
  height: 300px;
  overflow: hidden;
  width: 100vw;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin-bottom: 20px;
`
const EmblaContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin-top: -250px;
  .embla__slide {
    display: flex;
    max-width: 100vw;
  }
`;

export default EmblaCarousel;