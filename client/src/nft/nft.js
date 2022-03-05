import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import myEpikNft from '../utils/MyEpikNFT.json';
import { useMutation } from "@apollo/client";
import { ADD_POST } from "../utils/mutations";

const CONTRACT_ADDRESS = "0x71964621a255F1da7ebde644F36258Cf365174dF";

const Nft = ({ username }) => {
    const [addPost] = useMutation(ADD_POST);
    const [nftJson, setNftJson] = useState('');
    
    const [currentAccount, setCurrentAccount] = useState("");

    const handleMint = async (nftJson, username) => {
      let description = prompt("Whats the description of the post");

      const { data } = await addPost({
        variables: {
          description: description,
          username: username,
          nft: nftJson
        },
      });
      console.log(data);
      window.location.reload();
    }
    
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

        connectedContract.on("NewEpicNFTMinted", async (from, tokenId, nftBase64Json) => {
          let base64 = await nftBase64Json.split('base64,');
          let buff = await Buffer.from(base64[1], 'base64');  
          let jsonString = await buff.toString('utf-8');
          let json = await JSON.parse(jsonString);
          await setNftJson(json);
          handleMint(json, username);
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
          {currentAccount === "" ? renderNotConnectedContainer() : renderMintUI()}
      </div>
    </div>
  );
};

export default Nft;