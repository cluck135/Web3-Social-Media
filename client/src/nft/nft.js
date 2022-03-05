import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import myEpikNft from '../utils/MyEpikNFT.json';

const OPENSEA_LINK = 'https://testnets.opensea.io/collection/squarenft-abwd6uw01l';
const TOTAL_MINT_COUNT = 50;
const CONTRACT_ADDRESS = "0x71964621a255F1da7ebde644F36258Cf365174dF";

const Nft = () => {
    const [nftJson, setNftJson] = useState([])
    
    const [currentAccount, setCurrentAccount] = useState("");
    
    const checkIfWalletIsConnected = async () => {
      const { ethereum } = window;

      if (!ethereum) {
          console.log("Make sure you have metamask!");
          return;
      } else {
          console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length !== 0) {
          const account = accounts[0];
          console.log("Found an authorized account:", account);
					setCurrentAccount(account)
          
          setupEventListener()
      } else {
          console.log("No authorized account found")
      }
  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);

      setupEventListener() 
    } catch (error) {
      console.log(error)
    }
  }

  // Setup our listener.
  const setupEventListener = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, myEpikNft.abi, signer);

        connectedContract.on("NewEpicNFTMinted", (from, tokenId, nftBase64Json) => {
          let base64 = nftBase64Json.split('base64,');
          let buff = Buffer.from(base64[1], 'base64');  
          let jsonString = buff.toString('utf-8');
          let json = JSON.parse(jsonString);
          setNftJson([...nftJson, json]);
          console.log(from, tokenId.toNumber())
          alert(`  Hey there! We've minted your NFT and sent it to your wallet. It may be blank right now. It can take a max of 10 min to show up on OpenSea. Here's the link: https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}`)
        });

        console.log("Setup event listener!")

      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
    console.log(nftJson);
  }

  const askContractToMintNft = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, myEpikNft.abi, signer);

        console.log("Going to pop wallet now to pay gas...")
        let nftTxn = await connectedContract.makeAnEpikNFT();

        console.log("Mining...please wait.")
        await nftTxn.wait();
        console.log(nftTxn);
        console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);

      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  const renderNotConnectedContainer = () => (
    <button onClick={connectWallet} className="">
      Connect to Wallet
    </button>
  );

  const renderMintUI = () => (
    <button onClick={askContractToMintNft} className="">
      Mint NFT
    </button>
  )

  return (
    <div>
      <div>
          {/* <p>
            Each unique. Each beautiful. Discover your NFT today.
          </p> */}
          {currentAccount === "" ? renderNotConnectedContainer() : renderMintUI()}
      </div>
        {/* <a href={OPENSEA_LINK} >
        <button>🌊 View Collection on OpenSea </button>
        </a> */}
    </div>
  );
};

export default Nft;