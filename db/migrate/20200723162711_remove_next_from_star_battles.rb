class RemoveNextFromStarBattles < ActiveRecord::Migration[5.2]
  def change
    remove_column :star_battles, :next_id
  end
end
