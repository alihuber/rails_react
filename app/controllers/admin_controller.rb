# frozen_string_literal: true

class AdminController < ApplicationController
  before_action :login_admin

  def index; end

  def list
    users = Users::ListUsers.run!
    usersjson = users.map { |u| JSON.parse(u.to_builder.target!) }
    render json: { users: usersjson }, status: 200
  end

  def update
    user = Users::FindUser.run(params)
    return head 404 unless user.valid?

    inputs = { user: user.result }
             .reverse_merge(email: params[:email], password: params[:password] || '')
    outcome = Users::AdminUpdateUser.run(inputs)
    if outcome.valid?
      user = outcome.result if outcome.valid?
      render json: { user:
        { id: user.id,
          type: user.type,
          email: user.email,
          createdAt: user.created_at,
          updatedAt: user.updated_at } }, status: 200
    else
      render json: { error: outcome.errors }, status: 422
    end
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
