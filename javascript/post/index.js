document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://v2.api.noroff.dev';
    const token = localStorage.getItem('token');
    const postContent = document.getElementById('postContent');

    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    fetch(`${apiUrl}/blog/posts/Asora/${postId}`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(response => response.json())
    .then(result => {
        const post = result.data;
        displayPost(post);
    })
    .catch(error => console.error('Error fetching post:', error));

    function displayPost(post) {
        postContent.innerHTML = '';

        const postContainer = document.createElement('div');
        postContainer.classList.add('post-container');


        const titleElement = document.createElement('h2');
        titleElement.textContent = post.title;
        postContainer.appendChild(titleElement);

        if (post.media && post.media.url) {
            const imageElement = document.createElement('img');
            imageElement.src = post.media.url;
            imageElement.alt = post.media.alt || '';
            postContainer.appendChild(imageElement);
        }

        const bodyElement = document.createElement('div');
        bodyElement.classList.add('post-body');
        bodyElement.innerHTML = formatContentWithParagraphs(post.body);
        postContainer.appendChild(bodyElement);

        const authorElement = document.createElement('p');
        authorElement.textContent = `Author: ${post.author.name}`;
        postContainer.appendChild(authorElement);

        postContent.appendChild(postContainer);
    }

    function formatContentWithParagraphs(content) {
        const paragraphs = content.split('\n').map(para => `<p>${para}</p>`).join('<br>');
        return `<div class="post-body">${paragraphs}</div>`;
    }
    
});

