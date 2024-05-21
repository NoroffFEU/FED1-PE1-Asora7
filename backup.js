function fetchBlogPosts() {
    fetch(`${apiUrl}/blog/posts/Asora`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(posts => {
        console.log('Parsed JSON:', posts);
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