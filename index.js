let cashBalance = null;
let bet = 10;
let yourScoreTotal = null;
let casinoScoreTotal = null;


//Deck Creation & Shuffle
function deck(){
const suits = ['♠', '♣', '♦', '♥'];
const ranks = [ 'A','2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11];
const deck = [];

  for(let s = 0; s < suits.length; s++)
  {
      
  for(let r = 0; r < ranks.length; r++)
  {
    var cards = { rank: ranks[r], suit: suits[s], value: values[r]};
     
    deck.push(cards);
    deck.push(cards);
    deck.push(cards);
    deck.push(cards);
    deck.push(cards);
    deck.push(cards);
    deck.push(cards);
    deck.push(cards);
    deck.push(cards);
    deck.push(cards);
    deck.push(cards);
    deck.push(cards);	  
  } 
     }
  return deck;
  };

function shuffle(o) {
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
};

//Card Creation
function renderCard(){
   var list = deck();
  shuffle(list) 
  
  list.forEach(function(card,index) {
      let cardDiv =          
      (`<div class="card card_${index} ${card.suit === '♦' || card.suit === '♥' ? "red" : "black"}">
 <div class="top">${card.rank}${card.suit}</div>
      <div class="mid">${card.suit}</div>
      <div class="bottom">${card.suit}${card.rank}</div>
      <div class='back'><img id="back-img" src ="https://faribucket.s3.amazonaws.com/BlackJack+card+back.jpg"/></div>
      </div>` );
     
    $('.deck').append(cardDiv);
    $(`.card_${index}`).data("card", card);

    
  })
    
} 

renderCard();  



let currentNumberofCards = 559;

function dealCards(){
 let cardIndex = Math.floor(Math.random() * currentNumberofCards);
 let newCard = $(".card")[cardIndex];
   
  currentNumberofCards--
  return newCard;
};



// Buttons Off Intially
$('#deck').css('pointer-events', 'none');
$('#hitMe').css('pointer-events', 'none');
$('#stand').css('pointer-events', 'none');
$('#deal').css('pointer-events', 'none');
$('#clear').css('pointer-events', 'none');
$('#bet').css('pointer-events', 'none');

//Game Play Buttons


$('#deck').click(function(){
  renderCard();
  
});

$('#bet').click(function() {
  event.preventDefault();
  $('h2').text('');
  updateBalance();
  $('#bet').css('pointer-events', 'none');
  $('#deal').css('pointer-events', 'auto');
  
  gameOver();
  
    });

$('#deal').click(function(){
    yourTotalScore = null;
   casinoTotalScore = null;

  
  let casinoCardz = dealCards(); 
  let casinoCardz2 = dealCards(); 
  let playerCardz = dealCards();    
  let playerCardz2 = dealCards(); 
  TweenMax.staggerTo($(casinoCardz2), 1, {
// rotation: 360,
       x: 30,
   y: -10,      
}, 0.3);
  
    TweenMax.staggerTo($(casinoCardz), 1, {
//   rotation: 350,
     x: 80,      
}, 0.3);
  	
	
  
   TweenMax.staggerTo($(playerCardz), 1, {
  rotation: 350,
     x: 80,      
}, 0.3);
  
   TweenMax.staggerTo($(playerCardz2), 1, {
  // rotation: 360,
       x: 30,
   y: -10,      
 }, 0.3);

   
   $('.casino-hand').append(casinoCardz).parent().find('#back-img').removeClass('inactive');
   // $(casinoCardz2).addClass('turn');
  $(casinoCardz2).parent().find('#back-img').addClass('inactive');
   $('.casino-hand').append(casinoCardz2)
   $('.player-hand').append(playerCardz)
   $('.player-hand').append(playerCardz2)
   $('.casino-hand h3').text('');
   $('.player-hand h3').text('');
  
  $('.casino-hand h3').append('Casino Score:' + ' ');
  $('#deal').css('pointer-events', 'none');
  $('#hitMe').css('pointer-events', 'auto');
  $('#stand').css('pointer-events', 'auto');
  yourPoints();
  youWin();
 });

$('#hitMe').click(function(yourScore){
 
   var playerCard = dealCards();
TweenMax.staggerTo($(playerCard), 1, {
  rotation: 380,
   x: -40,
   y: -10,
}, 0.3);
  $('.player-hand').append(playerCard)
$('.player-hand h3').text('');
	

  
  const yourCards = $('.player-hand .card').toArray();
  const yourData = yourCards.map(function (card){
    return $(card).data().card
  })
  let yournewScore = yourData.reduce(function (previousScore, currentScore, nextScore) {
    return previousScore + currentScore.value;
  }, 0);
  
  if(yourScoreTotal != null || yourScoreTotal === null){
  yourScoreTotal = yournewScore;
  } 
  
  $('.player-hand h3').append('Your Score:' + ' ' + yournewScore);
 
  
  youBust();
  youWin();
 
}); 
  
$('#stand').click(function(casinoScore) {
    
  // var turnedCards = $('#back-img.inactive');
  // turnedCards.removeClass('inactive');
  // turnedCards.css('transform', 'rotateX(360deg)')
  $('.casino-hand .card #back-img').addClass('inactive');
    
  
  casinoPoints();

 $('.casino-hand h3').text('');

   const casinoCards = $('.casino-hand .card').toArray();
  const casinoData = casinoCards.map(function (card){
  return $(card).data().card
  })
  let casinonewScore = casinoData.reduce(function (previousScore, currentScore, nextScore) {
    return previousScore + currentScore.value;
  }, 0);     
  
    if(casinoScoreTotal != null){
    casinoScoreTotal = casinonewScore;
    }
  
      standTwice();

$('#stand').css('pointer-events', 'auto');
  
  casinoBust();
  casinoWin();
  youWin();
  youWinAgain();
  draw();
  
});


function standTwice(){
  if(casinoScoreTotal < 17){
     var casinoCard = dealCards();
TweenMax.staggerTo($(casinoCard), 1, {
  // rotation: 370,
   x: -80,
   y: 10,
}, 0.3);	  
     $('.casino-hand').append(casinoCard); 
     }

  const casinoCards2 = $('.casino-hand .card').toArray();
  const casinoData2 = casinoCards2.map(function (card){
  return $(card).data().card
  })
  let casinonewScore = casinoData2.reduce(function (previousScore, currentScore, nextScore) {
    return previousScore + currentScore.value;
  }, 0); 

  if(casinoScoreTotal != null){
    casinoScoreTotal = casinonewScore;
  }
 
 $('.casino-hand h3').append('Casino Score:' + ' ' + casinonewScore);
  

  }



 // Cash Balance Functions 
function updateBalance() {
  
  if(cashBalance == null){
    cashBalance = 100;
  }
  let newBalance = cashBalance - bet;       
cashBalance = newBalance; 
  
 $('h2').append('Cash Balance' + ':' + ' '+ '$' + cashBalance).css('color', '#85bb65');

return cashBalance;

  
};

function addCash(){
  $('h2').text(' ');
  let win = cashBalance + 20;
  $('h2').append('Cash Balance' + ':' + ' '+ '$' + win).css('color', '#85bb65');
   cashBalance = win;
 
};

function addCash2(){
  $('h2').text(' ');
  let win = cashBalance + 10;
  $('h2').append('Cash Balance' + ':' + ' '+ '$' + win).css('color', '#85bb65');
   cashBalance = win;
 
};

function takeCash() {
  $('h2').text(' ');
  let lose = cashBalance;
  $('h2').append('Cash Balance' + ':' + ' '+ '$' + lose).css('color', '#85bb65');
}

//Casino Score & Win/Lose Functions

function casinoPoints(){
  const casinoCards = $('.casino-hand .card').toArray();
  const casinoData = casinoCards.map(function (card){
    return $(card).data().card
  })
  let casinoScore = casinoData.reduce(function (previousScore, currentScore) {
    return previousScore + currentScore.value;
  }, 0);
  
      if(casinoScoreTotal === null || casinoScoreTotal != null){
    casinoScoreTotal = casinoScore;  
  }
  $('.casino-hand h3').append('Casino Score:' + ' ' + casinoScore);
  
     if( casinoScore < 18 ) {
      var casinoCard = dealCards(); 
TweenMax.staggerTo($(casinoCard), 1, {
//   rotation: 380,
   x: -60,
   y: 10,
}, 0.3);
     $('.casino-hand').append(casinoCard); 
     }

  
};

function casinoBust(){
  $('#notes').text('');
  if(casinoScoreTotal > 21){
$('#hitMe').css('pointer-events', 'none');
$('#stand').css('pointer-events', 'none');	  	  
    let message = 'Casino Bust! You win $10! 🤑';
     $('#notes').append(message);
     $('.gameplay2').addClass('active');
     addCash();
    
  }  
 
};

function casinoWin(){
  $('#note2').text('');
  if(casinoScoreTotal == 21 || casinoScoreTotal > yourScoreTotal && casinoScoreTotal < 21){
$('#hitMe').css('pointer-events', 'none');
$('#stand').css('pointer-events', 'none');	  
       let message7 = "Casino Wins 🙃 "; 
        $('#note2').append(message7);
     $('.gameplay3').addClass('active');
   
  }
  takeCash()
}


//Player Score & Win/Lose Functions

function yourPoints(){
  
  const yourCards = $('.player-hand .card').toArray();
  const yourData = yourCards.map(function (card){
    return $(card).data().card
  })
 
  let yourScore = yourData.reduce(function (previousScore, currentScore, nextScore) {
    return previousScore + currentScore.value;
  }, 0);
  
    if(yourScoreTotal === null || yourScoreTotal != null){
    yourScoreTotal = yourScore;
  }
  $('.player-hand h3').append('Your Score:' + ' ' + yourScore);
};

function youBust(){
  $('#notes').text('');
    if(yourScoreTotal > 21){
$('#hitMe').css('pointer-events', 'none');
$('#stand').css('pointer-events', 'none');	    
    let message = "You Bust 😦 ";
   $('#notes').append(message);
   $('.gameplay2').addClass('active');
    takeCash();  
 $('#hitMe').css('pointer-events', 'none');
$('#stand').css('pointer-events', 'none');
  }  

};

function youWin(){
  $('#note').text('');
  if(yourScoreTotal == 21){
$('#hitMe').css('pointer-events', 'none');
$('#stand').css('pointer-events', 'none');	  
    let message = " That's 21! You win! 🤑 ";
      $('#note').append(message);
     $('.gameplay').addClass('active');
    addCash();
  }
  
}

function youWinAgain(){
  $('#note4').text('');
  if(yourScoreTotal > casinoScoreTotal && yourScoreTotal < 21 && casinoScoreTotal != null){
$('#hitMe').css('pointer-events', 'none');
$('#stand').css('pointer-events', 'none');	  
    let message8 = "You win! 🤑 ";
        $('#note4').append(message8);
     $('.gameplay4').addClass('active');
    addCash();
  }
}

// Draw or Stay

function draw(){
  $(".gameplay #note").text(' ');
  if(casinoScoreTotal === yourScoreTotal){
$('#hitMe').css('pointer-events', 'none');
$('#stand').css('pointer-events', 'none');	  
    let message5 ="It's a Draw! 😅"
      $('.gameplay #note').append(message5);
     $('.gameplay').addClass('active');
     addCash2();
  }
 
}



//Popup Messages Buttons

$('#ok').click(function() {
  $('.gameplay').removeClass('active');
  $('#bet').css('pointer-events', 'auto');
  $('#deal').css('pointer-events', 'none');
  $('#hitMe').css('pointer-events', 'none');
  $('#stand').css('pointer-events', 'none');
  $('#clear').css('pointer-events', 'none');
  $('.casino-hand .card').remove();
  $('.player-hand .card').remove();
  $('.player-hand h3').text('Your Score:' + ' ' );
  $('.casino-hand h3').text('Casino Score:' + ' ' );
})

$('#ok2').click(function() {
  $('.gameplay2').removeClass('active');
  $('#bet').css('pointer-events', 'auto');
  $('#deal').css('pointer-events', 'none');
  $('#hitMe').css('pointer-events', 'none');
  $('#stand').css('pointer-events', 'none');
  $('#clear').css('pointer-events', 'none');
  $('.casino-hand .card').remove();
  $('.player-hand .card').remove();
  $('.player-hand h3').text('Your Score:' + ' ' );
  $('.casino-hand h3').text('Casino Score:' + ' ' );
})

$('#ok3').click(function() {
  $('.gameplay3').removeClass('active');
  $('#bet').css('pointer-events', 'auto');
  $('#deal').css('pointer-events', 'none');
  $('#hitMe').css('pointer-events', 'none');
  $('#stand').css('pointer-events', 'none');
  $('#clear').css('pointer-events', 'none');
  $('.casino-hand .card').remove();
  $('.player-hand .card').remove();
  $('.player-hand h3').text('Your Score:' + ' ' );
  $('.casino-hand h3').text('Casino Score:' + ' ' );
})

$('#ok4').click(function() {
  $('.gameplay4').removeClass('active');
  $('#bet').css('pointer-events', 'auto');
  $('#deal').css('pointer-events', 'none');
  $('#hitMe').css('pointer-events', 'none');
  $('#stand').css('pointer-events', 'none');
  $('#clear').css('pointer-events', 'none');
  $('.casino-hand .card').remove();
  $('.player-hand .card').remove();
  $('.player-hand h3').text('Your Score:' + ' ' );
  $('.casino-hand h3').text('Casino Score:' + ' ' );
})

$('.play').click(function() {
  $('.game-rules').addClass('inactive');
  $('#bet').css('pointer-events', 'auto');
});

$('.playagain').click(function playAgain(){
  event.preventDefault();
  $('.message').removeClass('active')
  
  $('.cash').css('display', 'none');
   gameOver(); 
});

function gameOver() {

   
 if(cashBalance < 0){
   $('h2').text('');
   let message = "Game Over! Casino Wins!";
   $('h2').append(message).css('color', 'red');
   $('.newGame').addClass('active');
    
 }

};

function restartGame() {
   $('.newGame').removeClass('active');
  $('h2').text(''); 
   cashBalance = 110;
  updateBalance();
  
    yourTotalScore = null;
   casinoTotalScore = null;
  
    $('.casino-hand h3').text('');
   $('.player-hand h3').text('');
   $('#deal').css('pointer-events', 'none');
   $('#bet').css('pointer-events', 'auto');
   $('.casino-hand .card').remove();
  $('.player-hand .card').remove();
  $('.player-hand h3').text('Your Score:' + ' ' );
  $('.casino-hand h3').text('Casino Score:' + ' ' );
  renderCard();

  
};
