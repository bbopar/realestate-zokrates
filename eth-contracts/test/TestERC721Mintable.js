var ERC721MintableComplete = artifacts.require('CustomERC721Token');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];

    describe('match erc721 spec', function () {
        beforeEach(async function () {
            try {
                this.contract = await ERC721MintableComplete.new({ from: account_one });

                // TODO: mint multiple tokens
                await this.contract.mint(account_one, 1, { from: account_one });

                await this.contract.mint(account_one, 2, { from: account_one });

                await this.contract.mint(account_one, 3, { from: account_one });

                await this.contract.mint(account_one, 4, { from: account_one });

            } catch (error) {
                console.log('error-beforeEach:', error);
            }
        });

        it('should return total supply', async function () {
            const totalSupply = await this.contract.totalSupply.call({ from: account_one });
            assert.equal(totalSupply, 4, "Total supply should be equal to 4");
        });

        it('should get token balance', async function () {
            const tokenBalance = await this.contract.balanceOf.call(account_one, { from: account_one });
            assert.equal(tokenBalance, "4", "account balance should be equal to 4");
        });

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () {
            const baseURL = 'https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/';
            const tokenId = 4;
            const tokenURI = await this.contract.tokenURI.call(tokenId);
            const expectedTokenURI = `${baseURL}${tokenId}`;
            assert.equal(tokenURI, expectedTokenURI, "Invalid token");
        });

        it('should transfer token from one owner to another', async function () {
            let tokenId = 1;
            await this.contract.transferFrom(account_one, account_two, tokenId, { from: account_one });
            // get the token owner
            const tokenOwner = await this.contract.ownerOf.call(tokenId);
            assert.equal(account_two, tokenOwner, "Invalid token owner");
        });
    });

    describe('have ownership properties', function () {
        beforeEach(async function () {
            this.contract = await ERC721MintableComplete.new({ from: account_one });
        });

        it('should fail when minting when address is not contract owner', async function () {
            let isReverted = false;
            try {
                const res = await this.contract.mint(account_one, 5, { from: account_two });
            } catch (error) {
                isReverted = true;
            }
            assert(isReverted, true, "Not an owner")
        });

        it('should return contract owner', async function () {
            try {
                const owner = await this.contract.getOwner.call();
                assert.equal(account_one, owner, "Invalid owner");
            } catch (error) {
                console.log('should return contract owner-error:', error)
            }
        });

    });
})