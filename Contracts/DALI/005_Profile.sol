// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155BurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155SupplyUpgradeable.sol";

// Profile (P) v0.1.0
// Profile recieves data and creates items as Vaults




contract Profile is Initializable, ERC1155Upgradeable, ERC1155BurnableUpgradeable, ERC1155PausableUpgradeable, OwnableUpgradeable, UUPSUpgradeable, AccessControlUpgradeable, ERC1155SupplyUpgradeable {
    struct Item {
        bytes32[] encryptedItem;
    }
    uint256 public itemID;
    mapping (uint256 => Item) internal items;
    event EncryptionToolsSet(address _encryptionTools);
    bytes32 public constant URI_SETTER_ROLE = keccak256("URI_SETTER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");
    address public ETAddress;
    address public ITAddress;
    address public newOwner;
    address public IDAddress;
    event ItemTrackerSet(address _itemTracker);
    mapping(uint256 => address) public itemOwners;
    event ItemDisplacerSet(address _itemDisplacer);
    address public vaultAddress;
    mapping(uint256 => address) public vaults;
    mapping(uint256 => uint256) public vaultIDs;
    mapping(uint256 => uint256) public vaultBalances;
    event VaultSet(address _vault);
    mapping(uint256 => uint256) public Profiles;
    mapping(uint256 => uint256) public ProfileIDs;
    mapping(uint256 => uint256) public ProfileBalances;
        

    // initialize the contract
    function initialize(address _vaultAddress) public {
        __ERC1155_init("https://ipfs.io/ipfs/");
        __ERC1155Burnable_init();
        __ERC1155Pausable_init();
        __Ownable_init();
        __UUPSUpgradeable_init();
        __AccessControl_init();
        __ERC1155Supply_init();
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(URI_SETTER_ROLE, msg.sender);
        _setupRole(PAUSER_ROLE, msg.sender);
        _setupRole(MINTER_ROLE, msg.sender);
        _setupRole(UPGRADER_ROLE, msg.sender);
        vaultAddress = _vaultAddress;
    }

    // set the encryption tools address
    function setEncryptionTools(address _encryptionTools) public {
        require(hasRole(UPGRADER_ROLE, msg.sender), "Profile: must have upgrader role to set encryption tools");
        ETAddress = _encryptionTools;
        emit EncryptionToolsSet(_encryptionTools);
    }
    // set the item tracker address
    function setItemTracker(address _itemTracker) public {
        require(hasRole(UPGRADER_ROLE, msg.sender), "Profile: must have upgrader role to set item tracker");
        ITAddress = _itemTracker;
    }

    // set the item distributor address
    function setItemDistributor(address _itemDistributor) public {
        require(hasRole(UPGRADER_ROLE, msg.sender), "Profile: must have upgrader role to set item distributor");
        IDAddress = _itemDistributor;
    }

    // create a new item
    function createItem(bytes32[] memory _encryptedItem) public {
        require(hasRole(MINTER_ROLE, msg.sender), "Profile: must have minter role to create item");
        items[itemID].encryptedItem = _encryptedItem;
        itemOwners[itemID] = msg.sender;
        _mint(msg.sender, itemID, 1, "");
        itemID++;
        (bool success, bytes memory result) = vaultAddress.call(abi.encodeWithSignature("createItem(uint256)", itemID));
        require(success, "Profile: failed to add item to vault");
    }

    // create a new vault and add it to the profile
    function createVault(string memory _description) public {
        require(hasRole(MINTER_ROLE, msg.sender), "Profile: must have minter role to create vault");
        (bool success, bytes memory result) = vaultAddress.call(abi.encodeWithSignature("createVault()"));
        require(success, "Profile: failed to create vault");
        uint256 vaultID = abi.decode(result, (uint256));
        vaults[vaultID] = msg.sender;
        vaultIDs[vaultID] = vaultID;
        vaultBalances[vaultID] = 1;
    }

    // transfer ownership of a vault
    function transferVault(uint256 _vaultID, address _newOwner) public {
        require(hasRole(MINTER_ROLE, msg.sender), "Profile: must have minter role to transfer vault");
        require(vaults[_vaultID] == msg.sender, "Profile: must be owner of vault to transfer vault");
        vaults[_vaultID] = _newOwner;
    }

    // The following functions are overrides required by Solidity.
    
            function setURI(string memory newuri) public onlyRole(URI_SETTER_ROLE) {
        _setURI(newuri);
    }

    function pause() public onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    function mint(address account, uint256 id, uint256 amount, bytes memory data)
        public
        onlyRole(MINTER_ROLE)
    {
        _mint(account, id, amount, data);
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        public
        onlyRole(MINTER_ROLE)
    {
        _mintBatch(to, ids, amounts, data);
    }

    function _beforeTokenTransfer(address operator, address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        internal
        whenNotPaused
        override(ERC1155PausableUpgradeable, ERC1155Upgradeable, ERC1155SupplyUpgradeable)
    {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }

    function _authorizeUpgrade(address newImplementation)
        internal
        onlyRole(UPGRADER_ROLE)
        override
    {}

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC1155Upgradeable, AccessControlUpgradeable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

}