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
│   ├── app/
│   ├── components/
│       ├── layouts/
│       ├── pages/
│       └── UI/
└── package.json
```

### Scripts

- `dev`: runs next dev to start Next.js in development mode.
- `build`: runs next build to build the application for production usage.
- `start`: runs next start to start a Next.js production server.
- `lint`: runs next lint to set up Next.js' built-in ESLint configuration.
- `format`: format all files in the current folder


### Enviroment variables

```
NEXT_PUBLIC_OER_CMS_ENDPOINT_POSTS=""
NEXT_PUBLIC_OER_CMS_BA_USER=""
NEXT_PUBLIC_OER_CMS_BA_PASS=""
```