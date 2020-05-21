class ProjectsController < ApplicationController
  def tetris
    @tetris_score = TetrisScore.new
  end
end
