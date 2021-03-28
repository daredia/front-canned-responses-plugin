# Front Plugin

## What is this?
This project is a simple companion app for Front that allows for sharing message templates across Front teams.

![Image of the plugin](/screenshot-templates.png)
![Image of the plugin](/screenshot-search.png)
![Image of the plugin](/screenshot-template-details.png)

## Pre-requisite
- Create a custom plugin [here](https://app.frontapp.com/settings/tools/plugins) and a Front API token [here](https://app.frontapp.com/settings/tools/api).


## Quick start
- Clone this repository.
- From within the repository, run `yarn install`.
- Make a copy of the `.env.sample` file and rename it `.env`.
- Find your Front API token [here](https://app.frontapp.com/settings/tools/api) and update the `FRONT_API_TOKEN` and `FRONT_MASTER_TEAM_ID` values in the `.env` file.
- Run `yarn dev` to run the app in development mode.
- Open a browser and visit [https://localhost:3000](https://localhost:3000) to accept the unsafe HTTPS connection.
- Open Front in the same browser as the above step, and add https://localhost:3000 as a plugin in your Front account, in dev mode.

Note: because plugins must be served over HTTPS, when developing locally it's easier to do everything in the web app. Once your plugin is ready for production, it will work in the exact same way in the desktop app as it does in the web app.

The plugin will reload if you make edits.<br />
You will also see any lint errors in the console.

## Dev commands
The project is split into two pieces: a client serving the plugin files, and a minimalist server fetching data from external system(s).
- `yarn start` will run the client code only.
- `yarn server` will run the server code only.
- `yarn dev` is a combination of both.

## Building and deploying

### `yarn build`
Once you're ready to deploy your plugin, use `yarn build` to build the client code for production. Production files will appear in the `build` folder and copied to the `server/build`.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The client build is minified and the filenames include the hashes.<br />
The server is set to serve files from the `server/build` folder.

**To secure communication between Front and your plugin, do not forget to add your plugin's authentication secret as the `AUTH_SECRET` environment variable.**
