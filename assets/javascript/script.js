/*
  Question topics:
  HTTP response status codes
  Object Oriented Programming
  Promises
  Callbacks

  AJAX - Asynchronous Javascript and XML
  JSON - Javascript Object Notation

*/

questionList = [
  {
    type:'true-false',
    text:'Encapsulation, Abstraction, Inheritance, and Polymorphism are the pillars of Object Oriented Programming.',
    correct: ['True']
  },

  {
    type:'true-false',
    text:'GET operations are read only and are safe.',
    correct: ['True']
  },

  {
    type:'true-false',
    text:'GET operations are read & write and are safe.',
    correct: ['False']
  },

  {
    type:'multiple-choice',
    text:'Which of the following HTTP method should be used to delete resource using RESTful web service?',
    correct:['DELETE'],
    incorrect: ['GET', 'POST', 'PUT', 'OPTIONS', 'PATCH', 'HEAD']
  },

  {
    type:'true-false',
    text:'Vanilla JavaScript is a JavaScript framework.',
    correct: ['False']
  },
  {
    type:'multiple-choice',
    text:'Which of the following is NOT a JavaScript framework?',
    correct: ['Vanilla JavaScript'],
    incorrect: ['Vue', 'Angular', 'React', 'Ember', 'Meteor']
  },

  {
    type:'multiple-choice',
    text:'Which of the following is not a valid HTTP methods used in RESTful web services?',
    correct: ['TIME','DATE'],
    incorrect: ['GET', 'POST', 'PUT', 'OPTIONS', 'PATCH', 'DELETE', 'HEAD']
  }

];

var quiz = {
  questions: [],
  timer:60,
  currentQuestion: undefined,
  questionsAsked:0,
  correctAnswers:0,

  // Reset timer
  resetTimer: function(){
    this.timer = 60;
    document.getElementById('page-timer').classList.remove('red');
  },

  // Load questions randomly
  setQuestions: function(list){
    for(this.questions.length; this.questions.length != list.length;){
      var random = list[Math.floor(Math.random() * list.length)];
      if(!this.questions.includes(random)){
        this.questions.push(random);
      }
    }
  },

  setCurrentQuestion: function(){
    this.currentQuestion = questionList.pop();
  },

  getQuestionResponses(question){
    if(question.type == 'true-false'){
      return ['True', 'False']
    }
    else{
      // Select 1 random correct answer
      var responses = [question.correct[Math.floor(Math.random() * question.correct.length)]];
      var randomized = [];
      // Select 3 random incorrect responses
      while(responses.length < 4){
        var random = question.incorrect[Math.floor(Math.random() * question.incorrect.length)];
        // Add response to randomized if it isn't already in there.
        if(!responses.includes(random)){
          responses.push(random);// responses.push(random);
        }
      }
      // Randomly sort responses
      while(randomized.length < responses.length){
        var random = responses[Math.floor(Math.random() * responses.length)];
        // Add response to randomized if it isn't already in there.
        if(!randomized.includes(random)){
          randomized.push(random);
        }
      }
      return randomized;
    }
  },

  // Load question to page
  loadQuestion: function(){
    this.setCurrentQuestion();

  // Create common elements to append to form
    const response_list = document.getElementById('response-list');

    // Clear previous responses
    if(response_list.firstChild){
      while(response_list.firstChild){
        response_list.removeChild(response_list.firstChild);
      }
    }
    // Prevent questions from running low due to pop function
    // repeating questions will vary in reponses
    if (this.questions.length <= 0) {
      this.setQuestions(questionList);
    }
    var responses = this.getQuestionResponses(this.currentQuestion);

    if(this.currentQuestion.type == 'true-false'){
      question.textContent = 'True/False - ' + this.currentQuestion.text;
    }

    if(this.currentQuestion.type == 'multiple-choice'){
      question.textContent = 'Multiple choice - ' + this.currentQuestion.text;
    }
    for(i=0; i<responses.length; i++){
      const div = document.createElement('div');
      const label = document.createElement('label');
      const input = document.createElement('input');
      const span = document.createElement('span');
      label.appendChild(input);
      label.appendChild(span);
      div.appendChild(label);
      response_list.appendChild(div);
      input.classList.add('with-gap');
      input.setAttribute('type','radio');
      input.setAttribute('name','response');
      input.value = responses[i];
      span.textContent = responses[i];
    }
  },

  verifyAnswer: function(answer){
    // If correct
    if(this.currentQuestion.correct.includes(answer)){
      quiz.questionsAsked++;
      quiz.correctAnswers++;
    }
    // If incorrect
    else {
      quiz.questionsAsked++;
    }
  }
};



document.addEventListener('DOMContentLoaded', function(){
  const page_timer = document.getElementById('page-timer');
  const question = document.getElementById('question');
  const responses = document.getElementById('response');
  const next = document.getElementById('next');
  const start = document.getElementById('start');
  const result_message = document.getElementById('result-message');
  const quiz_section = document.getElementById('quiz');
  const results = document.getElementById('results');
  page_timer.textContent = quiz.timer;

  start.addEventListener('click',function(){
    welcome.style.display = 'none'
    quiz_section.style.display = 'block';
    quiz.setQuestions(questionList);
    quiz.loadQuestion();
    setInterval(function(){
      // Change timer color if below 10 seconds
      if(quiz.timer == 10){
        page_timer.classList.add('pulse', 'red');
      }
      if(quiz.timer > 0){
        quiz.timer--;
        page_timer.textContent = quiz.timer;
      }
      if(quiz.timer == 0){
        quiz_section.style.display = 'none';
        results.style.display = 'block';
        result_message.textContent = `You answered questions correctly ${quiz.correctAnswers} out of  ${quiz.questionsAsked}.`;
      }
    },1000);

    next.addEventListener('click', function(){
      // Get selected answer
      let answer = document.querySelector('input[name = "response"]:checked').value;
      // Check if correct
      quiz.verifyAnswer(answer);
      // show next question
      quiz.loadQuestion();
    });
  });


});
