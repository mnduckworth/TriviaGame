$(document).ready(function(){
	var countDown = 30;
	var intervalID
	var questionCount = 0;
	var numberCorrect = 0;
	var numberIncorrect = 0;
	var notAnswered = 0;
	var questions = ["In June 2012, Lamb of God singer Randy Blythe was arrested in the Czech Republic. What was he charged with?",
	 "What was Marilyn Manson Called in Elementary School?",
	 "What Slayer album was released on September 11, 2001?",
	 "Which band, in 1987, released an album with these songs on it: 'Rocket Queen,' 'Mr. Brownstone' and 'Sweet Child o' Mine'?",
	 "What famous British metal band had a lead singer who came out as gay in 1998?",
	 "What is the name of Iron Maiden's mascot?",
	 "What is Nikki Sixx of Motley Crue's real name?",
	 "Which of the bands listed has a female frontperson?",
	 "What is the name of the animated Death Metal band in the TV show Metalocalypse?"];
	var correctAnswers = ["B. Manslaughter related to death of a fan", 
	"D. Brian Warner", 
	"A. God Hates Us All", 
	"C. Guns N' Roses", 
	"B. Judas Priest's Rob Halford", 
	"C. Eddie", 
	"D. Frank Carlton Serafino Ferana, Jr",
	"C. Halestorm",
	"A. Dethklok"];
	var answers = [
	["Drunk Driving after high-speed chase", "Manslaughter related to death of a fan", "Public Indecency", "Violating local noise ordinance"],
	["Idiot", "Jonathan Davis", "Todd Vanderhood", "Brian Warner"],
	["God Hates Us All", "Divine Intervention"," Christ Illusion", "Diabolus in Musica"],
	["Warrant", "Faster Pussycat", "Guns N' Roses", "Motley Crue"],
	["Iron Maiden's Bruce Dickinson", "Juda Priest's Rob Halford", "Danzig's Glenn Danzig", "Accept's Udo Dirkchneider"],
	["Frankie", "Jason", "Eddie", "Freddie"],
	["Cliff Burton", "Vince Neilsmith", "Jason Nesmith", "Frank Carlton Serafino Ferana, Jr"],
	["Twisted Sister", "Armored Saint", "Halestorm", "Alice Cooper"],
	["Dethklok", "Billy and the Destroyers", "Watchtower", "Snakes N'Barrels"]
	];
	function questionSelection(){
		$("#start-button").empty();
		$("#timer").html("Time Left " + countDown + " Seconds.")
		$("#question").html(questions[questionCount]);
		$("#firstAnswer").html("A. " + answers[questionCount][0]);
		$("#secondAnswer").html("B. " + answers[questionCount][1]);
		$("#thirdAnswer").html("C. " + answers[questionCount][2]);
		$("#fourthAnswer").html("D. " + answers[questionCount][3]);
		intervalID = setInterval(counter, 1000);
	}
	function counter(){
		if(countDown > 0){
			countDown--;
		}
		$("#timer").html("Time Left " + countDown + " Seconds.")
		if(countDown === 0){
			clearInterval(intervalID);
			timeUp();
		}
	}
	function wrongGuess(){
		$("#firstAnswer").empty();
		$("#secondAnswer").empty();
		$("#thirdAnswer").empty();
		$("#fourthAnswer").empty();
		$("#question").html("That was Incorrect. The correct Answer was: " + correctAnswers[questionCount] + ".");
		numberIncorrect++;
		setTimeout(nextQuestion, 5000);
	}
	function correctGuess(){
		$("#firstAnswer").empty();
		$("#secondAnswer").empty();
		$("#thirdAnswer").empty();
		$("#fourthAnswer").empty();
		$("#question").html("That was Right! The correct Answer was: " + correctAnswers[questionCount] + ".");
		numberCorrect++;
		setTimeout(nextQuestion, 5000);
	}
	function timeUp(){
		$("#firstAnswer").empty();
		$("#secondAnswer").empty();
		$("#thirdAnswer").empty();
		$("#fourthAnswer").empty();
		$("#question").html("You didn't answer in time. The correct Answer was: " + correctAnswers[questionCount] + ".");
		notAnswered++;
		setTimeout(nextQuestion, 5000);
	}
	function nextQuestion(){
		if (questionCount < 8){
			questionCount++;
			countDown = 30
			questionSelection();
		}
		else{
			finalScreen();
		}
	}
	function finalScreen(){
		$("#timer").empty();
		$("#fourthAnswer").empty();
		$("#question").html("Here's How You Did:")
		$("#firstAnswer").html("Correct Answers: " + numberCorrect);
		$("#secondAnswer").html("Incorrect Answers: " + numberIncorrect);
		$("#thirdAnswer").html("Questions Not Answered: " + notAnswered);
		$("#start-button").html("<button type='button' class='btn btn-default' id='restart-game'>Restart Quiz</button>")
	}
	$("#start-game").on("click", function(){
		$("#start-button").empty();
		questionSelection();
	})
	$(".answer").on("click", function(){
		var selectedAnswer = $(this).text();
		if(correctAnswers.includes(selectedAnswer)){
			clearInterval(intervalID);
			correctGuess();
		}
		else{
			clearInterval(intervalID);
			wrongGuess();
		}
	})
	$(document).on("click", "#restart-game", function(){
		numberIncorrect = 0;
		numberCorrect = 0;
		notAnswered = 0;
		questionCount = 0;
		questionSelection();
	})
})
