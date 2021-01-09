require 'test_helper'

class MapQuizzesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get map_quizzes_index_url
    assert_response :success
  end

  test "should get show" do
    get map_quizzes_show_url
    assert_response :success
  end

  test "should get new" do
    get map_quizzes_new_url
    assert_response :success
  end

  test "should get create" do
    get map_quizzes_create_url
    assert_response :success
  end

end
