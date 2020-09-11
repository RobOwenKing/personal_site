const template = {
  name: "Template",
  description: "xxx",
  strings: [
    [
      "Test one",
      "Test two"
    ],
    [
      "Test three"
    ]
  ],
  matches: [
    ["Test"],
    ["Tes"]
  ]
};

const hello_world = {
  name: "Hello World!",
  description: "xxx",
  strings: [
    [
      "Hello, World!",
      "Hello world",
      "HELLO WORLD!"
    ],
    [
      "Hi, World!",
      "Hello, World."
    ]
  ],
  matches: [
    ["Hello, World!"],
    ["Hello world"],
    ["HELLO WORLD!"]
  ]
};

const ordinals = {
  name: "Second things second",
  description: "Match ordinal numbers ???",
  strings: [
    [
      "1st, 2nd, 3rd, 4th",
      "21ST ANNUAL REGEX FESTIVAL",
      "Tenth is also written 10th."
    ],
    [
      "101 Kleene St",
      "My super secret password: 1starwarsmovie"
    ]
  ],
  matches: [
    ["1st", "2nd", "3rd", "4th"],
    ["21ST"],
    ["10th"]
  ]
};

const regex = {
  name: "Regex-ception",
  description: "Trying to write a regex pattern to match any well-formed regex runs into problems of recursion and nesting. Instead, this challenge is to match a small number of well-formed regex and catch a few simple issues.",
  strings: [
    [
      "/(regex)/",
      "/colou?r/",
      "/\\d+/"
    ],
    [
      "/slash\\/",
      "/empty()/"
    ]
  ],
  matches: [
    ["/(regex)/"],
    ["/colou?r/"],
    ["/\\d+/"]
  ]
};

export const challenges = [hello_world, regex, ordinals];
