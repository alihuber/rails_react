# frozen_string_literal: true

class IndexController < ApplicationController
  def index
    return redirect_to admin_dashboard_path if admin_signed_in?

    # TODO:
    # if user_signed_in?
    #   return redirect_to root_path
    # end
  end
end
