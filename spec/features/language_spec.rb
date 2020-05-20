# frozen_string_literal: true

require 'rails_helper'

feature 'language detection' do
  scenario 'default language without any settings' do
    visit main_app.root_path
    click_link 'login_link'

    expect(page).to have_text('Password')
  end

  scenario 'default language (:en) for unkown keys' do
    page.driver.header 'Accept-Language', 'jp'
    visit main_app.root_path
    click_link 'login_link'

    expect(page).to have_text('Password')
  end

  scenario 'second language with set browser header' do
    page.driver.header 'Accept-Language', 'de'
    visit main_app.root_path
    click_link 'login_link'

    expect(page).to have_text('Passwort')
    expect(page).not_to have_text('Password')

    # reset I18n.locale for later tests
    I18n.locale = :de
  end
end
