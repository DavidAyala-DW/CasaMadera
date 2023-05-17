import { useRouter } from 'next/router'
import {
  FaFacebook,
  FaLinkedinIn,
  FaRegEnvelope,
  FaTwitter,
} from 'react-icons/fa'
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from 'react-share'

// TODO: Use a context to get this from site settings
const siteBaseUrl = 'https://thecasamadera.com'

const iconSize = '20px'
const buttonClassName = 'flex justify-center items-center w-[40px] h-[40px] !bg-primary !text-body !rounded-full'

export default function SocialShareButtons() {
  const router = useRouter()
  const url = new URL(router.asPath, siteBaseUrl).href

  return (
    <div className="grid grid-flow-col gap-x-3 justify-center">
      <TwitterShareButton url={url} className={buttonClassName}>
        <FaTwitter size={iconSize} title="Share on Twitter" />
      </TwitterShareButton>
      <LinkedinShareButton url={url} className={buttonClassName}>
        <FaLinkedinIn size={iconSize} title="Share on LinkedIn" />
      </LinkedinShareButton>
      <FacebookShareButton url={url} className={buttonClassName}>
        <FaFacebook size={iconSize} title="Share on Facebook" />
      </FacebookShareButton>
      <EmailShareButton url={url} className={buttonClassName}>
        <FaRegEnvelope size={iconSize} title="Email this article" />
      </EmailShareButton>
    </div>
  )
}
