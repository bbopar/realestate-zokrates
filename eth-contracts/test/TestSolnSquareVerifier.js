// Test if a new solution can be added for contract - SolnSquareVerifier
const SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
const proof = require('./proof.json');
const truffleAssert = require('truffle-assertions');

// Test if an ERC721 token can be minted for contract - SolnSquareVerifier
contract('TestSolnSquareVerifier', async (accounts) => {

    let account_1 = accounts[0];
    let firstKey;

    describe('TestingSolnSquareVerifier', () => {
        beforeEach(async () => {
            try {
                this.contract = await SolnSquareVerifier.new({ from: account_1 })
            } catch (error) {
                console.log('error:::', error);
            }
        })

        // should add solution
        it('should test add solution', async () => {
            try {
                let eventToBeEmitted = 'SolutionSubmitted';
                let index = 1;
                let result = await this.contract.add.sendTransaction(
                    index,
                    account_1,
                    {
                        from: account_1
                    }
                );

                assert.equal(result.logs[0].event, eventToBeEmitted, "Error submitting solution");
            } catch (error) {
                console.log('error', error);
            }
        });

        it('should test NTF mint', async () => {
            try {
                let eventToBeEmitted = 'SolutionSubmitted';
                let index = 2;
                let res = await this.contract.mint.sendTransaction(
                    proof.proof.a,
                    proof.proof.b,
                    proof.proof.c,
                    proof.inputs,
                    index,
                    {
                        from: account_1,
                    },
                );

                assert.equal(res.logs[0].event, eventToBeEmitted, "Error minting token");
            } catch (error) {
                console.log('error:', error);
            }
        });
    });
});