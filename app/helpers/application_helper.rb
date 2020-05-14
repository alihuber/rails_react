# frozen_string_literal: true

module ApplicationHelper
  def login_link
    link_to t('helpers.login_link'),
            login_path, id: 'login_link'
  end

  def logout_link
    link_to t('helpers.logout_link'),
            logout_path, method: :delete,
                         id: 'logout_link'
  end
end
