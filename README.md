
# FED1 Project Exam 1

![Skjermbilde 2024-06-06 kl  12 58 00](https://github.com/NoroffFEU/FED1-PE1-Asora7/raw/main/assets/142609146/efe91a80-b0f4-4221-9990-9e5eee8fec96.png)


Dough Dreams is a responsive blogging application designed to manage and showcase pastry and cake recipes.

## Description

This front-end user interface interacts with an existing API to allow users to view dynamic blog posts and for the blog owner to manage their content easily. 
The application includes public pages for viewing blog content and admin pages for user registration, login, and post management. Admin login is made, and editing the posts is only avalible when logged in.
Key features:

- interactive banner carousel
- static list of latest posts
- responsive blog post pages
- blog post edit pages for the owner. 
- account login page
- registration pages


You can add some bullet points if you'd like to:

- List item 1
- List item 2
- List item 3

## Built With

You can list a the tech stack that you've used over here

- [React.js](https://reactjs.org/)
- [Bootstrap](https://getbootstrap.com)

## Getting Started

### Installing

This is where you list how to get the project started. It typically just includes telling a person to clone the repo and then to install the dependencies e.g.

1. Clone the repo:

```bash
git clone git@github.com:NoroffFEU/portfolio-1-example.git
```

2. Install the dependencies:

```
npm install
```

### Running

Here is where you detail how to run the app. It typically involves the commands you'd need to run to start the project e.g.

To run the app, run the following commands:

```bash
npm run start
```

## Contributing

Here you can detail any information you want to provide regarding contributing to the project. For big projects you will usually have a separate `CONTRIBUTING.md` and link to it, but for smaller projects you can simply include instructions here. These instructions can simply detail the process you want a person to take, such as to make sure to open a pull request so code can be reviewed.

## Contact

This is where you can leave your social links for people to contact you, such as a LinkedIn profile or Twitter link e.g.

[My Twitter page](www.twitter.com)

[My LinkedIn page](www.linkedin.com)

## License

You can link to your license file here if you're using one, or mention what license the codebase falls under. If you're unsure then you can simply delete this section.

## Acknowledgments

This is where you can add any acknowledgements if you'd like, such as to people who have helped you or any code snippets you'd like to mention. You can delete this section if you don't have any acknowledgements to make.










# FED1 Project Exam 1

Project Description

Dough Dreams is a responsive blogging application designed to manage and showcase pastry and cake recipes. This front-end user interface interacts with an existing API to allow users to view dynamic blog posts and for the blog owner to manage their content easily. The application includes public pages for viewing blog content and admin pages for user registration, login, and post management. This project utilizes design principles, HTML, CSS, and JavaScript.



Client


· Name: Dough Dreams

· Sector: Food Blogging (Cakes and Pastry Recipes)

· Size: 4-6 employees

· Location: Online (Global Reach)

· Mission: To inspire and empower baking enthusiasts with delicious and easy-to-follow recipes for cakes and pastries, offering tips and recipies that make every baking dream come true. We aim to make it easy for anyone to create good desserts, even on a hectic day.

· Target Audience: The primary audience for Dough Dreams consists of baking enthusiasts ranging from beginners to experienced bakers who are looking for easy-to-follow and delicious pastry and cake recipes. 




Features and User Stories

Blog Feed Page
Interactive Banner Carousel:

As a user, I want to see an interactive banner carousel on the blog feed page, so that I can view a rotation of the 3 latest posts.
As a user, I want to click on a button for each carousel item, taking me to the blog post page to read more.
As a user, I want to click on the previous or next button in the carousel to animate and reveal another post, to ensure I can see different posts easily.
As a user, I want the carousel to return to the first post after reaching the end of the list, and vice versa when clicking previous on the first post.

Static List of Latest Posts:

As a user, I want to view a static list of the 12 latest posts in a responsive thumbnail grid on the blog feed page, so I can easily select which post to read.
As a user, I want each thumbnail in the blog post feed to be clickable, taking me to the blog post page to read more.

Blog Post Public Page
As a user, I want to see a responsive layout showing the post title, author, publication date, image banner, and post content from the API.
As a user, I want each blog page to have a shareable URL including a query string or hash parameter that contains the post ID, so I can share the post with others easily.

Blog Post Edit Page
As the owner, I want the blog post edit page to be available only for me when logged in, to ensure no unauthorized edits can be made to my posts.
As the owner, I want a delete button that sends a DELETE request to the API for this post ID on the edit page, so I can easily remove my post if needed.
As the owner, I want a validated edit form that allows me to update the title, body content, or image by sending a PUT request to the API for this post ID, ensuring I can keep my posts up to date easily.

Account Login Page
As the owner, I want a validated login form that allows me to request and save a token to my browser by entering my email and password, allowing me to manage posts.
Account Register Page
As the owner, I want a validated register form that allows me to create a new account by entering my name, email, and password.



Sitemap

/index.html (Blog Feed Page)
/post/index.html (Blog Post Public Page)
/post/edit.html (Blog Post Edit Page)
/account/login.html (Account Login Page)
/account/register.html (Account Register Page)


API Documentation: https://docs.noroff.dev/docs/v2/blog/posts

Images by unsplash.com











