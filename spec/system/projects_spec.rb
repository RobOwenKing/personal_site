require 'rails_helper'

RSpec.describe "Projects", type: :system do
  describe '_navbar' do
    before { visit game_of_life_path }
    it 'should link to home page' do
      click_on 'About Me'
      expect(page).to have_current_path(root_path)
    end
    it 'should link to portfolio' do
      click_on 'Portfolio'
      expect(page).to have_current_path(portfolio_path)
    end
  end
  describe 'Colour Translator' do

  end
end
