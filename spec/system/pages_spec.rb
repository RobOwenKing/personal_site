require 'rails_helper'

RSpec.describe "Pages", type: :system do
  describe 'Home' do
    before { visit '/' }
    it 'should have text on it' do
      expect(page).to have_content('Rob Owen King')
    end
    it 'should have a link to my portfolio' do
      click_on 'Things I\'ve made'
      expect(page).to have_content('My portfolio')
    end
  end

  describe 'Movida' do
    before { visit '/movida' }
    # it 'should have a title' do
    #   expect(page).to have_content('Movida-19')
    # end
    it 'should have a link to the code on Github' do
      click_on 'View on Github'
      expect(page).to have_content('RobOwenKing')
      expect(page).to have_content('movida-19')
    end
  end

  describe 'Quedem' do
    before { visit '/quedem' }
    # it 'should have a title' do
    #   expect(page).to have_content('Quedem')
    # end
    it 'should have a link to the code on Github' do
      click_on 'View on Github'
      expect(page).to have_content('RobOwenKing')
      expect(page).to have_content('quedem')
    end
  end

  describe 'Twenty-Eight' do
    before { visit '/twenty-eight' }
    it 'should have a link to the app' do
      click_on 'Go to app'
      expect(page).to have_content('How to Play')
      expect(page).to have_content('My Results')
    end
    it 'should have a link to the code on Github' do
      click_on 'View code'
      expect(page).to have_content('RobOwenKing')
      expect(page).to have_content('twenty-eight')
    end
  end

  describe 'Patterns in the Hanzi' do
    before { visit '/hanzi_patterns' }
    # it 'should have a title' do
    #   expect(page).to have_content('Patterns in the Hanzi')
    # end
    it 'should have a link to the app' do
      # Just testing for a link to avoid waiting for the app to load
      expect(page).to have_link('Go to app', href: 'https://robowenking.github.io/react_hanzi_patterns/')
    end
    it 'should have a link to the code on Github' do
      click_on 'View code'
      expect(page).to have_content('RobOwenKing')
      expect(page).to have_content('react_hanzi_patterns')
    end
  end

  describe 'Up to Speed: Korean Alphabet' do
    before { visit '/up_to_speed_korean' }
    # it 'should have a title' do
    #   expect(page).to have_content('Up to Speed: Korean Alphabet')
    # end
    it 'should have a link to the app' do
      click_on 'Go to app'
      expect(page).to have_content('Show answer')
    end
    it 'should have a link to the code on Github' do
      click_on 'View code'
      expect(page).to have_content('RobOwenKing')
      expect(page).to have_content('react_read_it')
    end
  end
  
  describe 'Portfolio' do
    before { visit '/portfolio' }
    it 'should have a link to pages#movida' do
      click_on "Movida-19"
      expect(page).to have_content('Movida-19')
    end
    it 'should have a link to pages#quedem' do
      click_on "Quedem"
      expect(page).to have_content('Quedem')
    end
    it 'should have a link to pages#twenty-eight' do
      click_on "Twenty-Eight"
      expect(page).to have_content('Twenty-Eight')
      expect(page).to have_content('Go to app')
    end
    it 'should have a link to pages#hanzi_patterns' do
      click_on "Patterns in the Hanzi"
      expect(page).to have_content('Patterns in the Hanzi')
    end
    it 'should have a link to pages#react_korean' do
      click_on "Up to Speed: Korean Alphabet"
      expect(page).to have_content('Up to Speed: Korean Alphabet')
    end
    it 'should have a link to projects#regex_challenges' do
      click_on "Regex Challenges"
      expect(page).to have_content('Regex Challenges')
    end
    it 'should have a link to projects#colour_translator' do
      click_on "Colour Translator"
      expect(page).to have_content('Colour Translator')
    end
    it 'should have a link to Code Kata on Github' do
      click_on "Code Kata"
      expect(page).to have_content('code_kata')
    end
    it 'should have a link to projects#game_of_life' do
      click_on "Game of Life"
      expect(page).to have_content('Game of Life')
    end
    it 'should have a link to projects#tetris' do
      click_on "Tetr-ish"
      expect(page).to have_content('Tetr-ish')
    end
    it 'should have a link to projects#roman_calculator' do
      click_on "Roman Numerals"
      expect(page).to have_content('Roman Numeral Calculator')
    end
  end
end
