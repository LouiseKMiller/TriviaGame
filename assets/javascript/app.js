// javascript file for Assignment 5
// Trivia game - Louise K Miller

window.onload = function(){

var game = [
	{question: "q0",
	possibleAnswers: ["a00", "a01", "a02", "a03"],
	correctAnswer: 1,
	},
	{question: "q1",
	possibleAnswers: ["a10", "a11", "a12", "a13"],
	correctAnswer: 0,
	},	
	{question: "q2",
	possibleAnswers: ["a20", "a21", "a22", "a23"],
	correctAnswer: 2,
	}
	];

var round = 0;
var wins =0;
var losses =0;
var unanswered =0;

//=======================================
// Timers
//=======================================

 var time = 30;
 var counter =0;

function resetTimer(n){
  time = n;
}

function stopTimer(){
  clearInterval(counter);
 }

function startRoundTimer(){
  counter = setInterval(countRound, 1000);
}

function countRound(){
   time--;
   console.log (time);
   $('#timeLeftSpan').html(time);
   if (time==0) {
   	stopTimer();
   	outOfTime();
    }
 }

function startDelayTimer(){
  counter = setInterval(countDelay, 1000);
}

function countDelay(){
   time--;
   console.log (time);
   if (time==0) {
   	stopTimer();
   	if (round==game.length) showFinalResult();
		else startRound();
   }
 }

function startGame(){
round = 0;
console.log(round);
wins =0;
losses =0;
unanswered =0;
startRound();
};

function loadQA () {

//	display question
	$('#questionDiv').empty();
	$('#answersDiv').empty();
	var p=$('<p>');
	console.log(round);
	p.addClass('question'); // Add question class 
	p.text(game[round].question); // Add question text
	$('#questionDiv').append(p); // Added the paragraph to the HTML

//  display possible answers

	for (var i=0; i<game[round].possibleAnswers.length; i++) {
	
		var b=$('<button>');
		b.addClass('answers'); // Added a class 
		b.attr('data', [i]); // Added a data-attribute
		b.text(game[round].possibleAnswers[i]); // Add possible answer
		$('#answersDiv').append(b); // Added the paragraph to the HTML
	};
};  // end of loadQA function

function startRound(){
	loadQA();

//  display and start timer for QA round - 15 seconds
	resetTimer(10);
	startRoundTimer();
	$('#timer').html("<h2>Time Remaining: <span id='timeLeftSpan'>"+ time + "</span> seconds</h2>");
};


function outOfTime(){
	$('#resultDiv').html("You ran out of time");
	resetTimer(4);
	round++;
	unanswered++;
	if (round==game.length) showFinalResult();
	else startDelayTimer();
};

function respondWithResult () {
	stopTimer();
		var choice = $(this).attr('data');
		if (choice == game[round].correctAnswer) {
			wins++;
			$('#resultDiv').html("Correct!");
			}
		else {
			losses++;
			$('#resultDiv').html("wrong answer");
			};
		round++;
		resetTimer(4);
		startDelayTimer();
		
};

function showFinalResult(){
	$('#questionDiv').empty();
	$('#answersDiv').empty();
	$('#resultDiv').html("Game Over");
};

$(document).on('click', '#startButton', startGame);
$(document).on('click', '.answers', respondWithResult); 


} //end of window.onload function