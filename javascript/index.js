document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://v2.api.noroff.dev';
    const token = localStorage.getItem('token');
    const carouselContent = document.getElementById('carousel-content');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const postGrid = document.querySelector('.post-grid');
    let posts = [];
    let carouselPosts = [];
    let currentIndex = 0;

    function fetchBlogPosts() {
        fetch(`${apiUrl}/blog/posts/Asora?limit=12`, { 
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(response => response.json())
        .then(result => {
            posts = result.data;
            posts.sort((a, b) => new Date(b.created) - new Date(a.created));
            carouselPosts = posts.slice(0, 3); 
            displayPosts(); 
            displayThumbnailPosts(); 
        })
        .catch(error => console.error('Error fetching blog posts:', error));
    }

    function formatContentWithParagraphs(content) {
        const paragraphs = content.split('\n').slice(0, 3).map(para => `<p>${para}</p>`).join('');
        return `<div class="post-body">${paragraphs}</div>`;
    }

    function displayPosts() {
        carouselContent.innerHTML = '';

        const post = carouselPosts[currentIndex];

        const postContainer = document.createElement('div');
        postContainer.classList.add('post-container');

        if (post.media && post.media.url) {
            const imageElement = document.createElement('img');
            imageElement.src = post.media.url;
            imageElement.alt = post.media.alt || '';
            postContainer.appendChild(imageElement);
        }

        const titleElement = document.createElement('h2');
        titleElement.textContent = post.title;
        postContainer.appendChild(titleElement);

        const bodyElement = document.createElement('div');
        bodyElement.classList.add('post-body');
        bodyElement.innerHTML = formatContentWithParagraphs(post.body);
        postContainer.appendChild(bodyElement);

        const readMoreButton = document.createElement('button');
        readMoreButton.textContent = 'Read more..';
        readMoreButton.classList.add('read-more');
        
        readMoreButton.addEventListener('click', () => {
            window.location.href = `post/index.html?id=${post.id}`;
        });

        postContainer.appendChild(readMoreButton);

        postContainer.style.opacity = 0;

        setTimeout(() => {
            postContainer.style.opacity = 1;
        }, 10);

        carouselContent.appendChild(postContainer);
    }

    function displayThumbnailPosts() {
        postGrid.innerHTML = '';

        posts.forEach(post => {
            const postThumbnail = document.createElement('div');
            postThumbnail.classList.add('post-thumbnail');

            const thumbnailImage = document.createElement('img');
            thumbnailImage.src = post.media.url;
            thumbnailImage.alt = post.title;
            postThumbnail.appendChild(thumbnailImage);

            postThumbnail.addEventListener('click', () => {
                window.location.href = `post/index.html?id=${post.id}`;
            });

            postGrid.appendChild(postThumbnail);
        });
    }

    function showNextPost() {
        currentIndex = (currentIndex + 1) % carouselPosts.length;
        displayPosts();
    }

    function showPrevPost() {
        currentIndex = (currentIndex - 1 + carouselPosts.length) % carouselPosts.length;
        displayPosts();
    }

    prevButton.addEventListener('click', showPrevPost);
    nextButton.addEventListener('click', showNextPost);

    fetchBlogPosts();
});



