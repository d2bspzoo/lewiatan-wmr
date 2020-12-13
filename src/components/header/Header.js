import React, { useState, useEffect, Fragment } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';

import { clientConnect } from '../../client';

function Header(props) {

  const items = [
    {
      hash: '92D67077-B987-45A2-90F4-8B54B6A5E6DD',
      altText: 'Slide 1',
    },
    {
      hash: '200B6CAF-E670-4C38-8D4D-0F3019ADB26D',
      altText: 'Slide 1',
    },
    {
      hash: '6AD1A827-694B-48E2-A97A-3EA40EECF2A4',
      altText: 'Slide 1',
    }
  ];
  
  //const [items, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("1");
    setIsLoading(true);
    //async function fetchData() { setData(await clientConnect('api/mainslider/list', null)) };
    //fetchData();
    //setData(clientConnect('api/mainslider/list', null));
    setIsLoading(false);
    console.log("2");
  }, []);

  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  // const slides = (items, isLoading) => {
  //   if(isLoading) {
      
  //   }
  //   else
  //   {
  //   items.map((item,i) => { 
  //   return (
  //     <CarouselItem
  //       onExiting={() => setAnimating(true)}
  //       onExited={() => setAnimating(false)}
  //       key={i}
  //     >
  //       <img src={item.src} className="d-block w-100"/>
  //       <div class="carousel-caption d-none d-md-block">
  //         <h5>Third slide label</h5>
  //         <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
  //       </div>
  //     </CarouselItem>
  //     )}
  //   );
  //   }
  // };

  const slides = items.map((item, i) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={i}
      >
        <img src={`https://cdn.bluebirdcms.net/imageasset/get/${item.hash}`} alt={item.altText} />
        
      </CarouselItem>
    );
  });

  return (
    <Fragment>
    {isLoading ? 
    (
      <div>Loading ...</div>
    ) 
    : 
    (
    <Fragment>
    {items.length > 0 &&
      (
      <div className="margin-t-3">
      <Carousel
        activeIndex={activeIndex}
        next={next}
        previous={previous}
      >
        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
        {slides}
      </Carousel>
      </div> 
      )
    }
    </Fragment>
    )
    }
  </Fragment>
  );
}

export default Header;