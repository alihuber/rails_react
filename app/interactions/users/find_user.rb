# frozen_string_literal: true

module Users
  class FindUser < ActiveInteraction::Base
    integer :id

    def execute
      user = User.find_by_id(id)

      user || errors.add(:id, 'does not exist')
    end
  end
end
