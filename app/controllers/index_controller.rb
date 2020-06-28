# frozen_string_literal: true

class IndexController < ApplicationController
  before_action :login_user, only: :user_dashboard

  def index
    return redirect_to admin_dashboard_path if admin_signed_in?

    return redirect_to user_dashboard_path if user_signed_in?
  end

  def user_dashboard; end
end
