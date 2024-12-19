const AboutUs = () => {
  return (
    <>
      <div className="absolute bg-[#101010] size-full z-[-1] bg-[url('/wolf.jpg')] bg-contain bg-no-repeat bg-center opacity-20"></div>
      <div className="grow text-center flex flex-col justify-center items-center px-4">
        <div className="max-w-[948px] space-y-10">
          <h1 className="text-4xl">About us</h1>
          <p>
            {`Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur illo
        assumenda nobis fuga, doloremque consequatur placeat numquam deleniti
        nisi voluptates!Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Tenetur illo assumenda nobis fuga, doloremque consequatur placeat
        numquam deleniti nisi voluptates!`}
          </p>
        </div>
      </div>
    </>
  )
}

export default AboutUs
