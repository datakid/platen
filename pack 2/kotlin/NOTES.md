Verified with Kotlin 2.4.20 (conda-forge `kotlin`, JDK 25) using `kotlinc`: all 168 examples compile, as top-level code or wrapped in a function when they hold statements; none were run.
Topic 14 (coroutines) assumes `import kotlinx.coroutines.*` and was compiled against a small local stub of that API because kotlinx-coroutines was not available, so it is type-checked only.
meta.json uses version 2.4, the newer stable toolchain, instead of the 2.0 floor.
