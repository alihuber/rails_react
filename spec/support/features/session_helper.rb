# frozen_string_literal: true

module Features
  module SessionHelpers
    def login(user)
      visit login_path
      fill_in 'session_create_session_login_email',    with: user.email
      fill_in 'session_create_session_login_password', with: user.password
      click_button 'submit_login'
    end

    def logout
      click_link 'logout_link'
    end
  end
end
