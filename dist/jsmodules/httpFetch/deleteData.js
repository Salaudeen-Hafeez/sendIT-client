const deleteData = async (url) => {
  const deletedData = await fetch(url, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((resp) => resp.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
  return deletedData;
};

export { deleteData };
