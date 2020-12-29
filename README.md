# FreshWorks Assignment

The repository contains all the code necessary to create a file based read-write-delete system implemented using node.js

## structure
all the necessary functions are kept in the keyObj.js file and the tests are kept in the test folder.

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
> mocha tests.js --recursive --exit



  instantiate a file at default location
C:\Users\user\Documents\GitHub\fresh/data/data.json
    √ new data.json creation at default location

  instantiate a file at custom location
../data.json
    √ new data.json creation at custom location

  create key of size less that 32 characters
../data.json
Data added successfully!
    √ key added successfully

  create key of size less that 32 characters and time limit 1 second
../data.json
Data added successfully!
    √ key added successfully

  create key of size greater that 32 characters
../data.json
key length exceeds 32 characterrs
    √ key rejected successfully

  create key which already exists
../data.json
key already exists
    √ key rejected successfully

  read key which already exists
../data.json
{ '1': 2 }
    √ key rejected successfully

  read key which does not exist
../data.json
element not found
{}
    √ key rejected successfully

  create key of size less that 32 characters that has expired
../data.json
Data added successfully!
    √ key added successfully

  read key which has expired
../data.json
key has expired.please try some other key
{}
    √ key rejected successfully

  delete key which has expired
../data.json
key has expired.please try some other key
{}
    √ key rejected successfully
  delete key which has not expired
../data.json
Data deleted successfully!
    √ key deleted successfully


  12 passing (103ms)

PS C:\Users\user\Documents\GitHub\fresh\tests> ^C
PS C:\Users\user\Documents\GitHub\fresh\tests> npm run test

> tests@1.0.0 test C:\Users\user\Documents\GitHub\fresh\tests
> mocha tests.js --recursive --exit



  instantiate a file at default location
C:\Users\user\Documents\GitHub\fresh/data/data.json
    √ new data.json creation at default location

  instantiate a file at custom location
../data.json
    √ new data.json creation at custom location

  create key of size less that 32 characters
../data.json
Data added successfully!
    √ key added successfully

  create key of size less that 32 characters and time limit 1 second
../data.json
Data added successfully!
    √ key added successfully

  create key of size greater that 32 characters
../data.json
key length exceeds 32 characterrs
    √ key rejected successfully

  create key which already exists
../data.json
key already exists
    √ key rejected successfully

  read key which already exists
../data.json
{ '1': 2 }
    √ key rejected successfully

  read key which does not exist
../data.json
element not found
{}
    √ key rejected successfully

  create key of size less that 32 characters that has expired
../data.json
Data added successfully!
    √ key added successfully

  read key which has expired
../data.json
key has expired.please try some other key
{}
    √ key rejected successfully

  delete key which has expired
../data.json
key has expired.please try some other key
{}
    √ key rejected successfully

  delete key which has not expired
../data.json
Data deleted successfully!
    √ key deleted successfully


  12 passing (101ms)
  ```