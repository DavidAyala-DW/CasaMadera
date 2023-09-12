import clsx from 'clsx'
import Image from 'next/image'
import { useCallback, useState } from 'react'

export default function Faqs(props) {
  const { title, faqs } = props
  const [activeFAQ, setActiveFAQ] = useState(null)
  const handleClick = useCallback(
    (index) => {
      if (activeFAQ == index) {
        setActiveFAQ(null)
      } else {
        setActiveFAQ(index)
      }
    },
    [activeFAQ]
  )

  return (
    <section className="px-4 md:px-6 lg:px-0 lg:max-w-[94.4%] 3xl:max-w-[95.833%] w-full mx-auto flex flex-col md:!pr-[10%]">
      <div className="flex flex-col md:flex-row md:justify-between w-full gap-10 vw:gap-[2.08vw]">
        <h2 className="font-extralight text-[32px] lg:text-[48px] vw:text-[2.5vw] leading-[1.1] text-primary max-w-[390px] vw:max-w-[20vw]">
          {title}
        </h2>
        <div className="flex flex-col flex-grow gap-10 md:max-w-[50vw] lg:max-w-[700px] vw:gap-[2.08vw] vw:max-w-[36vw]">
          {faqs &&
            faqs.map((faq, index) => {
              const { question = '', answer = '' } = faq
              return (
                <div
                  className="flex flex-col pb-6 md:pb-10 vw:pb-[2.08vw] border-b border-[#4A3419] border-opacity-20 cursor-pointer"
                  onClick={() => handleClick(index)}
                  key={question + index + answer}
                >
                  <div className="flex items-center gap-5 justify-between">                    
                    <h3 className="text-[24px] lg:text-[32px] vw:text-[1.666vw] font-extralight leading-[1]">
                      {question}
                    </h3>
                    <div
                      className={clsx(
                        'flex flex-col min-w-[15px] w-[15px] md:min-w-[20px] md:w-5 min-h-[15px] md:min-h-[20px] h-[15px] md:h-5 relative transition-transform transform',
                        activeFAQ == index && '-rotate-180'
                      )}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className='w-full cursor-pointer h-full' viewBox="0 0 18 10" fill="none">
                        <path d="M17.5591 1.88L15.4959 -9.0185e-08L8.77954 6.10666L2.06319 -6.77347e-07L-8.21774e-08 1.88L8.77954 9.88L17.5591 1.88Z" fill="#4A3419"/>
                      </svg>
                    </div>
                  </div>
                  {activeFAQ == index && (
                    <p className="text-base vw:text-[.8333vw] font-extralight !leading-[1.5] pt-4 md:pt-6 vw:pt-[1.25vw] text-primary">
                      {answer}
                    </p>
                  )}
                </div>
              )
            })}
        </div>
      </div>
    </section>
  )
}
