Rails.application.routes.draw do
  root to: 'pages#home'
  get 'portfolio', to: 'pages#portfolio'

  get 'tetris', to: 'projects#tetris'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
