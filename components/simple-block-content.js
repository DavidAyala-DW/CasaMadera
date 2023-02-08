import PropTypes from 'prop-types'
import { PortableText } from '@portabletext/react'

import EmbedHTML from './embed-html'
import Figure from './figure'
import ToggleText from './toggle-text'
import CenterText from "./center-text"

function SimpleBlockContent(props) {
  
  const { blocks } = props
  if (!blocks) {
    return null
  }

  return (
    
    <div className="portableText flex flex-col space-y-5">
      <PortableText
        value={blocks}
        components={{
          types: {
            embedHTML: EmbedHTML,
            figure: Figure,
            toggleText: ToggleText,
          },
          marks: {
            center: CenterText,
          }

        }}
      />
    </div>
    
  )
}

SimpleBlockContent.propTypes = {
  blocks: PropTypes.arrayOf(PropTypes.object),
}

export default SimpleBlockContent
