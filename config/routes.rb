Rails.application.routes.draw do
  root to: 'pages#home'
  get 'portfolio', to: 'pages#portfolio'

  get 'movida', to: 'pages#movida'
  get 'quedem', to: 'pages#quedem'

  get 'capitals_quiz', to: 'projects#capitals_quiz'
  get 'circles', to: 'projects#circles'
  get 'clocks', to: 'projects#clocks'
  get 'colour_translator', to: 'projects#colour_translator'
  get 'euler_spiral', to: 'projects#euler_spiral'
  get 'flags_quiz', to: 'projects#flags_quiz'
  get 'game_of_life', to: 'projects#game_of_life'
  get 'gaps', to: 'projects#gaps'
  get 'money', to: 'projects#money'
  get 'recamans', to: 'projects#recaman'
  get 'regex_challenges', to: 'projects#regex'
  get 'roman_calculator', to: 'projects#roman_calculator'
  get 'rose', to: 'projects#rose'
  # get 'snake', to: 'projects#snake'
  get 'sudoku', to: 'projects#sudoku'
  get 'transitions', to: 'projects#transitions'

  get 'akari', to: 'puzzles#akari'
  get 'harki', to: 'puzzles#harki'
  get 'hip', to: 'puzzles#hip'
  get 'prime_pairs', to: 'puzzles#prime_pairs'
  get 'wahnu', to: 'puzzles#wahnu'

  get 'tetris', to: 'projects#tetris'
  resources :tetris_scores, only: [ :index, :new, :create ]

  resources :star_battles, only: [ :index, :show, :new, :create ]
  get 'star_battle', to: 'puzzles#star_battle'

  resources :map_quizzes, only: [ :index, :show, :new, :create ]
  resources :name_quizzes, only: [ :index, :show ]

  get "/crosswords/:crossword", to: "crosswords#show"
  get "crosswords", to: 'projects#crosswords'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
