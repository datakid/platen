Unverified: no Swift toolchain (swiftc) was available in the build environment, so none of the 168 examples were compiled or run.
Written against Swift 5.10 using only standard library APIs (no Foundation); `Task.sleep(for:)` needs Swift 5.7 or newer, and top-level `await` assumes a main.swift script file.
Please run `swiftc` over the examples before relying on them; examples that define the same type name are independent files.
