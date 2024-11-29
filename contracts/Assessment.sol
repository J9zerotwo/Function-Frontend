// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Assessment {
    address payable public owner;
    uint256 public balance; // ATM balance
    uint256 public savingsBalance; // Savings balance
    uint256 public investmentBalance; // Investment balance

    event Deposit(uint256 amount);
    event Withdraw(uint256 amount);
    event SavingsDeposit(uint256 amount);
    event SavingsWithdraw(uint256 amount);
    event InvestmentDeposit(uint256 amount);
    event InvestmentWithdraw(uint256 amount);

    constructor(uint initBalance) payable {
        owner = payable(msg.sender);
        balance = initBalance;
        savingsBalance = 0;
        investmentBalance = 0;
    }

    function getBalance() public view returns (uint256) {
        return balance;
    }

    function getSavingsBalance() public view returns (uint256) {
        return savingsBalance;
    }

    function getInvestmentBalance() public view returns (uint256) {
        return investmentBalance;
    }

    // Deposit to ATM
    function deposit(uint256 _amount) public payable {
        require(msg.sender == owner, "You are not the owner of this account");
        uint256 previousBalance = balance;
        balance += _amount;

        assert(balance == previousBalance + _amount);
        emit Deposit(_amount);
    }

    // Withdraw from ATM
    function withdraw(uint256 _withdrawAmount) public {
        require(msg.sender == owner, "You are not the owner of this account");
        if (balance < _withdrawAmount) {
            revert("Insufficient balance");
        }

        uint256 previousBalance = balance;
        balance -= _withdrawAmount;

        assert(balance == previousBalance - _withdrawAmount);
        emit Withdraw(_withdrawAmount);
    }

    // Deposit to savings
    function savingsDeposit(uint256 _amount) public payable {
        require(msg.sender == owner, "You are not the owner of this account");
        uint256 previousBalance = savingsBalance;
        savingsBalance += _amount;

        assert(savingsBalance == previousBalance + _amount);
        emit SavingsDeposit(_amount);
    }

    // Withdraw from savings
    function savingsWithdraw(uint256 _withdrawAmount) public {
        require(msg.sender == owner, "You are not the owner of this account");
        if (savingsBalance < _withdrawAmount) {
            revert("Insufficient savings balance");
        }

        uint256 previousBalance = savingsBalance;
        savingsBalance -= _withdrawAmount;

        assert(savingsBalance == previousBalance - _withdrawAmount);
        emit SavingsWithdraw(_withdrawAmount);
    }

    // Deposit to investment fund
    function investmentDeposit(uint256 _amount) public payable {
        require(msg.sender == owner, "You are not the owner of this account");
        uint256 previousBalance = investmentBalance;
        investmentBalance += _amount;

        assert(investmentBalance == previousBalance + _amount);
        emit InvestmentDeposit(_amount);
    }

    // Withdraw from investment fund
    function investmentWithdraw(uint256 _withdrawAmount) public {
        require(msg.sender == owner, "You are not the owner of this account");
        if (investmentBalance < _withdrawAmount) {
            revert("Insufficient investment balance");
        }

        uint256 previousBalance = investmentBalance;
        investmentBalance -= _withdrawAmount;

        assert(investmentBalance == previousBalance - _withdrawAmount);
        emit InvestmentWithdraw(_withdrawAmount);
    }
}
