class MapQuizzesController < ApplicationController
  http_basic_authenticate_with name: User.first.name, password: User.first.password, only: :new

  def index
    quizzes = MapQuiz.all
    @internationals = quizzes.filter { |quiz| quiz.category == 'int' }
    @nationals = quizzes.filter { |quiz| quiz.category == 'nat' }
  end

  def show
    @map_quiz = MapQuiz.find(params[:id])
  end

  def new
    @map_quiz = MapQuiz.new
  end

  def create
    @map_quiz = MapQuiz.new(map_quiz_params)

    if @map_quiz.save
      redirect_to map_quiz_path(@map_quiz)
    else
      render :new
    end
  end

  private

  def map_quiz_params
    params.require(:map_quiz).permit(:name, :map, :prompts, :category)
  end
end
