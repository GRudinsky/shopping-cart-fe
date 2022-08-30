## Introduction

The web app app that fetches the shopping cart data from the API and fulfills the acceptance criterias given in the below [User Stories](#user-stories) section.
I decided to utilise TypeScript and used Redux for the global state management, that should work well with possible future product scaling.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## User Stories

The app is the implementation of the following basket:

![The basket](https://slack-imgs.com/?c=1&url=https%3A%2F%2Fcdn.dribbble.com%2Fusers%2F42384%2Fscreenshots%2F668649%2Fattachments%2F59014%2Fcart_update_large.png)

Is is based on the below user stories:

_Basket-001_  
**As a** user  
**I want** to view my current basket  
**So that** I can see what I've added

**Given** I am on the basket page  
**When** I view the page  
**Then** I can see all added items and their cost

_Basket-002_  
**As a** user  
**I want** to change the quantity of a basket item  
**So that** I can decide item totals before purchasing

**Given** I am on the basket page  
**When** I view the page  
**Then** I can see an item quantity next to each item

**Given** I am on the basket page  
**When** I view the page  
**Then** I can see each item's total cost (adjusted for quantity)

**Given** I am on the basket page  
**When** I change an item quantity  
**Then** the item's total cost is adjusted, in real-time

_Basket-003_  
**As a** user  
**I want** to view my current basket total  
**So that** I can see what I'm going to have to pay

**Given** I am on the basket page  
**When** I view the page  
**Then** I can see a total cost, accounting for all items and quantities

_Basket-004_  
**As a** user  
**I want** to remove all items from my basket  
**So that** I can start over

**Given** I am on the basket page  
**When** I click the "clear" button  
**Then** all items are reset to zero (but remain in the basket)
