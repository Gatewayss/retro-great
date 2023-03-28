const filterHandler = async (event) => {
    event.preventDefault();
    console.log('this event handler works');
 
    
const startYrs = document.getElementById('start').value;
const endYrs = document.getElementById('end').value; 

if (startYrs == 45 && endYrs == 50) {  
  const response = await fetch('/filter1', {
    method: 'GET',    
  });

  if (response.ok) {      
      document.location.replace('/filter1');  
    } else {
      Swal.fire('Failed to filter');
    }
}  else if (startYrs == 45 && endYrs == 55) {  
  const response = await fetch('/filter2', {
    method: 'GET',    
  });

  if (response.ok) {
    document.location.replace('/filter2');
  } else {
    Swal.fire('Failed to filter');
  }
} else if (startYrs == 45 && endYrs == 60) {  
  const response = await fetch('/filter3', {
    method: 'GET',    
  });

  if (response.ok) {
    document.location.replace('/filter3');
  } else {
    Swal.fire('Failed to filter');
  }
} else if (startYrs == 50 && endYrs == 55) {  
  const response = await fetch('/filter4', {
    method: 'GET',    
  });
  if (response.ok) {
    document.location.replace('/filter4');
  } else {
    Swal.fire('Failed to filter');
  }
} else if (startYrs == 50 && endYrs == 60) {  
  const response = await fetch('/filter5', {
    method: 'GET',    
  });
  if (response.ok) {
    document.location.replace('/filter5');
  } else {
    Swal.fire('Failed to filter');
  }
} else if (startYrs == 55 && endYrs == 60) {  
  const response = await fetch('/filter6', {
    method: 'GET',    
  });
  if (response.ok) {
    document.location.replace('/filter6');
  } else {
    Swal.fire('Failed to filter');
  }
} else {Swal.fire('Please enter a valid age range')};      
};   

  document
  .getElementById('filter')
  .addEventListener('submit', filterHandler);