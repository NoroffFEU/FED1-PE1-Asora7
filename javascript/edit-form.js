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

    function isValidUrl(url) {
        const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
        return urlPattern.test(url);
    }

    function showMessage(message, type) {
        messageDiv.textContent = message;
        messageDiv.className = type;
        messageDiv.style.display = 'block';
    }

    postForm.addEventListener('submit', createPost);
    fetchBlogPosts();
});
