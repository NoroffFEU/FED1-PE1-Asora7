document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://v2.api.noroff.dev';
    const token = localStorage.getItem('token');

    if (!token || token === "") {
        console.error("Token not found or empty. User might not be logged in properly.");
        window.location.href = '../../account/login.html';
        return; 
    }

    const postForm = document.getElementById('postForm');


    fetchBlogPosts();

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
                const ul = document.createElement('ul');
                ul.textContent = post.title;
                ul.dataset.postId = post.id;
                uli.addEventListener('click', () => editPost(post.id));
                blogPostsElement.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching blog posts:', error));
    }

    function editPost(postId) {
        fetch(`${apiUrl}/blog/posts/Asora/${postId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(post => {
            document.getElementById('postTitle').value = post.title;
            document.getElementById('postContent').value = post.content;

            deletePostButton.style.display = 'block';

            postForm.removeEventListener('submit', createPost);
            postForm.addEventListener('submit', event => editPostSubmit(event, postId));
        })
        .catch(error => console.error('Error editing post:', error));
    }

    function editPostSubmit(event, postId) {
        event.preventDefault();
        const formData = new FormData(postForm);
        fetch(`${apiUrl}/blog/posts/Asora/${postId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        })
        .then(response => {
            if(response.ok) {
                fetchBlogPosts();
                postForm.reset();
            } else {
                console.error('Error creating post:', response.statusText);
            }
        })
        .catch(error => console.error('Error creating post:', error));
    }

    function deletePost(postId) {
        fetch(`${apiUrl}/blog/posts/Asora/${postId}`, {
            method: 'DELETE', 
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if(response.ok) {
                fetchBlogPosts();
            } else {
                console.error('Error deleting post:', response.statusText);
            }
        })
        .catch(error => console.error('Error deleting post:', error));
    }

    function createPost(event) {
        event.preventDefault();

        const formData = new FormData(postForm);

        fetch(`v2.api.noroff.dev/blog/posts/Asora`, {
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
            } else {
                console.error('Error creating post:', response.statusText);
            }
        })
        .catch(error => console.error('Error creating post:', error));
    }

    deletePostButton.addEventListener('click', () => {
        const postId = deletePostButton.parentElement.dataset.postId;
        deletePost(postId);
    });

    postForm.addEventListener('submit', createPost);
});