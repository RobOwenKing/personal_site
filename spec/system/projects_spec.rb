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
    before { visit colour_translator_path }
    it 'should update everything from RGB sliders' do
      fill_in('R:', with: '245')
      fill_in('G:', with: '126')
      fill_in('B:', with: '42')
      page.find('body').click
      expect(find_field('Hex:').value).to eql('#F57E2A')
      expect(find_field('RGB:').value).to eq('rgb(245, 126, 42)')
      expect(find_field('HSL:').value).to eq('hsl(25, 91, 56)')
      expect(find_field('H:').value).to eq('25')
      expect(find_field('S:').value).to eq('91')
      expect(find_field('L:').value).to eq('56')
    end
    it 'should update everything from Hex input' do
      fill_in('Hex:', with: '#F52ABF')
      # Clicking on body means blur event will trigger
      page.find('body').click
      expect(find_field('R:').value).to eq('245')
      expect(find_field('G:').value).to eq('42')
      expect(find_field('B:').value).to eq('191')
      expect(find_field('RGB:').value).to eq('rgb(245, 42, 191)')
      expect(find_field('HSL:').value).to eq('hsl(316, 91, 56)')
      expect(find_field('H:').value).to eq('316')
      expect(find_field('S:').value).to eq('91')
      expect(find_field('L:').value).to eq('56')
    end
    it 'should update everything from RGB input' do
      fill_in('RGB:', with: '117, 255, 253')
      # Clicking on body means blur event will trigger
      page.find('body').click
      expect(find_field('R:').value).to eq('117')
      expect(find_field('G:').value).to eq('255')
      expect(find_field('B:').value).to eq('253')
      expect(find_field('Hex:').value).to eq('#75FFFD')
      expect(find_field('HSL:').value).to eq('hsl(179, 100, 73)')
      expect(find_field('H:').value).to eq('179')
      expect(find_field('S:').value).to eq('100')
      expect(find_field('L:').value).to eq('73')
    end
    it 'should update everything from HSL input' do
      fill_in('HSL:', with: '(17, 100, 18)')
      # Clicking on body means blur event will trigger
      page.find('body').click
      expect(find_field('R:').value).to eq('92')
      expect(find_field('G:').value).to eq('26')
      expect(find_field('B:').value).to eq('0')
      expect(find_field('Hex:').value).to eq('#5C1A00')
      expect(find_field('RGB:').value).to eq('rgb(92, 26, 0)')
      expect(find_field('H:').value).to eq('17')
      expect(find_field('S:').value).to eq('100')
      expect(find_field('L:').value).to eq('18')
    end
    it 'should update everything from HSL sliders' do
      fill_in('H:', with: '100')
      fill_in('S:', with: '98')
      fill_in('L:', with: '52')
      page.find('body').click
      expect(find_field('R:').value).to eq('93')
      expect(find_field('G:').value).to eq('253')
      expect(find_field('B:').value).to eq('13')
      expect(find_field('Hex:').value).to eq('#5DFD0D')
      expect(find_field('RGB:').value).to eq('rgb(93, 253, 13)')
      expect(find_field('HSL:').value).to eq('hsl(100, 98, 52)')
    end
  end
end
