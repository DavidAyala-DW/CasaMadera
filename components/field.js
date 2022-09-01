import React from 'react'

export default function Field(props) {
  const {
    register,
    type,
    label,
    id,
    errors = {},
    placeholder = "",
    className,  
  } = props;

  const error = Object.keys(errors).length != 0 ? errors[id] : null;

  return (

    <div
      className={`flex flex-col w-full ${className} `}
    >

      <fieldset
        className={`flex flex-col space-y-2 md:space-y-1 vw:space-y-[.2777vw] w-full`}
      >

        <label
          htmlFor={id}
          className={`block opacity-80 text-base md:text-[20px] vw:text-[1.3888vw] leading-[1.5] font-light`}
        >
          {label}
        </label>

        {

          type !== "textarea" && (

            <input
              {...register(id)}
              className={`
              outline-none bg-transparent border-2 border-[rgba(205,_205,_205,_0.2)]
              w-full block py-3 md:py-4 vw:py-[1.111vw] px-4 md:px-5 vw:px-[1.3888vw] opacity-80 text-base md:text-[20px] vw:text-[1.3888vw] leading-[1.5] font-light
              placeholder:text-white
              `}
              type={type}
              name={id}
              id={id}
              placeholder={placeholder}
            />

          )

        }

        {

          type === "textarea" && (
          
            <textarea
              {...register(id)}
              name={id}
              id={id}
              className={`
              outline-none bg-transparent border-2 border-[rgba(205,_205,_205,_0.2)]
              w-full block py-3 md:py-4 vw:py-[1.111vw] px-4 md:px-5 vw:px-[1.3888vw] opacity-80 text-base md:text-[20px] vw:text-[1.3888vw] leading-[1.5] font-light
              placeholder:text-white resize-none min-h-[180px] vw:min-h-[12.5vw]
              `}
            >

            </textarea>

          )

        }
        
      </fieldset>
        
      {
        error && (

          <div className="text-red-500 mt-2 vw:mt-[.555vw] font-light">
            {error?.message}
          </div>

        )
      }

    </div>

  )

}
