"use client"

import { useEffect, useRef, useState } from "react"
import { HeroSection } from "./hero-section/HeroSection"
import { countries } from "./data"
import Image from "next/image"

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0) // Tracks the current video index
  const wolfVideoRef = useRef<HTMLVideoElement>(null)
  const earthVideoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (currentStep === 0) {
      wolfVideoRef.current?.play() // Autoplay the wolf video first
    } else if (currentStep === 1) {
      earthVideoRef.current?.play() // Then autoplay the earth video
    }
  }, [currentStep])

  const handleWolfVideoEnd = () => {
    setCurrentStep(1) // Move to the earth video
  }

  const handleEarthFirstVideoEnd = () => {
    setCurrentStep(3) // Move to the navigation video
  }

  const handleNavigate = (direction) => {
    if (direction === "forward") {
      // Logic for navigating forward through countries
    } else if (direction === "backward") {
      // Logic for navigating backward through countries
    }
  }

  return (
    <div>
      <div className="flex justify-center top-0 left-0 size-full">
        {/* Wolf Video (autoplay and muted) */}
        <video
          ref={wolfVideoRef}
          src="/videos/landscape/wolf_Intro_Landscape.mp4"
          style={{ display: currentStep === 0 ? "block" : "none" }}
          onEnded={handleWolfVideoEnd}
          muted={true}
          controls={false}
          autoPlay
        />

        {currentStep === 1 && (
          <button
            className="rounded-full border border-primary size-[300px] text-[38px] text-primary"
            onClick={() => {
              setCurrentStep(2)
            }}
          >
            Enter
          </button>
        )}

        {/* Earth Video First segment (autoplay and muted) */}
        <video
          ref={earthVideoRef}
          src="/videos/landscape/earth_first_segment.mp4"
          style={{ display: currentStep === 2 ? "block" : "none" }}
          onEnded={handleEarthFirstVideoEnd}
          muted={true}
          controls={false}
          autoPlay
        />

        {/* Navigation Video (initially muted, then unmuted) */}
        {currentStep === 3 && <HeroSection />}
      </div>
    </div>
  )
}
