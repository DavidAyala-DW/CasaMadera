import { useForm } from 'react-hook-form'
import { nopeResolver } from '@hookform/resolvers/nope'
import Nope from 'nope-validator'
import { useEffect, useState } from 'react';
import Field from '../field'
import Checkbox from '../checkbox'
import File from '../inputFile';

export default function Contact(props) {

  const {title, description} = props;
  const [activeOption, setActiveOption] = useState();
  
  const schema = Nope.object().shape({
    name: Nope.string().required(),
    email: Nope.string().email().required(),
    message: Nope.string()
  })

  useEffect(() => {
    setActiveOption("inquiry")
  }, []);

  const {
    register,
    formState: { errors, isValid, isSubmitted },
    handleSubmit,
  } = useForm({ resolver: nopeResolver(schema) })

  const onSubmit = (values) => console.log(values)

  return (

    <section className="px-4 md:px-0 md:max-w-[93.3%] pt-[120px] md:pt-[173px] vw:pt-[12.01vw] w-full mx-auto flex flex-col">

      <h1 className="tracking-[.05em] text-center text-[32px] lg:text-[40px] vw:text-[2.777vw] leading-[1.2] uppercase font-extralight mb-6 vw:mb-[1.666vw] opacity-90">
        {title}
      </h1>

      <p className="opacity-80 text-center leading-[1.5] text-[20px] vw:text-[1.3888vw] font-light mb-12 vw:mb-[3.333vw]">
        {description}
      </p>

      <div className="grid grid-cols-[51%_calc(49%-44px)] gap-x-[44px] gap-y-7 w-max mx-auto mb-20 md:hidden">
        <Checkbox {...{activeOption}} {...{setActiveOption}} text="General Inquiry" id="inquiry"/>
        <Checkbox {...{activeOption}} {...{setActiveOption}} text="Investors" id="investors"/>
        <Checkbox {...{activeOption}} {...{setActiveOption}} text="Reservations" id="reservation"/>
        <Checkbox {...{activeOption}} {...{setActiveOption}} text="Press" id="press"/>
        <Checkbox {...{activeOption}} {...{setActiveOption}} text="Careers" id="careers"/>
      </div>

      <div className="w-full md:max-w-[55%] md:mb-[36] lg:mb-20 vw:mb-[5.555vw] hidden md:flex items-center flex-wrap lg:max-w-max mx-auto">
        <Checkbox className="md:pr-[28px] md:mb-[26px] lg:mb-0 lg:pr-[57px] vw:pr-[3.985vw] last-of-type:!pr-0" {...{activeOption}} {...{setActiveOption}} text="General Inquiry" id="inquiry"/>
        <Checkbox className="md:pr-[28px] md:mb-[26px] lg:mb-0 lg:pr-[57px] vw:pr-[3.985vw] last-of-type:!pr-0" {...{activeOption}} {...{setActiveOption}} text="Reservations" id="reservation"/>        
        <Checkbox className="md:pr-[28px] md:mb-[26px] lg:mb-0 lg:pr-[57px] vw:pr-[3.985vw] last-of-type:!pr-0" {...{activeOption}} {...{setActiveOption}} text="Careers" id="careers"/>
        <Checkbox className="md:pr-[28px] md:mb-[26px] lg:mb-0 lg:pr-[57px] vw:pr-[3.985vw] last-of-type:!pr-0" {...{activeOption}} {...{setActiveOption}} text="Investors" id="investors"/>
        <Checkbox className="md:pr-[28px] md:mb-[26px] lg:mb-0 lg:pr-[57px] vw:pr-[3.985vw] last-of-type:!pr-0" {...{activeOption}} {...{setActiveOption}} text="Press" id="press"/>
      </div>

      <form
        className="lg:max-w-[47.08%] mx-auto w-full flex flex-col"
        encType="multipart/form-data"
        onSubmit={handleSubmit(onSubmit)}
      >

        <Field
          className="mb-[18px] vw:mb-[1.25vw]"
          register={register}
          type="text"
          label="Name"
          id="name"
          errors={errors}
          placeholder="Your name"
        />

        <Field
          className="mb-8 vw:mb-[2.222vw]"
          register={register}
          type="email"
          label="Email"
          id="email"
          errors={errors}
          placeholder="Your email"
        />

        {
          activeOption == "press" && (
            <File className="mb-[18px] vw:mb-[1.25vw]" />
          )
        }
        

        <Field
          className="mb-10 md:mb-12 vw:mb-[3.333vw]"
          type="textarea"
          register={register}
          label="Message"
          id="message"
        />

        <button 
          type="submit"
          className="text-[10px] vw:text-[.69444vw] leading-[11px] vw:leading-[1.1] tracking-[.05em] text-center uppercase opacity-80"
        >
          SEND MESSAGE
        </button>

      </form>

    </section>

  )

}
