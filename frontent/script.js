import { ethers } from "https://cdn.ethers.io/lib/ethers-5.2.esm.min.js";

const contractAddress = "0xD81afF687C6A5FE588B9510169f7Dd328F215A5B";
const contractABI = [[
     // ABI Content (add ABI from your compiled contract here)
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_entryFee",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "questionText",
				"type": "string"
			}
		],
		"name": "QuestionAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [],
		"name": "QuizStarted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "winner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "prizeAmount",
				"type": "uint256"
			}
		],
		"name": "WinnerDeclared",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_questionText",
				"type": "string"
			},
			{
				"internalType": "string[]",
				"name": "_options",
				"type": "string[]"
			},
			{
				"internalType": "uint256",
				"name": "_correctOptionIndex",
				"type": "uint256"
			}
		],
		"name": "addQuestion",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_winner",
				"type": "address"
			}
		],
		"name": "declareWinner",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "entryFee",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "hasParticipated",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "participateInQuiz",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "prizePool",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "questions",
		"outputs": [
			{
				"internalType": "string",
				"name": "questionText",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "correctOptionIndex",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "winners",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
   
];

let provider;
let signer;
let contract;

async function connectWallet() {
    if (window.ethereum) {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        signer = provider.getSigner();
        contract = new ethers.Contract(contractAddress, contractABI, signer);
    } else {
        alert("Please install MetaMask to use this app.");
    }
}

async function addQuestion() {
    const question = document.getElementById('question').value;
    const options = document.getElementById('options').value.split(',');
    const correctIndex = document.getElementById('correctIndex').value;

    await contract.addQuestion(question, options, parseInt(correctIndex));
    alert("Question added successfully!");
}

async function participateInQuiz() {
    const entryFee = document.getElementById('entryFee').value;

    await contract.participateInQuiz({ value: ethers.utils.parseEther(entryFee) });
    alert("Participation successful!");
}

async function declareWinner() {
    const winnerAddress = document.getElementById('winnerAddress').value;

    await contract.declareWinner(winnerAddress);
    alert(`Winner ${winnerAddress} declared successfully!`);
}

// Auto connect to MetaMask on page load
window.onload = connectWallet;
