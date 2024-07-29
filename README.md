### Architecture

- **Favorites Context**: A context (`FavoritesContext`) is used to manage the global state of favorite characters. This allows any component in the application to easily access and modify the favorites information.

- **Custom Hook**: A custom hook `useFavorites` is implemented to interact with the favorites context, providing functions to add, remove, and show favorites.

- **Server-Side Rendering (SSR)**: Both views utilize Server-Side Rendering to load dynamic data from the Marvel API before the page is rendered on the client. This improves user experience by providing immediately visible content and optimizes SEO.

## Usage

- On the main page, you can search for heroes using the filter input.
- Click on a hero to see more details, including their comics.
- You can add heroes to your favorites, and the filtered list will show only the favorites when activated.

## Development Setup

To start the development server, run:

npm install

This will start your Next.js application in development mode. Open your browser and navigate to `http://localhost:3000` to view the app.

## Production Setup

To build and start the application for production, follow these steps:

1. Build your application:

npm run build

2. Start the production server:

npm start

Your application should now be running in production mode at `http://localhost:3000`.

## Scripts

Here are some useful scripts you can run:

- `dev` - Starts the development server.
- `build` - Builds the application for production.
- `start` - Starts the production server.
- `lint` - Runs the linter to check the code for potential errors.
- `test` - Runs the test suite.

## Testing

The project includes both unit tests and E2E tests to verify its functionality:

- **Unit Tests**: Unit tests are used to verify the logic of individual components and ensure that expected behavior is maintained.
- **E2E Tests**: End-to-end tests are performed using Cypress to verify the overall application flow and functionality from the end-user perspective.

To run the unit tests:

npm run test

To run the E2E tests:

npx cypress open

## Contributions

If you would like to contribute, please open a Pull Request or create an Issue in the repository.
