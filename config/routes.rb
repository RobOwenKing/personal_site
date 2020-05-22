Rails.application.routes.draw do
  root to: 'pages#home'
  get 'portfolio', to: 'pages#portfolio'

  get 'game-of-life', to: 'projects#game_of_life'
  get 'tetris', to: 'projects#tetris'
  resources :tetris_scores, only: [ :index, :new, :create ]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
