import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type Props = {}
const ContactUs = (props: Props) => {
  return (
    <>
      <div className="absolute bg-[#101010] size-full z-[-1] bg-[url('/wolf.jpg')] bg-contain bg-no-repeat bg-center opacity-20"></div>
      <div className="grow flex flex-col px-4 py-10 space-y-6">
        <h1 className="text-4xl text-center">Contact Us</h1>
        <div className="container mx-auto border border-white/50 rounded-lg px-14 py-7">
          <form action="" className="space-y-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="space-y-2">
                <Label className="text-2xl">First name</Label>
                <Input placeholder="Enter First Name" />
              </div>
              <div className="space-y-2">
                <Label className="text-2xl">Last Name</Label>
                <Input placeholder="Enter Last Name" />
              </div>
              <div className="space-y-2">
                <Label className="text-2xl">Email</Label>
                <Input placeholder="Enter Email" />
              </div>
              <div className="space-y-2">
                <Label className="text-2xl">Phone Number</Label>
                <Input placeholder="Enter Phone Number" />
              </div>
              <div className="space-y-2 lg:col-span-2">
                <Label className="text-2xl">Message</Label>
                <Textarea placeholder="Enter Message" rows={5} />
              </div>
            </div>
            <Button>Send</Button>
          </form>
        </div>
        <div className="container mx-auto border border-white/50 rounded-lg px-14 py-5">
          <div className="grid lg:grid-cols-2">
            <div className="space-y-2">
              <h2>Address</h2>
              <p className="whitespace-pre-line">
                {
                  "Office No. 4410 & 4411 -Addax Tower Level 44 \nAl Reem Island, City of Lights -Abu Dhabi, United Arab Emirates"
                }
              </p>
            </div>
            <div className="space-y-2">
              <h2>Phone Number</h2>
              <p>02 205 2999</p>
              <p>600 548 200</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ContactUs
