# frozen_string_literal: true

module Users
  class CreateUser < ActiveInteraction::Base
    string :email, :password

    validates :email,    presence: true
    validates :password, length: { minimum: 6 }

    def execute
      # for now, only non-admin users are createable
      user            = User.new(email: email, password: password)
      user.type       = User.to_s
      user.auth_token = SecureRandom.urlsafe_base64(24)
      user.save ? user : errors.merge!(user.errors)
    end
  end
end
