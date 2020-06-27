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
  post 'users',         to: 'admin#create',  defaults: { format: 'json' }
  put 'user/id/:id',    to: 'admin#update',  defaults: { format: 'json' }
  delete 'user/id/:id', to: 'admin#destroy', defaults: { format: 'json' }

  mount Resque::Server, at: '/jobs', constraints: AdminConstraint
end
