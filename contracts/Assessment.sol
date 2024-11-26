// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Contract to simulate a basic ATM with deposit and withdraw functionality
contract Assessment {
    
    address payable public owner;
    
    
    uint256 public balance;

    
    event Deposit(uint256 amount);

    
    event Withdraw(uint256 amount);

    // Constructor to set the owner and initial balance upon deployment
    // 'initBalance' is passed as a parameter for initial contract balance
    constructor(uint initBalance) payable {
        owner = payable(msg.sender);  // Set the deployer as the owner
        balance = initBalance;        // Set the initial balance
    }

    // Function to get the current balance of the contract
    function getBalance() public view returns (uint256) {
        return balance;  
    }

    // Deposit function to add funds to the contract
    // Only the owner can deposit funds
    function deposit(uint256 _amount) public payable {
        uint _previousBalance = balance; 

        // Check if the sender is the owner of the contract
        require(msg.sender == owner, "You are not the owner of this account");

        // Increase the balance with the deposit amount
        balance += _amount;

        // Assert that the balance has correctly increased
        assert(balance == _previousBalance + _amount);

        // Emit a Deposit event with the deposited amount
        emit Deposit(_amount);
    }

    // Custom error to handle insufficient balance during withdrawals
    error InsufficientBalance(uint256 balance, uint256 withdrawAmount);

    // Withdraw function to remove funds from the contract
    // Only the owner can withdraw funds
    function withdraw(uint256 _withdrawAmount) public {
        // Ensure the sender is the owner of the contract
        require(msg.sender == owner, "You are not the owner of this account");

        uint _previousBalance = balance; // Save previous balance for validation

        // Check if there are sufficient funds to withdraw
        if (balance < _withdrawAmount) {
            // Revert the transaction with a custom error if funds are insufficient
            revert InsufficientBalance({
                balance: balance,
                withdrawAmount: _withdrawAmount
            });
        }

        // Decrease the balance by the withdrawn amount
        balance -= _withdrawAmount;

        // Assert that the balance is correctly updated
        assert(balance == (_previousBalance - _withdrawAmount));

        // Emit a Withdraw event with the withdrawn amount
        emit Withdraw(_withdrawAmount);
    }
}
