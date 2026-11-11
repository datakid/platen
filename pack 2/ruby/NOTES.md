Verified with Ruby 3.4.2 (conda-forge): every one of the 172 examples passes `ruby -wc` and runs with `ruby -w` with exit code 0 and no warnings other than unused local variables.
File examples run in a scratch directory and delete what they create; pattern matching, Data and endless methods need Ruby 3.2 or newer, and no example uses the Ruby 3.4 `it` parameter.
The lexer treats `#` as a comment everywhere, so heredoc bodies in examples avoid interpolation; csv was not used because it is a bundled gem from Ruby 3.4.
