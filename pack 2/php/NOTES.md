Verified with PHP 8.3.6 (cli, pdo_sqlite, mbstring): every one of the 172 examples passes `php -l` and runs to exit code 0 with E_ALL and no warnings, with `<?php` prepended.
Examples omit the opening `<?php` tag so plates start at the code; `namespace` and `declare` examples are the first statement after the tag, and PDO examples use in-memory SQLite.
Comments are unsupported in the lexer for `#`; no example needs one, and attributes (`#[...]`) are not used.
