require 'rails_helper'

RSpec.describe "Projects", type: :system do
  describe 'Regex Challenges' do
    before { visit regex_challenges_path }
    it 'should load with a challenge' do
      expect(page).to have_content('Hello World!')
    end
    it 'should accept a correct solution' do
      find('#regex').send_keys([:control, 'a'], :backspace)
      find('#regex').send_keys('hello,? world(!|\?)')
      find('#flags').send_keys([:control, 'a'], :backspace)
      find('#flags').send_keys('i')
      expect(page).to have_selector('#check-yes-0.green-txt')
    end
  end

  describe 'Roman Numerals Calculator' do
    before { visit roman_calculator_path }
    it 'should add correctly' do
      click_button('X')
      click_button('X')
      click_button('X')
      click_button('add')
      click_button('X')
      click_button('I')
      click_button('I')
      click_button('equals')
      expect(page).to have_content('XLII')
    end
    it 'should subtract correctly' do
      click_button('C')
      click_button('subtract')
      click_button('L')
      click_button('V')
      click_button('I')
      click_button('I')
      click_button('I')
      click_button('equals')
      expect(page).to have_content('XLII')
    end
    it 'should multiply correctly' do
      click_button('V')
      click_button('I')
      click_button('multiply')
      click_button('V')
      click_button('I')
      click_button('I')
      click_button('equals')
      expect(page).to have_content('XLII')
    end
    it 'should divide correctly' do
      click_button('C')
      click_button('C')
      click_button('X')
      click_button('divide')
      click_button('V')
      click_button('equals')
      expect(page).to have_content('XLII')
    end
  end
  
  describe 'Colour Translator' do
    before { visit colour_translator_path }
    it 'should update everything from RGB sliders' do
      fill_in('R:', with: '245')
      fill_in('G:', with: '126')
      fill_in('B:', with: '42')
      # Clicking on body means blur event will trigger
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
