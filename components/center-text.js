export default function CenterText(props) {

  const {text} = props;

  return (
    <span className="font-light text-[32px] leading-11 text-center block !font-avenir mb-6 mt-10">
      {text}
    </span>
  )
}
