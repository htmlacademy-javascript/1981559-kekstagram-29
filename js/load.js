const createLoader = (onSuccess, onError) => () => fetch(
  'https://29.javascript.pages.academy/kekstagram/data',
  {
    method: 'get',
    credentials: 'same-origin',
  },
)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }

    throw new Error(`${response.status} ${response.statusText}`);
  })
  .then((data) => {
    onSuccess(data);
  })
  .catch((err) => {
    onError(err);
  });

export {createLoader};
