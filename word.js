var Letter = require('./letter.js'); //import Letter by requiring 'letter.js'

var str;

var Word = function(wrd){
	this.word = wrd;
	this.lets = [];
	this.found = false
	this.getLets = function(){
		for (var i = 0; i < this.word.length; i++){
			this.lets.push(new Letter(this.word.charAt(i)));
		}
	}
	this.didWeFindTheWord = function() {
		var wordFoundCounter = 0;
		for (var i = 0; i < this.lets.length; i++) {
			if (this.lets[i].appear === true){
				wordFoundCounter++;
			}
			if (wordFoundCounter === this.lets.length){
				this.found = true;
			}
			else{
				this.found = false
			}
		}
		return this.found;
	};
	this.checkIfLetterFound = function(guessLetter) {
		var whatToReturn = 0;
		for (var i = 0; i < this.lets.length; i++) {
			if (this.lets[i].charac === guessLetter){
				this.lets[i].appear = true;
				whatToReturn++;
			}
		}
		return whatToReturn
	};

	this.wordRender = function() {
		var str = '';
		for(var i = 0; i < this.lets.length; i++){
			str += this.lets[i].letterRender();
		}
		return str;
	};
	
}

module.exports = Word;