 Welcome to the Github repo for my personal website! Check out the site itself at [robowenking.com](http://www.robowenking.com).

## My Stack

This website is built with a Rails backend and a PostgreSQL database (when I've needed a db). The front-end is (so far) plain HTML, vanilla JavaScript and Sass.

## What's on the site

There's a whole load of browser-based toys and tools. Below are links to some of them, plus their main code.

[**Tetr-ish**](http://www.robowenking.com/tetris) - [tetris.js](https://github.com/RobOwenKing/personal_site/blob/master/app/javascript/packs/projects/tetris.js), [tetris_pieces.js](https://github.com/RobOwenKing/personal_site/blob/master/app/javascript/packs/projects/tetris_pieces.js), [tetris.html.erb](https://github.com/RobOwenKing/personal_site/blob/master/app/views/projects/tetris.html.erb), [tetris_scores_controller.rb](https://github.com/RobOwenKing/personal_site/blob/master/app/controllers/tetris_scores_controller.rb)

It's Tetris with a couple of minor tweaks using the HTML5 Canvas. There's also an online leaderboard players can submit their scores to.

[**Game of Life**](http://www.robowenking.com/game_of_life) - [game_of_life.js](https://github.com/RobOwenKing/personal_site/blob/master/app/javascript/packs/projects/game_of_life.js), [game_of_life_pieces.js](https://github.com/RobOwenKing/personal_site/blob/master/app/javascript/packs/projects/game_of_life_pieces.js), [game_of_life.html.erb](https://github.com/RobOwenKing/personal_site/blob/master/app/views/projects/game_of_life.html.erb)

Yet another HTML5 Canvas implementation of Conway's Game of Life. I use colour to represent the age of cells and provide a whole bunch of built-in patterns for users to place in the grid.

##Tests

Tests are in /test (not /spec). They can be run with  `rake spec`.
