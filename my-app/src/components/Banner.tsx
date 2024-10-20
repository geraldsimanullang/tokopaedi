"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

const Banner = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  return (
    <div>
      <Carousel
        plugins={[plugin.current]}
        className="relative w-full h-full rounded-md"
      >
        <CarouselContent className="w-full h-full">
          <CarouselItem className="relative w-full">
            <img
              src="/banners/banner-4.png"
              alt="Banner 4"
              className="rounded-xl"
            />
          </CarouselItem>
          <CarouselItem className="relative w-full">
            <img
              src="/banners/banner-1.png"
              alt="Banner 1"
              className="rounded-xl"
            />
          </CarouselItem>
          <CarouselItem className="relative w-full">
            <img
              src="/banners/banner-2.png"
              alt="Banner 2"
              className="rounded-xl"
            />
          </CarouselItem>
          <CarouselItem className="relative w-full">
            <img
              src="/banners/banner-3.png"
              alt="Banner 3"
              className="rounded-xl"
            />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default Banner;
