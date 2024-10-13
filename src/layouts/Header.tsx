import { MenuIcon } from "lucide-react"
import Image from "next/image"

type Props = {}
export const Header = (props: Props) => {
  return (
    <div className="z-10 relative flex justify-between pt-[30px] max-w-[95%] w-[1760px] mx-auto text-primary items-center">
      <MenuIcon className="size-7" />
      <Image src="/logo-shidman.png" alt="" width={250} height={142} />
      <span className="size-7"></span>
    </div>
  )
}
