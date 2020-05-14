# frozen_string_literal: true

Rails.application.routes.draw do
  # other routes
  # get '*page', to: 'static#index', constraints: ->(req) do
  #   !req.xhr? && req.format.html?
  # end
  root 'static#index'

  get    'login'  => 'session#new'
  post   'login'  => 'session#create'
  delete 'logout' => 'session#destroy'
end
