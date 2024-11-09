# Online Book Reading Web-frondend

## Technology Stack

The project uses the following technologies:

- **Vue 3**: Core framework for building user interfaces and managing component states.
- **Vue Router**: Front-end routing to enable a single-page application (SPA) experience.
- **Vue CLI**: Project setup and configuration, simplifying project initialization and build configuration.
- **Element Plus**: UI components for Vue 3, enhancing consistency and user experience.
- **Axios**: HTTP client for API requests, handling data fetching and interaction.
- **Webpack**: Bundling tool integrated via Vue CLI, supporting modular development and build optimization.
- **jQuery**: Used for certain DOM manipulations, made globally accessible using Webpack.
- **Sass/CSS**: Styling for components, enhancing the visual appeal and consistency of the application.

These technologies together make the project flexible, maintainable, and efficient for building a modern web application.

## Project Overview

This project is a frontend application built with Vue.js, featuring a modular component structure, API integration, routing configuration, and environment variable management. It aims to provide an extendable and maintainable framework for developers.

The modular design divides components by functionality and page, such as reusable `common` components and page-specific components like `author` and `home`. This approach improves code reusability, readability, and scalability, ensuring maintainability and following front-end development best practices. Through dynamic data binding and state management, I aimed to demonstrate my understanding of component-based and modular development.

## Folder Structure

```
|-- public
    |-- default.gif             # Default static image
    |-- favicon.ico             # Website icon
    |-- index.html              # Main entry HTML file
|-- src
    |-- api                     # Module for backend API interactions
    |-- assets                  # Static assets such as images and styles
    |-- components              # Reusable Vue components
        |-- author              # Components related to author
        |-- common              # Common components
        |-- home                # Home-related components
        |-- user                # User-related components
    |-- router                  # Routing configuration
    |-- utils                   # Utility functions
    |-- views                   # View components for pages
    |-- App.vue                 # Root component
    |-- main.js                 # Application entry point
|-- .env.development            # Development environment configuration
|-- .env.production             # Production environment configuration
|-- .gitattributes              # Git file handling configuration
|-- .gitignore                  # Git ignore file configuration
|-- babel.config.js             # Babel configuration file
|-- jsconfig.json               # JavaScript project configuration
|-- LICENSE                     # Project license
|-- package.json                # Project configuration and dependencies
|-- README.md                   # Project README file
|-- vue.config.js               # Vue CLI configuration file
|-- yarn.lock                   # Dependency version lock file
```

## Key Components and Modules

In this section, I will highlight some specific examples to explain how I implemented various parts of the project, showcasing my approach and skills.

### API Module (`api/book.js`)

The API interactions are modularized, with each API function encapsulated to ensure clean and reusable code. This demonstrates my understanding of RESTful API design and data fetching.

#### Implementation Details

- **Encapsulation**: Each API function is individually encapsulated, such as `getBookById` for fetching book details or `listRecBooks` for getting recommended books.

  ```javascript
  export function getBookById(bookId) {
    return request.get(`/front/book/${bookId}`);
  }
  ```

- **Dynamic Parameters**: Dynamic parameters are used to manage data queries, like in `searchBooks` or `getLastChapterAbout`, allowing for flexible API usage.

  ```javascript
  export function searchBooks(params) {
    return request.get('/front/search/books', { params });
  }
  ```

- **Data Interaction**: GET requests fetch data, while POST requests are used for actions like incrementing visit counts (`addVisitCount`).

  ```javascript
  export function addVisitCount(params) {
    return request.post('/front/book/visit', params);
  }
  ```

### BookUpdateRank Component

The `BookUpdateRank` component is responsible for displaying the latest book updates and ranking list. The key aspects include data fetching, state management, and dynamic rendering.

#### Implementation Details

- **Data Fetching and State Management**: Using the `onMounted` lifecycle hook, I call an API to fetch the latest book list and update the `booksRank` with the top 10 books, showcasing my ability to work with APIs and handle data efficiently.

  ```javascript
  onMounted(async () => {
    const { data } = await listUpdateRankBooks();
    state.booksList = data;
    state.booksRank = data.slice(0, 10);  // Get the top 10 books
  });
  ```

