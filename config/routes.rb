Rails.application.routes.draw do
  # other routes
  # get '*page', to: 'static#index', constraints: ->(req) do
  #   !req.xhr? && req.format.html?
  # end
  root 'static#index'
end
