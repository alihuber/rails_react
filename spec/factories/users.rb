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
FactoryBot.define do
  factory :user, class: User do
    email      { Faker::Internet.email }
    password   { Faker::Internet.password }
    auth_token { SecureRandom.urlsafe_base64(24) }
    type       { "User" }

    factory :admin_user, class: User::AdminUser do
      type  { "User::AdminUser" }
    end
  end
end
