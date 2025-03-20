// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DecentralizedQuiz {
    address public owner;
    uint public prizePool;
    uint public entryFee;

    struct Question {
        string questionText;
        string[] options;
        uint correctOptionIndex;
    }

    Question[] public questions;
    mapping(address => bool) public hasParticipated;
    mapping(address => bool) public winners;

    event QuestionAdded(string questionText);
    event QuizStarted();
    event WinnerDeclared(address winner, uint prizeAmount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    constructor(uint _entryFee) {
        owner = msg.sender;
        entryFee = _entryFee;
    }

    function addQuestion(string memory _questionText, string[] memory _options, uint _correctOptionIndex) public onlyOwner {
        require(_correctOptionIndex < _options.length, "Invalid correct option index");
        questions.push(Question(_questionText, _options, _correctOptionIndex));
        emit QuestionAdded(_questionText);
    }

    function participateInQuiz() public payable {
        require(msg.value == entryFee, "Incorrect entry fee");
        require(!hasParticipated[msg.sender], "You have already participated");
        hasParticipated[msg.sender] = true;
        prizePool += msg.value;
    }

    function declareWinner(address _winner) public onlyOwner {
        require(hasParticipated[_winner], "Winner must be a participant");
        winners[_winner] = true;
        payable(_winner).transfer(prizePool);
        emit WinnerDeclared(_winner, prizePool);
        prizePool = 0;
    }
}

