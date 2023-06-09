const edit_id = document.querySelector('#edit-id').textContent;

const editPostFormHandler = async (event) => {
  event.preventDefault();

  const post_text = document.querySelector('#edit-text').value.trim();    

try {       
      const response = await fetch(`/api/posts/${edit_id}`, {
        method: 'PUT',
        body: JSON.stringify({ post_text }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to update post');
      }
    } catch (err) {
      console.error(err);
    };    
};


  document
  .querySelector('#edit-btn')
  .addEventListener("click", editPostFormHandler);
