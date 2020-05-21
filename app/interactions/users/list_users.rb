# frozen_string_literal: true

module Users
  class ListUsers < ActiveInteraction::Base
    def execute
      User.all
    end
  end
end
