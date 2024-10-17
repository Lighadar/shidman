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
  const [navigationVideo, setNavigationVideo] =
    useState<HTMLVideoElement | null>(null)
  const navigationVideoMobileRef = useRef<HTMLVideoElement>(null)
  const navigationVideoDesktopRef = useRef<HTMLVideoElement>(null)
  const reverseInterval = useRef<NodeJS.Timeout | null>(null)
  const [currentCountryIndex, setCurrentCountryIndex] = useState(0)
  const [isReversing, setIsReversing] = useState(false)
  const touchStartX = useRef<number | null>(null)
  const [api, setApi] = useState<CarouselApi | null>(null)

  const handleContentChange = (index: number) => {
    api?.scrollTo(index)
  }

  useEffect(() => {
    if (document.body.clientWidth < 1000) {
      navigationVideoMobileRef.current?.play()
      setNavigationVideo(navigationVideoMobileRef.current)
    } else {
      navigationVideoDesktopRef.current?.play()
      setNavigationVideo(navigationVideoDesktopRef.current)
    }
  }, [navigationVideoMobileRef.current, navigationVideoDesktopRef.current])

  useEffect(() => {
    const video = navigationVideo

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
            // handleContentChange(index) // Trigger the callback for content change
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
    // navigationVideoRef.current!.playbackRate = 1
    api?.scrollTo(currentCountryIndex)
  }, [currentCountryIndex])

  // Handle forward and backward navigation
  const handleNavigate = (direction: "forward" | "backward") => {
    let newIndex = currentCountryIndex
    // const navigationVideo = navigationVideo

    if (direction === "forward") {
      clearInterval(reverseInterval.current!) // Clear reverse interval if navigating forward
      setIsReversing(false) // Ensure reversing state is false
      newIndex = (currentCountryIndex + 1) % countries.length // Loop forward
      console.dir(navigationVideo)
      navigationVideo!.playbackRate = 1 // Play at normal speed
      setCurrentCountryIndex(newIndex)
      navigationVideo!.currentTime = countries[newIndex].startTime
      navigationVideo!.play() // Play forward
    } else if (direction === "backward") {
      setIsReversing(true) // Enable reverse state
      newIndex = (currentCountryIndex - 1 + countries.length) % countries.length // Loop backward
      setCurrentCountryIndex(newIndex)
      navigationVideo!.currentTime = countries[newIndex].startTime // Set the time to the end of the previous section
      playBackward() // Start manual backward playback
      navigationVideo!.play()
    }
  }

  // Function to simulate reverse playback
  const playBackward = () => {
    clearInterval(reverseInterval.current!) // Clear previous reverse interval
    const video = navigationVideo

    reverseInterval.current = setInterval(() => {
      if (video!.currentTime <= countries[currentCountryIndex].startTime) {
        clearInterval(reverseInterval.current!) // Stop when the start of the section is reached
        // video!.pause()
      } else {
        video!.currentTime -= 0.1 // Move the currentTime backwards in small steps
      }
    }, 100) // Adjust time interval for smoother backward playback
  }

  // Touch event handlers for swipe detection
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX // Record the starting X position of the touch
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return // If no touch start recorded, return

    const touchEndX = e.touches[0].clientX // Get the current X position of the touch

    const touchDiff = touchStartX.current - touchEndX // Calculate the difference

    if (Math.abs(touchDiff) > 50) {
      // Only trigger if the swipe distance is greater than a threshold (50px)
      if (touchDiff > 0) {
        // Swipe left -> next
        handleNavigate("forward")
      } else {
        // Swipe right -> previous
        handleNavigate("backward")
      }
      touchStartX.current = null // Reset touch start to avoid multiple triggers
    }
  }

  return (
    <div
      className="w-full overflow-hidden grow"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <div className="w-full h-full absolute top-0 left-1/2 -translate-x-1/2 overflow-hidden">
        <video
          ref={navigationVideoDesktopRef}
          src="/videos/landscape/earth_second-segment.mp4"
          controls={false}
          muted={true} // Initially muted, then unmuted after the sequence
          className="!hidden lg:!block h-full object-cover lg:h-[118%] w-full"
          loop
          style={{ display: "none" }}
        />
        <video
          ref={navigationVideoMobileRef}
          src="/videos/portrait/earth_second-segment.mp4"
          controls={false}
          muted={true} // Initially muted, then unmuted after the sequence
          className="!block lg:!hidden size-full object-cover h-[118%]"
          loop
          style={{ display: "none" }}
        />
      </div>
      <div className="relative py-8 w-[700px] mx-auto">
        <Carousel
          className="h-full items-center px-6"
          setApi={setApi}
          opts={{
            watchDrag: false,
            slidesToScroll: 1,
          }}
        >
          {/* {currentCountryIndex < countries.length - 1 && (
            <button
              onClick={() => handleNavigate("backward")}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Previous
            </button>
          )} */}
          <CarouselContent
            className="h-full"
            containerClassName="overflow-visible"
          >
            {Children.toArray(
              countries.map((data, index) => (
                <CarouselItem className="flex grow items-center justify-center">
                  <div className="flex flex-col items-center gap-4 lg:gap-10">
                    <div className="text-foreground/50 tracking-[0.8rem] uppercase ml-[0.8rem]">
                      {data.region}
                    </div>
                    <div className="flex gap-4 lg:gap-12 items-center flex-wrap justify-center">
                      {Children.toArray(
                        data.companies.map((company) => (
                          <Image
                            src={company}
                            width={135}
                            height={50}
                            alt=""
                            className="max-h-[44px] max-w-[100px] lg:max-h-[50px] lg:max-w-[110px]"
                          />
                        ))
                      )}
                    </div>
                    <div className="text-2xl lg:text-4xl text-foreground/70 uppercase">
                      {data.country}
                    </div>
                  </div>
                </CarouselItem>
              ))
            )}
          </CarouselContent>
          {currentCountryIndex !== 0 && (
            <div
              className="absolute top-[calc(100%+30px)] lg:flex blur-[4.25px] left-[9%] p-4 text-2xl flex flex-col items-center justify-center gap-1 cursor-pointer w-[170px] shrink-0 opacity-50 transition-all"
              onClick={() => handleNavigate("backward")}
            >
              <Image src="/logos/psi-logo.svg" width={150} height={60} alt="" />
              {countries[currentCountryIndex - 1].country}
            </div>
          )}
          {currentCountryIndex < countries.length - 1 && (
            <div
              className="absolute top-[calc(100%+30px)] hidden lg:flex blur-[4.25px] right-[9%] p-4 text-2xl  flex-col items-center justify-center gap-1 cursor-pointer w-[170px] shrink-0 opacity-50 transition-all"
              onClick={() => handleNavigate("forward")}
            >
              <Image src="/logos/psi-logo.svg" width={150} height={60} alt="" />
              {countries[currentCountryIndex + 1].country}
            </div>
          )}
          {/* <CarouselPrevious />
          <CarouselNext /> */}
        </Carousel>
        {/* <div className="flex justify-between">
          {currentCountryIndex > countries.length - 1 && (
            <div onClick={() => handleNavigate("backward")}>
              {countries[currentCountryIndex].country}
            </div>
          )}
          {currentCountryIndex < countries.length - 1 && (
            <div onClick={() => handleNavigate("forward")}>
              {countries[currentCountryIndex].country}
            </div>
          )}
        </div> */}
        <div className="flex justify-between mt-4 "></div>
      </div>
    </div>
  )
}
