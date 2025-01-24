let tot_question = 4;
let question_number = 1;
let correct = 0;
let qrem = 3;
document.addEventListener("DOMContentLoaded", () => {
    load_question()
    reset();
});
function load_question() {
    ques = generate();
    document.querySelector("#question-text").innerHTML = ques.question;
    const options = document.querySelector("#answer-choices");
    options.innerHTML = "";
    for (const option of ques.options) {
        options.innerHTML += `<button class="option">${option}</button>`;
    }
    document.querySelectorAll(".option").forEach(option => {
        option.onclick = () => {
            if (option.innerHTML == ques.answer) {
                correct +=100;
                console.log("Question "+question_number+": CORRECT!");
                qrem --;
            }
            else{
                console.log("Question "+question_number+": WRONG! Correct Answer is: " +ques.answer );
                qrem --;
            }
            question_number ++;
            document.querySelector("#curr-score ").innerHTML = correct;
            document.querySelector("#questions-remaining ").innerHTML = qrem;
            if (question_number == tot_question) 
            {
                gameover();
            }
            else { 
                load_question();
            }
        }
    });
}

function gameover() {
    document.querySelectorAll(".option").forEach(option => {  
            if (question_number == tot_question) 
                {
                    option.disabled=true;
                    document.querySelector("h2").style = "display:enable"; 
                  
            }
        }
        );
}

function reset() {
    
    document.querySelector("#curr-score").innerHTML = "0";
    document.querySelector("#questions-remaining").innerHTML = "3";
    question_number = 1;
    correct = 0;
    load_question();
}

function generate() {
    let a = Math.floor(Math.random() * 11);
    let b = Math.floor(Math.random() * 11);
    const operators = ["+"];
    let op = operators[Math.floor(Math.random() * operators.length)];
    let q = "What is " + a +" "+ op + " "+ b + "?";
    let inc1 = 0;
    let inc2 = 0;
    do {
      inc1 = Math.floor(Math.random() * 11);
      inc2 = Math.floor(Math.random() * 11 );
    }
   while (inc1 == inc2 || inc1 == 0 || inc2 == 0);
    let ans = 0;
    if (op == "+") {
        ans = a + b;
    }
    
    let o = [ans, ans + 1, ans -1 ]
    let shuffled = o.sort( ()=>Math.random()-0.5 );                  
    return {question: q, options:shuffled , answer: ans};
}