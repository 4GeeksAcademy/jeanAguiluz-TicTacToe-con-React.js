import { useState } from "react";

const WINNING_COMBINATIONS = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

const Home = () => {
	const [player1Name, setPlayer1Name] = useState("");
	const [player2Name, setPlayer2Name] = useState("");
	const [player1, setPlayer1] = useState(null);
	const [player2, setPlayer2] = useState(null);
	const [board, setBoard] = useState(Array(9).fill(null));
	const [turn, setTurn] = useState("player1");
	const [winner, setWinner] = useState(null);

	const resetGame = () => {
		setPlayer1Name("");
		setPlayer2Name("");
		setPlayer1(null);
		setPlayer2(null);
		setBoard(Array(9).fill(null));
		setTurn("player1");
		setWinner(null);
	};

	const checkWinner = (board) => {
		for (let [a, b, c] of WINNING_COMBINATIONS) {
			if (board[a] && board[a] === board[b] && board[a] === board[c]) {
				return board[a];
			}
		}
		return null;
	};

	const handleClick = (index) => {
		if (board[index] || winner) return;

		const newBoard = [...board];
		newBoard[index] = turn === "player1" ? player1 : player2;

		const result = checkWinner(newBoard);
		setBoard(newBoard);

		if (result) {
			setWinner(turn);
		} else {
			setTurn(turn === "player1" ? "player2" : "player1");
		}
	};

	const isDraw = board.every((cell) => cell !== null) && !winner;

	return (
		<div className="game-container">
			<h1>Tic Tac Toe in React</h1><br>
			</br>
			<h2>Pick A Weapon</h2>

			{/* INITIAL SETUP */}
			{!player1 && (
				<div className="setup-box">
					<h3>CHOOSE YOUR WEAPON</h3>

					<div className="name-inputs">
						<input
							type="text"
							placeholder="Player 1 username"
							value={player1Name}
							onChange={(e) => setPlayer1Name(e.target.value)}
						/>
						<input
							type="text"
							placeholder="Player 2 username"
							value={player2Name}
							onChange={(e) => setPlayer2Name(e.target.value)}
						/>
					</div>

					<div className="weapon-selector">
						<div
							className="weapon-box x-weapon"
							onClick={() => {
								if (!player1Name || !player2Name) return;
								setPlayer1("X");
								setPlayer2("O");
							}}
						>
							X
						</div>

						<div
							className="weapon-box o-weapon"
							onClick={() => {
								if (!player1Name || !player2Name) return;
								setPlayer1("O");
								setPlayer2("X");
							}}
						>
							O
						</div>
					</div>
				</div>
			)}


			{/* GAME */}
			{player1 && (
				<>
					<h4 className={winner ? "win-message" : ""}>
						{winner
							? `${winner === "player1" ? player1Name : player2Name} wins!`
							: isDraw
								? "It's a Draw!"
								: `Turn: ${turn === "player1" ? player1Name : player2Name}`}
					</h4>

					<button className="reset-btn" onClick={resetGame}>
						Start Over
					</button>

					<div className="board">
						{board.map((cell, index) => (
							<div
								key={index}
								className={`square ${cell === "X" ? "x-cell" : cell === "O" ? "o-cell" : ""}`}
								onClick={() => handleClick(index)}
							>
								{cell}
							</div>

						))}
					</div>
				</>
			)}
		</div>
	);
};

export default Home;
