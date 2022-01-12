const displayErr = (data) => {
  const erro = document.getElementById('errMessage');
  erro.innerHTML = '';
  erro.innerHTML = Object.values(data);
};

const clearDisplayErr = () => {
  const erro = document.getElementById('errMessage');
  erro.innerHTML = '';
};

export { displayErr, clearDisplayErr };
