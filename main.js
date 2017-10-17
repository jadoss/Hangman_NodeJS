var prompt = require('prompt');
var Word = require('./word.js');

prompt.start();

var pastGuesses = [];

game = {
	wordBank : ["orange", "red", "blue", "yellow", "indigo", "violet",],
	wordsWon : 0,
	guessesRemaining : 10, //per word
	currentWrd : null,
	startGame : function (wrd){
		//make sure the user has 10 guesses
		this.resetGuessesRemaining();
		//get a random word from the array
		this.currentWrd = new Word(this.wordBank[Math.floor(Math.random()* this.wordBank.length)]);
		this.currentWrd.getLets(); //populate currentWrd (made from Word constructor function) obj
		this.keepPromptingUser();
	},
	resetGuessesRemaining : function(){
		this.guessRemaining = 10;
	},
	keepPromptingUser : function(){
		var self = this;

		prompt.get(['guessLetter'], function(err, result) {
			// result is an object like this: {guessLetter: 'f'}
			//console.log(result);

			console.log(' The letter or space you guess is: ' + result.guessLetter);
			var findHowManyOfUserGuess = self.currentWrd.checkIfLetterFound(result.guessLetter);
			pastGuesses.push(result.guessLetter)
				if (findHowManyOfUserGuess == 0){
		    	console.log('You guessed wrong!');
		    	self.guessesRemaining--;
			    }else{
			    	console.log('You guessed right!');

			    	//check if you win only when you are right
		    		if(self.currentWrd.didWeFindTheWord()){
				    	console.log('You Won!!!');
				    	return; //end game
				    }
			    }

				console.log('Guesses remaining: ', self.guessesRemaining);
				console.log(self.currentWrd.wordRender());
				console.log('here are the letters you guess already: ' + pastGuesses);

				if ((self.guessesRemaining > 0) && (self.currentWrd.found == false)){
					self.keepPromptingUser();
				}
				else if(self.guessesRemaining == 0){
					console.log('So close, it was ', self.currentWrd.word);
					console.log('(>O_O)>');
				}else{
					console.log(self.currentWrd.wordRender());
				}
			});
	}
};

game.startGame();