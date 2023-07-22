const createLoader = () => () => fetch(
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
    console.log(data);
    return data;
  })
  .catch((err) => {
    alert(err);
  });

export {createLoader};
