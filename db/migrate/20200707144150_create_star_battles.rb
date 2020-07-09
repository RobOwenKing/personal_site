class CreateStarBattles < ActiveRecord::Migration[5.2]
  def change
    create_table :star_battles do |t|
      t.string :name
      t.boolean :lesson
      t.references :next, foreign_key: { to_table: 'star_battles' }
      t.string :intro
      t.string :hint
      t.text :board

      t.timestamps
    end
  end
end
