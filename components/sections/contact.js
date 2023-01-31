import { useForm } from 'react-hook-form'
import { nopeResolver } from '@hookform/resolvers/nope'
import Nope from 'nope-validator'
import { useEffect, useState, useRef } from 'react';
import Field from '../field'
import Checkbox from '../checkbox'
import File from '../inputFile';

export default function Contact(props) {

  const {title, description} = props;
  const [activeOption, setActiveOption] = useState();

  const consent = useRef(null);
  
  const schema = Nope.object().shape({
    name: Nope.string().required(),
    email: Nope.string().email().required(),
    message: Nope.string()
  })

  useEffect(() => {
    setActiveOption("general_inquiry")
  }, []);

  const {
    register,
    formState: { errors, isValid, isSubmitted },
    reset,
    handleSubmit,
  } = useForm({ resolver: nopeResolver(schema) })

  async function onSubmit(values) {

    const object = {
      ...values,
      consent_emails: (consent?.current?.checked) ? "yes" : "no",
      option: activeOption
    }

    console.log(object);

    try {

      const request = await fetch("/api/email",{
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },  
        body: JSON.stringify(object),
      });

      const response = await request.json();
      const {status, message} = response;
      if(status == "successful"){
        alert(message);
        reset()
      }

    } catch (error) {
      console.log(error);
    }

  }

  return (

    <section className="px-4 md:px-0 md:max-w-[94.4%] pt-[140px] md:pt-[189px] vw:pt-[9.843vw] w-full mx-auto flex flex-col">

      <h1 className="text-[48px] vw:text-[2.5vw] font-light leading-[66px] vw:leading-[1.375] text-center mb-6 vw:mb-[1.25vw]">
        {title}
      </h1>

      <p className="opacity-[.85] md:max-w-[430px] vw:max-w-[22.39vw] md:mx-auto text-[20px] md:text-[24px] vw:text-[1.25vw] leading-[25px] md:leading-[30px] vw:leading-[1.25] text-center font-normal mb-16 md:mb-[90px] vw:mb-[4.6875vw]">
        {description}
      </p>

      <div className="flex flex-col space-y-[30px] md:space-y-0 md:grid md:grid-cols-[51%_calc(49%-44px)] md:gap-x-[44px] md:gap-y-7 lg:flex lg:flex-row lg:space-x-[22px] vw:space-x-[1.1458vw] w-max mx-auto mb-20 vw:mb-[4.1666vw]">
        <Checkbox {...{activeOption}} {...{setActiveOption}} text="General Inquiry" id="general_inquiry"/>
        <Checkbox {...{activeOption}} {...{setActiveOption}} text="Careers" id="careers"/>
        <Checkbox {...{activeOption}} {...{setActiveOption}} text="Press" id="press"/>
      </div>

      <form
        className="lg:max-w-[47.08%] mx-auto w-full flex flex-col"
        encType="multipart/form-data"
        onSubmit={handleSubmit(onSubmit)}
      >

        <Field
          className="mb-[26px] vw:mb-[.9375vw]"
          register={register}
          type="text"
          label="Name"
          id="name"
          errors={errors}
          placeholder="Your name"
        />

        <Field
          className="mb-[26px] vw:mb-[1.6666vw]"
          register={register}
          type="email"
          label="Email"
          id="email"
          errors={errors}
          placeholder="Your email"
        />
{/* 
        {
          activeOption == "press" && (
            <File className="mb-[18px] vw:mb-[.9375vw]" />
          )
        } */}
        
        <Field
          className="mb-4 md:mb-12 vw:mb-[2.5vw]"
          type="textarea"
          placeholder="How can we help you?"
          register={register}
          label="Message"
          id="message"
        />

        <div className="flex items-center w-full justify-between space-x-5 mb-16 cursor-pointer">

          <div className="flex flex-col checkbox-newsletter border-2 border-primary p-[2px] cursor-pointer"> 

            <input ref={consent} type="checkbox" className="hidden" id="checkbox_sign_up" />
            <label className='block h-4 w-4 cursor-pointer' htmlFor="checkbox_sign_up"></label>
            
          </div>

          <p className='text-sm md:text-lg font-normal font-libreBaskerville leading-7 cursor-pointer'>
            Select this box to receive updates and marketing. You can change your preferences at any time as per our Privacy Policy.
          </p>

        </div>

        <button 
          type="submit"
          className="font-avenir text-lg vw:text-[.9375vw] leading-[25px] vw:leading-[1.3888] tracking-[.05em] text-center uppercase opacity-80 underline"
        >
          SEND MESSAGE
        </button>

      </form>

    </section>

  )

}

