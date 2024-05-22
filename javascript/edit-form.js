document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://v2.api.noroff.dev';
    const token = localStorage.getItem('token');

    const postForm = document.getElementById('postForm');
    const newPostButton = document.getElementById('newPostButton');
    const postEdit = document.getElementById('postEdit');
    const messageDiv = document.getElementById('message');
    const deletePostButton = document.getElementById('deletePostButton');
    const postButton = document.getElementById('postButton');
    const updateButton = document.getElementById('updateButton');

    let selectedPostId = null;

    newPostButton.addEventListener('click', () => {
        postEdit.style.display = 'block';
        clearSelection();
        toggleButtons(false); // Show "Create Post" button
    });

    deletePostButton.addEventListener('click', deletePost);

    postForm.addEventListener('submit', createPost);
    updateButton.addEventListener('click', updatePost);

    function fetchBlogPosts() {
        fetch(`${apiUrl}/blog/posts/Asora`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(result => {
            const posts = result.data;
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
            media: mediaUrl ? { url: mediaUrl } : undefined
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
                selectedPostId = null;
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

    function updatePost() {
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
            media: mediaUrl ? { url: mediaUrl } : undefined
        };

        fetch(`${apiUrl}/blog/posts/Asora/${selectedPostId}`, {
            method: 'PUT',
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
                showMessage("Post updated successfully.", "success");
                selectedPostId = null;
            } else {
                response.json().then(error => {
                    console.error('Error updating post:', error);
                    showMessage(`Error updating post: ${error.errors[0].message}`, "error");
                });
            }
        })
        .catch(error => {
            console.error('Error updating post:', error);
            showMessage("Error updating post. Please try again.", "error");
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
            toggleButtons(true); // Show "Update Post" button

            highlightSelectedPost(postId);
        })
        .catch(error => console.error('Error fetching post:', error));
    }

    function deletePost() {
        if (!selectedPostId) {
            showMessage("No post selected to delete.", "error");
            return;
        }

        fetch(`${apiUrl}/blog/posts/Asora/${selectedPostId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if (response.ok) {
                fetchBlogPosts();
                postForm.reset();
                postEdit.style.display = 'none';
                selectedPostId = null;
                showMessage("Post deleted successfully.", "success");
            } else {
                response.json().then(error => {
                    console.error('Error deleting post:', error);
                    showMessage(`Error deleting post: ${error.errors[0].message}`, "error");
                });
            }
        })
        .catch(error => {
            console.error('Error deleting post:', error);
            showMessage("Error deleting post. Please try again.", "error");
        });
    }

    function highlightSelectedPost(postId) {
        const postItems = document.querySelectorAll('.post-item');
        postItems.forEach(item => {
            item.classList.remove('selected');
            if (item.dataset.postId === postId.toString()) {
                item.classList.add('selected');
            }
        });
    }

    function clearSelection() {
        selectedPostId = null;
        const postItems = document.querySelectorAll('.post-item');
        postItems.forEach(item => item.classList.remove('selected'));
        postForm.reset();
        toggleButtons(false); // Show "Create Post" button
    }

    function toggleButtons(isEditMode) {
        if (isEditMode) {
            postButton.style.display = 'none';
            updateButton.style.display = 'block';
        } else {
            postButton.style.display = 'block';
            updateButton.style.display = 'none';
        }
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

    fetchBlogPosts();
});




