# EMIL App
A simple app leveraging a message bus architecture to save and display packets of randomly generated data.

## Firt-Time Operation Instructions
1. Clone or download this repository to your favourite directory
2. In your terminal, navigate to the `EMIL-app/application-app` directory
3. Run `npm install`
4. Ensure that both MongoDB and RabbitMQ servers are running locally
5. Run `npm start`
6. In your browser, navigate to `http://localhost:3000`
7. Observe homepage

## Additional Operation Instructions
The front end of the application is simply a printout of the data container in local storage. When you click the `Generate New Metric Item` button, a request is sent to the API and a new metric item is constructed using random data. This item is then put onto a RabbitMQ message bus. After consumtion of this message, the data is saved into local storage. Pressing the button will also refresh the page. Since the message bus is quite fast, the request time is usually sufficient to allow for the message to be consumed and saved. Therefore, you will most often see your newely created item at the top of the list when the page refreshes. However, this is not a guarentee. If you don't see your new item appear after the page refresh, simply refresh again and it should be there.

## Testing
1. In your terminal, navigate to the `EMIL-app/application-app` directory
2. To run unit tests, run `npm run test:unit`
3. To run e2e tests, run `npm run test:e2e`
4. All testing results will print to the console

## Future Concerns
- Authentication: I would implement JWT authentication. This system works well with express cookies which can be created or destoryed depending on login/logout status.
- Logging: Express already uses a library called `morgan` which is quite good. It has many options and also has file-writing functionality.
- Containerization: Here, I would use Docker. One container for the database, one for the app and one for the message queue. All using `docker-compose`.
- Error Handling: Here, I would replace the default global error handler with something more robust to provide switching on differing status codes and better delivery of error messaging. I would still use the express way of having the error handler as a terminal app middleware though as it is a very convenient error architecture to work with.
- CI/CD: I would probably use Jenkins or perhaps the propriatary system of whatever the project was hosted on. For example, BitBucket Pipelines or Github Actions. 

## Dependancies
- MongoDB
- RabbitMQ
- NodeJS / npm
