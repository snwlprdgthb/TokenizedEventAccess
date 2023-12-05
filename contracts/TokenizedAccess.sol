// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "./ERC721A.sol";

import "./openzeppelin-contracts/contracts/access/Ownable.sol";
import "./openzeppelin-contracts/contracts/utils/cryptography/MerkleProof.sol";
import "./openzeppelin-contracts/contracts/security/ReentrancyGuard.sol";

contract TokenizedAccess is ERC721A, Ownable, ReentrancyGuard {
    using Strings for uint256;

    bytes32 public merkleRoot;
    mapping(address => uint256) public whitelistClaimed;

    string public uriPrefix = "";
    string public uriSuffix = ".json";
    string public hiddenMetadataUri;
    string public contractUri;

    uint256 public cost;
    uint256 public maxSupply;
    uint256 public maxMintAmountPerTx;

    uint256 public mintWave;

    bool public paused = true;
    bool public whitelistMintEnabled = false;
    bool public revealed = false;

    function renounceOwnership() public view override onlyOwner {
        revert();
    }

    function transferOwnership(
        address newOwner
    ) public view override onlyOwner {
        require(newOwner != address(0));
        revert();
    }

    constructor(
        string memory _tokenName,
        string memory _tokenSymbol,
        uint256 _cost,
        uint256 _maxSupply,
        uint256 _maxMintAmountPerTx,
        string memory _hiddenMetadataUri,
        string memory _contractUri
    ) ERC721A(_tokenName, _tokenSymbol) {
        setCost(_cost);
        setMintWave(1);
        setMaxSupply(_maxSupply);
        setMaxMintAmountPerTx(_maxMintAmountPerTx);
        setHiddenMetadataUri(_hiddenMetadataUri);
        setContractUri(_contractUri);
    }

    modifier mintCompliance(uint256 _mintAmount) {
        require(
            _mintAmount > 0 && _mintAmount <= maxMintAmountPerTx,
            "Invalid mint amount!"
        );
        require(
            totalSupply() + _mintAmount <= maxSupply,
            "Max supply exceeded!"
        );
        _;
    }

    modifier mintPriceCompliance(uint256 _mintAmount) {
        require(msg.value >= cost * _mintAmount, "Insufficient funds!");
        _;
    }

    function whitelistMint(
        uint256 _mintAmount,
        bytes32[] calldata _merkleProof
    )
        public
        payable
        mintCompliance(_mintAmount)
        mintPriceCompliance(_mintAmount)
    {
        // Verify whitelist requirements
        require(whitelistMintEnabled, "The whitelist sale is not enabled!");
        require(
            whitelistClaimed[_msgSender()] != mintWave,
            "Address already claimed!"
        );
        require(whitelistContains(_merkleProof), "Invalid proof!");

        whitelistClaimed[_msgSender()] = mintWave;
        _safeMint(_msgSender(), _mintAmount);
    }

    function whitelistContains(
        bytes32[] calldata _merkleProof
    ) public view returns (bool) {
        bytes32 leaf = keccak256(abi.encodePacked(_msgSender()));
        return MerkleProof.verify(_merkleProof, merkleRoot, leaf);
    }

    function mint(
        uint256 _mintAmount
    )
        public
        payable
        mintCompliance(_mintAmount)
        mintPriceCompliance(_mintAmount)
    {
        require(!paused, "The contract is paused!");

        _safeMint(_msgSender(), _mintAmount);
    }

    function mintForAddress(
        uint256 _mintAmount,
        address _receiver
    ) public mintCompliance(_mintAmount) onlyOwner {
        _safeMint(_receiver, _mintAmount);
    }

    function walletOfOwner(
        address _owner
    ) public view returns (uint256[] memory) {
        uint256 ownerTokenCount = balanceOf(_owner);
        uint256[] memory ownedTokenIds = new uint256[](ownerTokenCount);
        uint256 currentTokenId = _startTokenId();
        uint256 ownedTokenIndex = 0;
        address latestOwnerAddress;

        while (
            ownedTokenIndex < ownerTokenCount && currentTokenId < _currentIndex
        ) {
            TokenOwnership memory ownership = _ownerships[currentTokenId];

            if (!ownership.burned) {
                if (ownership.addr != address(0)) {
                    latestOwnerAddress = ownership.addr;
                }

                if (latestOwnerAddress == _owner) {
                    ownedTokenIds[ownedTokenIndex] = currentTokenId;

                    ownedTokenIndex++;
                }
            }

            currentTokenId++;
        }

        return ownedTokenIds;
    }

    function _startTokenId() internal view virtual override returns (uint256) {
        return 1;
    }

    function tokenURI(
        uint256 _tokenId
    ) public view virtual override returns (string memory) {
        require(
            _exists(_tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        if (revealed == false) {
            return hiddenMetadataUri;
        }

        string memory currentBaseURI = _baseURI();
        return
            bytes(currentBaseURI).length > 0
                ? string(
                    abi.encodePacked(
                        currentBaseURI,
                        _tokenId.toString(),
                        uriSuffix
                    )
                )
                : "";
    }

    function setRevealed(bool _state) public onlyOwner {
        revealed = _state;
    }

    function setCost(uint256 _cost) public onlyOwner {
        cost = _cost;
    }

    function setMintWave(uint256 _mintWave) public onlyOwner {
        mintWave = _mintWave;
    }

    function setMaxMintAmountPerTx(
        uint256 _maxMintAmountPerTx
    ) public onlyOwner {
        maxMintAmountPerTx = _maxMintAmountPerTx;
    }

    function setMaxSupply(uint256 _maxSupply) public onlyOwner {
        maxSupply = _maxSupply;
    }

    function setHiddenMetadataUri(
        string memory _hiddenMetadataUri
    ) public onlyOwner {
        hiddenMetadataUri = _hiddenMetadataUri;
    }

    function setContractUri(string memory _contractUri) public onlyOwner {
        contractUri = _contractUri;
    }

    function setUriPrefix(string memory _uriPrefix) public onlyOwner {
        uriPrefix = _uriPrefix;
    }

    function setUriSuffix(string memory _uriSuffix) public onlyOwner {
        uriSuffix = _uriSuffix;
    }

    function setPaused(bool _state) public onlyOwner {
        paused = _state;
    }

    function setMerkleRoot(bytes32 _merkleRoot) public onlyOwner {
        merkleRoot = _merkleRoot;
    }

    function setWhitelistMintEnabled(bool _state) public onlyOwner {
        whitelistMintEnabled = _state;
    }

    function withdraw() public onlyOwner nonReentrant {
        (bool os, ) = payable(owner()).call{value: address(this).balance}("");
        require(os);
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return uriPrefix;
    }

    function contractURI() public view returns (string memory) {
        return contractUri;
    }
}
