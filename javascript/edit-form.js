document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://v2.api.noroff.dev';
    const token = localStorage.getItem('token');

    console.log('Token:', token);

    const postForm = document.getElementById('postForm');
    const newPostButton = document.getElementById('newPostButton');
    const postEdit = document.getElementById('postEdit');

    if (!token || token === "") {
        console.error("Token not found or empty. User might not be logged in properly.");
        window.location.href = '../../account/login.html';
        return; 
    }

    newPostButton.addEventListener('click', () => {
        postEdit.style.display = 'block';
    });

    function fetchBlogPosts() { 
        fetch(`${apiUrl}/blog/posts/Asora`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(posts => {
            const postsList = document.querySelector('.posts-list');
            postsList.innerHTML = '';

            posts.forEach(post => {
                const li = document.createElement('li');
                li.textContent = post.title;
                li.dataset.postId = post.id;
                li.addEventListener('click', () => editPost(post.id));
                postsList.appendChild(li); 
            });
        })
        .catch(error => console.error('Error fetching blog posts:', error));
    }

    function createPost(event) {
        event.preventDefault();

        const formData = new FormData(postForm);

        fetch(`${apiUrl}/blog/posts/Asora`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        })
        .then(response => {
            if (response.ok) {
                fetchBlogPosts();
                postForm.reset();
                postEdit.style.display = 'none';
            } else {
                response.text().then(text => console.error('Error creating post:', text)); 
            }
        })
        .catch(error => console.error('Error creating post:', error));
    }

    postForm.addEventListener('submit', createPost);
    fetchBlogPosts();
});
