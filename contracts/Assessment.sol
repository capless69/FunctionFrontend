// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Contract to simulate a basic ATM with deposit and withdraw functionality
contract Assessment {
    address payable public owner; // Owner of the contract
    uint256 public balance;       // Contract balance

    // Events for deposit and withdraw operations
    event Deposit(uint256 amount);
    event Withdraw(uint256 amount);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    // Constructor to set the owner and initial balance upon deployment
    constructor(uint initBalance) payable {
        owner = payable(msg.sender);  // Set the deployer as the owner
        balance = initBalance;        // Set the initial balance
    }

    // Function to get the current balance of the contract
    function getBalance() public view returns (uint256) {
        return balance;
    }

    // Deposit function to add funds to the contract
    function deposit(uint256 _amount) public payable {
        uint _previousBalance = balance; 

        require(msg.sender == owner, "You are not the owner of this account");

        balance += _amount;

        assert(balance == _previousBalance + _amount);

        emit Deposit(_amount);
    }

    // Custom error to handle insufficient balance during withdrawals
    error InsufficientBalance(uint256 balance, uint256 withdrawAmount);

    // Withdraw function to remove funds from the contract
    function withdraw(uint256 _withdrawAmount) public {
        require(msg.sender == owner, "You are not the owner of this account");

        uint _previousBalance = balance; 

        if (balance < _withdrawAmount) {
            revert InsufficientBalance({
                balance: balance,
                withdrawAmount: _withdrawAmount
            });
        }

        balance -= _withdrawAmount;

        assert(balance == (_previousBalance - _withdrawAmount));

        emit Withdraw(_withdrawAmount);
    }

    // Function to transfer ownership to a new owner
    function transferOwnership(address payable newOwner) public {
        require(msg.sender == owner, "Only the owner can transfer ownership");
        require(newOwner != address(0), "New owner address cannot be zero address");

        emit OwnershipTransferred(owner, newOwner);

        owner = newOwner;
    }

    // Function to withdraw all funds from the contract
    function withdrawAll() public {
        require(msg.sender == owner, "You are not the owner of this account");

        uint _previousBalance = balance;

        if (balance == 0) {
            revert InsufficientBalance({
                balance: balance,
                withdrawAmount: 0
            });
        }

        uint256 _withdrawAmount = balance;
        balance = 0;

        assert(balance == 0);

        emit Withdraw(_withdrawAmount);
    }

    // Function to allow anyone to deposit to the contract (optional)
    function publicDeposit() public payable {
        require(msg.value > 0, "Deposit amount must be greater than zero");

        balance += msg.value;

        emit Deposit(msg.value);
    }

    // Function to get the owner's address
    function getOwner() public view returns (address) {
        return owner;
    }
}
