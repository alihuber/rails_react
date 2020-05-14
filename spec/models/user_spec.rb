# == Schema Information
#
# Table name: users
#
#  id                     :bigint           not null, primary key
#  auth_token             :string
#  email                  :string
#  password_digest        :string
#  password_reset_sent_at :datetime
#  password_reset_token   :string
#  type                   :string
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#
# Indexes
#
#  index_users_on_auth_token            (auth_token) UNIQUE
#  index_users_on_email                 (email) UNIQUE
#  index_users_on_password_reset_token  (password_reset_token) UNIQUE
#
require "rails_helper"


describe User do
  let(:user)       { create :user }
  let(:admin_user) { create :admin_user }

  it "has a valid factory" do
    expect(user).to be_valid
  end

  it "has admin flags" do
    expect(user.admin?).to be false
    expect(admin_user.admin?).to be true
  end
end
