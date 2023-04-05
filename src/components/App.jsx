import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Blocks } from 'react-loader-spinner';
import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';

const API_KEY = '33687717-ba072cce310c3fac718a1e690';

export class App extends Component {
  state = {
    hits: null,
    page: 1,
    request: '',
    loading: false,
  };

  async componentDidUpdate(prevProp, prevState) {
    const prevRequest = prevState.request;
    const nextRequest = this.state.request;

    if (prevRequest !== nextRequest) {
      try {
        this.setState({ loading: true, hits: null });

        const respons = await axios.get(
          `https://pixabay.com/api/?q=${nextRequest}&page=${this.state.page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
        );
        const responceHits = respons.data.hits;
        this.setState({ hits: responceHits, loading: false });
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

  render() {
    const { hits, loading } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSubmit.bind(this)} />
        {loading && <Blocks visible={true} height="80" width="80" />}
        <ImageGallery>{hits && <ImageGalleryItem hits={hits} />}</ImageGallery>
        <ToastContainer />
      </div>
    );
  }
}
