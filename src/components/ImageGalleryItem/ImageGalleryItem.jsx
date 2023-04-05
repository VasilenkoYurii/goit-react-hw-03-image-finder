import PropTypes from 'prop-types';
import {
  ImageGalleryItemLi,
  ImageGalleryItemImage,
} from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ hits }) => {
  console.log(hits);
  return hits.map(({ id, webformatURL, largeImageURL }) => {
    return (
      <ImageGalleryItemLi key={id}>
        <ImageGalleryItemImage src={webformatURL} alt={id} />
      </ImageGalleryItemLi>
    );
  });
};

ImageGalleryItem.prototype = {
  hits: PropTypes.array.isRequired,
};
