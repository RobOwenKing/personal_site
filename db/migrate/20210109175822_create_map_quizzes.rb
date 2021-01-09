class CreateMapQuizzes < ActiveRecord::Migration[5.2]
  def change
    create_table :map_quizzes do |t|
      t.string :name
      t.text :map
      t.text :prompts
      t.string :category

      t.timestamps
    end
  end
end
