class CrosswordsController < ApplicationController
  def show
    render template: "crosswords/#{params[:crossword]}"
  end
end
