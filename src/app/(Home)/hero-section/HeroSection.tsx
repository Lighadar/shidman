import { useEffect, useRef } from "react"

type Props = {}
export const HeroSection = (props: Props) => {
  const navigationVideoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    navigationVideoRef.current?.play()
  }, [])
  return (
    <div>
      <video
        ref={navigationVideoRef}
        src="/videos/landscape/earth_second-segment.mp4"
        controls={false}
        muted={true} // Initially muted, then unmuted after the sequence
      />
    </div>
  )
}
