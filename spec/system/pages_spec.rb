require 'rails_helper'

RSpec.describe "Pages", type: :system do
  describe 'Home' do
    it 'should have text on it' do
      visit '/'
      expect(page).to have_content('Rob Owen King')
    end
  end
end
