const displayErr = (data) => {
  const erro = document.getElementById('errMessage');
  erro.innerHTML = '';
  erro.innerHTML = Object.values(data);
};
// const clearErr = (e) => {
//   e.style.border = '1px solid lightgreen';
//   const small = e.parentElement.querySelector('small');
//   small.style.visibility = 'hidden';
// };
const clearDisplayErr = () => {
  const erro = document.getElementById('errMessage');
  erro.innerHTML = '';
};
const setErrorFor = (inp, message) => {
  inp.style.border = '1px solid red';
  const inputFeild = inp.parentElement;
  const small = inputFeild.querySelector('small');
  small.style.visibility = 'visible';
  small.style.color = 'red';
  small.innerHTML = message;
};

export { displayErr, clearDisplayErr, setErrorFor };
