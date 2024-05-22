document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://v2.api.noroff.dev';
    const token = localStorage.getItem('token');

    console.log('Token:', token);

    const postForm = document.getElementById('postForm');
    const newPostButton = document.getElementById('newPostButton');
    const postEdit = document.getElementById('postEdit');
    const messageDiv = document.getElementById('message');

    if (!token || token === "") {
        console.error("Token not found or empty. User might not be logged in properly.");
        window.location.href = '../../account/login.html';
        return;
    }

    let selectedPostId = null;

    newPostButton.addEventListener('click', () => {
        postEdit.style.display = 'block';
        clearSelection();
    });

    function fetchBlogPosts() {
        fetch(`${apiUrl}/blog/posts/Asora`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(result => {
            console.log('Fetched Posts Response:', result);
            const posts = result.data;
            console.log('Parsed Posts:', posts);

            const postsList = document.querySelector('.posts-list');
            postsList.innerHTML = '';

            if (Array.isArray(posts)) {
                posts.forEach(post => {
                    const li = document.createElement('li');
                    li.textContent = post.title;
                    li.classList.add('post-item');
                    li.dataset.postId = post.id;
                    li.addEventListener('click', () => editPost(post.id));
                    postsList.appendChild(li);
                });
            } else {
                console.error('Error: posts is not an array', posts);
            }
        })
        .catch(error => console.error('Error fetching blog posts:', error));
    }

    function createPost(event) {
        event.preventDefault();

        const title = document.getElementById('postTitle').value;
        const body = document.getElementById('postBody').value; 
        const mediaUrl = document.getElementById('postImage').value;

        if (!title) {
            showMessage("Title is required.", "error");
            return;
        }
        if (mediaUrl && !isValidUrl(mediaUrl)) {
            showMessage("Invalid URL format for media.", "error");
            return;
        }

        const postData = {
            title: title,
            body: body,
            media: mediaUrl ? { url: mediaUrl, alt: mediaAlt } : undefined
        };

        fetch(`${apiUrl}/blog/posts/Asora`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        })
        .then(response => {
            if (response.ok) {
                fetchBlogPosts();
                postForm.reset();
                postEdit.style.display = 'none';
                showMessage("Post created successfully.", "success");
            } else {
                response.json().then(error => {
                    console.error('Error creating post:', error);
                    showMessage(`Error creating post: ${error.errors[0].message}`, "error");
                });
            }
        })
        .catch(error => {
            console.error('Error creating post:', error);
            showMessage("Error creating post. Please try again.", "error");
        });
    }

    function editPost(postId) {
        fetch(`${apiUrl}/blog/posts/Asora/${postId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(result => {
            const post = result.data;
            document.getElementById('postTitle').value = post.title;
            document.getElementById('postBody').value = post.body;
            document.getElementById('postImage').value = post.media ? post.media.url : '';
            selectedPostId = post.id;
            postEdit.style.display = 'block';

            const postItems = document.querySelectorAll('.post-item');
            postItems.forEach(item => {
                item.classList.remove('selected');
                if (item.dataset.postId === postId) {
                    item.classList.add('selected');
                }
            });
        })
        .catch(error => console.error('Error fetching post:', error));
    }

    function clearSelection() {
        selectedPostId = null;
        const postItems = document.querySelectorAll('.post-item');
        postItems.forEach(item => item.classList.remove('selected'));
        postForm.reset();
    }

    function showMessage(message, type) {
        messageDiv.textContent = message;
        messageDiv.className = type;
        messageDiv.style.display = 'block';
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 3000);
    }

    function isValidUrl(url) {
        const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
        return urlPattern.test(url);
    }

    postForm.addEventListener('submit', createPost);
    fetchBlogPosts();
});


