export default function File({className}) {

  return (

    <fieldset className={`flex flex-col w-full space-y-2 md:space-y-1 vw:space-y-[.2777vw] ${className}`}>

      <p className={`block opacity-80 text-base md:text-[20px] vw:text-[1.3888vw] leading-[1.5] font-light`}>
        Upload Attachment
      </p>

      <input
        type="file"
        id="file"
        className="hidden"
        accept=".txt,.pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      />

      <label htmlFor="file" className="outline-none bg-transparent border-2 border-[rgba(205,_205,_205,_0.2)]
        w-full block py-[30px] vw:py-[2.0833vw] px-5 vw:px-[1.3888vw] opacity-80 text-base md:text-[20px] vw:text-[1.3888vw] leading-[1.5] font-light
        placeholder:text-white resize-none cursor-pointer"
      >

        <p className="text-base md:text-[20px] vw:text-[1.3888vw] leading-[1.5] opacity-80 font-light underline mb-1 vw:mb-[.2777vw]">
          Click here to upload attachment
        </p>

        <p className="text-base md:text-[20px] vw:text-[1.3888vw] leading-[1.5] opacity-80 font-light">
          supports .pdf, .doc, .docx, .rtf, .wp or .txt file
        </p>

      </label>

  </fieldset>

  )

}
