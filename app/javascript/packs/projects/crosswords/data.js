const first = {
  name: "first",
  size: [13, 13],
  solution: [
    "......R......",
    ".....FUN.....",
    "....SALES....",
    "...RECEIPT...",
    "..MERE.FARM..",
    ".DOVE...RAIL.",
    "MORE.....DRAW",
    ".HARD...TIED.",
    "..LION.SAND..",
    "...EVENING...",
    "....EVADE....",
    ".....ARE.....",
    "......D......"
  ],
  aQs: [
    ["FUN", "FUN (written in original grid)", 1, 5],
    ["SALES", "What bargain hunters enjoy", 2, 4],
    ["RECEIPT", "A written acknowledgment", 3, 3],
    ["MERE", "Such and nothing more", 4, 2],
    ["FARM", "To cultivate", 4, 7],
    ["DOVE", "A bird", 5, 1],
    ["RAIL", "A bar of wood or iron", 5, 8],
    ["MORE", "Opposed to less", 6, 0],
    ["DRAW", "What artists learn to do", 6, 9],
    ["HARD", "What this puzzle is", 7, 1],
    ["TIED", "Fastened", 7, 8],
    ["LION", "An animal of prey", 8, 2],
    ["SAND", "Found on the seashore", 8, 7],
    ["EVENING", "The close of day", 9, 3],
    ["EVADE", "To elude", 10, 4],
    ["ARE", "The plural of is", 11, 5]
  ],
  dQs: [
    ["RULE", "To govern", 0, 6],
    ["FACE", "Part of your head", 1, 5],
    ["NEIF", "A fist", 1, 7],
    ["SERE", "A talon", 2, 4],
    ["SPAR", "Part of a ship", 2, 8],
    ["REVERIE", "A day dream", 3, 3],
    ["TRADING", "Exchanging", 3, 9],
    ["MORAL", "What we all should be", 4, 2],
    ["MIRED", "To sink in mud", 4, 10],
    ["DOH", "The fibre of the gomuti plant", 5, 1],
    ["LAD", "A boy", 5, 11],
    ["DOVE", "A pigeon", 7, 4],
    ["TANE", "One", 7, 8],
    ["NEVA", "A river in Russia", 8, 5],
    ["SIDE", "To agree with", 8, 7],
    ["NARD", "An aromatic plant", 9, 6]
  ]
};

const tribute = {
  name: "tribute",
  size: [13, 13],
  solution: [
    "......J......",
    ".....FUN.....",
    "....BIDEN....",
    "...TREETOP...",
    "..PIAF.SELF..",
    ".ARTS...SAID.",
    "IDEA.....GRID",
    ".SYNC...MUSE.",
    "..SILK.MOET..",
    "...CAESARS...",
    "....WYNNE....",
    ".....SOS.....",
    "......B......"
  ],
  aQs: [
    ["FUN", "What this puzzle is (hopefully)", 1, 5],
    ["BIDEN", "Ice-cream fan from Scranton, PA", 2, 4],
    ["TREETOP", "Part of a canopy", 3, 3],
    ["PIAF", "'La Vie En Rose' singer", 4, 2],
    ["SELF", "???", 4, 7],
    ["ARTS", "???", 5, 1],
    ["SAID", "???", 5, 8],
    ["IDEA", "<i class='far fa-lightbulb'></i>", 6, 0],
    ["GRID", "???", 6, 9],
    ["SYNC", "???", 7, 1],
    ["MUSE", "???", 7, 8],
    ["SILK", "???", 8, 2],
    ["MOET", "???", 8, 7],
    ["CAESARS", "Tsars and Kaisers, etymologically speaking", 9, 3],
    ["WYNNE", "???", 10, 4],
    ["SOS", "Dit dit dit. Dah dah dah. Dit dit dit.", 11, 5]
  ],
  dQs: [
    ["JUDE", "Paul told him to 'take a sad song and make it better'", 0, 6],
    ["FIEF", "", 1, 5],
    ["NETS", "???", 1, 7],
    ["BRAS", "", 2, 4],
    ["NOES", "", 2, 8],
    ["TITANIC", "", 3, 3],
    ["PLAGUES", "Hounds", 3, 9],
    ["PREYS", "Hounds", 4, 2],
    ["FIRST", "Cliched Youtube comment", 4, 10],
    ["ADS", "Spots", 5, 1],
    ["DIE", "", 5, 11],
    ["CLAW", "A talon", 7, 4],
    ["MORE", "", 7, 8],
    ["KEYS", "", 8, 5],
    ["MANS", "", 8, 7],
    ["SNOB", "", 9, 6]
  ]
};

export const puzzles = [first, tribute];
