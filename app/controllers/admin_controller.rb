# frozen_string_literal: true

class AdminController < ApplicationController
  before_action :login_admin

  def index; end
end
