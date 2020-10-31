require 'rails_helper'

RSpec.describe "Pages", type: :system do
  describe 'Home' do
    it 'should have text on it' do
      visit '/'
      expect(page).to have_content('Rob Owen King')
    end
  end
  describe 'Movida' do
    before { visit '/movida' }
    it 'should have a title' do
      expect(page).to have_content('Movida-19')
    end
    it 'should have a link to the website' do
      expect(page).to have_link(href: /movida-19.com/)
    end
  end
  describe 'Quedem' do
    before { visit '/quedem' }
    it 'should have a title' do
      expect(page).to have_content('Quedem')
    end
    it 'should have a link to the website' do
      expect(page).to have_link(href: /goquedem.com/)
    end
  end
end
