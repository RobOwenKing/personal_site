class CreateTetrisScores < ActiveRecord::Migration[5.2]
  def change
    create_table :tetris_scores do |t|
      t.string :name
      t.integer :score

      t.timestamps
    end
  end
end
