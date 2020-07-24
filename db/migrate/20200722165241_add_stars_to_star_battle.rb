class AddStarsToStarBattle < ActiveRecord::Migration[5.2]
  def change
    add_column :star_battles, :stars, :integer
  end
end
