const opensea = require("opensea-js");
const OpenSeaPort = opensea.OpenSeaPort;
const Network = opensea.Network;
const MnemonicWalletSubprovider = require("@0x/subproviders")
    .MnemonicWalletSubprovider;
const RPCSubprovider = require("web3-provider-engine/subproviders/rpc");
const Web3ProviderEngine = require("web3-provider-engine");

const MNEMONIC = "village suggest hundred rough snap ecology pear mirror audit bullet awake faith";
const NODE_API_KEY = "4df0b31c12ea40328bd47b70a1b30d5e";
// const isInfura = true;

const NFT_CONTRACT_ADDRESS = "0xDB24D2c9599d40719A1c020139b177AC96a4DD20";
const OWNER_ADDRESS = "0x58830D73E5a6fF4938c6EE4DbE0397e1afA68dAb";
const NETWORK = process.env.NETWORK;
const API_KEY = ""; // API key is optional but useful if you're doing a high volume of requests.

const BASE_DERIVATION_PATH = `44'/60'/0'/0`;

const mnemonicWalletSubprovider = new MnemonicWalletSubprovider({
    mnemonic: MNEMONIC,
    baseDerivationPath: BASE_DERIVATION_PATH,
});
const network =
    NETWORK === "mainnet" || NETWORK === "live" ? "mainnet" : "rinkeby";
const infuraRpcSubprovider = new RPCSubprovider({
    rpcUrl: `wss://rinkeby.infura.io/ws/v3/${NODE_API_KEY}`
});

const providerEngine = new Web3ProviderEngine();
providerEngine.addProvider(mnemonicWalletSubprovider);
providerEngine.addProvider(infuraRpcSubprovider);
providerEngine.start();

const seaport = new OpenSeaPort(
    providerEngine,
    {
        networkName:
            NETWORK === "mainnet" || NETWORK === "live"
                ? Network.Main
                : Network.Rinkeby,
        apiKey: API_KEY,
    },
    (arg) => console.log(arg)
);

async function main() {
    // Example: simple fixed-price sale of an item owned by a user.
    console.log("Auctioning an item for a fixed price...");
    let fixedPriceSellOrder;
    try {
        const myAsset = await seaport.api.getAsset({
            tokenAddress: NFT_CONTRACT_ADDRESS, // string
            tokenId: "1", // string | number | null
        })
        // myAsset returned successfully
        const asset = {
            tokenAddress: NFT_CONTRACT_ADDRESS,
            name: 'Cozy family home',
            description: 'Large Family Home',
            schemaName: 'ERC721',
        }
        fixedPriceSellOrder = await seaport.createSellOrder({
            asset,
            startAmount: 0.05,
            expirationTime: 0,
            accountAddress: OWNER_ADDRESS,
        });
    } catch (err) {
        console.log('WTF;', err)
    }

    // console.log('ressss:::::', fixedPriceSellOrder);
    // console.log(
    //     `Successfully created a fixed-price sell order! ${fixedPriceSellOrder.asset.openseaLink}\n`
    // );

    // // Example: Dutch auction.
    // console.log("Dutch auctioning an item...");
    // const expirationTime = Math.round(Date.now() / 1000 + 60 * 60 * 24);
    // const dutchAuctionSellOrder = await seaport.createSellOrder({
    //     asset: {
    //         tokenId: "2",
    //         tokenAddress: NFT_CONTRACT_ADDRESS,
    //     },
    //     startAmount: 0.05,
    //     endAmount: 0.01,
    //     expirationTime: expirationTime,
    //     accountAddress: OWNER_ADDRESS,
    // });
    // console.log(
    //     `Successfully created a dutch auction sell order! ${dutchAuctionSellOrder.asset.openseaLink}\n`
    // );

    // Example: English auction.
    // console.log("English auctioning an item in DAI...");
    // const wethAddress =
    //     NETWORK === "mainnet" || NETWORK === "live"
    //         ? "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
    //         : "0xc778417e063141139fce010982780140aa0cd5ab";
    // const englishAuctionSellOrder = await seaport.createSellOrder({
    //     asset: {
    //         tokenId: "3",
    //         tokenAddress: NFT_CONTRACT_ADDRESS,
    //     },
    //     startAmount: 0.03,
    //     expirationTime: expirationTime,
    //     waitForHighestBid: true,
    //     paymentTokenAddress: wethAddress,
    //     accountAddress: OWNER_ADDRESS,
    // });
    // console.log(
    //     `Successfully created an English auction sell order! ${englishAuctionSellOrder.asset.openseaLink}\n`
    // );
}

main();