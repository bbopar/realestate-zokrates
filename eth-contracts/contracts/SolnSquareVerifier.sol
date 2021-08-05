pragma solidity ^0.5.0;

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
import './Verifier.sol';
import './ERC721Mintable.sol';

// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is CustomERC721Token, Verifier {
    // TODO define a solutions struct that can hold an index & an address
    struct Solution {
        uint256 index;
        address account;
        bool isSubmited;
    }

    // TODO define an array of the above struct
    Solution[] public solutions;

    // TODO define a mapping to store unique solutions submitted
    mapping(uint256 => Solution) public submittedSolutions;

    // TODO Create an event to emit when a solution is added
    event SolutionSubmitted(uint256 index, address account);

    // TODO Create a function to add the solutions to the array and emit the event
    function add(uint256 index, address account) public {
        // create new soultion
        Solution memory addNewSol = Solution({
            index: index,
            account: account,
            isSubmited: true
        });

        submittedSolutions[index] = addNewSol;

        // push to submitted soultions
        solutions.push(addNewSol);

        emit SolutionSubmitted(index, account);
    }

    // TODO Create a function to mint new NFT only after the solution has been verified
    //  - make sure the solution is unique (has not been used before)
    //  - make sure you handle metadata as well as tokenSuplly

    function mintSol(
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c,
        uint256[2] memory input,
        uint256 index
    ) public {
        require(verifyTx(a, b, c, input), "Invalid solution");
        require(!submittedSolutions[index].isSubmited, "Already submitted");
        add(index, msg.sender);
        super.mint(msg.sender, index);
    }
}
