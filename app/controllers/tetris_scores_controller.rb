class TetrisScoresController < ApplicationController
  def index
    @scores = TetrisScore.all
  end

  def new
  end

  def create
  end
end
