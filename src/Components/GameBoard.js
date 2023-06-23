import React, { useEffect, useState } from 'react'
import GameCircle from './GameCircle'
import '../App.css';
import Header from './Header';
import Footer from './Footer';
import { getComputerMove, isDraw, isWinner } from '../helper';
import { GAME_STATE_DRAW, GAME_STATE_PLAYING, GAME_STATE_WIN, NO_CIRCLES, NO_PLAYER, PLAYER_1, PLAYER_2 } from './Constant';

function GameBoard() {
    const [gameBoard, setGameBoard] = useState(Array(NO_CIRCLES).fill(NO_PLAYER));
    const [currPlayer, setCurrPlayer] = useState(PLAYER_1);
    const [gameState, setGameState] = useState(GAME_STATE_PLAYING);
    const [winPlayer, setWinPlayer] = useState(NO_PLAYER);
   
    useEffect(()=>{
      initGame();
    },[])
    const initGame = () =>{
      setGameBoard(Array(NO_CIRCLES).fill(NO_PLAYER));
      setCurrPlayer(PLAYER_1);
      setGameState(GAME_STATE_PLAYING);
    }
    const initBoard = ()=>{
      const circles =[];
      for(let i=0;i<NO_CIRCLES; i++){
        circles.push(renderCircle(i));
      }
      return circles;
    }
    const suggestMove = () =>{
      circleClicked(getComputerMove(gameBoard));
    }
    function circleClicked(id){
      if(gameBoard[id]!== NO_PLAYER) return;

      if(gameState !== GAME_STATE_PLAYING) return;

      if(isWinner(gameBoard,id,currPlayer)){
        setGameState(GAME_STATE_WIN);
        setWinPlayer(currPlayer);
      }
      if(isDraw(gameBoard,id,currPlayer)){
        setGameState(GAME_STATE_DRAW);
        setWinPlayer(NO_PLAYER);
      }
        setGameBoard(prev=>{
          return prev.map((circle,pos)=>{
            if(pos === id) return currPlayer;
            return circle;
          })
        });
        setCurrPlayer(currPlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1);
    }
    const renderCircle = id =>{
        return <GameCircle key={id} id ={id} className={`player${gameBoard[id]}`} onCircleClicked={circleClicked}/>
    }
  return (
    <>
    <Header gameState={gameState} currPlayer={currPlayer} winPlayer={winPlayer}/>
    <div className='gameboard'>
        {initBoard()}
    </div>
    <Footer onClickEvent={initGame} onSuggestClick={suggestMove} gameState={gameState}/>
    </>
    
  )
}

export default GameBoard