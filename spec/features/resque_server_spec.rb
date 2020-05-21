# frozen_string_literal: true

require 'rails_helper'

feature 'resque jobs url' do
  let(:user)       { create :user }
  let(:admin_user) { create :admin_user }

  scenario 'not visible with no user' do
    visit('jobs')
  rescue StandardError => e
    expect(e.class).to eq ActionController::RoutingError
    expect(e.message).to eq 'No route matches [GET] "/jobs"'
  end

  scenario 'not visible with non-admin user' do
    login(user)
    visit('jobs')
  rescue StandardError => e
    expect(e.class).to eq ActionController::RoutingError
    expect(e.message).to eq 'No route matches [GET] "/jobs"'
  end

  scenario 'visible with admin user' do
    login(admin_user)
    visit('jobs')
    expect(page).to have_text 'resque'
  end
end
