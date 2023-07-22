import axios from 'axios';

const URL = 'https://pixabay.com/api/';
const KEY = '17074451-935a1dfdbcca0fa80856ea2a8';

export async function searchImages(inputValue, page) {
  const response = await axios.get(
    `${URL}?key=${KEY}&q=${inputValue}&image_type=photo&orientation=horizontal&safesearch=true&per_page=12&page=${page}`
  );
  return response;
}
