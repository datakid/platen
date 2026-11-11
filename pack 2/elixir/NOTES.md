Verified with Elixir 1.20.5 on Erlang/OTP 27 (conda-forge): all 156 examples run as separate scripts with `elixir`, exit code 0 and no compiler warnings other than unused variables.
Struct literals are created inside the module that defines the struct, or with struct/2, because a script file is compiled as a whole before it runs; processes started by examples end when the script ends.
meta.json uses version 1.20, the newer stable toolchain, instead of the 1.16 floor; the lexer treats `#` as a comment everywhere, so no example contains one.
