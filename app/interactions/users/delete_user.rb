# frozen_string_literal: true

module Users
  class DeleteUser < ActiveInteraction::Base
    integer :id

    def execute
      user = User.find_by_id(id)

      if user
        user.destroy
      else
        errors.add(:id, 'does not exist')
      end
    end
  end
end
