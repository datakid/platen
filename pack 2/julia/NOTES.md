Verified with Julia 1.13.3 (conda-forge): all 166 examples run as separate scripts with `julia --startup-file=no`, exit code 0 and no warnings, in a scratch directory; standard library only, no Pkg.add.
The version in meta.json is 1.13, the newer stable toolchain, instead of the 1.10 floor; loops that update variables sit inside functions to avoid the script-scope warning.
Pkg commands such as Pkg.add were left out because they need the network, so the packages topic covers modules, using and import of the standard library.
