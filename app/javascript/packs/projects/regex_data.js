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
  description: "Welcome to my Regex Challenges. So you've learnt the basics of regex somewhere like <a href='https://regexone.com/'>regexone.com</a>, right? You know they're important, you've got a bit of a feel for them, but you also know you need some more practice. That's where I was a couple of weeks ago when I decided to build these challenges.<div>They start easier and get harder. You get a tick for each string when you get the described match(es), but that's not required to move on. Skip a challenge if you want, or stay on one and experiment some more. Note: this is built in Javascript, but I've tried to make sure the challenges can be answered with implementation-independent expressions.</div><div>First, let's refresh the basics. Here are three strings to match and two to avoid matching. Enter your expression and flags below.</div>",
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
  description: "Match the ordinal numbers below when written with numerals. So, for example, the first string should have matches ['1st', '2nd', '3rd', '4th'] and the third should just match '10th'.",
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
  description: "In this challenge, you have to match words which include letters not part of the ISO Basic Latin Alphabet (the 26 letters of the English alphabet). So the first string should match 'Català', the second 'Força', etc.",
  strings: [
    [
      "Català",
      "Força, equilibri, valor i seny",
      "L'any 2016 vam dir 'adéu' a molts diacrítics"
    ],
    [
      "Som-hi",
      "16 jutges d'un jutjat"
    ]
  ],
  matches: [
    ["Català"],
    ["Força"],
    ["adéu", "diacrítics"]
  ]
};

const roman = {
  name: "Easy as I, II, III",
  value: "roman",
  description: "Can you match these well-formed <a href='https://en.wikipedia.org/wiki/Roman_numerals'>Roman numerals</a> and avoid the incorrect examples?",
  strings: [
    [
      "III",
      "XLII",
      "MMXX",
      "MDCCXXIX"
    ],
    [
      "MMXXA",
      "IXI",
      "ID"
    ]
  ],
  matches: [
    ["III"],
    ["XLII"],
    ["MMXX"],
    ["MDCCXXIX"]
  ]
}

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

export const challenges = [helloWorld, ordinals, catalan, roman, regex];
