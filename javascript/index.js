document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://v2.api.noroff.dev';
    const token = localStorage.getItem('token');

    const carousel = document.getElementById('carousel');

    function fetchBlogPosts() {
        fetch(`${apiUrl}/blog/posts/Asora`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(response => response.json())
        .then(result => {
            const posts = result.data;
            console.log(posts); // Log the fetched posts to the console
            // Now you can handle the fetched posts as needed
        })
        .catch(error => console.error('Error fetching blog posts:', error));
    }

    fetchBlogPosts();

})