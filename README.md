
# Dough Dreams

![Dough Dreams Logo](https://raw.githubusercontent.com/NoroffFEU/FED1-PE1-Asora7/main/favicon/android-chrome-512x512.png)

Dough Dreams is a responsive blogging application designed to manage and showcase pastry and cake recipes.

## Description

Dough Dreams is a responsive blogging application designed to manage and showcase pastry and cake recipes. This front-end user interface interacts with an existing API to allow users to view dynamic blog posts and for the blog owner to manage their content easily. The application includes public pages for viewing blog content and admin pages for user registration, login, and post management. Admin login is made, and editing the posts is only avalible when logged in.

# Key features:

- interactive banner carousel
- static list of latest posts
- responsive blog post pages
- blog post edit pages for the owner. 
- account login page
- registration pages
- admin login


# Client


· Name: Dough Dreams

· Sector: Food Blogging (Cakes and Pastry Recipes)

· Size: 4-6 employees

· Location: Online (Global Reach)

· Mission: To inspire and empower baking enthusiasts with delicious and easy-to-follow recipes for cakes and pastries, offering tips and recipies that make every baking dream come true. We aim to make it easy for anyone to create good desserts, even on a hectic day.

· Target Audience: The primary audience for Dough Dreams consists of baking enthusiasts ranging from beginners to experienced bakers who are looking for easy-to-follow and delicious pastry and cake recipes. 



# User Stories

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



# Sitemap

- /index.html (Blog Feed Page)
- /post/index.html (Blog Post Public Page)
- /post/edit.html (Blog Post Edit Page)
- /account/login.html (Account Login Page)
- /account/register.html (Account Register Page)


API Documentation: https://docs.noroff.dev/docs/v2/blog/posts

Images by unsplash.com



## Built With

- HTML
- CSS
- Javascript
- VS code


## Getting Started

### Installing


1. Clone the repo:

```bash
git clone https://github.com/NoroffFEU/FED1-PE1-Asora7.git
```

2. Navigate to the Project Directory:
   
```bash
cd FED1-PE1-Asora7
```


3. Viewing the Project:

```bash
open index.html
```

- View github repository: https://github.com/NoroffFEU/FED1-PE1-Asora7.git
- View deployed link: https://norofffeu.github.io/FED1-PE1-Asora7/


4. Locate the FED1-PE1-Asora7 folder locally on your computer:

After cloning, the FED1-PE1-Asora7 folder should be located in your current directory. If you need to locate it:

- On macOS/Linux: You can navigate to the folder where you cloned the project using your file explorer or terminal. Typically, it will be in your home directory or the directory from where you ran the git clone command.
  
- On Windows: Similarly, use File Explorer to navigate to the folder where you cloned the project. This is typically in your user directory or the directory you specified when cloning.
  
- Once you locate the FED1-PE1-Asora7 folder, you can open it to access all project files, including index.html.


5. Open in VS code:

To open the project in Visual Studio Code (VS Code), follow these steps:

- Launch Visual Studio Code on your computer.
- In VS Code, go to File > Open Folder....
- Navigate to the location where you cloned the FED1-PE1-Asora7 repository.
- Select the FED1-PE1-Asora7 folder and click Open.
- Once the project is open in VS Code, you can navigate through the files in the Explorer sidebar and edit them as needed.
   

### Running

Since this project does not require Node.js or npm, you do not need to run any additional commands to view or edit the project files.


## Contributing

Contributions are welcome! If you'd like to contribute to this project, please fork the repository and submit a pull request.


## Contact

[My Instagram](www.instagram.com/veronicaasora)

Email: veronica_asora@hotmail.com















