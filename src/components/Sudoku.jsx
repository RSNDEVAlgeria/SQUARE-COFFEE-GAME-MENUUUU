import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, RefreshCw, CheckCircle, Info } from 'lucide-react';

const Sudoku = ({ onBack }) => {
    const initialBoard = [
        [5, 3, 0, 0, 7, 0, 0, 0, 0],
        [6, 0, 0, 1, 9, 5, 0, 0, 0],
        [0, 9, 8, 0, 0, 0, 0, 6, 0],
        [8, 0, 0, 0, 6, 0, 0, 0, 3],
        [4, 0, 0, 8, 0, 3, 0, 0, 1],
        [7, 0, 0, 0, 2, 0, 0, 0, 6],
        [0, 6, 0, 0, 0, 0, 2, 8, 0],
        [0, 0, 0, 4, 1, 9, 0, 0, 5],
        [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ];

    const solution = [
        [5, 3, 4, 6, 7, 8, 9, 1, 2],
        [6, 7, 2, 1, 9, 5, 3, 4, 8],
        [1, 9, 8, 3, 4, 2, 5, 6, 7],
        [8, 5, 9, 7, 6, 1, 4, 2, 3],
        [4, 2, 6, 8, 5, 3, 7, 9, 1],
        [7, 1, 3, 9, 2, 4, 8, 5, 6],
        [9, 6, 1, 5, 3, 7, 2, 8, 4],
        [2, 8, 7, 4, 1, 9, 6, 3, 5],
        [3, 4, 5, 2, 8, 6, 1, 7, 9]
    ];

    const [grid, setGrid] = useState(JSON.parse(JSON.stringify(initialBoard)));
    const [selected, setSelected] = useState(null);
    const [errors, setErrors] = useState([]);
    const [checked, setChecked] = useState(false);

    const handleCellClick = (r, c) => {
        if (initialBoard[r][c] === 0) {
            setSelected([r, c]);
        }
    };

    const handleNumberInput = (num) => {
        if (selected) {
            const [r, c] = selected;
            const newGrid = [...grid];
            newGrid[r][c] = num;
            setGrid(newGrid);
            setChecked(false);
            setErrors(errors.filter(e => e !== `${r}-${c}`));
        }
    };

    const reset = () => {
        setGrid(JSON.parse(JSON.stringify(initialBoard)));
        setSelected(null);
        setErrors([]);
        setChecked(false);
    };

    const checkSolution = () => {
        const newErrors = [];
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                if (grid[r][c] !== 0 && grid[r][c] !== solution[r][c]) {
                    newErrors.push(`${r}-${c}`);
                }
            }
        }
        setErrors(newErrors);
        setChecked(true);
    };

    return (
        <div className="sudoku-container">
            <div className="game-header">
                <button onClick={onBack} className="back-button glass">
                    <ArrowLeft size={24} />
                </button>
                <h2 className="handwritten">Coffee Sudoku</h2>
                <div style={{ width: 40 }} />
            </div>

            <div className="board-wrapper card">
                {grid.map((row, r) => (
                    <div key={r} className={`grid-row ${r % 3 === 2 && r !== 8 ? 'thick-bottom' : ''}`}>
                        {row.map((val, c) => (
                            <motion.div
                                key={c}
                                whileTap={initialBoard[r][c] === 0 ? { scale: 0.95 } : {}}
                                className={`grid-cell 
                  ${initialBoard[r][c] !== 0 ? 'cell-fixed' : 'cell-input'} 
                  ${selected?.[0] === r && selected?.[1] === c ? 'cell-selected' : ''} 
                  ${errors.includes(`${r}-${c}`) ? 'cell-error' : ''}
                  ${c % 3 === 2 && c !== 8 ? 'thick-right' : ''}
                `}
                                onClick={() => handleCellClick(r, c)}
                            >
                                {val !== 0 ? val : ''}
                            </motion.div>
                        ))}
                    </div>
                ))}
            </div>

            <div className="game-footer">
                <div className="number-pad-premium">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                        <motion.button
                            key={num}
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleNumberInput(num)}
                            className="num-btn-premium"
                        >
                            {num}
                        </motion.button>
                    ))}
                </div>

                <div className="action-row">
                    <button onClick={reset} className="action-btn secondary">
                        <RefreshCw size={18} /> Reset
                    </button>
                    <button onClick={checkSolution} className="action-btn primary">
                        <CheckCircle size={18} /> Solve
                    </button>
                </div>
            </div>

            <style jsx>{`
        .sudoku-container {
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 100%;
          background: #FAF9F6;
        }

        .game-header {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .back-button {
          padding: 10px;
          border-radius: 12px;
          background: white;
          color: var(--color-coffee);
          border: 1px solid var(--color-beige-dark);
        }

        .board-wrapper {
          padding: 4px;
          background: var(--color-text);
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          gap: 1.5px;
          box-shadow: 0 10px 25px rgba(44, 24, 16, 0.15);
        }

        .grid-row { display: flex; gap: 1.5px; }
        .thick-bottom { border-bottom: 2px solid var(--color-text); }

        .grid-cell {
          width: 38px;
          height: 38px;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.1rem;
          cursor: pointer;
        }

        .cell-fixed { background: #F5F3ED; color: #8B735B; }
        .cell-selected { background: #E8F5E9; box-shadow: inset 0 0 0 2px var(--color-green); z-index: 1; }
        .cell-error { background: #FDECEA; color: #D32F2F; }
        .thick-right { border-right: 2px solid var(--color-text); }

        .game-footer { width: 100%; margin-top: 25px; }

        .number-pad-premium {
          display: grid;
          grid-template-columns: repeat(9, 1fr);
          gap: 6px;
          margin-bottom: 20px;
        }

        .num-btn-premium {
          aspect-ratio: 1;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
          color: var(--color-green);
          border: 1px solid var(--color-beige-dark);
          border-radius: 10px;
          font-size: 1rem;
          font-weight: 800;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }

        .action-row { display: flex; gap: 12px; }
        .action-btn { flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px; padding: 12px; }
        .secondary { background: #D2B48C; color: white; }
        .primary { background: var(--color-green); }

        @media (max-width: 400px) {
          .grid-cell { width: 34px; height: 34px; font-size: 1rem; }
        }
      `}</style>
        </div>
    );
};

export default Sudoku;
