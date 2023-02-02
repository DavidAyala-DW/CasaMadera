import Image from "next/image"
import { useEffect, useRef, useState } from "react";


export default function Newsletter(props) {

  const [sendedEmail, setSendedEmail] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);
  const email = useRef(null);

  async function handleSubmit(e){

    e.preventDefault();

    const value = email.current.value;
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/;

    if(regex.test(value)){

      setSendingEmail(true);

      try {
        
        const request = await fetch("/api/mailchimp",{
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: value
          })
        });

        const response = await request.json();
        const {status, message} = response;

        if(status === "successful"){
          email.current.value = message;
          email.current.readOnly = true;
          setSendedEmail(true);
        }


      } catch (error) {
        console.log(error);
        setSendingEmail(false);
      }

    }

  }

  const {
    title,
    titleSize,
    description,
    descriptionSize,
    placeholder,
    is_h1
  } = props;

  const titleOptions = {
    "normal" : "text-[32px] vw:text-[1.666vw] leading-[44px] vw:leading-[1.375] font-light mb-6 vw:mb-[1.25vw] ",
    "large" : "text-[48px] vw:text-[2.5vw] leading-[1.2] font-light mb-4 vw:mb-[.8333vw]",
  }

  const descriptionOptions = {
    "normal" : "text-base leading-[1.5] font-normal md:max-w-[551px] vw:max-w-[28.69vw] mb-10 vw:mb-[2.08333vw]",
    "large": "text-base leading-[1.5] font-normal md:max-w-[500px] lg:max-w-[568px] vw:max-w-[29.5833vw] mb-10 vw:mb-[2.08333vw]"
  }

  return (

    <section className='px-4 md:px-0 md:max-w-[94.4%] w-full mx-auto flex flex-col text-[#4A3419]'>

      {
        is_h1 ? (
          <h1
            className={`text-center 
            ${ titleSize ? titleOptions[titleSize] : titleOptions["normal"] }`}
          >
            {title}
          </h1>
        ): (
          <h2
            className={`text-center 
            ${ titleSize ? titleOptions[titleSize] : titleOptions["normal"] }`}
          >
            {title}
          </h2>
        )
      }

      <p
        className={`text-center opacity-[.85] md:mx-auto
        ${descriptionSize ? descriptionOptions[descriptionSize] : descriptionOptions["normal"] }`}
      >
        {description}
      </p>

      <form  onSubmit={handleSubmit}  className='w-full flex flex-col'>

        <fieldset className='flex items-center space-x-5 justify-between w-full border-2 vw:border-[.104vw] border-[rgba(74,_52,_25,_0.2)] py-3 vw:py-[.625vw] px-4 lg:pl-6 vw:pl-[1.25vw] lg:pr-[14px] vw:pr-[.729vw] md:max-w-[517px] vw:max-w-[26.9270vw] md:mx-auto'>

          <input
            type="text"
            placeholder={placeholder}
            name="email"
            ref={email}
            className="outline-none w-full font-light bg-transparent text-lg vw:text-[.9375vw] leading-[25px] vw:leading-[1.3888] opacity-80 placeholder:opacity-80 placeholder:text-[rgba(74,_52,_25,_0.5)]"
          />
          
          {
            !sendedEmail && (
              <button
                type="submit" 
                className="w-[26px] vw:w-[1.354vw]"
                {...{"disabled" : sendingEmail }}
              >
                <Image
                  src="/images/footerArrow.svg"
                  alt="White arrow"
                  width={26}
                  height={19}
                  layout="responsive"
                />
              </button>
            )
          }

          {
            sendedEmail && (
              <svg  className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                <path d="M12.7875 21.825L23.4 11.2125L21.675 9.525L12.7875 18.4125L8.2875 13.9125L6.6 15.6L12.7875 21.825ZM15 30C12.95 30 11.0125 29.6062 9.1875 28.8187C7.3625 28.0312 5.76875 26.9562 4.40625 25.5937C3.04375 24.2312 1.96875 22.6375 1.18125 20.8125C0.39375 18.9875 0 17.05 0 15C0 12.925 0.39375 10.975 1.18125 9.15C1.96875 7.325 3.04375 5.7375 4.40625 4.3875C5.76875 3.0375 7.3625 1.96875 9.1875 1.18125C11.0125 0.39375 12.95 0 15 0C17.075 0 19.025 0.39375 20.85 1.18125C22.675 1.96875 24.2625 3.0375 25.6125 4.3875C26.9625 5.7375 28.0312 7.325 28.8187 9.15C29.6062 10.975 30 12.925 30 15C30 17.05 29.6062 18.9875 28.8187 20.8125C28.0312 22.6375 26.9625 24.2312 25.6125 25.5937C24.2625 26.9562 22.675 28.0312 20.85 28.8187C19.025 29.6062 17.075 30 15 30ZM15 27.75C18.55 27.75 21.5625 26.5062 24.0375 24.0187C26.5125 21.5312 27.75 18.525 27.75 15C27.75 11.45 26.5125 8.4375 24.0375 5.9625C21.5625 3.4875 18.55 2.25 15 2.25C11.475 2.25 8.46875 3.4875 5.98125 5.9625C3.49375 8.4375 2.25 11.45 2.25 15C2.25 18.525 3.49375 21.5312 5.98125 24.0187C8.46875 26.5062 11.475 27.75 15 27.75Z" fill="#373737"/>
              </svg>
            )
          }

        </fieldset>        

      </form>

    </section>

  )

}
