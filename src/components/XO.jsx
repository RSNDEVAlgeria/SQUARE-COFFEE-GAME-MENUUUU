import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, ArrowLeft, Coffee, Cookie, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

const XO = ({ onBack }) => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const [winner, setWinner] = useState(null);

    const calculateWinner = (squares) => {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        if (squares.every(s => s !== null)) return 'Draw';
        return null;
    };

    const getBestMove = (squares) => {
        for (let i = 0; i < 9; i++) {
            if (!squares[i]) {
                const copy = [...squares];
                copy[i] = 'O';
                if (calculateWinner(copy) === 'O') return i;
            }
        }
        for (let i = 0; i < 9; i++) {
            if (!squares[i]) {
                const copy = [...squares];
                copy[i] = 'X';
                if (calculateWinner(copy) === 'X') return i;
            }
        }
        if (!squares[4]) return 4;
        const available = squares.map((s, i) => s === null ? i : null).filter(s => s !== null);
        return available[Math.floor(Math.random() * available.length)];
    };

    useEffect(() => {
        if (!isXNext && !winner) {
            const timer = setTimeout(() => {
                const move = getBestMove(board);
                if (move !== undefined) {
                    handleClick(move);
                }
            }, 600);
            return () => clearTimeout(timer);
        }
    }, [isXNext, winner, board]);

    const handleClick = (i) => {
        if (winner || board[i]) return;
        const newBoard = [...board];
        newBoard[i] = isXNext ? 'X' : 'O';
        setBoard(newBoard);
        setIsXNext(!isXNext);

        const win = calculateWinner(newBoard);
        if (win) {
            setWinner(win);
            if (win === 'X') confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#1B4D3E', '#FAF9F6', '#D2B48C']
            });
        }
    };

    const reset = () => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
        setWinner(null);
    };

    return (
        <div className="game-container">
            <div className="game-header">
                <button onClick={onBack} className="back-button glass">
                    <ArrowLeft size={24} />
                </button>
                <h2 className="handwritten">Tic Tac Toe</h2>
                <div style={{ width: 40 }} />
            </div>

            <motion.div
                key={winner || 'playing'}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="game-status-card"
            >
                {winner ? (
                    <div className="winner-display">
                        <Trophy size={20} className="trophy-icon" />
                        <span>{winner === 'Draw' ? "It's a Cozy Tie!" : (winner === 'X' ? "You Won!" : "Barista Bot Wins!")}</span>
                    </div>
                ) : (
                    <div className={`turn-info ${isXNext ? 'your-turn' : 'bot-turn'}`}>
                        <span>{isXNext ? "Your Turn (Coffee)" : "Bot's Turn (Cookie)"}</span>
                    </div>
                )}
            </motion.div>

            <div className="board-grid">
                {board.map((square, i) => (
                    <motion.div
                        key={i}
                        whileHover={!square && isXNext ? { scale: 1.02, backgroundColor: 'rgba(255,255,255,0.9)' } : {}}
                        whileTap={!square && isXNext ? { scale: 0.95 } : {}}
                        className={`board-cell ${square ? 'filled' : ''}`}
                        onClick={() => isXNext && handleClick(i)}
                    >
                        <AnimatePresence mode="wait">
                            {square === 'X' && (
                                <motion.div
                                    key="X"
                                    initial={{ scale: 0, rotate: -45 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    exit={{ scale: 0 }}
                                >
                                    <Coffee size={40} className="icon-x" strokeWidth={2.5} />
                                </motion.div>
                            )}
                            {square === 'O' && (
                                <motion.div
                                    key="O"
                                    initial={{ scale: 0, rotate: 45 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    exit={{ scale: 0 }}
                                >
                                    <Cookie size={40} className="icon-o" strokeWidth={2.5} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={reset}
                className="restart-button"
            >
                <RefreshCw size={20} /> Play Again
            </motion.button>

            <style jsx>{`
        .game-container {
          padding: 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 100%;
          background: radial-gradient(circle at center, #FDFCF0 0%, #FAF9F6 100%);
        }

        .game-header {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 30px;
        }

        .back-button {
          padding: 10px;
          border-radius: 12px;
          color: var(--color-coffee);
          box-shadow: none;
          background: white;
          border: 1px solid var(--color-beige-dark);
        }

        .game-status-card {
          padding: 12px 24px;
          border-radius: 100px;
          background: white;
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
          margin-bottom: 40px;
          font-weight: 700;
          color: var(--color-coffee);
          border: 1px solid var(--color-beige-dark);
        }

        .winner-display { display: flex; align-items: center; gap: 8px; color: var(--color-green); }
        .turn-info { font-size: 0.9rem; opacity: 0.8; }
        .your-turn { color: var(--color-green); }
        .bot-turn { color: var(--color-coffee-light); }

        .board-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          width: 100%;
          max-width: 340px;
          background: var(--color-beige-dark);
          padding: 12px;
          border-radius: 24px;
          box-shadow: inset 0 2px 10px rgba(0,0,0,0.1);
        }

        .board-cell {
          aspect-ratio: 1;
          background: #FAF9F6;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s;
        }

        .board-cell.filled { cursor: default; }

        .icon-x { color: var(--color-green); }
        .icon-o { color: var(--color-coffee-light); }

        .restart-button {
          margin-top: 50px;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 30px;
          font-size: 1.1rem;
        }
      `}</style>
        </div>
    );
};

export default XO;
