# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts 'Seeding Admin'

User::AdminUser.create!(
  email: 'test@admin.de',
  password: 'admin123',
  type: 'User::AdminUser',
  auth_token: SecureRandom.urlsafe_base64(24)
)

puts 'Seeding test user'

User.create!(
  email: 'foo@bar.com',
  password: 'test123',
  type: 'User',
  auth_token: SecureRandom.urlsafe_base64(24)
)

puts 'DB seeds done'
