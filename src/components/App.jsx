import React, { useState, useEffect } from 'react';
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
    if (value) {
      getImages();
    }
  }, [page, value]);

  const searchImageHandler = async () => {
    try {
      setIsLoading(true);
      const response = await searchImages(value, page);
      return response.data;
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getImages = async () => {
    const resp = await searchImageHandler();
    const data = resp.hits.map(({ id, webformatURL, largeImageURL, tags }) => ({
      id,
      webformatURL,
      largeImageURL,
      tags,
    }));
    const totalHits = resp.totalHits;
    const totalPages = Math.ceil(totalHits / 12);

    setImages(prevImages => [...prevImages, ...data]);
    setShowButton(page < totalPages);
  };

  const onClickLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handlerSearch = value => {
    setValue(value);
    setPage(1);
    setImages([]);
  };

  return (
    <div className="">
      <Searchbar onSearch={handlerSearch} />
      <ImageGallery images={images} />
      {showButton && <Button onClick={onClickLoadMore} />}
      {isLoading && <Loader />}
    </div>
  );
};

export default App;
