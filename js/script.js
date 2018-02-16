const ourApp = {}



// ourApp.quizResultVal = 0; 

ourApp.getAnswer = function () {
    $('.buttonOne').on('click', function (e) {
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
        const quizResultVal = answerArray.reduce(function (a, b) {
            return a + b
        }, 0);

        // console.log(quizResultVal)
        ourApp.assignSong(quizResultVal);

    });
}


const popSongs = [
    // `q_artist=Justin Timberlake&q_track=SexyBack`
    `Beyonce, Crazy in Love`,
    `Bruno Mars, 24K Magic`,
    `Ed Sheeran, Shape of You`,
    `Justin Bieber, Sorry`,
    `Ariana Grande, One Last Time`
];

const rockSongs = [
    `Blink 182, All the Small Things`,
    `Green Day, Time of Your Life`,
    `Jimmy Eat World, The Middle`,
    `No Doubt, Don't Speak`,
    `Mumford and Sons, I Will Wait`,
    `Nirvana, Teen Spirit`
];

const classicSongs = [
    `The Beatles, Hey Jude`,
    `Journey, Don't Stop Believin`,
    `Heart, Barracuda`,
    `David Bowie, Changes`
];

const hiphopSongs = [
    `Drake, Hotline Bling`,
    `Weeknd, Can't Feel My Face`,
    `Kanye West, Stronger`,
    `Nicki Minaj, Starships`,
    `Kendrick Lamar, Humble`
];


ourApp.assignSong = function (quizData) {

    let songTitle;
    let drinkChoice;

    if (quizData >= 4 && quizData <= 6) {
        const songChoice = Math.floor(Math.random() * popSongs.length);
        console.log(popSongs[songChoice]);
        songTitle = popSongs[songChoice];
        drinkChoice = 'vodka'

        // getSong(songTitle);

        // choose pop song
    } else if (quizData >= 7 && quizData <= 10) {
        const songChoice = Math.floor(Math.random() * rockSongs.length);
        // console.log(rockSongs[songChoice]);
        songTitle = rockSongs[songChoice]
        drinkChoice = 'whisky'

        // getSong(songTitle);

        // choose rock song
    } else if (quizData >= 11 && quizData <= 13) {
        const songChoice = Math.floor(Math.random() * hiphopSongs.length);
        // console.log(hiphopSongs[songChoice]);
        songTitle = hiphopSongs[songChoice]
        drinkChoice = 'champagne'
        // getSong(songTitle);

        // choose hiphop
    } else if (quizData >= 14 && quizData <= 16) {
        const songChoice = Math.floor(Math.random() * classicSongs.length);
        // console.log(classicSongs[songChoice]);
        songTitle = classicSongs[songChoice]
        drinkChoice = 'beer'
        // choose classic
        // getSong(songTitle);
    }

    ourApp.getSong(songTitle);
    ourApp.getDrink(drinkChoice);

}

ourApp.getSong = (songChoice) => {
    // console.log(songChoice.split(','));
    const songArray = songChoice.split(',')


    return $.ajax({
        url: 'https://proxy.hackeryou.com',
        method: 'GET',
        dataType: 'json',
        data: {
            reqUrl: `http://api.musixmatch.com/ws/1.1/matcher.lyrics.get`,
            params: {
                apikey: '9bb3f51d28bc48a3b736688321570c4a',
                f_has_lyrics: true,
                q_artist: songArray[0],
                q_track: songArray[1]
            }
        }
    })
        .then((res) => {
            let lyrics = res.message.body.lyrics.lyrics_body;
            console.log(lyrics);
            function chooseSong() {
                $('.song-choice ').text(`${lyrics}`);
                $('.song-choice h2').append(`${songArray}`)
                console.log(songArray)
            }
            chooseSong();
            console.log(res);
        })
}

ourApp.getDrink = (drinkQuery) => {
    // const newDrink = drinkChoice;
    // console.log(drinkChoice)
    return $.ajax({
        url: 'http://lcboapi.com/products',
        access_key: 'MDozYzQ2ZTQ4NC0xMGY2LTExZTgtOTY2MS02ZmYyNmY0ZGEzMmQ6bmdrZlJaRURmQ3ZnRlZiZW5XZDZkRjRIV2R1eDhCc3VhOXh0',
        method: 'GET',
        dataType: 'jsonp',
        data: {
            q: drinkQuery
        }
    })
        .then((res) => {
            // console.log(res.result)
            let drinks = res.result;
            let randomDrinkValue = Math.floor(Math.random() * 10);
            const drinkName = drinks[randomDrinkValue].name;
            const drinkImg = drinks[randomDrinkValue].image_thumb_url;
            $('.drink-choice h2').text(drinkName);
            $('.drink-choice').append(`<img src=${drinkImg}>`);
            console.log(drinks)
        });
}



$(function () {
    ourApp.getAnswer();

});