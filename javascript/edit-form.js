document.addEventListener('DOMContentLoaded', function() {
    const editForm = document.getElementById('editForm');
    const deleteButton = document.getElementById('deleteButton');

    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    editForm.addEventListener('submit', function(event) {
        event.preventDefault();
        handleEditFormSubmit(postId);
    });

    deleteButton.addEventListener('click', function(event) {
        event.preventDefault();
        handleDeletePost(postId);
    });

    async function handleEditFormSubmit(postId) {
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        const image = document.getElementById('image').value;

        const postData = {
            title: title, 
            body: content,
            media: {
                url: image,
                alt: 'Image Alt Text'
            }
        };

        try {
            const response = await updatePostData(postId, postData);
            if (response) {
                displaySuccessMessage('Post updated successfully!');
            } 
        } catch (error) {
            displayErrorMessage('Failed to update post, try again');
        }
    }

    async function handleDeletePost(postId) {
        try {
            const response = await fetch('https://v2.api.noroff.dev/blog/posts/<name>/<id>', {
                method
            })
        }
    }



    function displaySuccessMessage(message) {
        const successMessage = document.getElementById('successMessage');
        successMessage.textContent = message;
        successMessage.style.color = 'green';
    }

    function displayErrorMessage(message) {
        const errorMessage = document.getElementById('errorMessage');
        errorMessage.textContent = message;
        errorMessage.style.color = 'red';
    }
});