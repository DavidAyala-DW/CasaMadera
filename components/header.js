import { useEffect, useState } from "react";
import Image from "next/image";
import SanityImage from './sanity-image'
import Link from "next/link";

export default function Header(props) {
  
  const {
    mainNav,
    menuImage,
    secondHeaderNav,
    facebookHandle,
    instagramHandle,
    spotifyHandle,
    soundCloudHandle,
    reservationsButton,
    stickyHeader
  } = props;
  
  const [openModal, setOpenModal] = useState(false);
  const [activeModal, setActiveModal] = useState(false);
  const [activeMenuImage, setActiveMenuImage] = useState();

  function handleClick(){
    const updatedModalValue = !openModal;
    setOpenModal(updatedModalValue);
  }

  function handleMouseOver(image){
    setActiveMenuImage(image)
  }

  function handleMouseDown(){
    setActiveMenuImage(menuImage)
  }

  useEffect(() => {

    setActiveModal(true);

    if(menuImage){
      handleMouseDown()
    }
    
  }, []);

  return (

    <>

      <header
      className={`md:bg-transparent transition-colors !duration-[300ms] z-[100] 
      ${ openModal ? "justify-center md:!bg-transparent right-0 fixed md:inset-x-0" : `justify-between ${stickyHeader ? "sticky bg-body" :  "fixed inset-x-0"} `} 
      top-0 px-4 md:px-[2.8%] w-full md:mx-auto flex items-center md:justify-between
      py-6 md:pt-8 vw:pt-[2.22vw] md:pb-10 vw:pb-[2.77vw]`}
      >

        <div className={`cursor-pointer order-3 md:order-1 select-none ${openModal && "absolute right-4 md:left-0 md:relative"}`}>

          <div onClick={handleClick} className={`${openModal && "hidden"} w-[25px] vw:!w-[1.736vw]`}>
            <Image
              src={"/images/burguer.svg"}
              alt="burger"
              layout="responsive"
              width={25}
              height={16}
            />
          </div>

          <div onClick={handleClick} className={`${!openModal && "hidden"} w-[21px] vw:!w-[1.458vw]`}>
            <Image
              src={"/images/close.svg"}
              alt="close"
              layout="responsive"
              width={21}
              height={20}
            />
          </div>
          
        </div>

        <div className={`order order-1 md:absolute md:inset-0 md:w-max md:-top-4 vw:top-[-1.1111vw] md:m-auto md:h-max select-none md:order-2`}>
          
          {
            (!openModal) && (
              <Link href="/" passHref>
                <a onClick={ () => setOpenModal(false)  } className="block cursor-pointer w-[226px] vw:w-[15.69vw]">
                  <Image
                    src={"/images/logo.svg"}
                    width={226}
                    height={32}
                    alt="logo.png"
                    layout="responsive"
                  />
                </a>            
              </Link>
            )
          }

          {
            (openModal) && (
              <Link href="/" passHref>
                <a onClick={ () => setOpenModal(false)  } className="block cursor-pointer w-[226px] vw:w-[15.69vw]">
                  <Image
                    src={"/images/logoDark.svg"}
                    width={226}
                    height={32}
                    alt="logo.png"
                    layout="responsive"
                  />
                </a>            
              </Link>
            )
          }

        </div>

        <div className="hidden md:block order-3 select-none">

          {(reservationsButton && (

            <Link href={reservationsButton?.link?.url}>
              <a onClick={handleClick}>
                <p className={`font-light ${openModal ? "text-[#57412d]" : "text-white"} transition-colors  text-lg vw:text-[1.25vw] leading-[25px] vw:leading-[1.388] tracking-[.05em] uppercase`}>
                  {reservationsButton?.title}
                </p>
              </a>
            </Link>

          ))}

        </div>
        
      </header>

      <div
        className={`fixed inset-0 h-full w-full transition-[transform] !duration-[300ms] ${openModal ? "!translate-x-0" : `${(!activeModal && "invisible")}` } -translate-x-full bg-body
        min-h-screen z-[90] w-full flex items-start`}
      >

        <div
        className={`md:pl-[2.8%] w-full h-full max-w-full md2:max-w-[73.6%] 3xl:max-w-[66.666%] flex flex-col items-center
        md:items-start justify-between pt-[101px] md:pt-[108px] vw:pt-[7.5vw] pb-6 vw:pb-[1.666vw]`}>

          <div className="w-full flex flex-col md:flex-row space-y-2 md:space-y-0 items-start md:space-x-16 vw:space-x-[4.44vw]">

            <div className="w-full md:w-max flex flex-col items-center md:items-start">

              { mainNav.map((item,index) => {

                if(index < 4){

                  const {title, link, image} = item;

                  return (
                    <Link href={link.url} passHref key={index} >
                      <a
                        onMouseLeave={handleMouseDown}
                        onMouseEnter={() => handleMouseOver(image)}
                        onClick={handleClick}
                        className="block font-light tracking-[-.04em] text-[32px] md:text-[55px] vw:text-[3.819vw] leading-[44px] md:leading-[75px] vw:leading-[1.36]"
                      >
                        {title}
                      </a>
                    </Link>
                  )

                }

              })}

            </div>

            <div className="flex flex-col w-full items-center md:items-start">

              {mainNav.map((item,index) => {

                if(index >= 4){

                  const {title, link, image} = item;

                  return (
                    <Link href={link.url} passHref key={index} >
                      <a
                        onMouseLeave={handleMouseDown}
                        onMouseEnter={() => handleMouseOver(image)}
                        onClick={handleClick}
                        className="block font-light tracking-[-.04em] text-[32px] md:text-[55px] vw:text-[3.819vw] leading-[44px] md:leading-[75px] vw:leading-[1.36]"
                      >
                        {title}
                      </a>
                    </Link>
                  )

                }

              })}

              {(reservationsButton && (

                <Link href={reservationsButton?.link?.url}>
                  <a
                    onClick={handleClick}
                    className="block font-light tracking-[-.04em] text-[32px] md:text-[55px] vw:text-[3.819vw] leading-[44px] md:leading-[75px] vw:leading-[1.36]"
                  >
                    {reservationsButton?.title}
                  </a>
                </Link>

              ))}
              
              <div className="pt-6 vw:pt-[1.66vw] hidden md:flex flex-col space-y-2 vw:space-y-[.5vw]">

                {secondHeaderNav && secondHeaderNav.map( (item,i)  => {

                  const {title,link} = item;
                  if(!link || !title) return;

                  return (

                    <Link
                      href={link?.url}
                      passHref key={i}
                    >
                      <a
                        onClick={handleClick}
                        className="block text-[24px] vw:text-[1.66vw] leading-[1.6] font-light opacity-90"
                      >
                        {title}
                      </a>
                    </Link>

                  )

                })}

              </div>

            </div>

          </div>

          <div className="flex items-center space-x-6 vw:space-x-[1.666vw]">

            <a onClick={handleClick} href={facebookHandle} className="block w-8 vw:w-[2.222vw]">

              <Image
                src={"/images/facebook.svg"}
                alt="facebook logo"
                layout="responsive"
                width={32}
                height={32}
              />

            </a>

            <a onClick={handleClick} href={instagramHandle} className="block w-8 vw:w-[2.222vw]">

              <Image
                src={"/images/instagram.svg"}
                alt="instagram logo"
                layout="responsive"
                width={32}
                height={32}
              />

            </a>

            <a onClick={handleClick} href={spotifyHandle} className="block w-8 vw:w-[2.222vw]">

              <Image
                src={"/images/spotify.svg"}
                alt="instagram logo"
                layout="responsive"
                width={32}
                height={32}
              />

            </a>

            <a onClick={handleClick} href={soundCloudHandle} className="block w-8 vw:w-[2.222vw]">

              <Image
                src={"/images/soundCloud.svg"}
                alt="instagram logo"
                layout="responsive"
                width={32}
                height={32}
              />

            </a>

          </div>

        </div>

        <div className={`hidden ${!activeMenuImage && "bg-body"} lg:flex relative w-full h-full max-w-[26.4%] 3xl:max-w-[33.3333%]`}>

          {
            activeMenuImage && (
              <SanityImage priority={true} className="object-cover" src={activeMenuImage} layout="fill" />
            )
          }
          
        </div>

      </div>

    </>

  )

}