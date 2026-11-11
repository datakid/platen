Verified with Perl 5.38.2 (Ubuntu package): all 145 examples pass `perl -c` and run with exit code 0 and no warnings, each in a scratch directory, with `use strict;` and `use warnings;` prepended to the plate.
Plates omit those two lines so they start at the code; the modules topic shows them explicitly, and file examples create and delete their own files in the working directory.
The lexer sets commentBoundary so `$#array` stays code; heredoc bodies and regexes in examples avoid `#`, quotes and apostrophes because the lexer reads them as code.
