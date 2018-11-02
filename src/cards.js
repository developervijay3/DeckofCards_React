import React, { Component } from 'react';

export default class Card extends Component{
    cardUrl = "https://deckofcardsapi.com/static/img/";
    getCardUrl = (value,suit)=>{
      let suitChar =  suit.charAt(suit);
      return this.cardUrl + value + suitChar + ".png";
      
    }
    render(){
        console.log('gfgh',this.props.data);
        let {suit,value} = this.props.data;
        return(<div className="card">
                <img src={this.getCardUrl(value,suit)} />
            </div>);
    }
}