- **Dynamic Rendering**: Books are dynamically rendered using `v-for`, ensuring that the interface automatically updates as data changes.

  ```html
  <tr v-for="(item, index) in booksList" :key="index">
    <td class="name">
      <a @click="bookDetail(item.id)">{{ item.bookName }}</a>
    </td>
  </tr>
  ```

- **Navigation**: Clicking on a book title calls the `bookDetail` method to navigate to the book's details page, showcasing my understanding of Vue Router.

  ```javascript
  const bookDetail = (bookId) => {
    router.push({ path: `/book/${bookId}` });
  };
  ```

### Book.vue View

`views/book.vue` is the component for the book details page, displaying book information, chapter list, comments section, and recommended books. This demonstrates my proficiency with Vue 3 and Element Plus.

#### Implementation Details

- **Book Information**: Displays details like cover, title, author, category, and status. Data is fetched via `getBookById` API and handled in a reactive variable.

  ```javascript
  const loadBook = async (bookId) => {
    const { data } = await getBookById(bookId);
    state.book = data;
  };
  ```

- **Chapter List**: Shows the latest chapter with an option to navigate to the complete list.

  ```javascript
  const loadLastChapterAbout = async (bookId) => {
    const { data } = await getLastChapterAbout({ bookId: bookId });
    state.chapterAbout = data;
  };
  ```

- **Comments Section**: Users can add, edit, or delete comments. Comment data is managed via the `listNewestComments` API, and editing is done using the Element Plus `el-dialog` component.

  ```javascript
  const userComment = async () => {
    if (!state.commentContent) {
      ElMessage.error("User comment cannot be empty!");
      return;
    }
    await comment({
      bookId: state.book.id,
      commentContent: state.commentContent,
    });
  };
  ```

- **Related Books**: Shows similar books using the `listRecBooks` API, with dynamic rendering using `v-for`.

  ```javascript
  const loadRecBooks = async (bookId) => {
    const { data } = await listRecBooks({ bookId: bookId });
    state.books = data;
  };
  ```

### Router Configuration

The routing setup uses `createWebHashHistory` to manage routes, which is suitable for scenarios without server-side configuration. For production environments, a different mode (`createWebHistory`) can be used, requiring server configurations like Nginx.

#### Implementation Details

- **Route Setup**: Each route is defined with its respective component, using lazy loading (`import()`) to enhance performance. Routes include pages like home, registration, login, book details, and user settings.

  ```javascript
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/Home')
  },
  ```

- **Dynamic Parameters**: Dynamic routing (`/news/:id`, `/book/:id/:chapterId`) is used for loading specific content based on parameters.

  ```javascript
  {
    path: '/news/:id',
    name: 'news',
    component: () => import('@/views/News')
  },
  ```

- **Redirection**: The root path (`/`) is redirected to `/home`, ensuring correct navigation on default access.

  ```javascript
  {
    path: '/',
    redirect: '/home'
  }
  ```

- **Scroll Behavior**: The `afterEach` hook is used to ensure that the page always scrolls to the top after navigation.

  ```javascript
  router.afterEach((to, from, next) => {
    window.scrollTo(0, 0);
  });
  ```

### Vue Configuration (`vue.config.js`)

The `vue.config.js` file is configured to manage the development server, linting, and Webpack plugins, showcasing my knowledge of Vue CLI and Webpack.

#### Implementation Details

- **Development Server**: Configured the dev server to run on port `1024`, ensuring a consistent development environment.

  ```javascript
  devServer: {
    port: 1024
  }
  ```

- **Linting and Compilation**: Linting is disabled for saving files (`lintOnSave: false`), which helps streamline the development process. Dependencies are transpiled for compatibility.

- **Webpack Plugin**: The `ProvidePlugin` is used to make `jQuery` available globally without importing it each time.

  ```javascript
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "windows.jQuery": "jquery"
      })
    ]
  }
  ```

