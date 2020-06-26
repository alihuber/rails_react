# frozen_string_literal: true

class AdminController < ApplicationController
  before_action :login_admin
  protect_from_forgery except: [:destroy]

  def index
    users = Users::ListUsers.run!
    @users = users.map { |u| JSON.parse(u.to_builder.target!) }
  end

  def create
    outcome = Users::CreateUser.run(params[:user])
    if outcome.valid?
      render json: { success: true }, status: 200
    else
      render json: { error: outcome.errors }, status: 422
    end
  end

  def destroy
    outcome = Users::DeleteUser.run(params)
    if outcome.valid?
      render json: { success: true }, status: 200
    else
      render json: { error: outcome.errors }, status: 422
    end
  end
end
