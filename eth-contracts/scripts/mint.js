/**
 * This file was based on OpenSea Tutorial:
 * https://docs.opensea.io/docs/1-structuring-your-smart-contract
 * https://github.com/ProjectOpenSea/opensea-creatures/blob/master/scripts/mint.js
 */
const HDWalletProvider = require("@truffle/hdwallet-provider")
const zokratesProof = [
    require("./proof/proof_1.json"),
    require("./proof/proof_2.json"),
    require("./proof/proof_3.json"),
    require("./proof/proof_4.json"),
    require("./proof/proof_5.json"),
    require("./proof/proof_6.json"),
    require("./proof/proof_7.json"),
    require("./proof/proof_8.json"),
    require("./proof/proof_9.json"),
    require("./proof/proof_10.json"),
];

const web3 = require('web3')
const OWNER_ADDRESS = '0x58830D73E5a6fF4938c6EE4DbE0397e1afA68dAb';
const CONTRACT_ADDRESS = '0x7264bddD494E4B3EF9c5Da94a783B40e793818E3';
const NETWORK = 'rinkeby';
const MNEMONIC = 'village suggest hundred rough snap ecology pear mirror audit bullet awake faith';
const INFURA_KEY = '4df0b31c12ea40328bd47b70a1b30d5e';
// if (!MNEMONIC || !INFURA_KEY || !OWNER_ADDRESS || !NETWORK) {
//     console.error("Please set a mnemonic, infura key, owner, network, and contract address.")
//     return
// }
const contract = require('../build/contracts/SolnSquareVerifier.json');
const ABI = contract.abi;
async function main() {
    const provider = new HDWalletProvider(MNEMONIC, `https://${NETWORK}.infura.io/v3/${INFURA_KEY}`)
    const web3Instance = new web3(
        provider
    )
    if (CONTRACT_ADDRESS) {
        const r2token = new web3Instance.eth.Contract(ABI, CONTRACT_ADDRESS, { gasLimit: "4500000" })
        console.log('r2token', r2token);
        for (let i = 1; i < zokratesProof.length; i++) {
            try {
                // const proofs = Object.values(zokratesProof[i].proof);
                // console.log('proofs', proofs);
                // const inputs = zokratesProof[i].inputs;
                // console.log("OWNER_ADDRESS " + OWNER_ADDRESS + "\n");
                // console.log("i " + i + "\n");
                // console.log("proofs " + proofs + "\n");
                // console.log("inputs " + inputs + "\n");
                console.log('lululuo:::::::', zokratesProof[i].proof.a);
                let tx2 = await r2token.methods.verifyMint(
                    OWNER_ADDRESS,
                    i,
                    zokratesProof[i].proof.a,
                    zokratesProof[i].proof.b,
                    zokratesProof[i].proof.c,
                    zokratesProof[i].inputs,
                ).send({ from: OWNER_ADDRESS });
                console.log("Minted item. Transaction: " + tx2.transactionHash);
            } catch (e) {
                console.log(e);
            }
        }
    }
}
main();