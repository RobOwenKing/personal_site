class TetrisScoresController < ApplicationController
  def index
    @scores = TetrisScore.order(score: :desc).limit(25)
    @scores_today = TetrisScore.order(score: :desc)
                               .limit(10)
                               .where(updated_at: (Time.now - 24.hours)..Time.now)
  end

  def create
    @tetris_score = TetrisScore.new
    @tetris_score.name = score_params["name"]
    @tetris_score.score = process_score
    # raise
    if @tetris_score.save
      redirect_to tetris_path
    end
  end

  private

  def score_params
    params.require(:tetris_score).permit(:name, :score)
  end

  def process_score
    input = score_params["score"]
    check = input.slice!(-1)
    score = (999_999_999 - input.to_i) / 13
    output = helpers.digital_root(score * 17) == check.to_i ? score : -1
    output
  end
end
