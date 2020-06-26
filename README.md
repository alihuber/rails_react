# README

## Setup

- Clone this repo
- `bundle install`
- `rails webpacker:install`
- `rails webpacker:install:react`
- `rails generate react:install`
- `yarn install`
- `rails generate rspec:install`
- Fix solargraph setup in editor, set bin path to ~/.rvm/gems/ruby-2.6.5@rails6/bin/solargraph
- Postgres master password: root

## Start servers

- `docker-compose up` will start postgres (user: postgres, pw: postgres) and redis
- `rails db:create`
- `rails db:migrate`
- (`./bin/webpack-dev-server`)
- `rails s`
- access from local network: `rails s -b 0.0.0.0`

## Background workers

- `VERBOSE=true QUEUE=* rake environment resque:work` starts resque worker process
- `VERBOSE=true rake environment resque:scheduler` starts resque scheduler


## Assets/Webpacker setup

- [webpacker-bootstrap-rails6](https://medium.com/@adrian_teh/ruby-on-rails-6-with-webpacker-and-bootstrap-step-by-step-guide-41b52ef4081f)
- Test production mode:
  - `$ rake secret`, copy output
  - `$ SECRET_KEY_BASE=<output> RAILS_ENV=production RAILS_SERVE_STATIC_FILES=true NODE_ENV=production rake assets:precompile`
  - `$ SECRET_KEY_BASE=<output> RAILS_ENV=production RAILS_SERVE_STATIC_FILES=true NODE_ENV=production rails s`
