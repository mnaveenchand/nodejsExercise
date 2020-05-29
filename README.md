# nodejsExercise
This App is a RESTful backend service for sales request. 
## Considerations:
Implements a working solution to read the data from an input file "sales.csv", stores them in MongoDB access the data from MongoDB and then perform the following
kind of operations on the data:


Backend part has the following purposes.

1. Show all orders from a particular company
2. Show all orders to a particular address.
3. Delete a particular order given an OrderId
4. Display how often each item has been ordered, in descending order ( i.e., in the above example, 2x for Macbook and Inline skates, 1x for the rest )

## Requirements

1. [Nodejs](https://nodejs.org/en/)
2. [MongoDB](https://www.mongodb.com/download-center/community)

Start the service using node from command line.

```
node index
```
If there any dependencies are missing, update the package manager using

```
npm update
```

## Endpoints briefly explained in the table

 | http verb| endpoint | description |
 |---------|----------|-------------|
 | GET|`localhost:3000/orders?companyName=SuperTrader`|json response with orderId, customerName, orderedItem|
 | GET| `localhost:3000/orders?customerName=Steindamm 80`|json response with orderId, customerName, orderedItem|
 | DELETE   | `localhost:3000/orders?orderId=002`|json response if record is deleted|
 | GET      | `localhost:3000/get_order_freq`|json response how often each item has been ordered|
 