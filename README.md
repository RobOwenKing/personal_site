 Welcome to the Github repo for my personal website! Check out the site itself at [robowenking.com](http://www.robowenking.com).

## My Stack

This website is built with a Rails backend and a PostgreSQL database (when I've needed a db). The front-end is (so far) plain HTML, vanilla JavaScript and Sass.

## What's on the site

There's a whole load of browser-based toys and tools, plus links to projects I have hosted elsewhere. Below are a few highlights, plus links to the most important code on GitHub.

[**Patterns in the Hanzi**](http://www.robowenking.com/hanzi_patterns) - [code](https://github.com/RobOwenKing/react_hanzi_patterns)

One of my first React apps, it allows users to explore a wide range of data relating to Hanzi (Chinese characters).

[**Colour Translator**](http://www.robowenking.com/colour_translator) - [js](https://github.com/RobOwenKing/personal_site/tree/master/app/javascript/packs/projects/colour_translator), [colour_translator.html.erb](https://github.com/RobOwenKing/personal_site/blob/master/app/views/projects/colour_translator.html.erb)

Convert between RGB, HSL and Hex colours. Explore the colour space and see how the different formats relate to each other.

[**Roman Numerals Calculator**](http://www.robowenking.com/roman_calculator) - [roman_calculator.js](https://github.com/RobOwenKing/personal_site/blob/master/app/javascript/packs/projects/roman_calculator.js), [roman_calculator.html.erb](https://github.com/RobOwenKing/personal_site/blob/master/app/views/projects/roman_calculator.html.erb)

A project I built entirely by myself before starting my development bootcamp. It's a calculator (addition, subtraction, multiplication, etc) using Roman numerals. Easy as I, II, III...

[**Tetr-ish**](http://www.robowenking.com/tetris) - [tetris.js](https://github.com/RobOwenKing/personal_site/blob/master/app/javascript/packs/projects/tetris.js), [tetris_pieces.js](https://github.com/RobOwenKing/personal_site/blob/master/app/javascript/packs/projects/tetris_pieces.js), [tetris.html.erb](https://github.com/RobOwenKing/personal_site/blob/master/app/views/projects/tetris.html.erb), [tetris_scores_controller.rb](https://github.com/RobOwenKing/personal_site/blob/master/app/controllers/tetris_scores_controller.rb)

It's Tetris with a couple of minor tweaks using the HTML5 Canvas. There's also an online leaderboard players can submit their scores to.

[**Game of Life**](http://www.robowenking.com/game_of_life) - [game_of_life.js](https://github.com/RobOwenKing/personal_site/blob/master/app/javascript/packs/projects/game_of_life.js), [game_of_life_pieces.js](https://github.com/RobOwenKing/personal_site/blob/master/app/javascript/packs/projects/game_of_life_pieces.js), [game_of_life.html.erb](https://github.com/RobOwenKing/personal_site/blob/master/app/views/projects/game_of_life.html.erb)

Yet another HTML5 Canvas implementation of Conway's Game of Life. I use colour to represent the age of cells and provide a whole bunch of built-in patterns for users to place in the grid.

## Setup

Current requirements: Ruby 2.6.6 and Rails 5.2.6.3

To run a local version of the site (for testing or development):

1. Clone this repo: `gh repo clone RobOwenKing/personal_site`
2. Run `bundle install` to install all dependencies
3. Setup the database with `rake db:create` and `rake db:migrate`


## Tests

Tests are found in /test (not /spec). They can be run with `rake spec`.
