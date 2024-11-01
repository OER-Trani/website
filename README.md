# OER website

This is the repository to host the FE application of the main website.

# Project

## Development

The application uses Next.js with App Router setup as SPA.

The choice is based on the desire to build as HTML existing articles to improve performance and reducing the number of requests to the server.

### Structure

```
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│       ├── pages/
│       └── UI/
└── package.json
```

### Scripts

- `dev`: starts development mode.
- `build`: builds the application for production usage.
- `lint`: runs linter.
- `preview`: previews the build

### Enviroment variables

```
VITE_CMS_API_ENDPOINT # The endpoint of the CMS API
```
