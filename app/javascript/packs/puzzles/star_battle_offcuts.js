const solve = (i, j) => {
  for (let k = i; k < size.value; k += 1) {
    if (starPossible(k, j)) {
      answerBoard[j][k] = 1;
      if (numStarsInRow(j) == stars.value) {
        if ((k == size.value - 1) && (j == size.value - 1)) {
          drawSolution();
          return true;
        } else if (solve(0, j + 1)) {
          return true;
        }
      } else if (k < size.value - 1) {
        if (solve(k + 1, j)) {
          return true;
        }
      } else { return false; }
      answerBoard[j][k] = 0;
    }
    if (numStarsInRow(j) == stars.value) {
      if ((k == size.value - 1) && (j == size.value - 1)) {
        drawSolution();
        return true;
      } else if (solve(0, j + 1)) {
        return true;
      }
    } else if (k < size.value - 1) {
      if (solve(k + 1, j)) {
        return true;
      }
    } else { return false; }
  }
};

const solve = (i, j) => {
  console.log(`${i}, ${j}`);
  if (starPossible(i, j)) {
    answerBoard[j][i] = 1;
  }
  // if (i > size.value - 1) {
  //   return false;
  // }
  if (i == size.value - 1) {
    if (numStarsInRow(j) == stars.value) {
      if (j == size.value - 1) {
        drawSolution();
        return true;
      } else {
        console.log("Next row 1");
        if (solve(0, j + 1)) { return true; }
      }
    } else {
      return false;
    }
  } else {
    return solve(i + 1, j);
  }
  answerBoard[j][i] = 0;
  if (i == size.value - 1) {
    if (numStarsInRow(j) == stars.value) {
      if (j == size.value - 1) {
        drawSolution();
        return true;
      } else {
        console.log("Next row 2");
        if (solve(0, j + 1)) { return true; }
      }
    } else {
      return false;
    }
  } else {
    return solve(i + 1, j);
  }
};

const solve = (i, j) => {
  if (starPossible(i, j)) {
    answerBoard[j][i] = 1;
    if (i == size.value - 1) {
      if (numStarsInRow(j) == stars.value) {
        if (j == size.value - 1) {
          drawSolution();
          console.log("1");
          return true;
        } else {
          if (solve(0, j + 1)) {
            console.log("2");
            return true;
          }
        }
      } else {
        console.log("3");
        return false;
      }
    } else {
      if (solve(i + 1, j)) {
        console.log("4");
        return true;
      };
    }
    answerBoard[j][i] = 0;
  }
  if (i == size.value - 1) {
    if (numStarsInRow(j) == stars.value) {
      if (j == size.value - 1) {
        drawSolution();
        console.log("5");
        return true;
      } else {
        if (solve(0, j + 1)) {
          console.log("6");
          return true;
        }
      }
    } else {
      console.log("7");
      return false;
    }
  } else {
    if (solve(i + 1, j)) {
      console.log("8");
      return true;
    };
  }
};
