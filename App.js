import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const [playerColors, setPlayerColors] = useState({ X: '#FF6347', O: '#32CD32' });

  const checkWinner = () => {
    const winningLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let line of winningLines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        return;

      }
    }

    let isFull = true;
    for (let i = 0; i < board.length; i++) {
      if (!board[i]) {
        isFull = false;
        break;
      }
    }

    if (isFull && !winner) {
      Alert.alert("Hey, it's a draw!");
      setWinner('draw');
    }
  };





  const handlePress = (index) => {
    if (!board[index] && !winner) {
      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
      setPlayerColors({ ...playerColors, [currentPlayer]: playerColors[currentPlayer] === '#FF6347' ? '#32CD32' : '#FF6347' });
      checkWinner();
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
  };

  const renderSquare = (index) => {
    return (
      <TouchableOpacity style={styles.square} onPress={() => handlePress(index)}>
        <Text style={[styles.symbol, { color: playerColors[board[index]] }]}>{board[index]}</Text>
      </TouchableOpacity>
    );
  };


  return (
    <View style={styles.container}>
      <View style={styles.upper_box}>
        <View style={styles.boxWrapper}>
          <View style={styles.box}>
            <Image
              style={styles.img}
              source={require("./assets/indi.jpg")}
            />
            <Text style={{ textAlign: "center", fontWeight: "bold" }}> Indialia</Text>
            <View
            style={{height:40, width:70, backgroundColor:"red", borderRadius:25, alignSelf:"center"}}
            >
              <Text style={{textAlign:"center", fontSize:35, alignSelf:"center", color:"white"}}>X</Text>
            </View>
          </View>
        </View>
        <View style={styles.boxWrapper}>
          <View style={[styles.box]}>
            <Image
              style={styles.img}
              source={require("./assets/sham.png")}
            />
            <Text style={{ textAlign: "center", fontWeight: "bold" }}> Carmela</Text>
            <View
            style={{height:40, width:70, backgroundColor:"red", borderRadius:25, alignSelf:"center"}}
            >
              <Text style={{textAlign:"center", fontSize:35, alignSelf:"center", color:"green"}}>o</Text>
            </View>
          </View>
        </View>
      </View>
      <Text style={styles.title}>Tic Tac Toe</Text>
      <View style={[styles.board, styles.suarebox]}>
        {board.map((square, index) => renderSquare(index))}
      </View>
      <View>
        <Text style={{ fontSize: 17, marginTop: 20 }}>{winner} win the match</Text>
        <TouchableOpacity style={styles.button} onPress={resetGame}>
          <Text style={styles.buttonText}>Play Again</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#f5f5f5"
  },
  img: {
    width: 50,
    height: 60,
    marginTop: -20,
    marginLeft: 15,
    borderRadius: 25
  },
  upper_box: {
    marginTop: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 60
  },
  boxWrapper: {
    marginHorizontal: 80, // Add margin between the boxes
  },
  box: {
    width: 80,
    height: 100,
    borderRadius: 20,
    backgroundColor: "white"
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  suarebox: {
    backgroundColor: "red",
    width: 340,
    justifyContent: "center",
    borderRadius: 25,

  },
  square: {
    width: 100,
    height: 100,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10
  },
  symbol: {
    fontSize: 40,
  },
  result: {
    fontSize: 20,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#009688',
    padding: 10,
    borderRadius: 5,
    marginTop: 20
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default App;