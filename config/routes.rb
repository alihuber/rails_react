Rails.application.routes.draw do
  root 'pages#index'

  namespace :api, defaults: { format: 'json' } do
    resources :collections, only: %i[index create]
  end

  match '*path', to: 'pages#index', via: :all
end
