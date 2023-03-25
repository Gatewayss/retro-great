const commentForm = document.getElementById('comment-form');

const addComment = async (event) => {
    event.preventDefault();

    const comment_text = document.querySelector('#comment-input').value.trim();
    let post_id = document.getElementById('post_id').value;

    try {
        const response = await fetch(`/api/posts/${post_id}`, {
            method: 'POST',
            body: JSON.stringify({ comment_text, post_id }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            window.location.reload()
        } else {
            alert(response.statusText);
        }
    } catch (err) {
        console.error(err);
    }
};

commentForm.addEventListener('submit', addComment);
