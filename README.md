# GIPHY Search App

A minimalistic React application that allows users to search for GIFs using the GIPHY API. Built with Next.js and designed with a clean, component-based architecture.

## Features

- Search for GIFs with a simple form
- Filter results by language for more relevant searches
- Display up to 10 GIFs per search
- Responsive grid layout for optimal viewing on all devices
- Toast notifications for user feedback
- Error handling and loading states

## Technology Stack

- Next.js (React framework)
- TypeScript
- Tailwind CSS for styling
- React Query for data fetching and caching
- Zod for schema validation

## Project Structure

The application follows a clean architecture pattern:

- **Domain**: Core business logic and models
- **Application**: Use cases, services and application logic
- **Infrastructure**: External services and APIs
- **Presentation**: UI components and views

## Getting Started

### Prerequisites

- Node.js (18.x or later)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd giphy-spa
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn
   ```

3. Create a `.env.local` file with your GIPHY API key:
   ```
   NEXT_PUBLIC_GIPHY_API_KEY=your_api_key_here
   ```

### Running the application

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Build for production

```bash
npm run build
npm start
# or
yarn build
yarn start
```

## Code Quality

```bash
# Run linting
npm run lint
# or
yarn lint

# Format code
npm run format
# or
yarn format
```

## License

This project is licensed under the MIT License.
