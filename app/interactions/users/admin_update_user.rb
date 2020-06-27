# frozen_string_literal: true

module Users
  class AdminUpdateUser < ActiveInteraction::Base
    object :user,  class: User
    string :email, :password

    validates :password, length: { minimum: 8 }, allow_blank: true

    def execute
      user.email = email if email? && !email.blank?
      user.password = password if password? && !password.blank?

      user.save ? user : errors.merge!(user.errors)
    end
  end
end
