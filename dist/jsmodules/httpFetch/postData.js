import { clearDisplayErr } from '../errMessages.js';

const postData = async (url, data) => {
  clearDisplayErr();
  let returnData = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then((resp) => resp.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
  console.log(returnData);
  return returnData;
};
export { postData };
