"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import { Autoplay, Pagination } from "swiper/modules"
import Image from "next/image"
import banner1 from "@/public/assets/images/banner-1.jpg"
import banner2 from "@/public/assets/images/banner-2.jpg"
import banner3 from "@/public/assets/images/banner-3.jpg"

const Slider = () => {
  return (
    <Swiper
      pagination={true}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      modules={[Pagination, Autoplay]}
      className="mySwiper"
    >
      <SwiperSlide>
        <div className="relative w-full slider-height">
          <Image
            src={banner1}
            alt="Banner Image 1"
            fill
            className="object-cover object-center"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="relative w-full slider-height">
          <Image
            src={banner2}
            alt="Banner Image 2"
            fill
            className="object-cover object-center"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="relative w-full slider-height">
          <Image
            src={banner3}
            alt="Banner Image 3"
            fill
            className="object-cover object-center"
          />
        </div>
      </SwiperSlide>
    </Swiper>
  )
}
export default Slider
