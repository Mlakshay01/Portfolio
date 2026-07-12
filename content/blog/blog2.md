---
title: "Why `scanf` / `printf` Are Faster Than `cin` / `cout` (and How to Make `cin` / `cout` Fast)"
excerpt: "Many competitive programmers begin every solution with `ios::sync_with_stdio(false);` and `cin.tie(nullptr);` without fully understanding why. This article explores how C++ streams work, why `scanf` and `printf` are faster by default, and how two simple lines of code make `cin` and `cout` just as fast for high-volume input and output."
slug: "why-scanf-printf-are-faster-than-cin-cout"
date: "2026-07-12"
author: "Lakshay Malik"
tags: ["C++", "Competitive Programming", "Performance", "Input/Output"]
---

# The Question

Why are `scanf` and `printf` often recommended over `cin` and `cout` when processing millions of inputs and outputs?

---

# Core Insight

The performance difference is **not because C is inherently faster than C++**.

Instead, it comes from the additional features that C++ streams enable by default, such as stream synchronization and automatic flushing. These features improve safety and usability but introduce extra overhead.

With a few configuration changes, `cin` and `cout` can achieve performance comparable to—or even better than—`scanf` and `printf` in many scenarios.

---

# Why `scanf` and `printf` Are Faster by Default

## 1. Stream Synchronization Overhead

By default, C++ synchronizes its standard streams with C's standard I/O.

```cpp
cin  <--> stdin
cout <--> stdout
```

This synchronization allows code like:

```cpp
cin >> x;
scanf("%d", &y);
```

to work correctly without unexpected ordering or buffering issues.

However, maintaining synchronization introduces overhead for every input and output operation.

---

## What Is Flushing?

Before understanding automatic flushing, we first need to understand **what flushing actually means**.

When your program prints something using `cout`, it usually **doesn't write directly to the console immediately**.

Instead, the output is first placed inside an **output buffer**, which is simply a temporary area in memory.

```text
Program
   │
   ▼
Output Buffer
   │
   ▼
Console
```

The idea behind buffering is efficiency.

Imagine printing one million lines.

Without buffering, the program would have to communicate with the operating system one million separate times.

Instead, the output buffer collects many characters and sends them to the operating system in large chunks, significantly reducing the number of expensive system calls.

**Flushing** means forcing the contents of this buffer to be written immediately to the console (or another output device), even if the buffer isn't full yet.

For example,

```cpp
cout << "Hello";
```

The word **Hello** may remain inside the output buffer for a short time.

When a flush occurs,

```text
Output Buffer
     │
     ▼
Console
```

the buffered data is immediately displayed.

While flushing is necessary in some situations (such as interactive programs), flushing too frequently destroys the performance benefits of buffering.

## 2. Automatic Flushing

By default, `cin` is tied to `cout`.

Before every input operation,

```cpp
cin >> x;
```

C++ automatically flushes `cout` so that any pending output becomes visible before waiting for user input.

This behavior is useful for interactive console applications but unnecessary in competitive programming, where input and output are usually separate.

Another common source of slowdown is:

```cpp
cout << x << endl;
```

`endl` performs two operations:

- Prints a newline.
- Flushes the output buffer immediately.

Flushing after every line becomes expensive when printing thousands or millions of lines.

Instead, use:

```cpp
cout << x << '\n';
```

This prints a newline without forcing an immediate flush.

---

## 3. C++ Stream Architecture

`cin` and `cout` are full-featured C++ stream objects.

They support:

- Type-safe operations
- Operator overloading
- Locale-aware formatting
- Stream manipulators
- Extensibility

These abstractions make C++ streams more expressive and safer but also introduce additional overhead.

In contrast, `scanf` and `printf` are comparatively lightweight.

```cpp
scanf("%d", &x);
printf("%d\n", x);
```

They rely on format strings and perform fewer abstractions, making them faster by default.

---

# Making `cin` and `cout` Fast

Add the following lines at the beginning of `main()`:

```cpp
ios::sync_with_stdio(false);
cin.tie(nullptr);
```

