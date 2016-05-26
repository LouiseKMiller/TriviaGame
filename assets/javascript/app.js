// javascript file for Assignment 5
// Trivia game - Louise K Miller

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

window.onload = function(){


function loadQA () {
	var p=$('<p>');
	p.addClass('question'); // Add question class 
	p.text(game[round].question); // Add question text
	$('#questionDiv').append(p); // Added the paragraph to the HTML


	for (var i=0; i<game[round].possibleAnswers.length; i++) {
	
		var p=$('<p>');
		p.addClass('answers'); // Added a class 
		p.attr('data', [i]); // Added a data-attribute
		p.text(game[round].possibleAnswers[i]); // Add possible answer
		$('#answersDiv').append(p); // Added the paragraph to the HTML
	};
};  // end of loadQA function

loadQA();

function respondCorrectAnswer () {
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
};


$(document).on('click', '.answers', respondCorrectAnswer); 


} //end of window.onload function