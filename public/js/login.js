const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {  
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {    
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  } else {Swal.fire("Please enter a valid email and password")}
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  const entered_birthdate = document.querySelector('#birthdate-signup').value;

  let dob = new Date(entered_birthdate);
  let month_diff = Date.now() - dob.getTime();
  let age_dt = new Date(month_diff);
  let year = age_dt.getUTCFullYear();
  let age = Math.abs(year - 1970);
  let ageDiff = 48 - age;

  console.log("Age of the person: "+ age + " years");

  if(age >= 48) {let birth_date = entered_birthdate;
    if (name && email && password && birth_date && age) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ name, email, password, birth_date, age }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        Swal.fire(response.statusText);
      }
     } else { Swal.fire("Please make sure to enter your name, a valid email, a secure password and your birthdate")}  
  } else if( age < 48) 
    Swal.fire("Sorry - you are not old enough. Please come back in " + ageDiff + " years. See you then!");  
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
