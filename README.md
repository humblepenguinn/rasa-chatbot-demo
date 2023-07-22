# Rasa ChatBot Demo

Main website for the RASA Chatbot Demo

It does not use the api yet

## Directory Structure

```
root-directory/
├── src/
│   ├── files..
│
├── server/
│   ├── jcid.py -- ignore this file
│   └── api/
│       ├── __main__.py
│
├── README.md
└── other_files...
```

`src/`: This directory contains the source files for the website. It includes the main HTML file (index.html), the Cascading Style Sheets (styles.css) for styling, and the JavaScript file (app.js) for interactive functionality on the website.

`server/`: This directory contains the implementation of the server API that the website will use to generate responses. It includes the main Python file (**main**.py) responsible for handling incoming requests and serving responses.

To start the server, please refer to the instructions in the [README.md](rasa-server/README.md) file located inside the `server/` directory. It will guide you on how to set up and run the server to enable communication with the RASA chatbot and handle user queries.

## Getting Started

First, run the development server:

```bash
npm run dev   # use this command
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
