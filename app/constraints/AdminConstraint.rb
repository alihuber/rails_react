# frozen_string_literal: true

class AdminConstraint
  def self.matches?(request)
    user = User.find_by(auth_token: request.cookies['auth_token'])
    user&.admin?
  end
end
