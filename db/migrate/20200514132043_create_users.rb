class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string   :type
      t.string   :email
      t.string   :password_digest
      t.string   :auth_token
      t.string   :password_reset_token
      t.datetime :password_reset_sent_at

      t.timestamps
    end

    add_index :users, :email,                unique: true
    add_index :users, :auth_token,           unique: true
    add_index :users, :password_reset_token, unique: true
  end
end
