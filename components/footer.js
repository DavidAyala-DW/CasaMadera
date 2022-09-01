import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/images/logoFooter.png"

export default function Footer(props) {

  const {
    facebookHandle,
    instagramHandle,
    privacyPolicyHandle,
    cookiesPreferencesHandle,
    footerNav,
  } = props;
  
  return (

    <footer className="px-4 md:px-0 pb-[22px] md:pb-[36px] md2:pb-[50px] vw:pb-[3.472vw] md:max-w-[93.3%] w-full md:mx-auto flex flex-col md2:flex-row items-start">

      <div className="mb-[42px] md2:mb-0 md2:mr-[5.8%] w-max">

        <Link href="/" passHref>

          <a className="block w-[153px] vw:w-[10.625vw]">
            <Image
              src={Logo}
              alt="Logo"
              layout="responsive"
            />
          </a>

        </Link>

      </div>

      <div className="flex flex-col mb-[86px] md2:mb-0 md2:space-y-[110px] vw:space-y-[7.638vw] justify-between md2:mr-[20%] w-full">

        <div className="grid md:max-w-[35%] md2:max-w-full grid-cols-3 gap-x-[65px] vw:gap-x-[4.51vw] gap-y-8 vw:gap-y-[2.22vw]">

          {footerNav.map( (item, i) => {

            const {title,link} = item;
            return (
              <a href={link.url} key={i} className={`uppercase ${i == 4 && "col-start-2 col-end-4"} opacity-80 text-[10px] vw:text-[.694vw] leading-[11px] vw:leading-[1.1] tracking-[.05em] font-normal`} >
                {title}
              </a>
            )

          })}

        </div>

        <div className="hidden md2:flex items-center space-x-[30px] vw:space-x-[2.08vw]">

          <Link href={privacyPolicyHandle.link.url} passHref>
            <a className="block opacity-80 text-[10px] vw:text-[.694vw] leading-[11px] vw:leading-[1.1] tracking-[.05em] font-normal uppercase">
              {privacyPolicyHandle.title}
            </a>
          </Link>

          <Link href={cookiesPreferencesHandle.link.url} passHref>  
            <a className="block opacity-80 text-[10px] vw:text-[.694vw] leading-[11px] vw:leading-[1.1] tracking-[.05em] font-normal uppercase">
              {cookiesPreferencesHandle.title}
            </a>
          </Link>

        </div>

      </div>

      <div className="flex flex-col space-y-16 md2:space-y-[110px] vw:space-y-[7.638vw] justify-between w-full">

        <div className="flex flex-col space-y-6 md2:space-y-8 vw:space-y-[2.22vw]">

          <h3 className="block opacity-80 text-[10px] vw:text-[.694vw] leading-[11px] vw:leading-[1.1] tracking-[.05em] font-normal uppercase">
            Newsletter
          </h3>  

          <form className="w-full md:max-w-[70%] md2:max-w-full" action="">

            <fieldset className="flex pl-4 md2:pl-6 vw:pl-[1.666vw] pr-7 md2:pr-[14px] vw:pr-[.972vw] item-center space-x-5 vw:space-x-[1.3888vw] border-2 border-[rgba(205,_205,_205,_0.2)] py-3 vw:py-[.83vw]">

              <input
                className="text-base md2:text-lg vw:text-[1.25vw] bg-transparent outline-none w-full
                placeholder:text-white text-white leading-[1.5] font-light opacity-80"
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email address"
              />

              <button type="submit" className="w-[26px] vw:w-[1.805vw]">
                <Image
                  src="/images/footerArrow.svg"
                  alt="White arrow"
                  width={26}
                  height={19}
                  layout="responsive"
                />
              </button>

            </fieldset>
            
          </form>

        </div>

        <div className="flex flex-col space-y-12 md2:space-y-0 md2:flex-row md2:items-center justify-between">

          <div className="flex items-center space-x-6 vw:space-x-[1.666vw]">

            <a href={facebookHandle} className="block w-6 vw:w-[1.666vw]">

              <Image
                src={"/images/facebook.svg"}
                alt="facebook logo"
                layout="responsive"
                width={24}
                height={24}
              />

            </a>

            <a href={instagramHandle} className="block w-6 vw:w-[1.666vw]">

              <Image
                src={"/images/instagram.svg"}
                alt="instagram logo"
                layout="responsive"
                width={24}
                height={24}
              />

            </a>

          </div>

          <div className="flex md2:hidden items-center space-x-[50px] vw:space-x-[3.472vw]">

            <Link href={privacyPolicyHandle.link.url} passHref>
              <a className="block opacity-80 text-[10px] vw:text-[.694vw] leading-[11px] vw:leading-[1.1] tracking-[.05em] font-normal uppercase">
                {privacyPolicyHandle.title}
              </a>
            </Link>

            <Link href={cookiesPreferencesHandle.link.url} passHref>
              <a className="block opacity-80 text-[10px] vw:text-[.694vw] leading-[11px] vw:leading-[1.1] tracking-[.05em] font-normal uppercase">
                {cookiesPreferencesHandle.title}
              </a>
            </Link>

          </div>

          <p className="block opacity-80 text-[10px] vw:text-[.694vw] leading-[11px] vw:leading-[1.1] tracking-[.05em] font-normal uppercase">
            ©2022 Noble 33
          </p>

        </div>

      </div>

    </footer>

  )

}
