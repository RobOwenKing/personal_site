require 'test_helper'

class AkariControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get akari_index_url
    assert_response :success
  end

  test "should get show" do
    get akari_show_url
    assert_response :success
  end

  test "should get new" do
    get akari_new_url
    assert_response :success
  end

  test "should get create" do
    get akari_create_url
    assert_response :success
  end

end
