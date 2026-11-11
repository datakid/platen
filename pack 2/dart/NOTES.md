Verified with Dart SDK 3.13.7 using `dart analyze` (errors only) on every example, as top-level code or wrapped in `main` when it holds statements.
Topics 14 and 15 use `StatelessWidget` and `StatefulWidget` and assume `import 'package:flutter/material.dart';`; they were analyzed against a small local stub of those classes, not the real Flutter SDK.
Examples were analyzed, not run; initState and dispose bodies are written on one line to fit the 12-line limit.
