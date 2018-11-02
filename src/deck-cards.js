export default class Deck {

    constructor(){
        this.cardDeck = [];
        this.usedCards = []; 
    }

    // generates a deck of cards
	generateDeck () {

		// creates card object
		let card = (suit, value) => {
			this.name = value + ' of ' + suit
			this.suit = suit
			this.value = value

			return {name:this.name, suit:this.suit, value:this.value}
		}

		let values = ['2', '3','4','5', '6', '7', '8', '9', '0', 'J', 'Q', 'K', 'A']
		let suits = ['Clubs', 'Diamonds', 'Spades', 'Hearts']

		for ( let s = 0; s < suits.length; s++ ) {
			for ( let v = 0; v < values.length; v++ ) {
					this.cardDeck.push(card(suits[s], values[v]))
			}
		}
	}
	getCurrentCards(){
		return this.cardDeck;
	}


	// shuffle the deck
	shuffle () {
  		let currentIndex = this.cardDeck.length, temp_val, rand_ind;

  		while (0 !== currentIndex) {
  		  rand_ind = Math.floor(Math.random() * currentIndex);
  		  currentIndex -= 1;
  		  temp_val = this.cardDeck[currentIndex];
  		  this.cardDeck[currentIndex] = this.cardDeck[rand_ind];
  		  this.cardDeck[rand_ind] = temp_val;
  		}
	}

	// deal a number cards
	deal (num_cards) {

            let cards = []

            for ( let c = 0; c < num_cards; c++ ) {
                    let usedCard = this.cardDeck.shift()
                    cards.push(usedCard)
                    this.usedCards.push(usedCard)
            }

            return cards
        }

	replace () {
		this.cardDeck.unshift(this.usedCards.shift())
	}

	clearDeck () {
		this.cardDeck = []
	}
}