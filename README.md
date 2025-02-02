# DeepFace UI

This is a ReactTS demo project to use DeepFace API, with the verify endpoint.

# Build

Run the next command:

```bash
docker build -t deepface-ui .
```

Next run docker compose.

```bash
docker compose up
```

To run the project on develop mode uncomment the lines 23 and 24 of the
default.conf file and set the `VITE_API_URL` to `http://localhost:5006/api`.
