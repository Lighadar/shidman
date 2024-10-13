"use client"

import { Children, useEffect, useRef, useState } from "react"
import { countries } from "../data"
import Image from "next/image"
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

type Props = {}
export const HeroSection = (props: Props) => {
  const navigationVideoRef = useRef<HTMLVideoElement>(null)
  const [currentCountryIndex, setCurrentCountryIndex] = useState(0)
  const [api, setApi] = useState<CarouselApi>()

  const handleContentChange = (index: number) => {
    api?.scrollTo(index)
  }

  useEffect(() => {
    navigationVideoRef.current?.play()
  }, [])

  useEffect(() => {
    const video = navigationVideoRef.current

    const handleTimeUpdate = () => {
      const currentTime = video!.currentTime

      // Check if the video has reached a specific time to trigger a callback or content change
      countries.forEach((country, index) => {
        if (
          currentTime >= country.startTime &&
          currentTime < country.startTime + country.duration
        ) {
          if (currentCountryIndex !== index) {
            setCurrentCountryIndex(index) // Update to the correct country/section
            handleContentChange(index) // Trigger the callback for content change
          }
        }
      })
    }

    if (video) {
      video.addEventListener("timeupdate", handleTimeUpdate)
    }

    // Cleanup on component unmount
    return () => {
      if (video) {
        video.removeEventListener("timeupdate", handleTimeUpdate)
      }
    }
  }, [currentCountryIndex, api])

  useEffect(() => {
    console.log(api)
  }, [api])

  return (
    <div>
      <div className="w-[110%] absolute top-0 left-1/2 -translate-x-1/2 overflow-hidden">
        <video
          ref={navigationVideoRef}
          src="/videos/landscape/earth_second-segment.mp4"
          controls={false}
          muted={true} // Initially muted, then unmuted after the sequence
          className="w-full h-full"
          loop
        />
      </div>
      <div className="relative py-8">
        <Carousel
          className="h-full"
          setApi={setApi}
          opts={{
            watchDrag: false,
          }}
        >
          <CarouselContent className="h-full">
            {Children.toArray(
              countries.map((data, index) => (
                <CarouselItem className="flex grow items-center justify-center">
                  <div className="flex flex-col items-center gap-10">
                    <div className="text-foreground/50 tracking-[0.8rem] uppercase ml-[0.8rem]">
                      {data.region}
                    </div>
                    <div className="flex gap-12 items-center">
                      {Children.toArray(
                        data.companies.map((company) => (
                          <Image
                            src={company}
                            width={200}
                            height={50}
                            alt=""
                            className="max-h-[50px]"
                          />
                        ))
                      )}
                    </div>
                    <div className="text-4xl text-foreground/70 uppercase">
                      {data.country}
                    </div>
                  </div>
                </CarouselItem>
              ))
            )}
          </CarouselContent>
          {/* <CarouselPrevious />
          <CarouselNext /> */}
        </Carousel>
        {/* {countries.map((data) => (
          <div className="flex flex-col items-center gap-10">
            <div className="text-foreground/50 tracking-[0.8rem] uppercase ml-[0.8rem]">
              {data.region}
            </div>
            <div className="flex gap-12 items-center">
              {data.companies.map((company) => (
                <Image
                  src={company}
                  width={200}
                  height={70}
                  alt=""
                  className="max-h-[70px]"
                />
              ))}
            </div>
            <div className="text-5xl text-foreground/70 uppercase">
              {data.country}
            </div>
          </div>
        ))} */}
      </div>
    </div>
  )
}
