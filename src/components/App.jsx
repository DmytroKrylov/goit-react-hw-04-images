import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { searchImages } from 'services/searchImage';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';

const App = () => {
  const [value, setValue] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [showButton, setShowButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!value) return;

    async function searchImageHandler() {
      try {
        setIsLoading(true);
        const resp = await searchImages(value, page);

        const { totalHits, hits } = resp.data;

        if (!Array.isArray(hits)) {
          console.error('Invalid response format: hits is not an array');
          setIsLoading(false);
          return;
        }

        const data = hits.map(({ id, webformatURL, largeImageURL, tags }) => {
          return {
            id,
            webformatURL,
            largeImageURL,
            tags,
          };
        });

        const totalPages = Math.ceil(totalHits / 12);
        setImages(images => [...images, ...data]);
        setShowButton(page < totalPages || page === 0);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    searchImageHandler();
  }, [page, value]);

  const handlerSearch = value => {
    setValue(value);
    setPage(1);
    setImages([]);
  };

  return (
    <div>
      <Searchbar onSearch={handlerSearch} />
      <ImageGallery images={images} />
      {showButton && <Button onClick={() => setPage(page => page + 1)} />}
      {isLoading && <Loader />}
    </div>
  );
};

export default App;
