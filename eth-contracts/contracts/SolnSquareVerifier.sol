pragma solidity ^0.5.0;

import "./ERC721Mintable.sol";

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
contract SqVerifier{
    function verifyTx(uint[2] memory a, uint[2][2] memory b, uint[2] memory c, uint[2] memory input) public returns(bool);
}


// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is CustomERC721Token {
    SqVerifier sqVerifierContract;

    constructor(address verifier) public {
        sqVerifierContract = SqVerifier(verifier);
    }

    // TODO define a solutions struct that can hold an index & an address
    struct Solution {
        uint256 index;
        address account;
        bool isSubmitted;
    }

    // TODO define an array of the above struct
    Solution[] private solutions;

    // TODO define a mapping to store unique solutions submitted
    mapping(bytes32 => Solution) private submittedSolutions;

    // TODO Create an event to emit when a solution is added
    event SolutionSubmitted(uint256 index, address account);


    // TODO Create a function to add the solutions to the array and emit the event
    function addSolution(uint256 index, bytes32 key) public {
        Solution memory currentSolution = Solution(index, msg.sender, true);

        solutions.push(currentSolution);
        
        submittedSolutions[key] = currentSolution;

        emit SolutionSubmitted(index, msg.sender);
    }


    // TODO Create a function to mint new NFT only after the solution has been verified
    //  - make sure the solution is unique (has not been used before)
    //  - make sure you handle metadata as well as tokenSuplly
    function verifyMint(
        address to,
        uint256 tokenId,
        uint[2] memory a,
        uint[2][2] memory b,
        uint[2] memory c,
        uint[2] memory input
    ) public returns(bool){
        bytes32 solutionKey = getKey(a, b, c, input);

        require(sqVerifierContract.verifyTx(a, b, c, input), "Invalid proof");
        require(!submittedSolutions[solutionKey].isSubmitted, "Solution has to be unique");

        addSolution(tokenId, solutionKey);

        bool mintStatus = mint(to, tokenId);
        return mintStatus;
    }

    function getKey(        
        uint[2] memory a,
        uint[2][2] memory b,
        uint[2] memory c,
        uint[2] memory input
    ) public view returns(bytes32) {
        return keccak256(abi.encodePacked(a, b, c, input));
    } 

}
