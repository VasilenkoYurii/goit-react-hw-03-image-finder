import PropTypes from 'prop-types';
import { ImageGalleryUl } from './ImageGallery.styled';

export const ImageGallery = ({ children }) => {
  return <ImageGalleryUl>{children}</ImageGalleryUl>;
};

ImageGallery.prototype = {
  children: PropTypes.any.isRequired,
};
