import Link from "next/link";
import Image from "next/image";

export default function Footer(props) {

  const {
    facebookHandle,
    instagramHandle,
    spotifyHandle,
    soundCloudHandle,
    privacyPolicyHandle,
    cookiesPreferencesHandle,
    footerNav,
  } = props;
  
  return (

    <footer className="px-4 md:px-0 pb-[22px] md:pb-[36px] md2:pb-[50px] vw:pb-[3.472vw] md:max-w-[94.4%] w-full md:mx-auto flex flex-col md2:flex-row items-stretch">

      <div className="mb-[42px] md2:mb-0 md2:mr-[4.558%] w-max">

        <Link href="/" passHref>

          <a className="block w-[196px] vw:w-[13.6111vw]">
            <Image
              src={"/images/logoFooter.svg"}
              width={196}
              height={28}
              alt="Logo"
              layout="responsive"
            />
          </a>

        </Link>

      </div>

      <div className="flex flex-col mb-[86px] md2:mb-0 md2:space-y-[110px] vw:space-y-[7.638vw] justify-between md2:mr-[14.7%] w-full">

        <div className="grid md:max-w-[67.5%] md2:max-w-full grid-cols-[1fr,2fr,1fr] md:grid-cols-[1fr,1.5fr,1fr] gap-x-[17px] md:gap-x-16 lg:gap-x-[42px] vw:gap-x-[2.91666vw] gap-y-8 vw:gap-y-[2.22vw]">

          {footerNav && footerNav.map( (item, i) => {

            const {title,link} = item;

            return (
              <Link href={link?.url} passHref key={i}>
                <a className={`text-[18px] vw:text-[1.25vw] leading-[25px] vw:leading-[1.3888] tracking-[-.04em] font-light`} >
                  {title}
                </a>
              </Link>
            )

          })}

        </div>

        <div className="hidden md2:flex items-center space-x-[42px] vw:space-x-[2.91666vw]">

          {privacyPolicyHandle && (
            <Link href={privacyPolicyHandle?.link?.url} passHref>
              <a className={`text-[18px] vw:text-[1.25vw] leading-[25px] vw:leading-[1.3888] tracking-[-.04em] font-light md:min-w-[122px]`} >
                {privacyPolicyHandle?.title}
              </a>
            </Link>
          )}

          {cookiesPreferencesHandle && (
            <Link href={cookiesPreferencesHandle?.link?.url} passHref>  
              <a className={`text-[18px] vw:text-[1.25vw] leading-[25px] vw:leading-[1.3888] tracking-[-.04em] font-light`} >
                {cookiesPreferencesHandle?.title}
              </a>
            </Link>
          )}

        </div>

      </div>

      <div className="flex flex-col space-y-16 md2:space-y-[110px] vw:space-y-[7.638vw] justify-between w-full">

        <div className="flex flex-col space-y-6 md2:space-y-8 vw:space-y-[2.22vw]">

          <h3 className="block text-lg vw:text-[1.25vw] leading-[25px] vw:leading-[1.3888] tracking-[-.04em] font-light">
            Newsletter
          </h3>  

          <form className="w-full md:max-w-[70%] md2:max-w-full" action="">

            <fieldset className="flex pl-4 md2:pl-6 vw:pl-[1.666vw] pr-7 md2:pr-[14px] vw:pr-[.972vw] item-center space-x-5 vw:space-x-[1.3888vw] border-2 border-[rgba(74,_52,_25,_0.2)] py-3 vw:py-[.83vw]">

              <input
                className="text-base md2:text-lg vw:text-[1.25vw] bg-transparent outline-none w-full
                placeholder:text-[rgba(74,_52,_25,_0.5)] leading-[1.5] font-light opacity-80"
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

            <a href={facebookHandle} className="block w-8 vw:w-[2.222vw]">

              <Image
                src={"/images/facebook.svg"}
                alt="facebook logo"
                layout="responsive"
                width={32}
                height={32}
              />

            </a>

            <a href={instagramHandle} className="block w-8 vw:w-[2.222vw]">

              <Image
                src={"/images/instagram.svg"}
                alt="instagram logo"
                layout="responsive"
                width={32}
                height={32}
              />

            </a>

            <a  href={spotifyHandle} className="block w-8 vw:w-[2.222vw]">

              <Image
                src={"/images/spotify.svg"}
                alt="instagram logo"
                layout="responsive"
                width={32}
                height={32}
              />

            </a>

            <a  href={soundCloudHandle} className="block w-8 vw:w-[2.222vw]">

              <Image
                src={"/images/soundCloud.svg"}
                alt="instagram logo"
                layout="responsive"
                width={32}
                height={32}
              />

            </a>

          </div>

          <div className="flex md2:hidden items-center space-x-[35px] vw:space-x-[2.430vw]">

            {privacyPolicyHandle && (
              <Link href={privacyPolicyHandle.link.url} passHref>
                <a className={`text-[18px] vw:text-[1.25vw] leading-[25px] vw:leading-[1.3888] tracking-[-.04em] font-light`} >
                  {privacyPolicyHandle.title}
                </a>
              </Link>
            )}
            
            {
              cookiesPreferencesHandle && (
                <Link href={cookiesPreferencesHandle.link.url} passHref>
                  <a className={`text-[18px] vw:text-[1.25vw] leading-[25px] vw:leading-[1.3888] tracking-[-.04em] font-light`} >
                    {cookiesPreferencesHandle.title}
                  </a>
                </Link>
              )
            }

          </div>

          <p className="block opacity-80 text-lg vw:text-[1.25vw] leading-[25px] vw:leading-[1.3888] tracking-[-.04em] font-light font-avenir">
            ©2022 Casa Madera
          </p>

        </div>

      </div>

    </footer>

  )

}
