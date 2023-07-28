## Music Player
To run the web page
--> Go to Integration --> App
--> Click on index.html file then the file will be opening in your default browser

## Working
--> Basic music player consists of list of songs
--> Contains playlist tab and recently played list tab
--> Songs that have been played recent;y will be added to recently played songs list
--> Common pause button have been included for pausing audio purposes only.

## Cypress Automated E2E Testing

This repository contains the code definitions referred to as "spec" files for automated tests utilising the [Cypress Automated Testing Framework](https://cypress.io).

### Installation;
1. Install and use Node Version 12 or 14 and above (NVM is highly recommended when working with multiple node versions). Tested and working with node version 10.16.0.
2. Enter the root directory of the project and execute `npm i`.
3. Install and use cypress version of 9.6.1
4. Configure the environment file by copying "cypress-env.json" and renaming the copy to "cypress.env.json", fill out the email and password. It's important to do this step otherwise cypress will not be able to execute tests as tests require an active login.

Additional installation steps that may be required for different systems can be found here: https://docs.cypress.io/guides/getting-started/installing-cypress

### eslint;
Run `npm install eslint-plugin-cypress` and `npm install eslint -g` and then run `npm run lint` to see linting issues

### Usage;
Run cypress with `npx cypress open` and then select the specific spec file to execute.

Run cypress through CLI with `npx cypress run`, note: this will instruct cypress to execute ALL spec files. Specify a single spec file with --spec "relative/path/to/file"

Run `npx cypress run --spec "cypress/integration/**/*.spec.js" > results.txt` to run all spec files in your local machine
