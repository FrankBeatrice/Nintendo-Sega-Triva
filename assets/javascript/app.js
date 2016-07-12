var panel = $('#quiz-area');
var countStartNumber = 30;


$(document).on('click', '#start-over', function(e) {
    game.reset();
});

$(document).on('click', '.answer-button', function(e) {
    game.clicked(e);
});

$(document).on('click', '#start', function(e) {
    $('#subwrapper').prepend('<h2>Time Remaining: <span id="counter-number">30</span> Seconds</h2>');
    game.loadQuestion();
});



var questions = [{
    question: "When was Sonic first debuted?",
    answers: ["1981", "1985", "1991", "1987"],
    correctAnswer: "1991",
    image: "assets/images/sonicball.gif"
}, {

    question: "Who is the creater of Mario?",
    answers: ["Shigeru Miyamoto", "Yoichi Kotabe", "Eiji Aonuma", "Satoshi Tajiri"],
    correctAnswer: "Shigeru Miyamoto",
    image: "assets/images/mario.gif"
}, {
    question: "How long did the Pacman Cartoon Series run?",
    answers: ["1982-1983", "1985-1997", "1985-1986", "1980-1982"],
    correctAnswer: "1982-1983",
    image: "assets/images/pacman.gif"
}, {
    question: 'Who created Pokemon"?',
    answers: ["Satoshi Tajiri", "Shigeru Miyamoto", "Takashi Tezuka", "Koji Kondo"],
    correctAnswer: "Satoshi Tajiri",
    image: "assets/images/Pokemon.gif"
}, {
    question: 'In the Orginal "The Lengend of Zelda who is the main character',
    answers: ["Hercule", "Hyrule", "Zelda", "Link"],
    correctAnswer: "Link",
    image: "assets/images/Link.gif"
}, {
    question: 'What series is the character Bomb omb featured',
    answers: ["Game & Watch", "Mirror", "Super-Mario", "Mortal Kombat"],
    correctAnswer: "Super-Mario",
    image: "assets/images/bombOmb.gif"
}];


var game = {
    questions: questions,
    currentQuestion: 0,
    counter: countStartNumber,
    correct: 0,
    incorrect: 0,
    countdown: function() {
        game.counter--;
        $('#counter-number').html(game.counter);

        if (game.counter === 0) {
            console.log('TIME UP');
            game.timeUp();
        }
    },
    loadQuestion: function() {
        timer = setInterval(game.countdown, 1000);
        panel.html('<h2>' + questions[this.currentQuestion].question + '</h2>');
        for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
            panel.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i] + '</button>');
        }
    },
    nextQuestion: function() {
        game.counter = countStartNumber;
        $('#counter-number').html(game.counter);
        game.currentQuestion++;
        game.loadQuestion();
    },
    timeUp: function() {
        clearInterval(timer);
        $('#counter-number').html(game.counter);

        panel.html('<h2>Out of Time!</h2>');
        panel.append('<h3>The Correct Answer was: ' + questions[this.currentQuestion].correctAnswer);
        panel.append('<img src="' + questions[this.currentQuestion].image + '" />');

        if (game.currentQuestion == questions.length - 1) {
            //setTimeout(game.results, 3 * 1000);
        } else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },
    results: function() {
        clearInterval(timer);

        panel.html('<h2>All done, heres how you did!</h2>');
        $('#counter-number').html(game.counter);
        panel.append('<h3>Correct Answers: ' + game.correct + '</h3>');
        panel.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
        panel.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
        panel.append('<br><button id="start-over">Start Over?</button>');
    },
    clicked: function(e) {
        clearInterval(timer);
        console.log(e);
        if ($(e.target).data("name") == questions[this.currentQuestion].correctAnswer) {
            this.answeredCorrectly();
        } else {
            this.answeredIncorrectly();
        }
    },
    answeredIncorrectly: function() {
        game.incorrect++;
        clearInterval(timer);
        panel.html('<h2>Nope!</h2>');
        panel.append('<h3>The Correct Answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
        panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

        if (game.currentQuestion == questions.length - 1) {
            setTimeout(game.results, 3 * 1000);
        } else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },
    answeredCorrectly: function() {
        clearInterval(timer);
        game.correct++;
        panel.html('<h2>Correct!</h2>');
        panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

        if (game.currentQuestion == questions.length - 1) {
            setTimeout(game.results, 3 * 1000);
        } else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },
    reset: function() {
        this.currentQuestion = 0;
        this.counter = countStartNumber;
        this.correct = 0;
        this.incorrect = 0;
        this.loadQuestion();
    }
};