---

## What They Do

### `ios::sync_with_stdio(false);`

Disables synchronization between C and C++ standard streams.

Result:

- Removes synchronization overhead.
- Significantly improves I/O performance.
- Do **not** mix `scanf`/`printf` with `cin`/`cout` afterward because their buffers are no longer synchronized.

---

### `cin.tie(nullptr);`

Unties `cin` from `cout`.

Result:

- `cout` is no longer flushed automatically before every input operation.
- Reduces unnecessary flushing and improves performance.

---

### Prefer `'\n'` Over `endl`

Use:

```cpp
'\n'
```

instead of

```cpp
endl
```

unless an immediate flush is actually required.

---

# Recommended Competitive Programming Template

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {

    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    // Your code

    return 0;
}
```

---
---

# Benchmark

To observe the impact of these optimizations, I wrote two simple C++ programs that print integers from **1** to **1,000,000**.

The default version uses standard C++ I/O, while the optimized version enables Fast I/O and replaces `std::endl` with `'\n'`.

Execution time was measured using `std::chrono::high_resolution_clock`.

### Default C++ I/O

![Default Benchmark](/images/blog2/default-benchmark.png)

*Figure 1: Execution time using the default C++ I/O configuration.*

---

### Optimized C++ I/O

![Fast I/O Benchmark](/images/blog2/fast-benchmark.png)

*Figure 2: Execution time after enabling Fast I/O and replacing `std::endl` with `'\n'`.*

---

### Results

| Version | Execution Time |
| :------- | -------------: |
| Default C++ Streams | **210,233 ms** |
| Optimized C++ Streams (Fast I/O) | **2,641 ms** |

The optimized version completed the benchmark in **2.64 seconds**, while the default version took **210.23 seconds**, making it approximately **80× faster** in this output-heavy benchmark.

> **Note:** This benchmark demonstrates the combined effect of disabling stream synchronization (`ios::sync_with_stdio(false)`), avoiding unnecessary flushing, and replacing `std::endl` with `'\n'`. The exact speedup depends on the compiler, standard library implementation, operating system, hardware, and workload.

# Mental Model

Think of it like this:

### `scanf` / `printf`

Lightweight workers that simply perform the requested input or output.

---

### Default `cin` / `cout`

Powerful workers that also handle:

- Stream synchronization
- Automatic flushing
- Formatting
- Type-safe stream operations
- Locale support

These extra responsibilities introduce additional overhead.

---

### Optimized `cin` / `cout`

After disabling synchronization and untying the streams, most of that overhead disappears, allowing them to perform nearly as efficiently as C-style I/O.

---

# Key Takeaways

- `scanf` and `printf` are faster **by default**, not because C is inherently faster than C++.
- The largest performance penalty in default C++ streams comes from synchronization with C streams.
- `cin.tie(nullptr)` avoids unnecessary flushing before input.
- Prefer `'\n'` over `endl` for high-volume output.
- Modern competitive programmers typically use optimized `cin` and `cout` rather than reverting to C-style I/O.

---

# Practical Rule

For competitive programming, begin every solution with:

```cpp
ios::sync_with_stdio(false);
cin.tie(nullptr);
```

and prefer:

```cpp
'\n'
```

instead of:

```cpp
endl
```

unless you explicitly need to flush the output buffer.

These small changes provide fast, clean, and idiomatic C++ I/O suitable for handling very large inputs and outputs.

---

# References

1. **cppreference**
   - https://en.cppreference.com/w/cpp/io/ios_base/sync_with_stdio
   - https://en.cppreference.com/w/cpp/io/basic_ios/tie
   - https://en.cppreference.com/w/cpp/io/manip/endl

2. **ISO C++ Standard Library Documentation**
   - Input/Output Library

3. **International Olympiad in Informatics (IOI)**
   - Standard Input and Output
   - https://ioinformatics.org/

4. **Benchmark**
   - Execution times reported in this article were measured by the author using GCC (MinGW) on Windows with `std::chrono::high_resolution_clock`.