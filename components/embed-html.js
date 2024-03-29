import PropTypes from 'prop-types'
import React from 'react'

function EmbedHTML({ node }) {
  const { html } = node
  if (!html) {
    return undefined
  }
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}

EmbedHTML.propTypes = {
  node: PropTypes.shape({
    html: PropTypes.string,
  }),
}
export default EmbedHTML
