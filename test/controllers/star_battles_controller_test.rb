require 'test_helper'

class StarBattlesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get star_battles_index_url
    assert_response :success
  end

  test "should get show" do
    get star_battles_show_url
    assert_response :success
  end

  test "should get new" do
    get star_battles_new_url
    assert_response :success
  end

  test "should get create" do
    get star_battles_create_url
    assert_response :success
  end

end
