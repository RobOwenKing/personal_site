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
    [50, 50],
    [50, 50]
  ],
  yMargin: 0,
  xOffset: 0
};

const sPiece = {
  piece: [
    ['.', 100, 100],
    [100, 100, '.'],
    ['.', '.', '.']
  ],
  yMargin: 0,
  xOffset: 1
};

const zPiece = {
  piece: [
    [150, 150, '.'],
    ['.', 150, 150],
    ['.', '.', '.']
  ],
  yMargin: 0,
  xOffset: 1
};

const lPiece = {
  piece: [
    [200, '.', '.'],
    [200, '.', '.'],
    [200, 200, '.']
  ],
  yMargin: 0,
  xOffset: 1
};

const jPiece = {
  piece: [
    ['.', '.', 250],
    ['.', '.', 250],
    ['.', 250, 250]
  ],
  yMargin: 0,
  xOffset: 1
};

const iPiece = {
  piece: [
    ['.', 300, '.', '.'],
    ['.', 300, '.', '.'],
    ['.', 300, '.', '.'],
    ['.', 300, '.', '.']
  ],
  yMargin: 0,
  xOffset: 1
};

// 60, 120, 240, 280, 320

const pieces = [tPiece, oPiece, sPiece, zPiece, lPiece, jPiece, iPiece];

export { pieces };
