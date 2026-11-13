export default {
  id: "perl",
  name: "Perl",
  short: "PRL",
  pigment: "perl",
  family: null,
  version: "5.44",
  lexer: "perl",
  indent: 4,
  topics: [
    {
      id: "scalars-strings",
      n: 1,
      title: "scalars & strings",
      concepts: [
        {
          id: "scalars", n: 1, title: "scalars and assignment", level: 1,
          gloss: "Stores single values in variables that start with a dollar sign.",
          examples: [
            { code: `my $name = "ada";
my $age = 36;
my $pi = 3.14159;
print "$name is $age\\n";`, notes: [{ at: "my", text: "declares a lexical variable" }, { at: "$name", text: "sigil marks a scalar" }] },
            { code: `my $count = 10;
$count += 5;
$count++;
print "$count\\n";`, notes: [] },
            { code: `my $sum = "5" + 3;
my $joined = 5 . 3;
print "$sum $joined\\n";`, notes: [{ at: "+", text: "numeric addition" }, { at: ".", text: "string concatenation" }] }
          ]
        },
        {
          id: "quoting-interpolation", n: 2, title: "quoting and interpolation", level: 1,
          gloss: "Expands variables in double quotes and keeps single quotes literal.",
          examples: [
            { code: `my $user = "ada";
print "Hello, $user\\n";
print 'Hello, $user\\n', "\\n";`, notes: [{ at: "\"Hello, $user\\n\"", text: "interpolates" }, { at: "'Hello, $user\\n'", text: "literal text" }] },
            { code: `my @items = ("tea", "cake");
my %price = (tea => 2.5);
print "Items: @items, tea costs $price{tea}\\n";`, notes: [{ at: "@items", text: "joins with spaces" }] },
            { code: `my $n = 3;
print "Total: \${n}th\\n";
print "Math: @{[ $n * 2 ]}\\n";`, notes: [{ at: "@{[ $n * 2 ]}", text: "evaluates an expression" }] },
            { code: `my $n = 3;
print q(single 'quoted' text), "\\n";
print qq(double "quoted" $n), "\\n";`, notes: [{ at: "q(single", text: "custom single quotes" }, { at: "qq(double", text: "custom double quotes" }] }
          ]
        },
        {
          id: "string-operators", n: 3, title: "string operators", level: 1,
          gloss: "Joins text, repeats it and compares strings with dedicated operators.",
          examples: [
            { code: `my $greeting = "Hello" . ", " . "world";
print "$greeting\\n";
print "ab" x 3, "\\n";`, notes: [{ at: "x", text: "repetition" }] },
            { code: `my $s = "abc";
$s .= "def";
print length($s), " ", uc($s), "\\n";`, notes: [{ at: ".=", text: "appends in place" }] },
            { code: `print "apple" lt "banana" ? "yes" : "no", "\\n";
print "a" eq "a" ? "same\\n" : "diff\\n";`, notes: [{ at: "lt", text: "string comparison" }, { at: "eq", text: "string equality" }] }
          ]
        },
        {
          id: "undef-defined", n: 4, title: "undef, defined and chomp", level: 1,
          gloss: "Tests for missing values and removes trailing newlines.",
          examples: [
            { code: `my $line = "text\\n";
chomp($line);
print "[$line]\\n";`, notes: [{ at: "chomp", text: "removes one newline" }] },
            { code: `my $x;
print defined($x) ? "set" : "undef", "\\n";
$x //= "default";
print "$x\\n";`, notes: [{ at: "//=", text: "assigns if undefined" }] },
            { code: `my $value = 0;
my $name = $value || "fallback";
my $kept = $value // "fallback";
print "$name $kept\\n";`, notes: [{ at: "||", text: "falls back on any false value" }, { at: "//", text: "falls back only on undef" }] }
          ]
        }
      ]
    },
    {
      id: "arrays-hashes",
      n: 2,
      title: "arrays & hashes",
      concepts: [
        {
          id: "arrays", n: 1, title: "arrays", level: 1,
          gloss: "Stores ordered lists in variables that start with an at sign.",
          examples: [
            { code: `my @scores = (90, 72, 85);
print "$scores[0] $scores[-1]\\n";
print scalar(@scores), "\\n";`, notes: [{ at: "$scores[0]", text: "element uses a dollar sign" }, { at: "scalar(@scores)", text: "number of elements" }] },
            { code: `my @names = qw(ada grace linus);
push @names, "kay";
my $last = pop @names;
print "@names $last\\n";`, notes: [{ at: "qw(ada", text: "list of words" }] },
            { code: `my @nums = (3, 1, 2);
unshift @nums, 0;
my $first = shift @nums;
print "$first: @nums\\n";`, notes: [{ at: "unshift", text: "adds at the front" }] }
          ]
        },
        {
          id: "slices-functions", n: 2, title: "slices and list functions", level: 1,
          gloss: "Selects parts of arrays and sorts, reverses or splices them.",
          examples: [
            { code: `my @v = (10, 20, 30, 40);
print "@v[1, 2]\\n";
print "@v[1 .. 3]\\n";
print "last index $#v\\n";`, notes: [{ at: "@v[1, 2]", text: "array slice" }, { at: "$#v", text: "last index" }] },
            { code: `my @words = qw(pear fig apple);
print join(", ", sort @words), "\\n";
print join(", ", reverse @words), "\\n";`, notes: [] },
            { code: `my @list = (1 .. 5);
my @part = splice(@list, 1, 2);
print "@part | @list\\n";`, notes: [{ at: "splice", text: "removes and returns elements" }] }
          ]
        },
        {
          id: "hashes", n: 3, title: "hashes", level: 1,
          gloss: "Maps string keys to values in variables that start with a percent sign.",
          examples: [
            { code: `my %stock = (apple => 4, pear => 0);
$stock{plum} = 7;
print "$stock{apple}\\n";`, notes: [{ at: "%stock", text: "whole hash" }, { at: "$stock{plum}", text: "one value" }] },
            { code: `my %prices = (tea => 2.5, cake => 4);
delete $prices{tea};
print exists $prices{cake} ? "has cake\\n" : "no cake\\n";`, notes: [{ at: "exists", text: "tests for a key" }] },
            { code: `my %age = (ada => 36, linus => 54);
for my $name (sort keys %age) {
    print "$name: $age{$name}\\n";
}`, notes: [{ at: "keys", text: "list of keys" }] }
          ]
        },
        {
          id: "hash-idioms", n: 4, title: "hash slices and counting", level: 2,
          gloss: "Extracts several values, inverts hashes and counts occurrences.",
          examples: [
            { code: `my %h = (a => 1, b => 2, c => 3);
my @vals = @h{qw(a c)};
print "@vals\\n";`, notes: [{ at: "@h{qw(a c)}", text: "hash slice" }] },
            { code: `my %h = (a => 1, b => 2);
my %inverse = reverse %h;
print join(",", map { "$_=$inverse{$_}" } sort keys %inverse), "\\n";`, notes: [{ at: "reverse %h", text: "swaps keys and values" }] },
            { code: `my %count;
$count{$_}++ for qw(a b a c a);
print join(" ", map { "$_:$count{$_}" } sort keys %count), "\\n";`, notes: [{ at: "$count{$_}++", text: "autovivifies the key" }] }
          ]
        }
      ]
    },
    {
      id: "control-flow",
      n: 3,
      title: "control flow",
      concepts: [
        {
          id: "conditionals", n: 1, title: "if, elsif and unless", level: 1,
          gloss: "Branches with if, elsif, else, unless and the ternary operator.",
          examples: [
            { code: `my $temperature = 28;
if ($temperature > 25) {
    print "warm\\n";
} elsif ($temperature > 10) {
    print "mild\\n";
} else {
    print "cold\\n";
}`, notes: [{ at: "elsif", text: "not elseif" }] },
            { code: `my $score = 72;
print $score >= 60 ? "pass\\n" : "fail\\n";`, notes: [{ at: "? \"pass\\n\"", text: "ternary operator" }] },
            { code: `my $logged_in = 0;
unless ($logged_in) {
    print "please log in\\n";
}
print "done\\n" if !$logged_in;`, notes: [{ at: "unless", text: "if not" }, { at: "if", text: "statement modifier" }] }
          ]
        },
        {
          id: "for-foreach", n: 2, title: "for and foreach loops", level: 1,
          gloss: "Repeats code over ranges, lists and C-style counters.",
          examples: [
            { code: `for my $i (1 .. 3) {
    print "$i\\n";
}`, notes: [{ at: "1 .. 3", text: "range operator" }] },
            { code: `for (my $i = 0; $i < 3; $i++) {
    print "step $i\\n";
}`, notes: [{ at: "for (my $i = 0", text: "init; test; step" }] },
            { code: `my @names = qw(ada grace);
foreach my $name (@names) {
    print "Hello, $name\\n";
}`, notes: [] }
          ]
        },
        {
          id: "while-until", n: 3, title: "while, until and loop control", level: 1,
          gloss: "Loops on a condition and controls iterations with next and last.",
          examples: [
            { code: `my $n = 3;
while ($n > 0) {
    print "$n\\n";
    $n--;
}`, notes: [] },
            { code: `my $i = 0;
until ($i >= 3) {
    $i++;
}
print "$i\\n";`, notes: [{ at: "until", text: "loops while false" }] },
            { code: `for my $i (1 .. 10) {
    next if $i == 3;
    last if $i > 5;
    print "$i\\n";
}`, notes: [{ at: "next", text: "skips an iteration" }, { at: "last", text: "leaves the loop" }] }
          ]
        },
        {
          id: "modifiers-labels", n: 4, title: "statement modifiers and labels", level: 2,
          gloss: "Writes one-line loops and conditions and jumps out of nested loops.",
          examples: [
            { code: `print "$_\\n" for 1 .. 3;`, notes: [{ at: "for", text: "modifier sets $_" }] },
            { code: `my $x = 5;
print "big\\n" if $x > 3;
print "small\\n" unless $x > 3;`, notes: [] },
            { code: `OUTER: for my $i (1 .. 3) {
    for my $j (1 .. 3) {
        next OUTER if $j == 2;
        print "$i$j\\n";
    }
}`, notes: [{ at: "OUTER:", text: "label" }, { at: "next OUTER", text: "continues the outer loop" }] }
          ]
        }
      ]
    },
    {
      id: "subroutines",
      n: 4,
      title: "subroutines",
      concepts: [
        {
          id: "defining-subs", n: 1, title: "defining and calling subs", level: 1,
          gloss: "Defines subroutines that read their arguments from the array @_.",
          examples: [
            { code: `sub square {
    my ($n) = @_;
    return $n * $n;
}
print square(4), "\\n";`, notes: [{ at: "@_", text: "the argument list" }, { at: "my ($n)", text: "copies the first argument" }] },
            { code: `sub greet {
    my ($name, $greeting) = @_;
    $greeting //= "Hello";
    return "$greeting, $name";
}
print greet("ada"), "\\n";`, notes: [{ at: "//=", text: "default for a missing argument" }] },
            { code: `sub area {
    my ($w, $h) = @_;
    $w * $h;
}
print area(3, 4), "\\n";`, notes: [{ at: "$w * $h", text: "last value is returned" }] }
          ]
        },
        {
          id: "arguments-returns", n: 2, title: "arguments and return lists", level: 2,
          gloss: "Accepts any number of arguments and returns several values.",
          examples: [
            { code: `sub total {
    my $sum = 0;
    $sum += $_ for @_;
    return $sum;
}
print total(1, 2, 3), "\\n";`, notes: [] },
            { code: `sub min_max {
    my @sorted = sort { $a <=> $b } @_;
    return ($sorted[0], $sorted[-1]);
}
my ($lo, $hi) = min_max(3, 1, 2);
print "$lo $hi\\n";`, notes: [{ at: "return ($sorted[0]", text: "returns a list" }] },
            { code: `sub config {
    my %args = (port => 80, @_);
    return "$args{host}:$args{port}";
}
print config(host => "example.com"), "\\n";`, notes: [{ at: "(port => 80, @_)", text: "defaults then overrides" }] }
          ]
        },
        {
          id: "context-code-refs", n: 3, title: "context and code references", level: 2,
          gloss: "Detects the calling context and stores subs in variables.",
          examples: [
            { code: `sub context {
    return wantarray ? "list" : "scalar";
}
my @l = context();
my $s = context();
print "$l[0] $s\\n";`, notes: [{ at: "wantarray", text: "true in list context" }] },
            { code: `my $double = sub { return $_[0] * 2 };
print $double->(4), "\\n";`, notes: [{ at: "sub { return $_[0] * 2 }", text: "anonymous sub" }, { at: "$double->(4)", text: "calls a code reference" }] },
            { code: `sub apply {
    my ($f, @items) = @_;
    return map { $f->($_) } @items;
}
print join(",", apply(sub { $_[0] + 1 }, 1, 2, 3)), "\\n";`, notes: [] }
          ]
        },
        {
          id: "closures-recursion", n: 4, title: "closures and recursion", level: 2,
          gloss: "Captures lexical variables and calls subs recursively.",
          examples: [
            { code: `sub make_counter {
    my $count = 0;
    return sub { return ++$count };
}
my $counter = make_counter();
$counter->();
print $counter->(), "\\n";`, notes: [{ at: "$count", text: "kept alive by the closure" }] },
            { code: `sub fact {
    my ($n) = @_;
    return $n <= 1 ? 1 : $n * fact($n - 1);
}
print fact(5), "\\n";`, notes: [] },
            { code: `sub adder {
    my ($n) = @_;
    return sub { return $_[0] + $n };
}
my $add5 = adder(5);
print $add5->(10), "\\n";`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "references",
      n: 5,
      title: "references",
      concepts: [
        {
          id: "refs-deref", n: 1, title: "references and dereferencing", level: 1,
          gloss: "Points at variables with a backslash and follows them with sigils or arrows.",
          examples: [
            { code: `my @nums = (1, 2, 3);
my $ref = \\@nums;
print "$$ref[0] @{$ref}\\n";
print scalar(@$ref), "\\n";`, notes: [{ at: "\\@nums", text: "reference to an array" }, { at: "@{$ref}", text: "dereferences the array" }] },
            { code: `my %h = (a => 1);
my $href = \\%h;
print "$href->{a} $$href{a}\\n";`, notes: [{ at: "->{a}", text: "arrow access" }] },
            { code: `my $x = 10;
my $r = \\$x;
$$r += 5;
print "$x\\n";`, notes: [{ at: "$$r", text: "dereferences a scalar" }] }
          ]
        },
        {
          id: "anonymous-structures", n: 2, title: "anonymous arrays and hashes", level: 1,
          gloss: "Builds references directly with brackets and braces.",
          examples: [
            { code: `my $list = [1, 2, 3];
print "$list->[1] ", scalar(@$list), "\\n";`, notes: [{ at: "[1, 2, 3]", text: "anonymous array" }] },
            { code: `my $user = { name => "ada", age => 36 };
print "$user->{name} is $user->{age}\\n";`, notes: [{ at: "{ name => \"ada\"", text: "anonymous hash" }] },
            { code: `my @people = ({ name => "ada" }, { name => "grace" });
print $people[1]{name}, "\\n";`, notes: [{ at: "[1]{name}", text: "arrows are optional between subscripts" }] }
          ]
        },
        {
          id: "nested-data", n: 3, title: "nested data structures", level: 2,
          gloss: "Combines arrays and hashes into deeper structures.",
          examples: [
            { code: `my %data = (
    langs => ["perl", "c"],
    owner => { name => "ada" },
);
print "$data{langs}[0] $data{owner}{name}\\n";`, notes: [] },
            { code: `my @matrix = ([1, 2], [3, 4]);
print $matrix[1][0], "\\n";
print join(",", map { $_->[1] } @matrix), "\\n";`, notes: [{ at: "$_->[1]", text: "second element of each row" }] },
            { code: `my %tree;
$tree{a}{b}{c} = 1;
print join(",", keys %{ $tree{a} }), "\\n";`, notes: [{ at: "$tree{a}{b}{c}", text: "autovivifies the levels" }] }
          ]
        },
        {
          id: "ref-helpers", n: 4, title: "ref, by-reference arguments and dispatch", level: 2,
          gloss: "Inspects reference types, passes data by reference and dispatches on a hash of subs.",
          examples: [
            { code: `print ref([]), " ", ref({}), " ", ref(sub {}), " ", ref(\\1), "\\n";`, notes: [{ at: "ref", text: "type name of a reference" }] },
            { code: `sub add_item {
    my ($list, $item) = @_;
    push @$list, $item;
}
my @items = ("a");
add_item(\\@items, "b");
print "@items\\n";`, notes: [{ at: "\\@items", text: "avoids copying the array" }] },
            { code: `my %op = (
    add => sub { return $_[0] + $_[1] },
    mul => sub { return $_[0] * $_[1] },
);
print $op{mul}->(3, 4), "\\n";`, notes: [{ at: "$op{mul}->(3, 4)", text: "call by key" }] }
          ]
        }
      ]
    },
    {
      id: "regular-expressions",
      n: 6,
      title: "regular expressions",
      concepts: [
        {
          id: "matching", n: 1, title: "matching", level: 1,
          gloss: "Tests strings against patterns with the binding operator.",
          examples: [
            { code: `my $text = "call 555-1234 now";
if ($text =~ /(\\d+)-(\\d+)/) {
    print "$1 / $2\\n";
}`, notes: [{ at: "=~", text: "binds the match" }, { at: "$1", text: "first capture group" }] },
            { code: `my $email = "ada\\@example.com";
print "valid\\n" if $email =~ /^\\w+\\@\\w+\\.com$/;`, notes: [{ at: "\\@", text: "literal at sign" }] },
            { code: `my $word = "Perl";
print "match\\n" if $word =~ /^perl$/i;
print "no match\\n" if $word !~ /^java/;`, notes: [{ at: "/i", text: "ignore case" }, { at: "!~", text: "does not match" }] }
          ]
        },
        {
          id: "substitution", n: 2, title: "substitution and transliteration", level: 1,
          gloss: "Replaces text with s/// and translates characters with tr///.",
          examples: [
            { code: `my $s = "red apple, red car";
(my $t = $s) =~ s/red/green/g;
print "$t\\n";`, notes: [{ at: "s/red/green/g", text: "replace every match" }, { at: "(my $t = $s)", text: "copy then modify" }] },
            { code: `my $text = "hello";
(my $up = $text) =~ tr/a-z/A-Z/;
print "$up\\n";`, notes: [{ at: "tr/a-z/A-Z/", text: "character translation" }] },
            { code: `my $price = "cost: 12";
my $new = $price =~ s/(\\d+)/$1 * 2/er;
print "$new\\n";`, notes: [{ at: "/er", text: "evaluate, and return the result" }] }
          ]
        },
        {
          id: "captures-global", n: 3, title: "captures and global matching", level: 2,
          gloss: "Collects all matches and named groups.",
          examples: [
            { code: `my $dates = "2024-01-15 and 2023-12-31";
my @years = $dates =~ /(\\d{4})-/g;
print "@years\\n";`, notes: [{ at: "/g", text: "in list context, all matches" }] },
            { code: `my $text = "a1b22c333";
while ($text =~ /(\\d+)/g) {
    print "found $1\\n";
}`, notes: [{ at: "while ($text =~ /(\\d+)/g)", text: "iterates over matches" }] },
            { code: `if ("john smith" =~ /(?<first>\\w+) (?<last>\\w+)/) {
    print "$+{last}, $+{first}\\n";
}`, notes: [{ at: "(?<first>\\w+)", text: "named capture" }, { at: "$+{last}", text: "read a named capture" }] }
          ]
        },
        {
          id: "split-qr", n: 4, title: "split, qr and modifiers", level: 2,
          gloss: "Splits on patterns and stores patterns in variables with qr.",
          examples: [
            { code: `my @parts = split /,\\s*/, "a, b,c";
print join("|", @parts), "\\n";`, notes: [{ at: "split", text: "pattern, then string" }] },
            { code: `my $str = "one two  three";
my @words = split ' ', $str;
print scalar(@words), "\\n";`, notes: [{ at: "split ' '", text: "splits on runs of whitespace" }] },
            { code: `my $re = qr/(\\w+)\\@(\\w+)/;
my ($user, $host) = "ada\\@example" =~ $re;
print "$user at $host\\n";`, notes: [{ at: "qr/(\\w+)", text: "compiled pattern" }] }
          ]
        }
      ]
    },
    {
      id: "file-i-o",
      n: 7,
      title: "file I/O",
      concepts: [
        {
          id: "read-write-files", n: 1, title: "reading and writing files", level: 1,
          gloss: "Opens files for writing and reading with lexical filehandles.",
          examples: [
            { code: `open(my $out, '>', "notes.txt") or die $!;
print $out "first\\nsecond\\n";
close($out);
open(my $in, '<', "notes.txt") or die $!;
while (my $line = <$in>) {
    chomp $line;
    print "got: $line\\n";
}
close($in);
unlink "notes.txt";`, notes: [{ at: "'>'", text: "write mode" }, { at: "<$in>", text: "reads one line" }] },
            { code: `open(my $log, '>>', "log.txt") or die $!;
print $log "start\\n";
print $log "end\\n";
close($log);
open(my $fh, '<', "log.txt") or die $!;
my @lines = <$fh>;
close($fh);
print scalar(@lines), " lines\\n";
unlink "log.txt";`, notes: [{ at: "'>>'", text: "append mode" }, { at: "my @lines = <$fh>", text: "all lines in list context" }] },
            { code: `open(my $fh, '>', "data.txt") or die $!;
print $fh "x";
close($fh);
print -e "data.txt" ? "exists\\n" : "missing\\n";
print -s "data.txt", " bytes\\n";
unlink "data.txt";`, notes: [{ at: "-e", text: "file exists" }, { at: "-s", text: "size in bytes" }] }
          ]
        },
        {
          id: "slurp-and-errors", n: 2, title: "slurping and handling errors", level: 2,
          gloss: "Reads a whole file at once and reports failures with the error variable.",
          examples: [
            { code: `open(my $fh, '>', "t.txt") or die $!;
print $fh "a\\nb\\n";
close($fh);
my $content = do {
    local $/;
    open(my $in, '<', "t.txt") or die $!;
    <$in>;
};
print length($content), "\\n";
unlink "t.txt";`, notes: [{ at: "local $/", text: "no line separator" }] },
            { code: `my $data = "x\\ny\\nz\\n";
open(my $fh, '<', \\$data) or die $!;
my @lines = <$fh>;
chomp @lines;
print "@lines\\n";`, notes: [{ at: "\\$data", text: "in-memory filehandle" }] },
            { code: `open(my $fh, '<', "missing.txt") or print "cannot open: $!\\n";`, notes: [{ at: "$!", text: "system error message" }] }
          ]
        },
        {
          id: "directories", n: 3, title: "directories and file tests", level: 2,
          gloss: "Handles creating, listing and removing directories and testing paths.",
          examples: [
            { code: `mkdir "tmp_dir" unless -d "tmp_dir";
open(my $fh, '>', "tmp_dir/a.txt") or die $!;
close($fh);
my @files = glob("tmp_dir/*.txt");
print "@files\\n";
unlink @files;
rmdir "tmp_dir";`, notes: [{ at: "glob", text: "files matching a pattern" }] },
            { code: `opendir(my $dh, ".") or die $!;
my @entries = grep { !/^\\./ } readdir($dh);
closedir($dh);
print "listed\\n";`, notes: [{ at: "readdir", text: "names in a directory" }] },
            { code: `print "dir\\n" if -d ".";
print "readable\\n" if -r $0;`, notes: [{ at: "$0", text: "name of the script" }] }
          ]
        },
        {
          id: "output-formatting", n: 4, title: "standard streams and separators", level: 2,
          gloss: "Writes to STDOUT and STDERR and changes the output separators.",
          examples: [
            { code: `print STDOUT "to stdout\\n";
print STDERR "to stderr\\n";`, notes: [{ at: "STDERR", text: "error stream" }] },
            { code: `printf("%-6s|%5.2f|\\n", "tea", 2.5);`, notes: [{ at: "%-6s", text: "left aligned" }] },
            { code: `{
    local $, = "-";
    local $\\ = "\\n";
    print "a", "b", "c";
}`, notes: [{ at: "$,", text: "separator between items" }, { at: "$\\", text: "added after the last item" }] }
          ]
        }
      ]
    },
    {
      id: "string-functions-sprintf",
      n: 8,
      title: "string functions & sprintf",
      concepts: [
        {
          id: "basic-string-functions", n: 1, title: "basic string functions", level: 1,
          gloss: "Handles length, case changes and substring extraction.",
          examples: [
            { code: `my $s = "Hello, World";
print length($s), "\\n";
print uc($s), " ", lc($s), "\\n";
print ucfirst(lc("PERL")), "\\n";`, notes: [{ at: "ucfirst", text: "capitalise the first letter" }] },
            { code: `my $s = "abcdef";
print substr($s, 1, 3), "\\n";
print index($s, "cd"), " ", rindex($s, "f"), "\\n";`, notes: [{ at: "substr", text: "offset and length" }, { at: "index", text: "position or -1" }] },
            { code: `my $s = "hello";
substr($s, 0, 1) = "J";
print "$s\\n";
print scalar reverse($s), "\\n";`, notes: [{ at: "substr($s, 0, 1) =", text: "assigns into the string" }] }
          ]
        },
        {
          id: "join-split-repeat", n: 2, title: "join, split and repeat", level: 1,
          gloss: "Converts between strings and lists and repeats text.",
          examples: [
            { code: `my @parts = split /,/, "a,b,c";
print join("-", @parts), "\\n";`, notes: [{ at: "join", text: "list to string" }] },
            { code: `print "-" x 10, "\\n";
print join(", ", ("ab") x 3), "\\n";`, notes: [{ at: "(\"ab\") x 3", text: "repeats a list" }] },
            { code: `my $csv = join ",", map { qq("$_") } qw(a b);
print "$csv\\n";`, notes: [] }
          ]
        },
        {
          id: "sprintf-formatting", n: 3, title: "sprintf and printf", level: 1,
          gloss: "Formats numbers and text with printf-style directives.",
          examples: [
            { code: `printf("%05d\\n", 42);
printf("%.2f\\n", 3.14159);
printf("%-8s|\\n", "ada");
printf("%8s|\\n", "ada");`, notes: [{ at: "%05d", text: "zero padded" }, { at: "%.2f", text: "two decimals" }] },
            { code: `my $s = sprintf("%s has %d items (%.1f%%)", "cart", 3, 42.5);
print "$s\\n";`, notes: [{ at: "sprintf", text: "returns the string" }, { at: "%%", text: "literal percent" }] },
            { code: `print sprintf("%x %o %b %e", 255, 8, 5, 12345.678), "\\n";`, notes: [{ at: "%x %o %b", text: "hex, octal, binary" }] }
          ]
        },
        {
          id: "trimming-chars", n: 4, title: "trimming and characters", level: 2,
          gloss: "Cleans whitespace with substitutions and converts between characters and codes.",
          examples: [
            { code: `my $s = "  padded  ";
$s =~ s/^\\s+|\\s+$//g;
print "[$s]\\n";`, notes: [{ at: "^\\s+|\\s+$", text: "leading or trailing space" }] },
            { code: `print ord("A"), " ", chr(97), "\\n";
print join(",", map { ord } split //, "abc"), "\\n";`, notes: [{ at: "ord", text: "character code" }, { at: "split //", text: "one element per character" }] },
            { code: `my $text = "the quick brown fox";
my $count = () = $text =~ /o/g;
print "$count\\n";
print join(" ", map { ucfirst } split / /, $text), "\\n";`, notes: [{ at: "() =", text: "counts the matches" }] }
          ]
        }
      ]
    },
    {
      id: "modules-use",
      n: 9,
      title: "modules & use",
      concepts: [
        {
          id: "pragmas-core", n: 1, title: "pragmas and core modules", level: 1,
          gloss: "Loads pragmas and core modules with use and imports chosen functions.",
          examples: [
            { code: `use strict;
use warnings;
my $x = 5;
print "$x\\n";`, notes: [{ at: "use strict", text: "requires declared variables" }, { at: "use warnings", text: "reports questionable code" }] },
            { code: `use List::Util qw(sum max min first);
print sum(1, 2, 3), " ", max(4, 9, 2), " ", min(4, 9, 2), "\\n";
print first { $_ > 2 } (1, 2, 3, 4);
print "\\n";`, notes: [{ at: "qw(sum max min first)", text: "names to import" }] },
            { code: `use POSIX qw(floor ceil);
print floor(3.7), " ", ceil(3.2), "\\n";`, notes: [] }
          ]
        },
        {
          id: "data-and-paths", n: 2, title: "Data::Dumper and path modules", level: 2,
          gloss: "Dumps structures and handles file paths with core modules.",
          examples: [
            { code: `use Data::Dumper;
$Data::Dumper::Sortkeys = 1;
$Data::Dumper::Indent = 1;
print Dumper({ a => 1, b => [2, 3] });`, notes: [{ at: "Dumper", text: "prints a data structure" }] },
            { code: `use File::Basename;
my $path = "/var/log/app.log";
print basename($path), " ", dirname($path), "\\n";`, notes: [] },
            { code: `use File::Spec;
print File::Spec->catfile("data", "2024", "report.csv"), "\\n";`, notes: [{ at: "catfile", text: "joins path parts" }] }
          ]
        },
        {
          id: "constants-options", n: 3, title: "constants and options", level: 2,
          gloss: "Defines constants with use constant and parses command-line options.",
          examples: [
            { code: `use constant PI => 3.14159;
use constant { MAX => 10, MIN => 1 };
print PI * 2, " ", MAX - MIN, "\\n";`, notes: [{ at: "use constant", text: "compile-time constant" }] },
            { code: `use Getopt::Long;
local @ARGV = ("--name", "ada", "--verbose");
GetOptions("name=s" => \\my $name, "verbose" => \\my $verbose);
print "$name $verbose\\n";`, notes: [{ at: "GetOptions", text: "fills the variables" }] },
            { code: `BEGIN {
    package Greeter;
    sub hello { return "hello" }
    $INC{'Greeter.pm'} = 1;
}
use Greeter;
print Greeter::hello(), "\\n";`, notes: [{ at: "$INC{'Greeter.pm'}", text: "pretends the file was loaded" }] }
          ]
        },
        {
          id: "require-qualified", n: 4, title: "require and qualified names", level: 2,
          gloss: "Loads modules at run time and calls their functions by full name.",
          examples: [
            { code: `use Cwd ();
print Cwd::getcwd() ne "" ? "cwd ok\\n" : "none\\n";`, notes: [{ at: "()", text: "imports nothing" }] },
            { code: `require File::Basename;
my $file = File::Basename::basename("/tmp/report.txt");
print "$file\\n";`, notes: [{ at: "require", text: "loads at run time" }] },
            { code: `use List::Util ();
print List::Util::sum(1 .. 4), "\\n";`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "packages-bless",
      n: 10,
      title: "packages & bless",
      concepts: [
        {
          id: "packages", n: 1, title: "packages and namespaces", level: 1,
          gloss: "Groups subs under a package name and calls them with a qualified name.",
          examples: [
            { code: `package Math;
sub square { my ($n) = @_; return $n * $n }
package main;
print Math::square(4), "\\n";`, notes: [{ at: "package", text: "switches the namespace" }] },
            { code: `package Counter;
my $count = 0;
sub next_id { return ++$count }
package main;
print Counter::next_id(), Counter::next_id(), "\\n";`, notes: [] },
            { code: `package Util {
    sub shout { return uc($_[0]) . "!" }
}
print Util::shout("hey"), "\\n";`, notes: [{ at: "package Util {", text: "block form" }] }
          ]
        },
        {
          id: "objects", n: 2, title: "objects with bless", level: 2,
          gloss: "Turns a reference into an object by blessing it into a package.",
          examples: [
            { code: `package Counter;
sub new {
    my ($class) = @_;
    return bless { value => 0 }, $class;
}
sub increment { my $self = shift; $self->{value}++; return $self }
package main;
my $c = Counter->new;
$c->increment->increment;
print $c->{value}, "\\n";`, notes: [{ at: "bless", text: "attaches the package to the data" }, { at: "Counter->new", text: "class method call" }] },
            { code: `package Point;
sub new {
    my ($class, %args) = @_;
    return bless { x => $args{x} // 0, y => $args{y} // 0 }, $class;
}
sub x { $_[0]{x} }
package main;
my $p = Point->new(x => 3);
print $p->x, " ", ref($p), "\\n";`, notes: [{ at: "ref($p)", text: "the class name" }] },
            { code: `package User;
sub new {
    my ($class, $name) = @_;
    return bless { name => $name }, $class;
}
sub name { return $_[0]->{name} }
package main;
print User->new("ada")->name, "\\n";`, notes: [] }
          ]
        },
        {
          id: "methods-accessors", n: 3, title: "methods and accessors", level: 2,
          gloss: "Writes instance methods and generates accessors.",
          examples: [
            { code: `package Rect;
sub new { my ($c, %a) = @_; return bless {%a}, $c }
sub area { my $s = shift; return $s->{w} * $s->{h} }
package main;
print Rect->new(w => 3, h => 4)->area, "\\n";`, notes: [{ at: "shift", text: "takes the invocant" }] },
            { code: `package Temp;
sub new { my ($c, $v) = @_; return bless { c => $v }, $c }
sub to_f { return $_[0]{c} * 9 / 5 + 32 }
package main;
print Temp->new(100)->to_f, "\\n";`, notes: [] },
            { code: `package Person;
sub new { return bless { name => $_[1], age => $_[2] }, $_[0] }
for my $f (qw(name age)) {
    no strict 'refs';
    *{"Person::$f"} = sub { return $_[0]{$f} };
}
package main;
print Person->new("ada", 36)->name, "\\n";`, notes: [{ at: "*{\"Person::$f\"}", text: "installs a sub by name" }] }
          ]
        },
        {
          id: "inheritance", n: 4, title: "inheritance and introspection", level: 2,
          gloss: "Inherits with @ISA or parent and checks classes with isa and can.",
          examples: [
            { code: `package Animal;
sub new { my ($c, $n) = @_; return bless { name => $n }, $c }
sub speak { return "..." }
package Dog;
our @ISA = ('Animal');
sub speak { return "woof" }
package main;
print Dog->new("rex")->speak, "\\n";`, notes: [{ at: "@ISA", text: "list of parent classes" }] },
            { code: `package Animal;
sub new { my ($c) = @_; return bless {}, $c }
sub speak { return "..." }
package Dog;
use parent -norequire, 'Animal';
sub speak { my $self = shift; return "woof, " . $self->SUPER::speak() }
package main;
print Dog->new->speak, "\\n";`, notes: [{ at: "SUPER::", text: "parent method" }] },
            { code: `package Animal;
sub new { return bless {}, shift }
package Dog;
our @ISA = ('Animal');
package main;
my $d = Dog->new;
print $d->isa('Animal') ? "isa\\n" : "no\\n";
print Dog->can('new') ? "can new\\n" : "cannot\\n";`, notes: [{ at: "isa", text: "class membership test" }, { at: "can", text: "method lookup" }] }
          ]
        }
      ]
    },
    {
      id: "sort-map-grep",
      n: 11,
      title: "sort, map, grep",
      concepts: [
        {
          id: "sorting", n: 1, title: "sorting", level: 1,
          gloss: "Orders lists with sort and a comparison block.",
          examples: [
            { code: `my @nums = (10, 9, 100, 1);
print join(",", sort @nums), "\\n";
print join(",", sort { $a <=> $b } @nums), "\\n";`, notes: [{ at: "sort", text: "string order by default" }, { at: "<=>", text: "numeric comparison" }] },
            { code: `my @words = qw(pear fig apple);
print join(" ", sort { length($a) <=> length($b) } @words), "\\n";
print join(" ", sort { $b cmp $a } @words), "\\n";`, notes: [{ at: "cmp", text: "string comparison" }] },
            { code: `my %age = (ada => 36, linus => 54, grace => 30);
for my $n (sort { $age{$a} <=> $age{$b} } keys %age) {
    print "$n $age{$n}\\n";
}`, notes: [{ at: "$age{$a}", text: "$a and $b are the pair" }] }
          ]
        },
        {
          id: "map", n: 2, title: "map", level: 1,
          gloss: "Transforms each element of a list with a block.",
          examples: [
            { code: `my @squares = map { $_ * $_ } (1 .. 5);
print "@squares\\n";`, notes: [{ at: "map", text: "builds a new list" }] },
            { code: `my @names = qw(ada grace);
my %length = map { $_ => length($_) } @names;
print join(",", map { "$_=$length{$_}" } sort keys %length), "\\n";`, notes: [{ at: "$_ =>", text: "list becomes a hash" }] },
            { code: `my @pairs = map { [$_, $_ * 2] } (1 .. 3);
print join(" ", map { "$_->[0]:$_->[1]" } @pairs), "\\n";`, notes: [] }
          ]
        },
        {
          id: "grep", n: 3, title: "grep", level: 1,
          gloss: "Selects the elements for which a block or pattern is true.",
          examples: [
            { code: `my @nums = (1 .. 10);
my @even = grep { $_ % 2 == 0 } @nums;
print "@even\\n";`, notes: [{ at: "grep", text: "keeps matching elements" }] },
            { code: `my @words = qw(apple avocado banana);
my @a = grep { /^a/ } @words;
print scalar(@a), "\\n";`, notes: [] },
            { code: `my @list = (3, 8, 1);
my ($first_big) = grep { $_ > 5 } @list;
print "$first_big\\n";
print scalar(grep { $_ > 2 } @list), "\\n";`, notes: [{ at: "scalar(grep {", text: "count of matches" }] }
          ]
        },
        {
          id: "combining", n: 4, title: "combining sort, map and grep", level: 2,
          gloss: "Chains list operators and uses List::Util for folds and uniqueness.",
          examples: [
            { code: `my @words = qw(pear fig banana);
my @sorted = map { $_->[1] }
             sort { $a->[0] <=> $b->[0] }
             map { [length($_), $_] } @words;
print "@sorted\\n";`, notes: [{ at: "sort { $a->[0]", text: "sorts by a precomputed key" }] },
            { code: `use List::Util qw(reduce);
my $product = reduce { $a * $b } 1 .. 5;
print "$product\\n";`, notes: [{ at: "reduce", text: "folds a list" }] },
            { code: `my @uniq = do { my %s; grep { !$s{$_}++ } qw(a b a c b) };
print "@uniq\\n";`, notes: [{ at: "!$s{$_}++", text: "true the first time only" }] }
          ]
        }
      ]
    },
    {
      id: "here-docs-context",
      n: 12,
      title: "here-docs & context",
      concepts: [
        {
          id: "here-docs", n: 1, title: "here-docs", level: 1,
          gloss: "Writes multiline text with heredoc terminators.",
          examples: [
            { code: `my $name = "ada";
print <<"END";
Dear $name,
welcome aboard.
END`, notes: [{ at: "<<\"END\"", text: "interpolating heredoc" }] },
            { code: `print <<'END';
No $interpolation here.
END`, notes: [{ at: "<<'END'", text: "literal heredoc" }] },
            { code: `my $text = <<~EOT;
    indented body
      keeps relative indent
    EOT
print $text;`, notes: [{ at: "<<~", text: "strips common indent" }] }
          ]
        },
        {
          id: "scalar-list-context", n: 2, title: "scalar and list context", level: 1,
          gloss: "Evaluates expressions differently depending on whether a scalar or list is wanted.",
          examples: [
            { code: `my @items = (1, 2, 3);
my $count = @items;
my ($first) = @items;
print "$count $first\\n";`, notes: [{ at: "my $count = @items", text: "scalar context, the length" }, { at: "my ($first) =", text: "list context, the element" }] },
            { code: `my @a = (4, 5, 6);
print "n=" . @a . "\\n";
print "last=$a[-1] size=\${\\ scalar(@a)}\\n";`, notes: [{ at: ". @a .", text: "concatenation forces scalar context" }] },
            { code: `my @t = gmtime(0);
my $when = gmtime(0);
print "$t[5] $when\\n";`, notes: [{ at: "gmtime", text: "list or string by context" }] }
          ]
        },
        {
          id: "context-functions", n: 3, title: "context-sensitive functions", level: 2,
          gloss: "Reverses strings or lists and counts list assignments.",
          examples: [
            { code: `print scalar reverse("abc"), "\\n";
print reverse("abc"), "\\n";`, notes: [{ at: "scalar reverse", text: "reverses characters" }] },
            { code: `my @list = (1) x 3;
my $n = () = (1, 2, 3, 4);
print "@list $n\\n";`, notes: [{ at: "() =", text: "counts the right side" }] },
            { code: `my @words = qw(a b c);
my $last = $words[-1];
my $len = scalar(@words);
print "$last $len $#words\\n";`, notes: [] }
          ]
        },
        {
          id: "special-variables", n: 4, title: "special variables", level: 2,
          gloss: "Uses $_, @ARGV and $@ for implicit and error values.",
          examples: [
            { code: `for (qw(a b)) {
    print;
    print "\\n";
}`, notes: [{ at: "print", text: "prints $_ when bare" }] },
            { code: `local @ARGV = ("one", "two");
print scalar(@ARGV), " $ARGV[0]\\n";`, notes: [{ at: "@ARGV", text: "command-line arguments" }] },
            { code: `my $ok = eval { die "boom\\n"; 1 };
print "error: $@" unless $ok;`, notes: [{ at: "eval", text: "traps die" }, { at: "$@", text: "the error message" }] }
          ]
        }
      ]
    }
  ]
};
