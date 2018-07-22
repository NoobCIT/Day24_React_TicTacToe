import React, { Component } from 'react';

const WIN_CONDITIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export function checkForWin(squares) {
  let winner = false;
  let player = '';

  for (let i = 0; i < WIN_CONDITIONS.length; i++) {
    const [a, b, c] = WIN_CONDITIONS[i];
    if (squares[a] + squares[b] + squares[c] === 'XXX'
      || squares[a] + squares[b] + squares[c] === 'OOO') {
        player = squares[a];
        winner = true;
    }
  }
  return [winner, player];
}

export function checkForDraw(squares) {
  let draw = true;
  let empty = false;
  for (let i = 0; i < WIN_CONDITIONS.length; i++) {
    const [a, b, c] = WIN_CONDITIONS[i];
    if (squares[a] + squares[b] + squares[c] === 'XXX'
      || squares[a] + squares[b] + squares[c] === 'OOO') {
        draw = false;
        break;
    }
  }
  for (let i = 0; i < 9; i++) {
    if (squares[i] === '') {
      empty = true;
      break;
    }
  }
  return draw === !empty;
}

function Square(props) {
  return (
    <div className='square' onClick={props.onClick}></div>
  )
}

export function Board(props) {
  return (
    <div className='board'>
      <Square onClick={props.onClick} />
      <Square onClick={props.onClick} />
      <Square onClick={props.onClick} />
      <Square onClick={props.onClick} />
      <Square onClick={props.onClick} />
      <Square onClick={props.onClick} />
      <Square onClick={props.onClick} />
      <Square onClick={props.onClick} />
      <Square onClick={props.onClick} />
    </div>
  )
}

function ScoreBoard(props) {
  return (
    <div className='score'>
      <div className='playerscore'>
        <h3>X Score</h3>
        {props.xScore}
      </div>
      <div className='playerscore'>
        <h3>O Score</h3>
        {props.oScore}
      </div>
    </div>
  )
}

class Game extends Component {
  constructor(props) {
    super(props)

    this.state = {
      marker: 'X',
      status: 'Game In Progress',
      xScore: 0,
      oScore: 0,
      squares: Array(9).fill(""),
      gameover: false,
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleReset() {
    const elements = document.getElementsByClassName('board')[0].children;
    const squares = this.state.squares;
    for (let i = 0; i < 9; i++) {
      elements[i].innerHTML = '';
      squares[i] = '';
    }

    this.setState({
      marker: 'X',
      status: 'Game In Progress',
      squares: squares,
      gameover: false,
    })
  }

  handleGameStatus(squares) {
    let winner = checkForWin(squares);
    if (winner[0] && !this.state.gameover) {
      this.setState((prevState) => ({
        status: `Player ${winner[1]} wins!`,
        xScore: winner[1] === 'X' ? prevState.xScore + 1 : prevState.xScore,
        oScore: winner[1] === 'O' ? prevState.oScore + 1 : prevState.oScore,
        gameover: true,
      }));
    } else if (checkForDraw(squares) && !this.state.gameover) {
      this.setState((prevState) => ({
        status: 'The game is a draw!',
        gameover: true,
      }));
    }
  }

  handleClick(event) {
    if (event.target.innerHTML === '' && !this.state.gameover) {
      event.target.innerHTML = this.state.marker;
    }
    const elements = document.getElementsByClassName('board')[0].children;
    const squares = this.state.squares;
    for (let i = 0; i < elements.length; i++) {
      squares[i] = elements[i].innerHTML;
    }
    this.setState((prevState) => ({
      marker: prevState.marker === 'X' ? 'O' : 'X',
      squares: squares,
    }));
    this.handleGameStatus(squares);
  }

  render() {
    return (
      <div>
        <Board
          onClick={this.handleClick}
        />
        <div className='scoreboard'>
          <h1>{this.state.status}</h1>
          <button onClick={this.handleReset}>Reset</button>
          <ScoreBoard
            xScore={this.state.xScore}
            oScore={this.state.oScore}
          />
        </div>
      </div>
    );
  }
}

export default Game;
