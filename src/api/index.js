const API_URL = 'http://127.0.0.1:8000';

export const fetchHotelsFromApi = (query) => {
  return new Promise((resolve, reject) => {
     if (!query) {
         return reject('Parameters missing');
     }

     // fetch
     fetch(`${API_URL}/hotels${query}`)
         .then(response => response.json())
         .then(json => {
             resolve(json);
         })
         .catch(error => {
             reject(error);
         });
  });
};