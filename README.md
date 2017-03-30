# Introduction
This application shows how to read a file and generate metrics based on the contents of that file.

# Architecture
The code showcases two different ways to read a file
* Buffered Approach - the whole file is buffered into memory in a single chunk and processed in one step
* Streaming Approach - the file is streamed into memory in multiple chunks and processed in multiple steps

# Install Steps
* Install [Node 7.8.0](https://nodejs.org/en/)

# Build Steps
   Open up a command line
   ```
   $
   ```

   Install the project dependencies
   ```
   $ npm install
   ```

   # Run Steps
   Run the application.
   ```
   $ npm start
   ```

   Confirm the results of running both approaches produce the same output
   ```
   $ diff output/buffered.json output/streamed.json
   ```

   Take a sneak peek to check word count and primality
   ```
   $ head -n 30 output/buffered.json
   $ head -n 30 output/streamed.json
   ```

   # Test Steps
   Run the tests
   ```
   $ npm test
   ```
   View the test results in your browser
   ```
   $ open coverage/lcov-report/index.html
   ```

# Technology Stack
* [Node](https://nodejs.org/en/) - used to build and run the application
