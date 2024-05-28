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
    const postButton = document.getElementById('postButton');

    let selectedPostId = null;

    newPostButton.addEventListener('click', showNewPostForm);
    deletePostButton.addEventListener('click', confirmDeletePost);
    editPostButton.addEventListener('click', showEditForm);
    postForm.addEventListener('submit', createOrUpdatePost);

    function fetchBlogPosts() {
        fetch(`${apiUrl}/blog/posts/Asora`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(response => response.json())
        .then(result => {
            const posts = result.data;
            const postsList = document.querySelector('.posts-list');
            postsList.innerHTML = '';

            if (Array.isArray(posts)) {
                posts.forEach(post => {
                    const li = document.createElement('li');
                    li.innerHTML = `<strong>${post.title}</strong>`;
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
            return; // Prevent further execution of the function
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
    
        const request = selectedPostId ? updatePost(selectedPostId, postData) : createPost(postData);
    
        request.then(response => {
            if (response.ok) {
                fetchBlogPosts();
                postForm.reset();
                postEdit.style.display = 'none';
                postDetail.style.display = 'none';
                showMessage(selectedPostId ? "Post updated successfully." : "Post created successfully.", "success");
                selectedPostId = null;
                postButton.innerText = "Create Post"; 
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
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(response => response.json())
        .then(result => {
            const post = result.data;
            updatePostDetail(post.title, post.media?.url, post.body, post.author, post.created, post.updated);
            selectedPostId = post.id;
            postEdit.style.display = 'none';
            postDetail.style.display = 'block';
            highlightSelectedPost(postId);
        })
        .catch(error => console.error('Error fetching post detail:', error));
    }

    function updatePostDetail(title, imageUrl, content, author, created, updated) {
        document.getElementById('detailTitle').innerText = title;
        document.getElementById('detailAuthor').innerText = `By ${author.name}`;
        document.getElementById('detailPublished').innerText = `Published on ${new Date(created).toLocaleDateString()}`;
        document.getElementById('detailUpdated').innerText = `Updated on ${new Date(updated).toLocaleDateString()}`;
    
        const detailImage = document.getElementById('detailImage');
        detailImage.src = imageUrl || '';
        detailImage.style.display = imageUrl ? 'block' : 'none';
    
        const paragraphs = content.split('\n').map(para => `<p>${para}</p>`).join('');
        document.getElementById('detailBody').innerHTML = paragraphs;
    }
    

    function highlightSelectedPost(postId) {
        const postItems = document.querySelectorAll('.post-item');
        postItems.forEach(item => {
            item.classList.remove('selected');
            if (item.dataset.postId === postId) {
                item.classList.add('selected');
            }
        });
    }

    function showMessage(message, type) {
        messageDiv.innerText = message;
        messageDiv.className = type;
        messageDiv.style.display = 'block';
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 3000);
    }

    function isValidUrl(url) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }

    function showNewPostForm() {
        selectedPostId = null;
        postForm.reset();
        postEdit.style.display = 'block';
        postDetail.style.display = 'none';
        postButton.innerText = "Create Post";
    }

    function showEditForm() {
        fetch(`${apiUrl}/blog/posts/Asora/${selectedPostId}`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(response => response.json())
        .then(result => {
            const post = result.data;
            document.getElementById('postTitle').value = post.title;
            document.getElementById('postBody').value = post.body;
            document.getElementById('postImage').value = post.media?.url || '';
            
            postEdit.style.display = 'block';
            postDetail.style.display = 'none';
            postButton.innerText = "Update Post";
            
            const existingDeleteButton = document.querySelector('.delete-post-button');
            if (existingDeleteButton) {
                existingDeleteButton.remove();
            }
    
            const deleteButton = document.createElement('button');
            deleteButton.innerText = 'Delete Post';
            deleteButton.classList.add('delete-post-button');
            deleteButton.addEventListener('click', () => confirmDeletePost()); 
            postEdit.appendChild(deleteButton); 
        })
        .catch(error => console.error('Error fetching post data:', error));
    }
    
    
    function confirmDeletePost() {
        if (confirm("Are you sure you want to delete this post?")) {
            deletePost(selectedPostId);
        }
    }

    function deletePost(postId) {
        fetch(`${apiUrl}/blog/posts/Asora/${postId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(response => {
            if (response.ok) {
                fetchBlogPosts();
                postDetail.style.display = 'none';
                showMessage("Post deleted successfully.", "success");
    
                postForm.reset();
    
                const deleteButton = document.querySelector('.delete-post-button');
                if (deleteButton) {
                    deleteButton.remove();
                }
    
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
    

    fetchBlogPosts();
});











