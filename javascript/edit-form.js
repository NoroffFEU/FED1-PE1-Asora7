document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://v2.api.noroff.dev';
    const token = localStorage.getItem('token');

    const postForm = document.getElementById('postForm');
    const newPostButton = document.getElementById('newPostButton');
    const postEdit = document.getElementById('postEdit');
    const postDetail = document.getElementById('postDetail');
    const messageDiv = document.getElementById('message');
    const deletePostButton = document.getElementById('deletePostButton');
    const editPostButton = document.getElementById('editPostButton');
    const updateButton = document.getElementById('updateButton');

    updateButton.addEventListener('click', () => { // Add this line
        createOrUpdatePost(event);
    });
    
    const postButton = document.getElementById('postButton');

    let selectedPostId = null;

    newPostButton.addEventListener('click', () => {
        postEdit.style.display = 'block';
        postDetail.style.display = 'none';
        postButton.style.display = 'block';
        updateButton.style.display = 'none';
        postForm.reset(); 
        selectedPostId = null;
        clearSelection();
    });

    deletePostButton.addEventListener('click', () => {
        if (confirm('Are you sure you want to delete this post?')) {
            deletePost();
        }
    });

    editPostButton.addEventListener('click', () => {
        postEdit.style.display = 'block';
        postDetail.style.display = 'none';
        postButton.style.display = 'none';
        updateButton.style.display = 'block';
        fillEditForm(selectedPostId); 
    });

    postForm.addEventListener('submit', createOrUpdatePost);

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
                    li.addEventListener('click', () => viewPostDetail(post.id));
                    postsList.appendChild(li);
                });
            } else {
                console.error('Error: posts is not an array', posts);
            }
        })
        .catch(error => console.error('Error fetching blog posts:', error));
    }

    function createPost(postData) {
        return fetch(`${apiUrl}/blog/posts/Asora`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        });
    }
    
    function updatePost(postId, postData) {
        return fetch(`${apiUrl}/blog/posts/Asora/${postId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        });
    }
    
    function createOrUpdatePost(event) {
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
    
        let method;
        let request;
    
        if (selectedPostId) {
            method = 'PUT';
            request = updatePost(selectedPostId, postData);
        } else {
            method = 'POST';
            request = createPost(postData);
        }
    
        request.then(response => {
            if (response.ok) {
                fetchBlogPosts();
                postForm.reset();
                postEdit.style.display = 'none';
                postDetail.style.display = 'none';
                showMessage(selectedPostId ? "Post updated successfully." : "Post created successfully.", "success");
                selectedPostId = null;
            } else {
                response.json().then(error => {
                    console.error('Error creating/updating post:', error);
                    showMessage(`Error creating/updating post: ${error.errors[0].message}`, "error");
                });
            }
        }).catch(error => {
            console.error('Error creating/updating post:', error);
            showMessage("Error creating/updating post. Please try again.", "error");
        });
    }
    

    function viewPostDetail(postId) {
        fetch(`${apiUrl}/blog/posts/Asora/${postId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(result => {
            const post = result.data;
            document.getElementById('detailTitle').textContent = post.title;
            document.getElementById('detailBody').textContent = post.body;
            const detailImage = document.getElementById('detailImage');
            if (post.media && post.media.url) {
                detailImage.src = post.media.url;
                detailImage.alt = post.media.alt || 'Post image';
                detailImage.style.display = 'block';
            } else {
                detailImage.style.display = 'none';
            }
            selectedPostId = post.id;
            postEdit.style.display = 'none';
            postDetail.style.display = 'block';

            const postItems = document.querySelectorAll('.post-item');
            postItems.forEach(item => {
                item.classList.remove('selected');
                if (item.dataset.postId == postId) {
                    item.classList.add('selected');
                }
            });
        })
        .catch(error => console.error('Error fetching post detail:', error));
    }

    function deletePost() {
        fetch(`${apiUrl}/blog/posts/Asora/${selectedPostId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if (response.ok) {
                fetchBlogPosts();
                postDetail.style.display = 'none';
                postEdit.style.display = 'none';
                showMessage("Post deleted successfully.", "success");
                selectedPostId = null;
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

    function showMessage(message, type) {
        messageDiv.style.display = 'block';
        messageDiv.textContent = message;
        messageDiv.className = type;
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 3000);
    }

    function clearSelection() {
        const postItems = document.querySelectorAll('.post-item');
        postItems.forEach(item => item.classList.remove('selected'));
    }

    function isValidUrl(url) {
        try {
            new URL(url);
            return true;
        } catch (_) {
            return false;
        }
    }

    function fillEditForm(postId) {
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
        })
        .catch(error => console.error('Error fetching post data for edit:', error));
    }

    fetchBlogPosts();
});








