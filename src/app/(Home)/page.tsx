"use client"

import { useEffect, useRef, useState } from "react"
import { HeroSection } from "./hero-section/HeroSection"
import { cn } from "@/lib/utils"

export default function Home() {
  const [currentStep, setCurrentStep] = useState(3) // Tracks the current video index
  const wolfVideoRef = useRef<HTMLVideoElement>(null)
  const earthVideoLandscapeRef = useRef<HTMLVideoElement>(null)
  const earthVideoPortraitRef = useRef<HTMLVideoElement>(null)
  const [earthVideo, setEarthVideo] = useState<HTMLVideoElement | null>(null)

  useEffect(() => {
    if (currentStep === 0) {
      wolfVideoRef.current?.play() // Autoplay the wolf video first
    } else if (currentStep === 2) {
      earthVideo?.play() // Then autoplay the earth video
    }
    if (currentStep === 3) {
      const headerElem = document.getElementById("header")
      headerElem?.classList.add("!flex")
    }
  }, [currentStep])

  const handleWolfVideoEnd = () => {
    setCurrentStep(1) // Move to the earth video
  }

  const handleEarthFirstVideoEnd = () => {
    setCurrentStep(3) // Move to the navigation video
  }

  useEffect(() => {
    if (document.body.clientWidth < 1000) {
      setEarthVideo(earthVideoPortraitRef.current)
    } else {
      setEarthVideo(earthVideoLandscapeRef.current)
    }
  }, [earthVideoPortraitRef.current, earthVideoLandscapeRef.current])

  return (
    <div className="flex grow overflow-hidden">
      <div className="flex justify-center top-0 left-0 grow overflow-hidden">
        {/* Wolf Video (autoplay and muted) */}
        <video
          ref={wolfVideoRef}
          src="/videos/landscape/wolf_Intro_Landscape.mp4"
          style={{ display: currentStep === 0 ? "block" : "none" }}
          onEnded={handleWolfVideoEnd}
          muted={true}
          controls={false}
          autoPlay
          className={cn("!hidden object-cover", {
            "lg:!block": currentStep === 0,
          })}
        />
        <video
          ref={wolfVideoRef}
          src="/videos/portrait/wolf_Intro_portrait.mp4"
          style={{ display: currentStep === 0 ? "block" : "none" }}
          onEnded={handleWolfVideoEnd}
          muted={true}
          controls={false}
          autoPlay
          className={cn("lg:!hidden object-cover", {
            "!block": currentStep === 0,
          })}
        />

        {currentStep === 1 && (
          <button
            className="rounded-full border border-primary size-[180px] text-[27px] lg:size-[240px] lg:text-[32px] text-primary self-center"
            onClick={() => {
              setCurrentStep(2)
            }}
          >
            Enter
          </button>
        )}

        {/* Earth Video First segment (autoplay and muted) */}
        <video
          ref={earthVideoLandscapeRef}
          src="/videos/landscape/earth_first_segment.mp4"
          style={{ display: currentStep === 2 ? "block" : "none" }}
          onEnded={handleEarthFirstVideoEnd}
          muted={true}
          controls={false}
          className={cn("!hidden object-cover lg:h-[118%]", {
            "lg:!block": currentStep === 2,
          })}
        />
        <video
          ref={earthVideoPortraitRef}
          src="/videos/portrait/earth_first_segment.mp4"
          style={{ display: currentStep === 2 ? "block" : "none" }}
          onEnded={handleEarthFirstVideoEnd}
          muted={true}
          controls={false}
          className={cn("hidden lg:!hidden object-cover", {
            "!block": currentStep === 2,
          })}
        />

        {/* Navigation Video (initially muted, then unmuted) */}
        {currentStep === 3 && <HeroSection />}
      </div>
    </div>
  )
}
