const fetchData = async (url) => {
  let returnData = await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((resp) => resp.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
  return returnData;
};
export { fetchData };
