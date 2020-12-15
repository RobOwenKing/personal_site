class AddNextToStarBattles < ActiveRecord::Migration[5.2]
  def change
    add_column :star_battles, :next, :integer
  end
end
