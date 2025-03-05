1. Business logic (increment points) is strictly done on the backend
2. Live score board update can be done using Websockets, for example using GraphQL's subscription. Libraries that support this for example Apollo & ApolloClient (React)
3. Authentication can simply use JWT auth tokens, which consists of access and refresh tokens.

- Access token is granted upon successful login, which is then stored in the browser and used in http headers for authentication
- When access token expires for a set amount of time (ex. 1 month), send a request to /refresh-token to get a new access token.

4. Since the scores are often updated, it is advisable to NOT index the `player_scores` table, which would add an unwanted log factor to create/update/delete operations if indexed.
5. Should use db transactions to process point updates, although unlikely, could prevent cases such as race condition when user does multiple actions which results in simultaneous point update.
6. Number 5 can also be supplemented with Message Queues such as RabbitMQ, to reduce backend service workload, and have a retry mechanism should something fail.
