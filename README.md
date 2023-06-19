# Belt

This project has two parts that communicate using Socket.io:

1. `Server` using Matter.js (intended for deployment to Replit)
2. `Client` using Expo (intended for deployment iOS, Android, and Web)

## Usage

- Create `Client/.env` and set the socket endpoint:

  ```
  SOCKET_ENDPOINT="https://belt.jorahty.repl.co"
  ```

  The server listens on port 3000, so I either set the socket endpoint:

  - to the Repl's URL: `https://belt.jorahty.repl.co`,
  - to `http://localhost:3000`,
  - or using the IP address of my machine (which I get with
    `ipconfig getifaddr en0`) e.g `http://172.19.248.44:3000`.

- Install node packages: `npm install`
- Start the server: `npm run start:server`
- Start the client: `npm run start:client`

# Notes

- Client is written in TypeScript (because Expo and React Native Skia have
  excellent support for TypeScript)
- Server is written in JavaScript (because Socket.io, and especially Matter.js,
  do not have the best support for TypeScript)
