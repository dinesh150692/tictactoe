import React from 'react';
import './App.css';

const GRID = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8]
];
class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      grid : Array(9).fill(0),
      turnX: true,
      winner: ''
    }
  }

  calculateWinner() {
    let { grid } = this.state;
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (grid[a] && grid[a] === grid[b] && grid[a] === grid[c]) {
        
        this.setState({winner: grid[a]});
      }
    }
    return null;
  }

 renderMainGrid = () => {
   
   return(
    <div className="columnsStyle">
      {GRID.map((item) => {
        return this.renderRow(item);
      } )}
    </div>
   )
 }

 renderRow = (row) => {
  return(
    <div key={row} className="rowStyle">
      { row.map((item) => {
        return this.renderCell(item);
      } )}
    </div>
  )
 }

 renderCell = (id) => {
    return(
      <div  key={id} id={id} className={ id%2 === 0 ? 'box lightBackground' : 'box darkBackground'} >
        <span className="cross">
          {this.state.grid[id] === 0 ? '' : this.state.grid[id]}
        </span>
      </div>
    )
  }

  updateCellValue = (event) => {
    let { grid, turnX } = this.state;
    if(grid[event.target.id || this.state.winner]){
      return;
    }
    grid[event.target.id] = turnX ? 'X' : 'O';
    this.setState({grid: [...grid], turnX: !turnX}, () => {
      this.calculateWinner();
    });
  } 

  resetGame = () => {
      this.setState({
        grid : Array(9).fill(0),
        turnX: true,
        winner: ''
      });
  } 

  render() {
    return (
      <div>
        <div className="header"><h1> Tic Tac @ Hiver</h1>
        </div>
        <div className="parentTop">
          <div className="gridTop">
              <div className="grid" onClick={this.updateCellValue}>
                {this.renderMainGrid()}
              </div>
          </div>
        </div>
        {this.state.winner && <div className="winnerContainer">
          Winner:<span className="winnerText"> {this.state.winner} </span> 
          </div>  
        }
        <div className="winnerContainer">
          <button onClick={this.resetGame}>Reset Game</button>
        </div>      
      </div>
    );
  }
}

export default App;
