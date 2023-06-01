import PropTypes from 'prop-types';
import { PortableText } from '@portabletext/react';

import CenterText from './center-text';
import SanityImage from './sanity-image';

function SimpleBlockContent(props) {
  const { blocks } = props;
  if (!blocks) {
    return null;
  }

  return (
    <div className="portableText flex flex-col space-y-5">
      <PortableText
        value={blocks}
        components={{
          types: {
            'sanity.imageAsset': ({ value }) => (
              <div className="py-6">
                <SanityImage src={value} />
              </div>
            ),
          },
          marks: {
            center: CenterText,
          },
        }}
      />
    </div>
  );
}

SimpleBlockContent.propTypes = {
  blocks: PropTypes.arrayOf(PropTypes.object),
};

export default SimpleBlockContent;
