# frozen_string_literal: true

class AdminController < ApplicationController
  before_action :login_admin

  def index
    users = Users::ListUsers.run!
    @users = users.map { |u| JSON.parse(u.to_builder.target!) }
  end
end
