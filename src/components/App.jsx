import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Blocks } from 'react-loader-spinner';
import { Component } from 'react';
// import { createPortal } from 'react-dom';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { ButtonMore } from './Button/Button';

const API_KEY = '33687717-ba072cce310c3fac718a1e690';
// const modalRoot = document.querySelector('#modal-root');

export class App extends Component {
  state = {
    hits: null,
    page: 1,
    request: '',
    loading: false,
    buttonLoading: false,
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
        this.setState({ hits: responceHits, loading: false });
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

        this.setState({ hits: newHits, buttonLoading: false });
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
    console.log(e.target[1].value.toLowerCase().trim());
  }

  loadMore = () => {
    const nextPage = this.state.page + 1;
    this.setState({ page: nextPage });
  };

  openModal = id => {
    console.log(id);
  };

  render() {
    const { hits, loading, request, buttonLoading } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSubmit.bind(this)} />
        {loading && <Blocks visible={true} height="80" width="80" />}
        <ImageGallery>
          {hits && <ImageGalleryItem hits={hits} openModal={this.openModal} />}
        </ImageGallery>
        {request !== '' &&
          !loading &&
          (buttonLoading ? (
            <Blocks visible={true} height="40" width="40" />
          ) : (
            <ButtonMore loadMore={this.loadMore} />
          ))}
        <ToastContainer />
      </div>
    );
  }
}
