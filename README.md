# partners-reach-out

## Content of this repository:

### partners-reach-out-api-service
- Framework: `Node - Express`
- Language: `JavaScript`

This microservice contains 1 api `POST /partners/in-range` that will do the following:
Reads the list of partners stored on the service `if no list has been provided`.

Calculates the distance from their offices to Starbucks Cafe Central London (51.5144636,-0.142571) `if no other coordinates have been provided`.

Returns a sorted list by company name in ascending order of the companies name and addresses of the matching partners with offices within the given range in kilometers.
The list of partners is sotres on the microservice and it will be the used list `unless the client provided another one`.

```
How to build and run the docker image:

To build:
- sudo docker build -t reach-out-api-service .

To run
- sudo docker run -it -p 1330:1330 reach-out-api-service
```


### partners-reach-out-api-service
- library: `ReactJs`

Allows the client to call the above mentioned API and displays the result.

```
How to run:
- npm run start

The web app will launch on port `3000`
```

