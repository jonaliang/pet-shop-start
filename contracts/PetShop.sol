pragma solidity ^0.4.17;

import "./Shop.sol";

contract PetShop is Shop (msg.sender) {
  address[4] private pets;
  uint private price = 1 ether;
  
  function adopt(uint petId) public payable {
    require(petId >= 0 && petId <= 3);
    require(pets[petId] == address(0));
    require(msg.value == price);
    
    pets[petId] = msg.sender;
  }

  function getPets() public view returns (address[4]) {
    return pets;
  }
  
  function setPrice(uint _price) public onlyOwner {
    price = _price * 1 ether;
  }
}
