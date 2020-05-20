# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include AuthenticationConcern
  protect_from_forgery with: :exception

  before_action :set_locale

  private

  def set_locale
    available = %w[en de]
    I18n.locale =
      http_accept_language.compatible_language_from(available)
  end
end
