const AboutUs = () => {
  return (
    <>
      <div className="absolute bg-[#101010] size-full z-[-1] bg-[url('/wolf.jpg')] bg-contain bg-no-repeat bg-center opacity-20"></div>
      <div className="grow text-center flex flex-col justify-center items-center px-4">
        <div className="max-w-[948px] space-y-10">
          <h1 className="text-4xl">About us</h1>
          <p>
            {`Shidman Holding is a dynamic and diversified enterprise at the forefront of innovation and excellence. With a strong presence across multiple industries, Shidman Holding leads a portfolio of exceptional companies that drive growth, inspire progress, and deliver unmatched value to clients and stakeholders worldwide.

At Shidman Holding, we are committed to building a legacy of leadership and innovation. Our mission is to shape the future of industries by fostering creativity, nurturing talent, and creating opportunities that contribute to economic and social development.
 `}
          </p>
        </div>
      </div>
    </>
  )
}

export default AboutUs
