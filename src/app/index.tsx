import React from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

type SquareValue = "X" | "O" | null;

type SquareProps = {
  value: SquareValue;
  onPress: () => void;
};

type BoardProps = {
  squares: SquareValue[];
  onSquareClick: (index: number) => void;
};

type GameProps = {
  history: SquareValue[][];
  stepNumber: number;
  xIsNext: boolean;
  onPlay: (index: number) => void;
  onGoTo: (step: number) => void;
};

const Square: React.FC<SquareProps> = ({ value, onPress }) => {
  const renderValue = value !== null ? value : " ";
  return (
    <Pressable
      style={styles.square}
      onPress={onPress}
      disabled={value !== null}
    >
      <Text style={styles.squareText}>{renderValue}</Text>
    </Pressable>
  );
};

const Board: React.FC<BoardProps> = ({ squares, onSquareClick }) => {
  return (
    <ScrollView>
      {[0, 1, 2].map((row) => {
        return (
          <View style={styles.row} key={row}>
            {[0, 1, 2].map((col) => {
              const index = row * 3 + col;
              return (
                <Pressable
                  key={index}
                  style={styles.square}
                  onPress={() => onSquareClick(index)}
                  disabled={squares[index] !== null}
                >
                  <Text style={styles.squareText}>{squares[index]}</Text>
                </Pressable>
              );
            })}
          </View>
        );
      })}
    </ScrollView>
  );
};

const calculateWinner = (squares: SquareValue[]): { winner: string | null } => {
  const lines: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a] };
    }
  }
  return { winner: null };
};

const Game: React.FC<GameProps> = ({
  history,
  stepNumber,
  xIsNext,
  onPlay,
  onGoTo,
}) => {
  const winner = calculateWinner(history[stepNumber] ?? history[0]).winner;
  const current = history[stepNumber];

  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${xIsNext ? "X" : "O"}`;

  return (
    <View style={styles.gameContainer}>
      <View style={styles.board}>
        <Board squares={current ?? Array(9).fill(null)} onSquareClick={onPlay} />
      </View>
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>{status}</Text>
      </View>
    </View>
  );
};

const MoveList: React.FC<{
  history: SquareValue[][];
  onGoTo: (step: number) => void;
}> = ({ history, onGoTo }) => {
  return (
    <View style={styles.moveList}>
      <Text style={styles.moveListTitle}>Past moves:</Text>
      {history.map((_step, move) => {
        return (
          <Pressable
            key={move}
            style={styles.moveButton}
            onPress={() => onGoTo(move)}
          >
            <Text style={styles.moveText}>Move {move + 1}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  square: {
    width: 90,
    height: 90,
    borderWidth: 1,
    borderColor: "#999",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  squareText: {
    fontSize: 40,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  gameContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  board: {
    backgroundColor: "#eee",
    width: 300,
    padding: 10,
  },
  statusContainer: {
    marginTop: 20,
  },
  statusText: {
    fontSize: 18,
    color: "#333",
  },
  moveList: {
    width: "100%",
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f0f0f0",
  },
  moveListTitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  moveButton: {
    padding: 5,
    margin: 2,
    backgroundColor: "#ccc",
  },
  moveText: {
    fontSize: 12,
  },
});

export default function Index() {
  const [history, setHistory] = React.useState<SquareValue[][]>([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = React.useState(0);
  const [xIsNext, setXIsNext] = React.useState(true);

  const onPlay = (index: number) => {
    const historyPoint = history.slice(0, stepNumber + 1);
    const current = historyPoint[stepNumber];
    const squares = current.slice();
    squares[index] = xIsNext ? "X" : "O";

    setHistory([
      ...historyPoint,
      squares,
    ]);
    setStepNumber(stepNumber + 1);
    setXIsNext(!xIsNext);
  };

  const goTo = (step: number) => {
    setStepNumber(step);
  };

  const winner = calculateWinner(history[stepNumber] ?? history[0]).winner;

  return (
    <>
      <Game
        history={history}
        stepNumber={stepNumber}
        xIsNext={xIsNext}
        onPlay={onPlay}
        onGoTo={goTo}
      />
      <MoveList history={history} onGoTo={goTo} />
    </>
  );
}