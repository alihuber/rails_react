# frozen_string_literal: true

require 'rails_helper'

describe 'Index page' do
  it 'has a heading' do
    visit '/'
    expect(page).to have_content('Hello')
  end
end
