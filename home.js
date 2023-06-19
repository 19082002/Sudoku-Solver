var row = document.getElementsByClassName("row");
var col = document.getElementsByClassName("col");
var field = document.getElementsByClassName("field");

setInterval(() => {
  document.getElementById("msg").style.display="none";
  document.getElementById("brd").style.filter="blur(0px)";
}, 8000);
p = 0;
let j = 0,
  i = 0;
while (j < 74) {
  if (i == 5 || i == 3 || i == 4) {
    j += 3;

    col[j++].style.backgroundColor = "rgba(73, 223, 68, 0.137)";
    col[j++].style.backgroundColor = "rgba(73, 223, 68, 0.137)";
    col[j++].style.backgroundColor = "rgba(73, 223, 68, 0.137)";
    j += 3;
  } else {
    // console.log(col[j].innerText);
    col[j++].style.backgroundColor = "rgba(73, 223, 68, 0.137)";
    col[j++].style.backgroundColor = "rgba(73, 223, 68, 0.137)";
    col[j++].style.backgroundColor = "rgba(73, 223, 68, 0.137)";
    j += 3;
    col[j++].style.backgroundColor = "rgba(73, 223, 68, 0.137)";
    col[j++].style.backgroundColor = "rgba(73, 223, 68, 0.137)";
    col[j++].style.backgroundColor = "rgba(73, 223, 68, 0.137)";
  }
  i++;
}

function clearer() {
  for (let i = 0; i < 81; i++) field[i].value = "";
  document.getElementById("btn1").disabled = false;
}
function solve() {
  let flag = true;
  for (let i = 0; i < 81; i++) {
    let ch = field[i].value.charCodeAt(0);
    if (field[i].value == "" || (ch > 48 && ch < 58)) continue;
    else {
      flag = false;
      alert("Please enter valid number(1-9)");
      break;
    }
  }
  i = 0;
  const board = [
    [
      field[i++].value,
      field[i++].value,
      field[i++].value,
      field[i++].value,
      field[i++].value,
      field[i++].value,
      field[i++].value,
      field[i++].value,
      field[i++].value,
    ],
    [
      field[i++].value,
      field[i++].value,
      field[i++].value,
      field[i++].value,
      field[i++].value,
      field[i++].value,
      field[i++].value,
      field[i++].value,
      field[i++].value,
    ],
    [
      field[i++].value,
      field[i++].value,
      field[i++].value,
      field[i++].value,
      field[i++].value,
      field[i++].value,
      field[i++].value,
      field[i++].value,
      field[i++].value,
    ],
    [
      field[i++].value,
      field[i++].value,
      field[i++].value,
      field[i++].value,
      field[i++].value,
      field[i++].value,
      field[i++].value,
      field[i++].value,
      field[i++].value,
    ],
    [
      field[i++].value,
      field[i++].value,
      field[i++].value,
      field[i++].value,
      field[i++].value,
      field[i++].value,
      field[i++].value,
      field[i++].value,
      field[i++].value,
    ],
    [
      field[i++].value,
      field[i++].value,
      field[i++].value,
      field[i++].value,
      field[i++].value,
      field[i++].value,
      field[i++].value,
      field[i++].value,
      field[i++].value,
    ],
    [
      field[i++].value,
      field[i++].value,
      field[i++].value,
      field[i++].value,
      field[i++].value,
      field[i++].value,
      field[i++].value,
      field[i++].value,
      field[i++].value,
    ],
    [
      field[i++].value,
      field[i++].value,
      field[i++].value,
      field[i++].value,
      field[i++].value,
      field[i++].value,
      field[i++].value,
      field[i++].value,
      field[i++].value,
    ],
    [
      field[i++].value,
      field[i++].value,
      field[i++].value,
      field[i++].value,
      field[i++].value,
      field[i++].value,
      field[i++].value,
      field[i++].value,
      field[i++].value,
    ],
  ];

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] != "") {
        if (!valid(board, board[i][j], i, j)) {
          flag = false;
          alert("Please enter value in right position.");
          break;
        }
      }
    }
    if (!flag) break;
  }
  if (flag) {
    if (fill(board, 0, 0)) {
      solution(board);
    } else {
      alert("sudoku is not solvable");
    }
  }
}
function solution(board) {
  document.getElementById("btn1").disabled = true;
  let k = 0;
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      field[k++].value = board[i][j];
    }
  }
}
function valid(board, num, p, q) {
  for (let i = 0; i < 9; i++) {
    if (i != q && board[p][i] == num) return false;
    if (i != p && board[i][q] == num) return false;
  }
  let i = p - (p % 3),
    j = q - (q % 3);
  for (let k = i; k < i + 3; k++) {
    for (let kk = j; kk < j + 3; kk++) {
      if (k != p && kk != q && board[k][kk] == num) return false;
    }
  }
  return true;
}
function fill(board, p, q) {
  if (p == 9) return true;
  if (q == 9) return fill(board, p + 1, 0);
  if (board[p][q] != "") return fill(board, p, q + 1);
  for (let i = "1"; i <= "9"; i++) {
    if (possible(board, i, p, q)) {
      board[p][q] = i;
      if (fill(board, p, q + 1)) return true;
      board[p][q] = "";
    }
  }
  return false;
}
function possible(board, num, p, q) {
  for (let ii = 0; ii < 9; ii++) {
    if (board[p][ii] == num) return false;
    if (board[ii][q] == num) return false;
  }
  let i = p - (p % 3),
    j = q - (q % 3);
  for (let k = i; k < i + 3; k++) {
    for (let kk = j; kk < j + 3; kk++) {
      if (board[k][kk] == num) return false;
    }
  }
  return true;
}
