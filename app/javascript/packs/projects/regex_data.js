const template = {
  name: "Template",
  value: "value",
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

const helloWorld = {
  name: "Hello World!",
  value: "hello-world",
  description: "Let's refresh the basics. Here are three strings to match and two to avoid matching. Enter your expression and flags below.",
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
  value: "ordinals",
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

const catalan = {
 name: "It's all Catalan to me",
 value: "catalan",
 description: "In this challenge, you have to match words which include letters not part of the ???",
  strings: [
    [
      "Català",
      "Test two"
    ],
    [
      "Castell",
      "Setze jutges d'un jutjat"
    ]
  ],
  matches: [
    ["Test"],
    ["Tes"]
  ]
};

const regex = {
  name: "Regex-ception",
  value: "regex-ception",
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

export const challenges = [helloWorld, ordinals, catalan, regex];
