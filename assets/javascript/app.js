// javascript file for Assignment 5
// Trivia game - Louise K Miller

window.onload = function(){

var game = [
	{question: "How many students attend the University of Texas at Austin?",
	possibleAnswers: [
		"50,000", 
		"42,000", 
		"36,000", 
		"25,000"],
	correctAnswer: 0,
	explanation: "Just over 50,000 students attend UT Austin.  With all these young people and a population that loves the outdodors, Austin is noted as one of the fittest cities in America."
	},
	{question: "How many visitors make their way to Austin each year?",
	possibleAnswers: [
		"23 million", 
		"17 million", 
		"14 million", 
		"10 million"],
	correctAnswer: 1,
	explanation: "More than 17 million visitors make their way to Austin each year.  "
	},	
	{question: "As far as food events go, which event held in Austin is America's second largest such festival?",
	possibleAnswers: [
		"The Texas Organic Food Festival", 
		"The Hill Country Wine & Food Festival", 
		"The Great American Rib & Steak Barbecue Festival", 
		"Austin Chili Cook-off"],
	correctAnswer: 1,
	explanation: "The Hill Country Wine & Food Festival is the biggest such event, second only to Aspen.  This event focuses on promoting food and wine with a Texas flair."
	}
	];
//=======================================
// declare global variables
//=======================================

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
  resetTimer(30);
  counter = setInterval(countRound, 1000);
}

function countRound(){
   time--;
   $('#timeLeftSpan').html(time);
   if (time==0) {
   	stopTimer();
   	outOfTime();
    }
 }

function startDelayTimer(){
  resetTimer(7);
  $('.answers').prop('disabled', true);
  $('.answers').removeClass('makeFade'); // remove hover

  counter = setInterval(countDelay, 1000);
}

function countDelay(){
   time--;
   if (time==0) {
   	stopTimer();
   	if (round==game.length) showFinalResult();
		else startRound();
   }
 }

//=======================================
// Start Button starts the game
//=======================================


function startGame(){
round = 0;
console.log(round);
wins =0;
losses =0;
unanswered =0;
$('#startButton').hide();
startRound();
};

//=======================================
// startRound
//=======================================

function startRound(){

//	remove last round info from screen
	$('#questionDiv').empty();
	$('#answersDiv').empty();
	$('#resultDiv').empty();

// populate screen with current round question and answers
	var p=$('<p>');
	p.addClass('question'); // Add question class 

	p.text(game[round].question); // Add question text
	$('#questionDiv').append(p); // Added the paragraph to the HTML

	for (var i=0; i<game[round].possibleAnswers.length; i++) {
		var b=$('<button>');
		b.addClass('answers'); // Added a class 
		b.addClass('makeFade'); // Added class for hover attribute
		b.attr('data', [i]); // Added a data-attribute
		b.text(game[round].possibleAnswers[i]); // Add possible answer
		$('#answersDiv').append(b); // Added the paragraph to the HTML
		};

// enable answer buttons
	$('.answers').prop('disabled', false);

//  display and start timer for QA round - 30 seconds
	startRoundTimer();
	$('#timer').html("<h2>Time Remaining: <span id='timeLeftSpan'>"+ time + "</span> seconds</h2>");
};

//=======================================
// if user runs out of time
//=======================================

function outOfTime(){
	$('#resultDiv').html("You ran out of time");
	$('#resultDiv').append("<h3>The correct answer was: " + game[round].possibleAnswers[game[round].correctAnswer + "</h3>"]);
	$('#resultDiv').append("<p>" + game[round].explanation) + "</p>";
	round++;
	unanswered++;
	startDelayTimer();
};

//=======================================
// if user attempts to answer
//=======================================


function respondWithResult () {
	stopTimer();
	var choice = $(this).attr('data');
	if (choice == game[round].correctAnswer) {
		wins++;
		$('#resultDiv').html("<h3>Correct!</h3>");
		$('#resultDiv').append("<p>" + game[round].explanation) + "</p>";
		}
	else {
		losses++;
		$('#resultDiv').html("<h3>Oops! Wrong Answer</h3>");
		$('#resultDiv').append("<h3>The correct answer was: " + game[round].possibleAnswers[game[round].correctAnswer]);
		$('#resultDiv').append("<p>" + game[round].explanation) + "</p>";
		};
	round++;
	startDelayTimer();
		
};

//=======================================
// show final results of game
//=======================================

function showFinalResult(){
	$('#questionDiv').empty();
	$('#answersDiv').empty();
	$('#timer').empty();
	$('#resultDiv').html("<h2>Game Over</h2>");

	$('#resultDiv').append("<h2>Correct Answers: " + wins + "</h2>")
	$('#resultDiv').append("<h2>Incorrect Answers: " + losses + "</h2>");
	$('#resultDiv').append("<h2>Quesions Unanswered: " + unanswered + "</h2>");
	$('#startButton').text("START AGAIN?")
	$('#startButton').show();
};

$(document).on('click', '#startButton', startGame);
$(document).on('click', '.answers', respondWithResult); 


} //end of window.onload function