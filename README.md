# ENGO-lab1

## notes

this is a two part solution, the backend url is https://github.com/wongsitu/ENGO-651-lab1-backend. Clone both repos and follow their respective instructions

## How to run the project

First make sure you have node npm installed. Then install dependencies:

```terminal
npm run install
```

Then in your terminal run

```terminal
  npm run dev
```

## Requirements

- [x] Registration: Users should be able to register for your website, providing (at minimum) a username and password.
      Login: Users, once registered, should be able to log in to your website with their username and password.
      Logout: Logged-in users should be able to log out of the site.
- [x] Import: Provided for you in this project is a file called books.csv, which is a spreadsheet in CSV format of 5000 different books. Each one has an ISBN number, a title, an author, and a publication year. In a Python file called import.py separate from your web application, write a program that will take the books and import them into your PostgreSQL database. You will first need to decide what table(s) to create, what columns those tables should have, and how they should relate to one another. Run this program by running python3 import.py to import the books into your database, and submit this program with the rest of your project code.
- [x] Search: Once a user has logged in, they should be taken to a page where they can search for a book. Users should be able to type in the ISBN number of a book, the title of a book, or the author of a book. After performing the search, your website should display a list of possible matching results, or some sort of message if there were no matches. If the user typed in only part of a title, ISBN, or author name, your search page should find matches for those as well!
- [x] Book Page: When users click on a book from the results of the search page, they should be taken to a book page, with details about the book: its title, author, publication year, ISBN number, and any reviews that users have left for the book on your website.
- [x] You should be using raw SQL commands (as via SQLAlchemy’s execute method) in order to make database queries. You should not use the SQLAlchemy ORM (if familiar with it) for this project.
- [x] In README.md, include a short writeup describing your project, what’s contained in each file, and (optionally) any other additional information the staff should know about your project. If you’ve added any Python packages that need to be installed in order to run your web application, be sure to add them to requirements.txt!

## Description

Tech stack:

- Library: ReactJS
- Language: Typescript.
- Navigation react-router v6
- API requests: react-query, axios
- Styling: Tailwind and CSS
