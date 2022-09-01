import { useEffect, useState } from "react";
import Image from "next/image";
import SanityImage from './sanity-image'
import Link from "next/link";
import Logo from "@/public/images/logo.png"

export default function Header(props) {
  
  const {
    mainNav,
    menuImage,
    secondHeaderNav,
    facebookHandle,
    instagramHandle,
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
      className={`md:bg-body transition-colors !duration-[300ms] z-[100] 
      ${ openModal ? "justify-center md:!bg-transparent right-0 fixed md:inset-x-0" : `justify-between ${stickyHeader ? "sticky bg-body" :  "fixed inset-x-0"} `} 
      top-0 px-4 md:px-[3.35%] w-full md:mx-auto flex items-center md:justify-between
      py-6 md:pt-8 vw:pt-[2.22vw] md:pb-10 vw:pb-[2.77vw]`}
      >

        <div className={`cursor-pointer order-3 md:order-1 select-none md:opacity-50 ${openModal && "absolute right-4 md:left-0 md:relative"}`}>

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
              alt="burger"
              layout="responsive"
              width={21}
              height={20}
            />
          </div>
          
        </div>

        <div className={`order order-1 md:absolute md:inset-0 md:w-max md:top-[-5px] vw:top-[-.347vw] md:m-auto md:h-max select-none md:order-2`}>
          
          <Link href="/" passHref>
            <a onClick={ () => setOpenModal(false)  } className="block cursor-pointer w-[115px] vw:w-[7.98vw]">
              <Image
                src={Logo}
                alt="logo.png"
                layout="responsive"
              />
            </a>            
          </Link>

        </div>

        <div className="hidden md:block order-3 select-none">

          <a onClick={handleClick} href={reservationsButton.link.url}>
            <p className="font-medium text-lg vw:text-[1.25vw] leading-[21px] vw:leading-[1.166] tracking-[.05em] uppercase opacity-70">{reservationsButton.title}</p>
          </a>

        </div>
        
      </header>

      <div
        className={`fixed inset-0 h-full w-full transition-[transform] !duration-[300ms] ${openModal ? "!translate-x-0" : `${(!activeModal && "invisible")}` } -translate-x-full bg-body
        min-h-screen z-[90] w-full flex items-start`}
      >

        <div className={`md:pl-[3.35%] w-full h-full max-w-full md2:max-w-[73.6%] 3xl:max-w-[66.666%] flex flex-col items-center md:items-start justify-between pt-[152px] md:pt-[108px] vw:pt-[7.5vw] pb-6 vw:pb-[1.666vw]`}>

          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 items-start md:space-x-16 vw:space-x-[4.44vw]">

            <div className="flex flex-col w-full items-center md:items-start space-y-2 vw:space-y-[.5vw]">

              { mainNav.map((item,index) => {

                if(index < 4){

                  const {title, link, image} = item;

                  return (
                    <Link href={link.url} passHref key={index} >
                      <a onMouseLeave={handleMouseDown} onMouseEnter={() => handleMouseOver(image)} onClick={handleClick} className="block uppercase tracking-[.05em] text-[32px] md:text-[48px] vw:text-[3.33vw] leading-[1.2] font-light opacity-90">
                        {title}
                      </a>
                    </Link>
                  )

                }

              })}

            </div>

            <div className="flex flex-col w-full items-center md:items-start space-y-2 vw:space-y-[.5vw]">

              {mainNav.map((item,index) => {

                if(index >= 4){

                  const {title, link, image} = item;

                  return (
                    <Link href={link.url} passHref key={index} >
                      <a onMouseLeave={handleMouseDown} onMouseEnter={() => setActiveMenuImage(image)} onClick={handleClick} className="block uppercase tracking-[.05em] text-[32px] md:text-[48px] vw:text-[3.33vw] leading-[1.2] font-light opacity-90">
                        {title}
                      </a>
                    </Link>
                  )

                }

              })}

              <Link href="/" passHref>
                <a onClick={handleClick} className="md:hidden block uppercase tracking-[.05em] text-[32px] md:text-[48px] vw:text-[3.33vw] leading-[1.2] font-light opacity-90">
                  RESERVATIONS
                </a>
              </Link>
              
              <div className="pt-6 vw:pt-[1.66vw] hidden md:flex flex-col space-y-2 vw:space-y-[.5vw]">

                {secondHeaderNav.map( (item,i)  => {

                  const {title,link} = item;

                  return (
                    <a onClick={handleClick} href={link.url} key={i} className="block uppercase tracking-[.05em] text-[24px] vw:text-[1.66vw] leading-[28px] vw:leading-[1.166] font-light opacity-80">
                      {title}
                    </a>
                  )

                })}

              </div>

            </div>

          </div>

          <div className="flex items-center space-x-6 vw:space-x-[1.666vw]">

            <a onClick={handleClick} href={facebookHandle} className="block w-6 vw:w-[1.666vw]">

              <Image
                src={"/images/facebook.svg"}
                alt="facebook logo"
                layout="responsive"
                width={24}
                height={24}
              />

            </a>

            <a onClick={handleClick} href={instagramHandle} className="block w-6 vw:w-[1.666vw]">

              <Image
                src={"/images/instagram.svg"}
                alt="instagram logo"
                layout="responsive"
                width={24}
                height={24}
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