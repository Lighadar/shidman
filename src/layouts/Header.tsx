"use client"

import { cn } from "@/lib/utils"
import { MenuIcon, XIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

type Props = {}
export const Header = (props: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const pathname = usePathname()

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  return (
    <div
      id="header"
      className={cn(
        "z-10 relative flex justify-between pt-[30px] lg:pt-3 max-w-[95%] w-[1760px] mx-auto text-primary items-center",
        {
          hidden: pathname == "/",
        }
      )}
    >
      <span className="cursor-pointer" onClick={() => setIsMenuOpen(true)}>
        <MenuIcon className="size-7" />
      </span>
      <Link href="/">
        <Image
          src="/logo-shidman.png"
          alt=""
          width={250}
          height={142}
          className="max-h-[100px] lg:max-h-[142px] w-auto"
        />
      </Link>
      <span className="size-7"></span>
      {isMenuOpen && (
        <div className="fixed top-0 left-0 size-full flex flex-col justify-between items-center text-white bg-black py-10 px-4">
          <ul className="text-center grow text-4xl flex flex-col justify-center items-center gap-10">
            <li>
              <Link href="/?ready=true" className="hover:text-primary">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about-us" className="hover:text-primary">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact-us" className="hover:text-primary">
                Contact Us
              </Link>
            </li>
          </ul>
          <div>©2024 Shidman. ALL RIGHTS RESERVED.</div>
          <span
            className="absolute right-6 top-6 cursor-pointer"
            onClick={() => setIsMenuOpen(false)}
          >
            <XIcon />
          </span>
        </div>
      )}
    </div>
  )
}
