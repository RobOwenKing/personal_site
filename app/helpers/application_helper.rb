module ApplicationHelper
  # From https://github.com/adrianeyre/codewars/blob/master/Ruby/6KYU/SumDigit.rb

  def digital_root(n)
    n < 10 ? n : digital_root(n / 10 + n % 10)
  end
end
