const SquareVerifier = artifacts.require('Verifier');
const SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
const SquareProof = require('./proof.json');

contract('TestSolnSquareVerifier', accounts => {

    const owner = accounts[0];
    const account_1 = accounts[1];

    // Test if a new solution can be added for contract - SolnSquareVerifier
    describe('Test for adding new solution for contract', () => {
        beforeEach(async () => {
            const squareVerifier = await SquareVerifier.new({ from: owner });
            this.contract = await SolnSquareVerifier.new(squareVerifier.address, { from: owner });
        })

        // should test verify mintNFT
        it('should test verify mintNFT', async () => {
            try {
                let eventToBeEmitted = 'SolutionSubmitted';
                let index = 1;
                let result = await this.contract.verifyMint(
                    account_1,
                    index,
                    SquareProof.proof.a,
                    SquareProof.proof.b,
                    SquareProof.proof.c,
                    SquareProof.inputs,
                    {
                        from: owner
                    },
                );

                assert.equal(result.logs[0].event, eventToBeEmitted, "Error submitting solution");
            } catch (error) {
                console.log('error', error);
            }
        });

        it('should test add solution (method: addSolution)', async () => {
            try {
                let eventToBeEmitted = 'SolutionSubmitted';

                let key = await this.contract.getKey(
                    SquareProof.proof.a,
                    SquareProof.proof.b,
                    SquareProof.proof.c,
                    SquareProof.inputs,
                    {
                        from: account_1,
                    }
                );

                let index = 2;
                let res = await this.contract.addSolution(
                    index,
                    key,
                    {
                        from: account_1,
                    },
                );

                assert.equal(res.logs[0].event, eventToBeEmitted, "Error minting token");
            } catch (error) {
                console.log('error:', error);
            }
        });
    })



})
