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

- `docker-compose up` will start postgres, user: postgres, pw: postgres
- `rails db:create`
- `rails db:migrate`
- `./bin/webpack-dev-server`
- `rails s`
