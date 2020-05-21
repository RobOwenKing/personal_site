require 'test_helper'

class TetrisScoreControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get tetris_score_index_url
    assert_response :success
  end

  test "should get new" do
    get tetris_score_new_url
    assert_response :success
  end

  test "should get create" do
    get tetris_score_create_url
    assert_response :success
  end

end
