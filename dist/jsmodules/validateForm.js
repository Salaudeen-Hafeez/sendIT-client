const setErrorFor = (inp, message) => {
  inp.style.border = '1px solid red';
  const inputFeild = inp.parentElement;
  const small = inputFeild.querySelector('small');
  small.style.visibility = 'visible';
  small.style.color = 'red';
  small.innerHTML = message;
};

const formValidation = (input) => {
  const pattern =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const contactPattern =
    /^[\+]?([0-9][\s]?|[0-9]?)([(][0-9]{3}[)][\s]?|[0-9]{3}[-\s\.]?)[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  const data = {};
  let emptyInput = false;
  input.forEach((inp) => {
    if (inp.value.trim() === '') {
      if (inp.getAttribute('name') === 'amount') {
        return
      }else if (inp.getAttribute('name') === 'password1') {
        emptyInput = true;
        setErrorFor(inp, 'password confirmation can not be blank');
      } else {
        const message = `${inp.getAttribute('name')} can not be blank`;
        emptyInput = true;
        setErrorFor(inp, message);
      }
    }else if (inp.getAttribute('name') === 'weight') {
      if(isNaN(inp.value.trim())){
        emptyInput = true;
        setErrorFor(inp, 'Please enter a valid nuber in kg');
      }
    } else if (inp.getAttribute('name') === 'frajile') {
      if (inp.checked) {
        data[inp.getAttribute('name')] = 'the package is frajile';
      } else {
        data[inp.getAttribute('name')] = 'not frajile';
      }
    } else if (inp.getAttribute('name') === 'email') {
      if (pattern.test(inp.value.trim().toLowerCase())) {
        data[inp.getAttribute('name')] = inp.value.trim().toLowerCase();
      } else {
        emptyInput = true;
        setErrorFor(inp, 'Invalid email address');
      }
    } else if (
      inp.getAttribute('name') === 'reciever' ||
      inp.getAttribute('name') === 'sender'
    ) {
      if (contactPattern.test(inp.value.trim())) {
        data[inp.getAttribute('name')] = inp.value.trim();
      } else {
        emptyInput = true;
        setErrorFor(inp, 'Invalid phone number');
      }
    } else if (inp.getAttribute('name') === 'password') {
      if (inp.value.trim().length < 6) {
        emptyInput = true;
        setErrorFor(inp, 'The password length must be 6 or more character');
      } else {
        data[inp.getAttribute('name')] = inp.value.trim();
      }
    } else if (inp.getAttribute('name') === 'password1') {
      if (inp.value.trim().length < 6) {
        emptyInput = true;
        setErrorFor(inp, 'The password length must be 6 or more');
      } else if (data.password !== inp.value.trim()) {
        emptyInput = true;
        setErrorFor(inp, 'The password does not match');
      }
    }else {
      data[inp.getAttribute('name')] = inp.value.trim();
    }
  });
  return { emptyInput, data };
};

export { formValidation };
