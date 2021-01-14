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
  description: "<p>Welcome to my Regex Challenges. So you've learnt the basics of regex somewhere like <a href='https://regexone.com/'>regexone.com</a> and now you want a bit more practice? Great! That's where I was when I decided to build these challenges. They are not about straight-laced real-world use cases and best practices, instead they are for you to play and explore.</p><p>They are roughly ordered from easier to harder. You get a tick for each string when you get the described match(es), but that's not required to move on. Skip a challenge if you want, or stay on one and experiment some more. Note: this is built using the Javascript regular expression engine and <a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/@@match'>.match()</a>.</p><p>First, let's refresh the basics. Here are three strings to match and two to avoid matching. Enter your expression and flags below.</p>",
  strings: [
    [
      "Hello, World!",
      "Hello, world?",
      "HELLO WORLD!"
    ],
    [
      "Hi, World!",
      "Hello, World."
    ]
  ],
  matches: [
    ["Hello, World!"],
    ["Hello, world?"],
    ["HELLO WORLD!"]
  ],
  solution: /hello,? world(!|\?)/i
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
  ],
  solution: /\d+(st|nd|rd|th)\b/ig
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
  ],
  solution: /\w*[àéíç]\w*/gi
};

const roman = {
  name: "Easy as I, II, III",
  value: "roman",
  description: "Can you match these well-formed <a href='https://en.wikipedia.org/wiki/Roman_numerals#Standard_form'>Roman numerals</a> and avoid the incorrect examples?",
  strings: [
    [
      "XLII",
      "MMXX",
      "MDCCXIV",
      "Episode VIII: The Last Jedi"
    ],
    [
      "MMXXA",
      "IXI",
      "ID",
      "LIVE"
    ]
  ],
  matches: [
    ["III"],
    ["XLII"],
    ["MMXX"],
    ["MDCCXXIX"]
  ],
  solution: /\bM{0,3}(C[MD]|D?C{0,3})?(X[CL]|L?X{0,3})?(I[XV]|V?I{0,3})?\b/g
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
  ],
  solution: /\/[\(\\]?[\w\?]+[\)\+]?\//gi
};

const titles = {
  name: "I'm not great at titles",
  value: "titles",
  description: "Refactoring. Love it or hate it, it's a fact of coding. Even regular expressions. Try and match these titles ('Dr.', 'Mr', 'Mrs', 'Miss', 'Fr.'), and think about the different ways you can tackle this and the pros and cons of each.",
  strings: [
    [
      "Dr. Jill Biden",
      "Mr and Mrs Bun, the Bakers",
      "Miss Piggy",
      "Fr. Ted"
    ],
    [
      "Ar.",
      "Mississippi",
      "Drs"
    ],
  ],
  matches: [
    ["Dr."],
    ["Mr", "Mrs"],
    ["Miss"],
    ["Fr."]
  ],
  solution: /([fd]r|mrs?|miss)(\.|\b)/gi
};

const snowclones = {};

const comments = {
  name: "// Comments",
  value: "comments",
  description: "",
  strings: [
    [
      "// Single-line comment",
      "/* Multi-line\ncomment */",
      "const id = 2 // End of line comment"
    ],
    [
      "/regex/",
      "/* Have you made this typo before too? /*",
      "/* Multi-line comments\nneed closing..."
    ]
  ],
  matches: [
      ["// Single-line comment"],
      ["/* Multi-line\ncomment */"],
      ["// End of line comment"]
    ],
  solution: /\/(\/[\w\s\-]+|\*[\w\s\-]+\*\/)/
};

const attributes = {};

export const challenges = [helloWorld, ordinals, catalan, titles, comments, roman, regex];
