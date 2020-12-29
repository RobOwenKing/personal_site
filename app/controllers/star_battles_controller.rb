class StarBattlesController < ApplicationController
  http_basic_authenticate_with name: User.first.name, password: User.first.password, only: :new

  def index
    @puzzles = StarBattle.where(lesson: false)
    @lessons = StarBattle.where(lesson: true).order(:name)
  end

  def show
    @star_battle = StarBattle.find(params[:id])
  end

  def new
    @star_battle = StarBattle.new
  end

  def create
    @star_battle = StarBattle.new(star_battle_params)

    if @star_battle.save
      redirect_to star_battle_path(@star_battle)
    else
      render :new
    end
  end

  private

  def star_battle_params
    params.require(:star_battle).permit(:name, :hint, :intro, :lesson, :board, :stars)
  end
end
