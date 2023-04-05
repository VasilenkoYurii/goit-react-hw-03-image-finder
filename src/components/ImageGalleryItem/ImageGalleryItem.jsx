import PropTypes from 'prop-types';
import {
  ImageGalleryItemLi,
  ImageGalleryItemImage,
} from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ hits, openModal }) => {
  console.log(hits);
  return hits.map(({ id, webformatURL, largeImageURL }) => {
    return (
      <ImageGalleryItemLi
        key={id}
        onClick={() => {
          openModal(largeImageURL);
        }}
      >
        <ImageGalleryItemImage src={webformatURL} alt={id} />
      </ImageGalleryItemLi>
    );
  });
};

ImageGalleryItem.prototype = {
  hits: PropTypes.array.isRequired,
};
