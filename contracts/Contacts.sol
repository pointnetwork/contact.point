// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

/*
    REQUIREMENTS
    - A counter to keep track of contact IDs
    - A data structure to hold Contacts
    - A mapping to map Contacts to each address
    - A method to return contacts for msg.sender
    - A method to add contacts for msg.sender
    - A method to delete contacts for msg.sender
*/
contract Contacts is Initializable, UUPSUpgradeable, OwnableUpgradeable{
    using Counters for Counters.Counter;
    Counters.Counter internal _contactIds;

    struct Contact {
        uint256 id;
        address contact;
    }
    mapping(address => Contact[]) contacts;

    event ContactAdded (address contact, uint256 id);
    event ContactDeleted (address contact);

    function initialize() public initializer onlyProxy {
        __Ownable_init();
        __UUPSUpgradeable_init();
    }

    function _authorizeUpgrade(address) internal override onlyOwner {}

    // A method to return contacts for msg.sender
    function getContacts() public view returns(Contact[] memory) {
        return contacts[msg.sender];
    }

    // A method to add contacts for msg.sender
    function addContact(address _contact) public payable {
        Contact[] storage userContacts = contacts[msg.sender];
        for(uint256 i=0; i<userContacts.length; i++) {
            if(userContacts[i].contact == _contact) revert("Contact already exists");
        }

        _contactIds.increment();
        Contact memory temp = Contact({
            id: _contactIds.current(),
            contact: _contact
        });
        userContacts.push(temp);
        emit ContactAdded(temp.contact,temp.id);
    }

    // A method to delete contacts for msg.sender
    function deleteContact(address _contact) public payable {
        Contact[] storage userContacts = contacts[msg.sender];

        int256 index = -1;
        for(uint256 i=0; i<userContacts.length; i++) {
            if(userContacts[i].contact == _contact) {
                index = int256(i);
                break;
            }
        }
        if(index == -1) revert("Contact does not exist");

        for(uint256 i=uint256(index); i<userContacts.length-1; i++) {
            userContacts[i] = userContacts[i+1];
        }
        userContacts.pop();
        emit ContactDeleted(_contact);
    }
}