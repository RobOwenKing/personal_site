class CreateAkaris < ActiveRecord::Migration[5.2]
  def change
    create_table :akaris do |t|
      t.string :name
      t.boolean :lesson
      t.references :next, foreign_key: true
      t.string :intro
      t.string :hint
      t.text :board

      t.timestamps
    end
  end
end
