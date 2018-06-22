import React from 'react';
import Game, { checkForWin, checkForDraw, Board } from './components/App';

describe('Checks for a winner', () => {
  it('should return false for an empty board', () => {
    const squares = Array(9).fill('');
    expect(checkForWin(squares)[0]).to.equal(false);
    expect(checkForWin(squares)[1]).to.equal('');
    expect(checkForWin(squares)).to.have.length(2);
  });

  it('should return true for 3 in a row horizontal', () => {
    const squares = ['X', 'X', 'X', '', '', '', '', '', ''];
    expect(checkForWin(squares)[0]).to.equal(true);
    expect(checkForWin(squares)[1]).to.equal('X');
    expect(checkForWin(squares)).to.have.length(2);
  });

  it('should return true for 3 in a row vertical', () => {
    const squares = ['O', '', '', 'O', '', '', 'O', '', ''];
    expect(checkForWin(squares)[0]).to.equal(true);
    expect(checkForWin(squares)[1]).to.equal('O');
    expect(checkForWin(squares)).to.have.length(2);
  })

  it('should return true for 3 in a row diagonal', () => {
    const squares = ['O', '', '', '', 'O', '', '', '', 'O'];
    expect(checkForWin(squares)[0]).to.equal(true);
    expect(checkForWin(squares)[1]).to.equal('O');
    expect(checkForWin(squares)).to.have.length(2);
  })

  it('should return false for not 3 in a row horizontal', () => {
    const squares = ['', '', '', 'X', 'O', 'X', '', '', ''];
    expect(checkForWin(squares)[0]).to.equal(false);
    expect(checkForWin(squares)[1]).to.equal('');
    expect(checkForWin(squares)).to.have.length(2);
  })

  it('should return false for not 3 in a row vertical', () => {
    const squares = ['', '', 'X', '', '', 'X', '', '', 'O'];
    expect(checkForWin(squares)[0]).to.equal(false);
    expect(checkForWin(squares)[1]).to.equal('');
    expect(checkForWin(squares)).to.have.length(2);
  })

  it('should return false for not 3 in a row diagonal', () => {
    const squares = ['', '', 'O', '', 'X', '', 'X', '', ''];
    expect(checkForWin(squares)[0]).to.equal(false);
    expect(checkForWin(squares)[1]).to.equal('');
    expect(checkForWin(squares)).to.have.length(2);
  })
});

describe('Checks for a draw', () => {
  it('should return false for an empty board', () => {
    const squares = Array(9).fill("");
    expect(checkForDraw(squares)).to.equal(false);
  });

  it('should return false for a full board with a winner', () => {
    const squares = ['X', 'X', 'X', 'O', 'X', 'O', 'O', 'X', 'O'];
    expect(checkForDraw(squares)).to.equal(false);
  });

  it('should return true for a full board with no winner', () => {
    const squares = ['X', 'O', 'X', 'O', 'X', 'X', 'O', 'X', 'O'];
    expect(checkForDraw(squares)).to.equal(true);
  });
});

describe('Game Component', () => {
  it('should render 1 board component', () => {
    const wrapper = shallow(<Game />);
    expect(wrapper.find(Board)).to.have.length(1);
  });

  it('should have initial x-score of 0', () => {
    const wrapper = shallow(<Game />);
    expect(wrapper.state('xScore')).to.equal(0);
  })

  it('should have initial o-score of 0', () => {
    const wrapper = shallow(<Game />);
    expect(wrapper.state('oScore')).to.equal(0);
  })
});

describe('Board Component', () => {
  it('should render 9 square components', () => {
    const wrapper = shallow(<Board />);
    expect(wrapper.find('div').children()).to.have.length(9);
  });

  it('should have the class board', () => {
    const wrapper = shallow(<Board />);
    expect(wrapper.find('div').hasClass('board')).to.equal(true);
  })
});
