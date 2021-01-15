class NameQuizzesController < ApplicationController
  def index
    quizzes = MapQuiz.all
    @internationals = quizzes.filter { |quiz| quiz.category == 'int' }
    @nationals = quizzes.filter { |quiz| quiz.category == 'nat' }
  end

  def show
    @quiz = MapQuiz.find(params[:id])
  end
end
