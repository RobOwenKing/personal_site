const tPiece = {
  piece: [
    ['.', '.', '.'],
    [0, 0, 0],
    ['.', 0, '.']
  ],
  yMargin: 1,
  xOffset: 1
};

const oPiece = {
  piece: [
    [30, 30],
    [30, 30]
  ],
  yMargin: 0,
  xOffset: 0
};

const sPiece = {
  piece: [
    ['.', 60, 60],
    [60, 60, '.'],
    ['.', '.', '.']
  ],
  yMargin: 0,
  xOffset: 1
};

const zPiece = {
  piece: [
    [120, 120, '.'],
    ['.', 120, 120],
    ['.', '.', '.']
  ],
  yMargin: 0,
  xOffset: 1
};

const lPiece = {
  piece: [
    [240, '.', '.'],
    [240, '.', '.'],
    [240, 240, '.']
  ],
  yMargin: 0,
  xOffset: 1
};

const jPiece = {
  piece: [
    ['.', '.', 260],
    ['.', '.', 260],
    ['.', 260, 260]
  ],
  yMargin: 0,
  xOffset: 1
};

const iPiece = {
  piece: [
    ['.', 285, '.', '.'],
    ['.', 285, '.', '.'],
    ['.', 285, '.', '.'],
    ['.', 285, '.', '.']
  ],
  yMargin: 0,
  xOffset: 1
};

// 60, 120, 240, 280, 320

const pieces = [tPiece, oPiece, sPiece, zPiece, lPiece, jPiece, iPiece];

export { pieces };
