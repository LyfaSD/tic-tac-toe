import React from "react";
import { ScrollView, StyleSheet, Text, View, Pressable } from "react-native";

type SquareValue = "X" | "O" | null;

const Board: React.FC = () => {
  const squares = Array(9).fill(null);

  const renderSquare = (i: number) => {
    return (
      <Pressable
        key={i}
        style={styles.square}
        disabled={true}
      >
        <Text style={styles.squareText}>({String(i)})</Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {[0, 1, 2].map((row) => {
          return (
            <View style={styles.row} key={row}>
              {[0, 1, 2].map((col) => {
                const index = row * 3 + col;
                return renderSquare(index);
              })}
            </View>
          );
        })}
      </ScrollView>
      <Text style={styles.status}>Board of nine squares</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
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
  status: {
    marginTop: 20,
    fontSize: 18,
    color: "#333",
  },
});

export default function Index() {
  return <Board />;
}