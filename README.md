# FreshWorks Assignment

The repository contains all the code necessary to create a file based read-write-delete system implemented using node.js

## structure
all the necessary functions are kept in the keyObj.js file and the tests are kept in the test folder.
all data is stored in the data folder by default

## installation
please run the following command after navigating into the test folder using the command line to install necessary packages for testing
```bash
npm install
```
## tests
please run the following code for running the tests
```bash
npm run test
```

##sample tests

```bash
>tests@1.0.0 test C:\Users\user\Documents\GitHub\fresh\tests
> mocha tests.js --recursive --exit



  1)instantiate a file at default location
C:\Users\user\Documents\GitHub\fresh/data/data.json
    √ new data.json creation at default location   

  2)instantiate a file at custom location
../data.json
    √ new data.json creation at custom location

  3)create key of size less that 32 characters
../data.json
Data added successfully!
    √ key added successfully

  4)create key of size less that 32 characters and time limit 1 second
../data.json
Data added successfully!
    √ key added successfully

  5)create key of size greater that 32 characters
../data.json
key length exceeds 32 characterrs
    √ key rejected successfully

  6)create key which already exists
../data.json
key already exists
    √ key rejected successfully

  7)read key which already exists
../data.json
{ '1': 2 }
    √ key rejected successfully

  8)read key which does not exist
../data.json
element not found
{}
    √ key rejected successfully

  9)create key of size less that 32 characters that has expired
../data.json
Data added successfully!
    √ key added successfully

  10)read key which has expired
../data.json
key has expired.please try some other key
{}
    √ key rejected successfully

  11)delete key which has expired
../data.json
key does not exist
undefined
    √ key rejected successfully

  12)delete key which has not expired
../data.json
Data deleted successfully!
    √ key deleted successfully


  12 passing (116ms)
  ```