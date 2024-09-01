# PaymentsProject

## Description

This is a simple project that simulates the behaviour of a subscription system. The following technologies have been involved for code development and app deployment:
  - Backend:
    - Express
    - MongoDB
    - BrainTree SDK
  - Frontend:
    - React
    - React admin framework
  - DevOps
    - Vercel
All the code has been developed using typescript programming language.

## Instructions to run the project locally

- Move to the backend folder and run in the root folder: <br>
  `npm i`<br>
  `npm run start`<br>
- Move to the frontend folder and run in the root folder: <br>
  `npm i`<br>
  `npm run dev`<br>
**Important**: Remember before running this commends you need to populate the .env file in both the frontend and backend folders.
  The .env file in the backend should have the following structure: <br>
     `PORT=3001`<br>
     `DATABASE=`<br>
     `SECRET=`<br>
     `BRAINTREEMERCHANTID=`<br>
     `BRAINTREEPUBLICKEY=`<br>
     `BRAINTREEPRIVATEKEY=`<br>
  The .env file in the frontend should have the following structure: <br>
    `API="http://localhost:3001"`<br>
    `TOKENIZATIONKEYBRAINTREE=`<br>

## Link to deployed project

The deployed project can be found at the link: <a href="https://payments-frontend-mu.vercel.app">Subscription project</a>.

## Allowed cards

4111 1111 1111 1111

Expiration date can be any dates in the future

## Not allowed cards

3566 0020 2036 0505

## Database screenshots

<img width="1172" alt="Screenshot 2024-09-01 at 21 22 10" src="https://github.com/user-attachments/assets/f1ccacea-b47c-4209-9237-00cfd6123e9c">

<img width="1168" alt="Screenshot 2024-09-01 at 21 23 03" src="https://github.com/user-attachments/assets/766187d6-14a7-4bc7-9923-732849589e19">

## Braintree subscriptions screenshots

### Monthly with thermometer

<img width="1430" alt="Screenshot 2024-09-01 at 21 28 43" src="https://github.com/user-attachments/assets/a7022072-cb26-4a2a-af30-cce22b581942">

### Monthly without thermometer

<img width="1435" alt="Screenshot 2024-09-01 at 21 29 22" src="https://github.com/user-attachments/assets/6143eddc-19bd-4566-9fb2-b5ef370cc422">

Yearly subscriptions appear as the monthly ones but with different prices adn transactions
