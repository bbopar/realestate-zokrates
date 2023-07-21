# zk-SNARKs with NFT mint

# Project Resources

- [Remix - Solidity IDE](https://remix.ethereum.org/)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Truffle Framework](https://truffleframework.com/)
- [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
- [Open Zeppelin ](https://openzeppelin.org/)
- [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
- [Docker](https://docs.docker.com/install/)
- [ZoKrates](https://github.com/Zokrates/ZoKrates)

# Description

This projects uses zk-SNARKs on Ethereum for minting NFTs. With ZoKrates, you can create a smart contract to act as the verifier.
You can also use it to generate your proof that you know some secret information and convince the verifier of this. Instead of convincing a verifier over some kind of online channel, you simply publish the fact that you convinced the verifying smart contract to the Ethereum network.

This projects uses the ZoKrates toolbox for generating proof.

`ZoKrates proofs are used to implement zero-knowledge proofs on the Ethereum blockchain, allowing for privacy-preserving transactions and computations.`

## Installation

```
npm install
```

### Usage


Toolbox: https://github.com/zokrates/zokrates

To start Zokrates toolbox you can follow this (tutorial)[https://medium.com/extropy-io/zokrates-tutorial-with-truffle-41135a3fb754]

After Zokrates setup, export the `proof` to `proof` directory as `json`.

Compile SC: 

```
truffel compile
```

Migrate SC to testnet:

```
truffle migrate --network rinkeby
```

### Scripts

Mint:

```
node scripts/mint
```


Sell:

```
node scripts/sell
```


