import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Blocks } from 'react-loader-spinner';
import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { ButtonMore } from './Button/Button';
import { Modal } from './Modal/Modal';

const API_KEY = '33687717-ba072cce310c3fac718a1e690';

export class App extends Component {
  state = {
    hits: null,
    page: 1,
    request: '',
    showModal: false,
    largeImage: '',
    loading: false,
    buttonLoading: false,
    showButton: true,
  };

  async componentDidUpdate(prevProp, prevState) {
    const prevRequest = prevState.request;
    const nextRequest = this.state.request;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevRequest !== nextRequest) {
      try {
        this.setState({ loading: true, hits: null, page: 1 });

        const respons = await axios.get(
          `https://pixabay.com/api/?q=${nextRequest}&page=${nextPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
        );
        const responceHits = respons.data.hits;

        if (responceHits.length === 0) {
          toast.error(`We couldn't find anything, please try again!`);
        }

        if (responceHits.length < 12) {
          this.setState({
            hits: responceHits,
            loading: false,
            showButton: false,
          });
          return;
        }
        this.setState({ hits: responceHits, loading: false, showButton: true });
      } catch (error) {
        console.log(error);
      }
    }

    if (prevPage !== nextPage) {
      try {
        this.setState({ buttonLoading: true });
        const respons = await axios.get(
          `https://pixabay.com/api/?q=${nextRequest}&page=${nextPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
        );
        const responceHits = respons.data.hits;
        const newHits = [...this.state.hits, ...responceHits];

        if (responceHits.length < 12) {
          this.setState({
            hits: newHits,
            loading: false,
            showButton: false,
          });
          return;
        }

        this.setState({
          hits: newHits,
          buttonLoading: false,
          showButton: true,
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    if (e.target[1].value.toLowerCase().trim() === '') {
      toast.error('🦄 Enter a query!');
      return;
    }
    this.setState({ request: e.target[1].value.toLowerCase().trim() });
  }

  loadMore = () => {
    const nextPage = this.state.page + 1;
    this.setState({ page: nextPage });
  };

  openModal = image => {
    this.setState({ largeImage: image, showModal: true });
  };

  closeModal = () => {
    this.setState({ largeImage: '', showModal: false });
  };

  render() {
    const {
      hits,
      loading,
      request,
      buttonLoading,
      showModal,
      largeImage,
      showButton,
    } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSubmit.bind(this)} />
        {loading && <Blocks visible={true} height="80" width="80" />}
        <ImageGallery>
          {hits && <ImageGalleryItem hits={hits} openModal={this.openModal} />}
        </ImageGallery>
        {showButton &&
          !loading &&
          request !== '' &&
          (buttonLoading ? (
            <Blocks visible={true} height="40" width="40" />
          ) : (
            <ButtonMore loadMore={this.loadMore} />
          ))}
        <ToastContainer />
        {showModal && (
          <Modal closeModal={this.closeModal} largeImage={largeImage} />
        )}
      </div>
    );
  }
}
