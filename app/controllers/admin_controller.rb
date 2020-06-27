# frozen_string_literal: true

class AdminController < ApplicationController
  before_action :login_admin
  protect_from_forgery except: %i[destroy create]

  def index
    users = Users::ListUsers.run!
    @users = users.map { |u| JSON.parse(u.to_builder.target!) }
  end

  def create
    outcome = Users::CreateUser.run(
      email: params[:email],
      password: params[:password],
      admin: params[:admin] || false
    )
    if outcome.valid?
      new_user = outcome.result
      render json: { user:
        { id: new_user.id,
          type: new_user.type,
          email: new_user.email,
          createdAt: new_user.created_at,
          updatedAt: new_user.updated_at } }, status: 200
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
