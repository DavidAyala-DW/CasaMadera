import SanityImage from './sanity-image'

export default function BackgroundImage(props) {
  
  const {image, imageMobile, alt_text, layout = "responsive", ...rest} = props;
  return (
    
    <div className="flex flex-col w-full h-full">

      <div className="block md:hidden w-full">
        <SanityImage  src={imageMobile} alt={alt_text ?? "Image"} layout={layout}  {...rest}/>
      </div>

      <div className="md:block hidden w-full">
        <SanityImage src={image} alt={alt_text ?? "Image"} layout={layout} {...rest} />
      </div>

    </div>

  )
}
