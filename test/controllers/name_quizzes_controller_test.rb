require 'test_helper'

class NameQuizzesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get name_quizzes_index_url
    assert_response :success
  end

  test "should get show" do
    get name_quizzes_show_url
    assert_response :success
  end

end
