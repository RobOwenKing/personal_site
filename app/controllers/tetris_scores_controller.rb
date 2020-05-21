class TetrisScoresController < ApplicationController
  def index
    @scores = TetrisScore.all
  end

  def new
    @tetris_score = TetrisScore.new
  end

  def create
    @tetris_score = TetrisScore.new(score_params)
    @tetris_score.save
  end

  private

  def score_params
    params.require(:tetris_score).permit(:name, :score)
  end
end
