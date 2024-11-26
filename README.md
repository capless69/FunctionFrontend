# Ethereum ATM

This is a basic ATM contract built using Solidity, which simulates an ATM functionality with deposit and withdrawal features. The contract allows the owner to deposit and withdraw funds from the contract, ensuring proper balance management and security.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Requirements](#requirements)
- [Deployment](#deployment)
- [Functions](#functions)
  - [getBalance](#getbalance)
  - [deposit](#deposit)
  - [withdraw](#withdraw)
- [Events](#events)
- [Error Handling](#error-handling)

## Overview

This smart contract is designed to allow the contract owner to deposit and withdraw funds. It includes functions for managing the balance and ensures that only the owner can perform the deposit and withdrawal actions. 

The contract also includes custom error handling for cases when there are insufficient funds for withdrawal.

## Features

- **Deposit Functionality**: The contract owner can deposit Ether into the contract, increasing the balance.
- **Withdraw Functionality**: The contract owner can withdraw Ether from the contract, provided there are sufficient funds.
- **Balance Management**: The contract maintains a balance of the deposited funds and allows the owner to check the balance at any time.
- **Event Logging**: Both deposit and withdrawal actions are logged via events.
- **Error Handling**: Custom error handling is used to indicate when there are insufficient funds to withdraw.

## Requirements

- **Solidity Version**: ^0.8.9
- **Ethereum Blockchain**: Ethereum compatible networks (e.g., Ethereum, Binance Smart Chain, etc.)
- **MetaMask/Wallet**: For interacting with the deployed contract

## Deployment

1. Open Gitpod (https://gitpod.io/).
2. Create a new workspace and select a Solidity template or create your own workspace.
3. Paste the contract code into a new `.sol` file within the workspace.
4. Compile the contract using the Solidity compiler (version ^0.8.9).
5. Deploy the contract by providing an initial balance as a parameter in the deployment constructor.
6. After deployment, you can interact with the contract using the Gitpod interface, or you can interact using Web3.js or ethers.js.

## Functions

### `getBalance()`

- **Description**: Returns the current balance of the contract.
- **Visibility**: `public`
- **Returns**: `uint256` - the current balance of the contract.

### `deposit(uint256 _amount)`

- **Description**: Allows the contract owner to deposit funds into the contract.
- **Visibility**: `public`
- **Parameters**: 
  - `_amount` (uint256): The amount of Ether to deposit into the contract.
- **Modifier**: Only the owner can call this function.
- **Events**: Emits a `Deposit` event.

### `withdraw(uint256 _withdrawAmount)`

- **Description**: Allows the contract owner to withdraw funds from the contract.
- **Visibility**: `public`
- **Parameters**: 
  - `_withdrawAmount` (uint256): The amount of Ether to withdraw from the contract.
- **Modifier**: Only the owner can call this function.
- **Error Handling**: If there are insufficient funds, the transaction is reverted with a custom error (`InsufficientBalance`).
- **Events**: Emits a `Withdraw` event.

## Events

- **Deposit(uint256 amount)**: This event is emitted whenever the owner deposits funds into the contract. It logs the deposit amount.
- **Withdraw(uint256 amount)**: This event is emitted whenever the owner withdraws funds from the contract. It logs the withdrawn amount.

## Error Handling

- **InsufficientBalance(uint256 balance, uint256 withdrawAmount)**: This custom error is thrown when the owner attempts to withdraw more than the available balance in the contract. It provides both the current balance and the requested withdrawal amount.
"""

