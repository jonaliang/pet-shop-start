pragma solidity ^0.4.17;

contract Shop {
  address internal owner;
  
  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }
  
  function Shop(address _owner) public {
    owner = _owner;
  }
  
  function getBalance() public view returns (uint) {
    return this.balance;  
  }
  
  function destroy() public onlyOwner {
    selfdestruct(owner);
  }
}
