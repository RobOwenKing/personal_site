Rails.application.routes.draw do
  root to: 'pages#home'
  get 'portfolio', to: 'pages#portfolio'

  get 'baihei', to: 'projects#baihei'
  get 'colour_translator', to: 'projects#colour_translator'
  get 'euler_spiral', to: 'projects#euler_spiral'
  get 'game_of_life', to: 'projects#game_of_life'
  get 'roman_calculator', to: 'projects#roman_calculator'
  get 'snake', to: 'projects#snake'
  get 'sudoku', to: 'projects#sudoku'
  get 'tetris', to: 'projects#tetris'
  resources :tetris_scores, only: [ :index, :new, :create ]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
