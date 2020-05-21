# frozen_string_literal: true

require 'resque/server'

Rails.application.routes.draw do
  # other routes
  # get '*page', to: 'index#index', constraints: ->(req) do
  #   !req.xhr? && req.format.html?
  # end
  root 'index#index'

  get    'login'  => 'session#new'
  post   'login'  => 'session#create'
  delete 'logout' => 'session#destroy'

  get 'admin_dashboard' => 'admin#index'

  mount Resque::Server, at: '/jobs', constraints: AdminConstraint
end
