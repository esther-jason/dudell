const ourApp = {}



// ourApp.quizResultVal = 0; 

ourApp.getAnswer = function() {    
    $('.buttonOne').on('click', function(e) {
        e.preventDefault();
        //gets value from input from user
        ourApp.questionOneVal = $('input[name=answerOne]:checked').val();
        ourApp.questionTwoVal = $('input[name=answerTwo]:checked').val();
        ourApp.questionThreeVal = $('input[name=answerThree]:checked').val();
        ourApp.questionFourVal = $('input[name=answerFour]:checked').val();

        //converts the "string" data that we get from the input. and convert it to integer
        const answerOneInt = parseInt(ourApp.questionOneVal);
        const answerTwoInt = parseInt(ourApp.questionTwoVal);
        const answerThreeInt = parseInt(ourApp.questionThreeVal);
        const answerFourInt = parseInt(ourApp.questionFourVal);

        const answerArray = [];
        //pushes all the input data into an array
        answerArray.push(answerOneInt, answerTwoInt, answerThreeInt, answerFourInt);
        
        // add the integers in the array together using the reduce method.
        const quizResultVal = answerArray.reduce(function(a,b) {
            return a + b
        }, 0);

        // console.log(quizResultVal)
        ourApp.assignSong(quizResultVal);

    });
}

ourApp.assignSong = function(data) {
    console.log(data);
}

// ourApp.getAnswer();

$(function(){
    ourApp.getAnswer();
});




// var sum = [0, 1, 2, 3].reduce(function (a, b) {
//     return a + b;
// }, 0);
// // sum is 6


        // ``$(function () {
        //     $('#clickMe').click(function (e) {
        //         e.preventDefault();
        //         firstAnswer = $('input[name=question]:checked').val();
        //         //store values somewhere
        //         console.log(firstAnswer);
        //         questionScores.push($('firstAnswer').val());
        //         console.log(questionScores);

        //     })
        //     let questionScores = [];
        //     // let questionOneScore = 0;
        //     //    let questionTwoScore = 0;
        //     //    let questionThreeScore = 0;
        // }) ``


