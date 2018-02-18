# Pet Shop

This is the empty DApp for the Pet Shop workshop. View the completed DApp [here](https://github.com/shionwahch/pet-shop)

## Installation

1. Install Node and NPM
    ```
    brew install node
    ```

2. Install Truffle
    ```
    npm install -g truffle
    ```

3. Install TestRPC
    ```
    npm install -g ethereumjs-testrpc
    ```

4. Install MetaMask (Chrome Extension) from [MetaMask website](https://metamask.io)

## Running the DApp

1. Start the TestRPC at port 7545
    ```
    testrpc -p 7545
    ```

2. Compile and migrate the smart contracts
    ```
    truffle compile
    truffle migrate
    ```

3. Run the `liteserver` server
    ```
    npm run dev
    ```

4. Setup MetaMask to use the Wallet created in TestRPC. Go to the TestRPC terminal and copy the mnemonic phrase. Start MetaMask in Chrome, then click on 'Restore from seed phrase'. Paste the mnemonic phrase and set a password. Set MetaMask to connect to the TestRPC by going into 'Custom RPC' and setting the RPC URL of the TestRPC server
    ```
    http://localhost:7545
    ```
