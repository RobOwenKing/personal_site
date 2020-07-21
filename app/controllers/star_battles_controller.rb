class StarBattlesController < ApplicationController
  def index
    @puzzles = StarBattle.where(lesson: false)
    @lessons = StarBattle.where(lesson: true).order(name:)
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
    params.require(:name, :lesson, :board).permit(:next_id, :hint, :intro)
  end
end
