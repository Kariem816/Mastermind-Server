# Mastermind-Server

 An Express server for WordMastermind

## Table of Contents

- [Description](#description)

- [Dependencies](#dependencies)

- [Installation](#installation)

- [Documentation](#documentation)

  - [API](#api)

    - [Base URL](#base-url)

    - [Generic Responses](#generic-responses)

    - [Endpoints](#endpoints)

  - [Game](#game)

  - [Contributing](#contributing)

---

## Description

A simple Express server that returns a random word from a list of words. The words are grouped into difficulities. The difficulities are `kids`, `easy`, `medium`, `hard`, `impossible`. The difficulities are ordered from easiest to hardest. The API was built to be used with [WordMastermind](#game) but can be used for any purpose. You can also use the API to generate random words for your own projects as it supports getting words by length.

---

## Dependencies

- [Express](https://expressjs.com/)

- [Node.js](https://nodejs.org/en/)

- [cors](https://www.npmjs.com/package/cors)

- [english-words](https://github.com/dwyl/english-words) by [dwyl](https://github.com/dwyl)

---

## Installation

To install the api on your local machine, follow the steps below:

1. Clone the repository

2. Install dependencies

    ```bash

    npm install

    ```

3. Build the project

    ```bash

    npm run build

    ```

4. Start the server

    ```bash

    npm start

    ```

---

## Documentation

### API

#### Base URL

- If you are running the server locally, the [base URL](http://localhost:3000/api/words) is `http://localhost:3000/api/words`

- If you are using the deployed server, the [base URL](https://bumble-mastermind-api.onrender.com/api/words) is `https://bumble-mastermind-api.onrender.com/api/words`

#### Generic Responses

- Generic Successful Response

    ```json

    {
        "data": "data",
        "encoding": ["base64", "url", "no encoding"],
        "time": "time taken to generate the data"
    }

    ```

- Generic Error Response

    ```json

    {
        "err": "type of error",
        "errMsg": "error message"
    }

    ```

#### Endpoints

1. `GET /`

    - Return an array of available difficulities. The difficulities are `kids`, `easy`, `medium`, `hard`, `impossible`. The difficulities are ordered from easiest to hardest. Each difficulity comes in the form ```{ "difficulity": "difficulity", "wordNumber": number }```

    - Example Response

    ```json

    {
        "data": {
            "diffs": [
                {"difficulity":"kids","wordNumber":2582},
                {"difficulity":"easy","wordNumber":7185},
                {"difficulity":"medium","wordNumber":15918},
                {"difficulity":"hard","wordNumber":29874},
                {"difficulity":"impossible","wordNumber":314541}
            ]
        },
        "encoding":"no encoding",
        "time":"1ms"
    }

    ```

    - Allowed Query Parameters

        1. `encoding`

2. `GET /get`

    - Return a random word from the specified difficulity or length

    - Example Response

    ```json

    {
        "data": {
            "word": "jova",
            "difficulity": "easy",
            "length": 4,
            "diffs":
                [
                    { "difficulity": "kids", "wordNumber": 2582 },
                    { "difficulity": "easy", "wordNumber": 7185 },
                    { "difficulity": "medium", "wordNumber": 15918 },
                    { "difficulity": "hard", "wordNumber": 29874 },
                    { "difficulity": "impossible", "wordNumber": 314541 }
                ]
        },
        "encoding": "no encoding",
        "time": "5ms"
    }

    ```

    - Example of encoded response

    ```json

    {
        "data": "eyJ3b3JkIjoiZWdvcyIsImRpZmZpY3VsaXR5IjoiZWFzeSIsImxlbmd0aCI6NCwiZGlmZnMiOlt7ImRpZmZpY3VsaXR5Ijoia2lkcyIsIndvcmROdW1iZXIiOjI1ODJ9LHsiZGlmZmljdWxpdHkiOiJlYXN5Iiwid29yZE51bWJlciI6NzE4NX0seyJkaWZmaWN1bGl0eSI6Im1lZGl1bSIsIndvcmROdW1iZXIiOjE1OTE4fSx7ImRpZmZpY3VsaXR5IjoiaGFyZCIsIndvcmROdW1iZXIiOjI5ODc0fSx7ImRpZmZpY3VsaXR5IjoiaW1wb3NzaWJsZSIsIndvcmROdW1iZXIiOjMxNDU0MX1dfQ==",
        "encoding": "base64",
        "time": "10ms"
    }

    ```

    - Allowed Query Parameters

    1. [`diff`](#diff)

    2. [`encoding`](#encoding)

    3. [`length`](#length)

#### Query Parameters

##### `encoding`

- The encoding of the words to be returned. The encodings are `base64`, `url`. In case of encoding, the data object will be a string. You need to decode the string and parse it to get the data of words. If encoding is not specified, the default encoding is `no encoding`.

##### `diff`

- The difficulity of the words to be returned. The difficulities are `kids`, `easy`, `medium`, `hard`, `impossible`. You have to specify the difficulity if you are not specifying the length[^1].

##### `length`

- The length of the words to be returned. You have to specify the length if you are not specifying the difficulity[^1].

---

### Lengths to difficulity mapping

| Length | Difficulity |
|--------|-------------|
|  <= 3  | kids        |
|   4    | easy        |
|   5    | medium      |
|   6    | hard        |
|  >= 7  | impossible  |

---

### Game

Word Mastermind is a game where you have to guess a word. The word is chosen randomly from a list of words based on chosen difficulity. You can try the game yourself [here](https://mastermind-bumble.netlify.app/)[^2]. For more documentation, See [this](https://github.com/Kariem816/WordMastermind-Bumble/tree/main/README.md) . For more information about the original boardgame, you can read [this](https://en.wikipedia.org/wiki/Mastermind_(board_game)).

---

## Contributing

If you want to contribute to this project, you can do so by forking the repository and making a pull request. Alternatively, you can open an issue if you find a bug or have a suggestion or you can send an email to `kariem816@gmail.com`.

---

[^1]: If both `diff` and `length` are not specified, you will recieve an error. If both `diff` and `length` are specified, they have to match otherwise you will recieve an error.

[^2]: If the game doesn't load, try refreshing the page. The game is hosted on netlify and it sometimes takes a while to load.
