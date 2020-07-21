Rails.application.routes.draw do
  root to: 'pages#home'
  get 'portfolio', to: 'pages#portfolio'

  get 'movida', to: 'pages#movida'
  get 'quedem', to: 'pages#quedem'

  get 'colour_translator', to: 'projects#colour_translator'
  get 'euler_spiral', to: 'projects#euler_spiral'
  get 'game_of_life', to: 'projects#game_of_life'
  get 'roman_calculator', to: 'projects#roman_calculator'
  get 'snake', to: 'projects#snake'
  get 'sudoku', to: 'projects#sudoku'

  get 'harki', to: 'puzzles#harki'
  get 'wahnu', to: 'puzzles#wahnu'

  get 'tetris', to: 'projects#tetris'
  resources :tetris_scores, only: [ :index, :new, :create ]

  resources :star_battles, only: [ :index, :show, :new, :create ]
  get 'star_battle', to: 'puzzles#star_battle'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
