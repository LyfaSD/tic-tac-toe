import React from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useAppTheme } from "@/contexts/theme-context";

type SquareValue = "X" | "O" | null;

type SquareProps = {
  value: SquareValue;
  disabled: boolean;
  onPress: () => void;
};

type BoardProps = {
  squares: SquareValue[];
  disabled: boolean;
  onSquareClick: (index: number) => void;
};

type GameProps = {
  history: SquareValue[][];
  currentMove: number;
  xIsNext: boolean;
  onPlay: (index: number) => void;
  onGoTo: (step: number) => void;
  onRestart: () => void;
};

type WinnerResult = {
  winner: SquareValue;
  winningLine: number[] | null;
};

const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const Square: React.FC<SquareProps> = ({ value, disabled, onPress }) => {
  const { colors } = useAppTheme();
  const valueColor =
    value === "X" ? colors.x : value === "O" ? colors.o : colors.text;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={value ? `Square ${value}` : "Empty square"}
      style={[
        styles.square,
        { backgroundColor: colors.surface, borderColor: colors.border },
      ]}
      onPress={onPress}
      disabled={disabled || value !== null}
    >
      <Text style={[styles.squareText, { color: valueColor }]}>{value}</Text>
    </Pressable>
  );
};

const Board: React.FC<BoardProps> = ({
  squares,
  disabled,
  onSquareClick,
}) => (
  <View style={styles.board}>
    {[0, 1, 2].map((row) => (
      <View style={styles.row} key={row}>
        {[0, 1, 2].map((column) => {
          const index = row * 3 + column;
          return (
            <Square
              key={index}
              value={squares[index]}
              disabled={disabled}
              onPress={() => onSquareClick(index)}
            />
          );
        })}
      </View>
    ))}
  </View>
);

const calculateWinner = (squares: SquareValue[]): WinnerResult => {
  for (const line of WINNING_LINES) {
    const [first, second, third] = line;
    if (
      squares[first] !== null &&
      squares[first] === squares[second] &&
      squares[first] === squares[third]
    ) {
      return { winner: squares[first], winningLine: line };
    }
  }

  return { winner: null, winningLine: null };
};

const Game: React.FC<GameProps> = ({
  history,
  currentMove,
  xIsNext,
  onPlay,
  onGoTo,
  onRestart,
}) => {
  const { colors } = useAppTheme();
  const currentSquares = history[currentMove];
  const { winner } = calculateWinner(currentSquares);
  const isDraw = !winner && currentSquares.every((square) => square !== null);
  const status = winner
    ? `Winner: ${winner}`
    : isDraw
      ? "The game is a draw"
      : `Next player: ${xIsNext ? "X" : "O"}`;

  return (
    <View style={styles.content}>
      <Text style={[styles.heading, { color: colors.text }]}>Tic-Tac-Toe</Text>
      <Board
        squares={currentSquares}
        disabled={Boolean(winner) || isDraw}
        onSquareClick={onPlay}
      />
      <Text style={[styles.statusText, { color: colors.text }]}>{status}</Text>
      <Pressable
        accessibilityRole="button"
        style={[styles.restartButton, { backgroundColor: colors.accent }]}
        onPress={onRestart}
      >
        <Text style={[styles.restartText, { color: colors.accentContrast }]}>
          Restart game
        </Text>
      </Pressable>
      <View
        style={[
          styles.moveList,
          { backgroundColor: colors.surface, borderColor: colors.border },
        ]}
      >
        <Text style={[styles.moveListTitle, { color: colors.muted }]}>
          Game history
        </Text>
        {history.map((_step, move) => {
          const isCurrentMove = move === currentMove;
          return (
            <Pressable
              key={move}
              accessibilityRole="button"
              accessibilityState={{ selected: isCurrentMove }}
              style={[
                styles.moveButton,
                {
                  backgroundColor: isCurrentMove
                    ? colors.accent
                    : colors.surfaceAlt,
                },
              ]}
              onPress={() => onGoTo(move)}
            >
              <Text
                style={[
                  styles.moveText,
                  {
                    color: isCurrentMove
                      ? colors.accentContrast
                      : colors.text,
                  },
                ]}
              >
                {move === 0 ? "Go to game start" : `Go to move ${move}`}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default function GameScreen() {
  const [history, setHistory] = React.useState<SquareValue[][]>([
    Array(9).fill(null),
  ]);
  const [currentMove, setCurrentMove] = React.useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const isDraw =
    !calculateWinner(currentSquares).winner &&
    currentSquares.every((square) => square !== null);

  React.useEffect(() => {
    if (!isDraw) {
      return;
    }

    const timeout = setTimeout(() => {
      setHistory([Array(9).fill(null)]);
      setCurrentMove(0);
    }, 1500);

    return () => clearTimeout(timeout);
  }, [isDraw]);

  const restartGame = () => {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  };

  const handleClick = (index: number) => {
    if (
      calculateWinner(currentSquares).winner ||
      isDraw ||
      currentSquares[index] !== null
    ) {
      return;
    }

    const nextSquares = currentSquares.slice();
    nextSquares[index] = xIsNext ? "X" : "O";
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];

    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.screenContent}
      keyboardShouldPersistTaps="handled"
    >
      <Game
        history={history}
        currentMove={currentMove}
        xIsNext={xIsNext}
        onPlay={handleClick}
        onGoTo={setCurrentMove}
        onRestart={restartGame}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  screenContent: {
    flexGrow: 1,
    padding: 20,
  },
  content: {
    alignItems: "center",
    width: "100%",
  },
  heading: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
  },
  board: {
    width: "100%",
    maxWidth: 330,
    aspectRatio: 1,
  },
  row: {
    flex: 1,
    flexDirection: "row",
  },
  square: {
    flex: 1,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  squareText: {
    fontSize: 48,
    fontWeight: "700",
  },
  statusText: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 16,
  },
  restartButton: {
    borderRadius: 8,
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  restartText: {
    fontSize: 15,
    fontWeight: "600",
  },
  moveList: {
    alignSelf: "stretch",
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 24,
    padding: 12,
  },
  moveListTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  moveButton: {
    borderRadius: 8,
    marginVertical: 3,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  moveText: {
    fontSize: 15,
  },
});
