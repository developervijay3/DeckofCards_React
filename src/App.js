import React, { Component } from 'react';
import './App.css';
import Deck from './deck-cards';
import Card from "./cards";
import "bootstrap3/dist/css/bootstrap.css";
class App extends Component {

  constructor(props){
    super(props);
    this.state={
      players:0,
      playerList:[],
      count:0,
      disabled:true,
      currentCards:[],
      completeSet:[],
      user:"",
      visible:'visible'
    }
    this.cards = new Deck();
    this.cards.generateDeck();
  }

  /*function used to shuffle the card*/
  shuffleCards = ()=>{
    this.cards.shuffle();
    this.getCompleteCardsSet();
  }


  /*function to deal the deck of cards*/
  dealCards= () =>{
    let currentCards = this.cards.deal(this.state.players)
    const currCard=currentCards.filter((card)=>card!==undefined);
    this.setState({currentCards:currCard});
  }

  /*function to set the number of players*/
  setPlayers = (event) =>{
    let players  = event.target.value;
    if(players>3){
      alert("Maximum allowed players are three")
    }else{
    const playerList=Array.apply(null, {length: players}).map(Number.call, Number)
    this.setState({players:players,playerList:playerList});
    }

  }

  /*function used set the name of the user*/
  setUser=(event)=>{
    document.getElementsByName(event.target.name)[0].disabled=true;
    let count=this.state.count+1;
    const user  = event.target.value;
    let finalUser=this.state.user!=="" ? this.state.user.concat(','+user): user;
    const disabled=(count==this.state.players) ? false :true
    this.setState({user:finalUser,disabled:disabled,count:count});
  }

  /*function to get complete card set*/
  getCompleteCardsSet = ()=>{
    let completeSet =  this.cards.getCurrentCards();
    this.setState({completeSet:completeSet});
  }

/**reset the card shuffled */
  resetDeck = ()=>{
    this.cards.clearDeck();
    this.cards.generateDeck();
    this.getCompleteCardsSet();
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="col-md-12 filters">
            <div className="col-md-2">
              <div className="form-group">
                  <label >No Of Players</label><input type="number" min="1" max="3" className="form-control" placeholder="enter the number of players" onBlur={this.setPlayers}></input>
              </div>
            </div>
            <div className="col-md-12">
            {this.state.playerList!==null && (
              this.state.playerList.map((index,item)=>(
               <div className="col-md-3" key={index}>
                    <label >Player Name{item+1}</label><input type="input" name={`name${item}`} className="form-control" placeholder="enter name" onBlur={this.setUser}></input>
                </div>
              )))
              }</div>
              <div className="col-md-12">
                <div className="form-group">
                  <button  onClick={this.getCompleteCardsSet} className="btn btn-default" disabled={this.state.disabled}> Start </button>    
                </div>
            </div>
            <div className="col-md-12">
            {this.state.user!=="" && <h2>Welcome {this.state.user}</h2>}
            </div>
            <div className="col-xs-12 col-sm-2 col-md-2">
            <div className="form-group">
            <div className="btn-group-vertical">
              <button  onClick={this.getCompleteCardsSet} className="btn btn-primary" > Show  Deck </button>       
              <button  onClick={this.shuffleCards} className="btn btn-warning" > Shuffle Cards </button>    
              <button  onClick={this.dealCards}  className="btn btn-success" > Deal Cards </button> 
              <button  onClick={this.resetDeck} className="btn btn-danger" > Reset Deck </button> 
            </div>   
            </div>
            </div>
            <div>
            <div className="col-xs-12 col-sm-10 col-md-10">
            { this.state.currentCards && this.state.currentCards.length > 0 &&
              (<div className="col-md-12 cards-board"> 
                  <h3>Below are the cards dealt</h3>
                  {this.state.currentCards.map((card,index)=>{
                    return <Card data={card} key={index}/>})}
              </div>)
            }
             {this.state.completeSet && this.state.completeSet.length > 0 ?
              <div className="col-md-12 cards-board">
                  <h3> Complete Set Of cards</h3>
                  {this.state.completeSet.map((card,index)=>{
                    return <Card data={card} key={index}/>
                  })}
              </div>
              :
              <div>No Cards to Display</div>
            }
            </div>
        </div>
      </div>
      </div>
    );
  }
}

export default App;
