# frozen_string_literal: true

class SessionController < ApplicationController
  skip_before_action :verify_authenticity_token, only: :destroy
  # fix for mobile safari to request the page before submitting it to
  # prevent ActionController::InvalidAuthenticityToken exceptions
  rescue_from ActionController::InvalidAuthenticityToken, with: :warn_session_reset

  def new
    @form = Session::CreateSession.new
  end

  def create
    login_form = Session::CreateSession.run(
      params[:session_create_session_login]
    )
    if login_form.valid?
      login!(login_form.user, remember_me: login_form.remember_me)
      flash[:notice] = t('flash.user.session.create.success')
      redirect_to redirect_url_from_session || redirect_url
    else
      flash.now[:alert] = t('flash.user.session.create.failure')
      @form = login_form
      render 'new'
    end
  end

  def destroy
    logout!
    flash[:notice] = t('flash.user.session.destroy.success')
    redirect_to main_app.root_path
  end

  private

  def redirect_url_from_session
    session.delete(:redirect_url_after_login)
  end

  def redirect_url
    main_app.root_path
  end

  def warn_session_reset
    redirect_back(
      fallback_location: main_app.root_path,
      alert: 'We had to block your login attempt because your session has '\
      'expired. Please try again.'
    )
  end
end
