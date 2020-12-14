# Rate Quote Coding Challenge for Own Up

This project was created for [Own Up](ownup.com)'s coding challenge. The goal was to create a UI to show users (people looking for home loans) quotes from multiple lenders using data from Own Up's API based on a user's custom information, such as loan amount and credit score. 

(insert screenshot of app)
### Technologies Used

* [Create React App](https://github.com/facebook/create-react-app/tree/master) for UI
* [React-Bootstrap]() for responsive UI
* [Redux Thunk](https://github.com/reduxjs/redux-thunk) and [React-Redux](https://react-redux.js.org/) for state management 
* Own Up's Rate Quote API
* [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) for calling and interacting with the API
* [Dot Env](https://www.npmjs.com/package/dotenv) for hiding the API key in committed code
* [Jest](https://jestjs.io/), [React Test Rnderer](https://reactjs.org/docs/test-renderer.html) and [Enzyme](https://enzymejs.github.io/enzyme/)for testing 

### How to Run
##### Downloading and opening the code
1. Open terminal and run `git clone https://github.com/lilyhlou/own-up.git` in terminal or open with Github Desktop/download a zip file of the code.
2. cd or open folder (own-up)
3. Run `npm install` to download dependencies (make sure [npm and Node.js](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) are installed)
4. Create an .env file in the root and add the line "REACT_APP_API_KEY= YOUR_API_KEY" (replace 'YOUR_API_KEY' with your API key)
5. Run `npm start` in terminal
6. Plug in values in text boxes (values for loan size and credit score must be numbers; credit score must be between 300 and 800). Click 'Quote Rates' to see a returned table of rates and lenders.

##### Running the app locally 
* `npm start` to run the app in development mode.
Open [http://localhost:3000](http://localhost:3000) in browser to view it in the browser. The page will reload if you make edits (note: terminate app with "control + c" and run `npm start` again if API key is updated in .env file).
Press option + command + c and click the console tab of inspector to see errors or to inspect code.

* `npm test` to run tests.

* `npm run build` builds the app for production / deployment.

 #### Tests
 * App.test.js: snapshot test of App.js and test for App.js rendering without crashing
 * Input.test.js: snapshot test of input screen, checking validate methods 
 * Form.test.js: snapshot test of table, returns nothing when not submitted
 * test for reducers 