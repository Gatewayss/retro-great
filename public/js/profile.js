const newFormHandler = async (event) => {
  event.preventDefault();

  const post_text = document.querySelector('#post-text').value.trim();

  if (post_text ) {
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({ post_text}),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create post');
    }
  }  
};

 const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete post');
    }
  }
};


const cloudName = "dkm1hkwdl";
const uploadPreset = "ttq2s0sa";

const myWidget = cloudinary.createUploadWidget({
cloudName: cloudName, 
uploadPreset: uploadPreset
  }, async (error, result) => { 
    if (!error && result && result.event === "success") {    
      let img = result.info.secure_url;     
      if (img ) {
        const response = await fetch(`/api/posts`, {
          method: 'POST',
          body: JSON.stringify({ img  }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (response.ok) {     
       
          document.location.replace('/profile');
        } else {
          alert('Failed to create post');
        }
      }       
    }
}
);

const myProfileWidget = cloudinary.createUploadWidget({
  cloudName: cloudName, 
  uploadPreset: uploadPreset
    }, async (error, result) => { 
      if (!error && result && result.event === "success") {          
        let profile_img = result.info.secure_url;     
        if (profile_img ) {
          const response = await fetch(`/api/posts`, {
            method: 'POST',
            body: JSON.stringify({ profile_img  }),
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          if (response.ok) {   
           
            document.location.replace('/profile');
          } else {
            alert('Failed to create post');
          }
        }       
      }
  }
  );

document.getElementById("upload_widget").addEventListener("click", function(){
  myWidget.open();
  }, false);

  document.getElementById("profile_widget").addEventListener("click", function(){
    myProfileWidget.open();
    }, false);
  


document
.querySelector('.new-post-form')
.addEventListener('submit', newFormHandler);
 

// document
// .querySelector('.post-list')
// .addEventListener('click', delButtonHandler);

document
.querySelector('.content-posts')
.addEventListener('click', delButtonHandler);