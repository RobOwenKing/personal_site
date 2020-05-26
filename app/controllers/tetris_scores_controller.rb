class TetrisScoresController < ApplicationController
  def index
    @scores = TetrisScore.order(score: :desc).limit(25)
    @scores_today = TetrisScore.order(score: :desc)
                               .limit(10)
                               .where(updated_at: (Time.now - 24.hours)..Time.now)
  end

  def create
    @tetris_score = TetrisScore.new(score_params)
    if @tetris_score.save
      redirect_to tetris_path
    end
  end

  private

  def score_params
    params.require(:tetris_score).permit(:name, :score)
  end
end
