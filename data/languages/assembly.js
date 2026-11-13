export default {
  id: "assembly",
  name: "x86 Assembly",
  short: "ASM",
  pigment: "assembly",
  family: null,
  version: "NASM 2.16",
  lexer: "assembly",
  indent: 4,
  topics: [
    {
      id: "registers",
      n: 1,
      title: "registers",
      concepts: [
        {
          id: "general-registers", n: 1, title: "general-purpose registers", level: 1,
          gloss: "Loads values into the 64-bit general-purpose registers.",
          examples: [
            { code: `mov rax, 42
mov rbx, 7
mov rcx, 0
mov rdx, 255`, notes: [{ at: "mov", text: "copies the second operand" }] },
            { code: `mov r8, 100
mov r9, 200
mov r10, 300`, notes: [] },
            { code: `mov rax, 1
mov rdi, 2
mov rsi, 3
mov rdx, 4`, notes: [] }
          ]
        },
        {
          id: "sub-registers", n: 2, title: "sub-registers", level: 1,
          gloss: "Reaches the low 32, 16 and 8 bits of a register through its alternate names.",
          examples: [
            { code: `mov rax, 0x1122334455667788
mov ecx, eax
mov dx, ax
mov bl, al`, notes: [{ at: "ecx", text: "low 32 bits of rcx" }, { at: "bl", text: "low 8 bits of rbx" }] },
            { code: `mov rax, -1
mov eax, 5`, notes: [{ at: "eax", text: "clears the upper 32 bits" }] },
            { code: `mov rbx, 0xABCD
mov al, bh
mov ah, bl`, notes: [] }
          ]
        },
        {
          id: "zeroing", n: 3, title: "zeroing a register", level: 1,
          gloss: "Clears a register with xor on itself, which is shorter than moving zero.",
          examples: [
            { code: `xor eax, eax
xor ecx, ecx`, notes: [{ at: "xor eax, eax", text: "sets rax to zero" }] },
            { code: `mov rbx, 99
xor ebx, ebx`, notes: [] },
            { code: `xor edi, edi
xor esi, esi
xor edx, edx`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "moving-data",
      n: 2,
      title: "moving data",
      concepts: [
        {
          id: "mov-forms", n: 1, title: "mov forms", level: 1,
          gloss: "Copies an immediate, a register or a memory value into a register.",
          examples: [
            { code: `mov rax, 5
mov rbx, rax
mov [rsp - 8], rbx
mov rcx, [rsp - 8]`, notes: [{ at: "[rsp - 8]", text: "memory operand" }] },
            { code: `mov dword [rsp - 4], 100
mov eax, [rsp - 4]`, notes: [{ at: "dword", text: "operand size" }] },
            { code: `mov qword [rsp - 16], 7
mov byte [rsp - 8], 1
mov rdx, [rsp - 16]`, notes: [] }
          ]
        },
        {
          id: "extend", n: 2, title: "movzx and movsx", level: 2,
          gloss: "Widens a smaller value with zero extension or sign extension.",
          examples: [
            { code: `mov al, 200
movzx ebx, al`, notes: [{ at: "movzx", text: "zero extend" }] },
            { code: `mov al, 0xF0
movsx rcx, al`, notes: [{ at: "movsx", text: "sign extend" }] },
            { code: `mov eax, -5
movsxd rbx, eax
mov cx, 300
movzx edx, cx`, notes: [] }
          ]
        },
        {
          id: "lea-xchg", n: 3, title: "lea and xchg", level: 2,
          gloss: "Computes an address with lea and swaps two operands with xchg.",
          examples: [
            { code: `mov rbx, 100
lea rax, [rbx + 8]`, notes: [{ at: "lea", text: "address arithmetic, no load" }] },
            { code: `mov rcx, 5
lea rdx, [rcx + rcx * 4]`, notes: [] },
            { code: `mov rax, 1
mov rbx, 2
xchg rax, rbx`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "arithmetic",
      n: 3,
      title: "arithmetic",
      concepts: [
        {
          id: "add-sub", n: 1, title: "add, sub, inc and dec", level: 1,
          gloss: "Adds and subtracts values and steps a value up or down by one.",
          examples: [
            { code: `mov rax, 10
add rax, 5
sub rax, 3`, notes: [{ at: "add", text: "destination plus source" }] },
            { code: `mov rcx, 9
inc rcx
dec rcx
dec rcx`, notes: [] },
            { code: `mov rax, 100
mov rbx, 25
sub rax, rbx
add rax, rbx
add rax, 1`, notes: [] }
          ]
        },
        {
          id: "mul-div", n: 2, title: "multiplication and division", level: 2,
          gloss: "Multiplies with imul and divides rdx:rax with idiv or div.",
          examples: [
            { code: `mov rax, 6
mov rbx, 7
imul rax, rbx`, notes: [{ at: "imul", text: "signed multiply" }] },
            { code: `mov rax, 17
xor edx, edx
mov rcx, 5
div rcx`, notes: [{ at: "edx", text: "cleared before dividing" }] },
            { code: `mov rax, -17
cqo
mov rcx, 5
idiv rcx`, notes: [{ at: "cqo", text: "sign extends rax into rdx" }] }
          ]
        },
        {
          id: "neg-scale", n: 3, title: "neg and scaling", level: 2,
          gloss: "Negates a value and scales it by powers of two with shifts.",
          examples: [
            { code: `mov rax, 8
neg rax`, notes: [] },
            { code: `mov rax, 5
shl rax, 3`, notes: [{ at: "shl rax, 3", text: "multiply by eight" }] },
            { code: `mov rax, -64
sar rax, 2
mov rbx, 64
shr rbx, 4`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "bitwise",
      n: 4,
      title: "bitwise operations",
      concepts: [
        {
          id: "logic-ops", n: 1, title: "and, or, xor and not", level: 1,
          gloss: "Combines bits with and, or, xor and not.",
          examples: [
            { code: `mov eax, 0b1100
mov ebx, 0b1010
and eax, ebx`, notes: [{ at: "and", text: "keeps bits set in both" }] },
            { code: `mov eax, 0b0101
or eax, 0b0010
xor eax, 0b1111`, notes: [] },
            { code: `mov eax, 0xF0
not eax
and eax, 0xFF`, notes: [] }
          ]
        },
        {
          id: "shifts-rotates", n: 2, title: "shifts and rotates", level: 2,
          gloss: "Moves bits left or right with shifts and wraps them around with rotates.",
          examples: [
            { code: `mov eax, 1
shl eax, 4
shr eax, 2`, notes: [] },
            { code: `mov eax, 0x80000001
rol eax, 1
ror eax, 1`, notes: [{ at: "rol", text: "rotate left" }] },
            { code: `mov rax, -8
sar rax, 1
shr rax, 60`, notes: [] }
          ]
        },
        {
          id: "bit-tests", n: 3, title: "test and bit tests", level: 2,
          gloss: "Checks and changes single bits with test, bt, bts and btr.",
          examples: [
            { code: `mov eax, 0b1000
test eax, 0b1000`, notes: [{ at: "test", text: "and without storing" }] },
            { code: `mov eax, 0b0100
bt eax, 2`, notes: [{ at: "bt", text: "copies a bit to the carry flag" }] },
            { code: `mov eax, 0
bts eax, 5
btr eax, 5`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "flags",
      n: 5,
      title: "flags and comparison",
      concepts: [
        {
          id: "cmp", n: 1, title: "cmp", level: 1,
          gloss: "Subtracts two operands without storing the result and sets the flags.",
          examples: [
            { code: `mov rax, 10
cmp rax, 10`, notes: [{ at: "cmp", text: "sets the zero flag when equal" }] },
            { code: `mov rax, 3
cmp rax, 7`, notes: [] },
            { code: `mov rcx, 100
cmp rcx, 50`, notes: [] }
          ]
        },
        {
          id: "test-zero", n: 2, title: "test and the zero flag", level: 1,
          gloss: "Checks a value for zero with test and sets the flags from an and.",
          examples: [
            { code: `xor eax, eax
test eax, eax`, notes: [{ at: "test eax, eax", text: "zero flag set if zero" }] },
            { code: `mov ebx, 6
test ebx, 1`, notes: [] },
            { code: `mov rcx, 0xFF00
test rcx, 0xFF`, notes: [] }
          ]
        },
        {
          id: "setcc-cmov", n: 3, title: "setcc and cmov", level: 2,
          gloss: "Turns a flag into a byte with setcc or picks a value with cmovcc.",
          examples: [
            { code: `mov rax, 4
cmp rax, 4
sete bl`, notes: [{ at: "sete", text: "byte becomes one if equal" }] },
            { code: `mov rax, 9
mov rbx, 5
cmp rax, rbx
setg cl`, notes: [] },
            { code: `mov rax, 3
mov rbx, 8
cmp rax, rbx
cmovl rax, rbx`, notes: [{ at: "cmovl", text: "move only if less" }] }
          ]
        }
      ]
    },
    {
      id: "jumps",
      n: 6,
      title: "jumps and branches",
      concepts: [
        {
          id: "unconditional", n: 1, title: "labels and jmp", level: 1,
          gloss: "Transfers control to a label with jmp.",
          examples: [
            { code: `mov rax, 1
jmp skip
mov rax, 2
skip:
mov rbx, 3`, notes: [{ at: "skip:", text: "label" }] },
            { code: `jmp start
mov rax, 99
start:
mov rax, 1`, notes: [] },
            { code: `mov rcx, 5
jmp done
inc rcx
done:
dec rcx`, notes: [] }
          ]
        },
        {
          id: "conditional-jumps", n: 2, title: "conditional jumps", level: 1,
          gloss: "Jumps when a flag condition holds, using je, jne, jl, jg, ja and jb.",
          examples: [
            { code: `mov rax, 5
cmp rax, 5
je same
mov rbx, 0
same:
mov rbx, 1`, notes: [{ at: "je", text: "jump if equal" }] },
            { code: `mov rax, 3
cmp rax, 8
jl less
mov rbx, 0
less:
mov rbx, 1`, notes: [{ at: "jl", text: "signed less than" }] },
            { code: `mov rax, 9
cmp rax, 4
ja above
mov rbx, 0
above:
mov rbx, 1`, notes: [{ at: "ja", text: "unsigned above" }] }
          ]
        },
        {
          id: "if-else", n: 3, title: "if and else patterns", level: 2,
          gloss: "Builds an if and else from cmp, a conditional jump and an unconditional jump.",
          examples: [
            { code: `mov rax, 7
cmp rax, 10
jge big
mov rbx, 0
jmp done
big:
mov rbx, 1
done:`, notes: [] },
            { code: `mov rax, 0
test rax, rax
jnz nonzero
mov rbx, 100
jmp finish
nonzero:
mov rbx, 200
finish:`, notes: [] },
            { code: `mov rax, -3
test rax, rax
jns positive
neg rax
positive:`, notes: [{ at: "jns", text: "jump if not sign" }] }
          ]
        }
      ]
    },
    {
      id: "loops",
      n: 7,
      title: "loops",
      concepts: [
        {
          id: "counting-loops", n: 1, title: "counting loops", level: 1,
          gloss: "Repeats a block by decrementing a counter and jumping while it is not zero.",
          examples: [
            { code: `mov rcx, 5
xor eax, eax
again:
add rax, rcx
dec rcx
jnz again`, notes: [{ at: "jnz", text: "repeat until zero" }] },
            { code: `mov ecx, 3
mov eax, 1
double:
add eax, eax
dec ecx
jnz double`, notes: [] },
            { code: `mov rbx, 10
spin:
sub rbx, 3
jg spin`, notes: [] }
          ]
        },
        {
          id: "loop-instruction", n: 2, title: "the loop instruction", level: 2,
          gloss: "Repeats a block rcx times with the loop instruction.",
          examples: [
            { code: `mov rcx, 4
xor eax, eax
next:
inc rax
loop next`, notes: [{ at: "loop", text: "decrement rcx, jump if nonzero" }] },
            { code: `mov rcx, 6
mov rax, 1
grow:
add rax, rax
loop grow`, notes: [] },
            { code: `mov rcx, 3
xor ebx, ebx
count:
add rbx, rcx
loop count`, notes: [] }
          ]
        },
        {
          id: "array-loops", n: 3, title: "looping over arrays", level: 2,
          gloss: "Walks an array in memory with an index register scaled by the element size.",
          examples: [
            { code: `section .data
nums dq 3, 5, 9
section .text
global _start
_start:
    xor eax, eax
    xor ecx, ecx
sum:
    add rax, [nums + rcx * 8]
    inc rcx
    cmp rcx, 3
    jne sum`, notes: [{ at: "rcx * 8", text: "index times element size" }] },
            { code: `section .data
bytes db 1, 2, 3, 4
section .text
global _start
_start:
    xor eax, eax
    mov ecx, 4
again:
    movzx edx, byte [bytes + rcx - 1]
    add eax, edx
    loop again`, notes: [] },
            { code: `section .data
vals dd 10, 20, 30
section .text
global _start
_start:
    mov eax, 0
    mov ecx, 0
top:
    add eax, [vals + rcx * 4]
    inc ecx
    cmp ecx, 3
    jb top`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "data",
      n: 8,
      title: "defining data",
      concepts: [
        {
          id: "data-types", n: 1, title: "db, dw, dd and dq", level: 1,
          gloss: "Defines initialized bytes, words, doublewords and quadwords.",
          examples: [
            { code: `section .data
count db 7
limit dw 1000
total dd 70000
big dq 5000000000`, notes: [{ at: "db", text: "one byte" }, { at: "dq", text: "eight bytes" }] },
            { code: `section .data
flags db 1, 0, 1, 1
primes dd 2, 3, 5, 7, 11`, notes: [] },
            { code: `section .data
ratio dd 1.5
scale dq 2.25`, notes: [] }
          ]
        },
        {
          id: "strings-equ", n: 2, title: "strings and constants", level: 1,
          gloss: "Defines strings with db and computes their length with equ.",
          examples: [
            { code: `section .data
msg db "Hello, Oslo", 10
len equ $ - msg`, notes: [{ at: "$ - msg", text: "bytes since msg" }] },
            { code: `section .data
name db "Ada", 0
version db "v1.0", 0`, notes: [] },
            { code: `STDOUT equ 1
SYS_WRITE equ 1
SYS_EXIT equ 60`, notes: [] }
          ]
        },
        {
          id: "reserve-times", n: 3, title: "reserved space and times", level: 2,
          gloss: "Reserves uninitialized space with resb and resq or repeats data with times.",
          examples: [
            { code: `section .bss
buffer resb 64
counter resd 1`, notes: [{ at: "resb", text: "reserve bytes" }] },
            { code: `section .bss
matrix resq 16
flag resb 1`, notes: [] },
            { code: `section .data
table times 8 dd 0
pad times 4 db 0xFF`, notes: [{ at: "times", text: "repeats the definition" }] }
          ]
        }
      ]
    },
    {
      id: "addressing",
      n: 9,
      title: "addressing",
      concepts: [
        {
          id: "base-index", n: 1, title: "base, index and scale", level: 2,
          gloss: "Forms an address from a base, an index scaled by 1, 2, 4 or 8, and an offset.",
          examples: [
            { code: `section .data
nums dd 10, 20, 30, 40
section .text
    mov ecx, 2
    mov eax, [nums + rcx * 4]`, notes: [{ at: "rcx * 4", text: "scaled index" }] },
            { code: `mov rbx, rsp
mov rcx, 2
lea rax, [rbx + rcx * 8 + 16]`, notes: [] },
            { code: `mov rsi, rsp
mov rdi, 1
mov [rsi + rdi * 4 - 8], edi`, notes: [] }
          ]
        },
        {
          id: "size-specifiers", n: 2, title: "size specifiers", level: 1,
          gloss: "Names the operand size with byte, word, dword or qword when memory is the only operand.",
          examples: [
            { code: `mov byte [rsp - 1], 255
mov word [rsp - 4], 1000`, notes: [{ at: "byte", text: "one byte" }] },
            { code: `mov dword [rsp - 8], 0
mov qword [rsp - 16], 1`, notes: [] },
            { code: `add dword [rsp - 8], 5
inc qword [rsp - 16]`, notes: [] }
          ]
        },
        {
          id: "rip-relative", n: 3, title: "labels and rip-relative addresses", level: 3,
          gloss: "Reads a labelled value by an address relative to the instruction pointer.",
          examples: [
            { code: `default rel
section .data
count dq 12
section .text
    mov rax, [count]`, notes: [{ at: "default rel", text: "rip-relative by default" }] },
            { code: `section .data
msg db "hi", 10
section .text
    lea rsi, [rel msg]`, notes: [{ at: "rel", text: "relative to rip" }] },
            { code: `default rel
section .bss
total resq 1
section .text
    mov qword [total], 5`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "stack",
      n: 10,
      title: "the stack",
      concepts: [
        {
          id: "push-pop", n: 1, title: "push and pop", level: 1,
          gloss: "Saves a value on the stack with push and restores it with pop.",
          examples: [
            { code: `mov rax, 1
mov rbx, 2
push rax
push rbx
pop rax
pop rbx`, notes: [{ at: "push", text: "decrements rsp, stores" }] },
            { code: `push 42
pop rcx`, notes: [] },
            { code: `mov rdx, 7
push rdx
push qword 9
pop rsi
pop rdi`, notes: [] }
          ]
        },
        {
          id: "stack-space", n: 2, title: "rsp and reserved space", level: 2,
          gloss: "Reserves local space by subtracting from rsp and releases it by adding back.",
          examples: [
            { code: `sub rsp, 16
mov qword [rsp], 5
mov qword [rsp + 8], 6
add rsp, 16`, notes: [{ at: "sub rsp, 16", text: "reserve two quadwords" }] },
            { code: `sub rsp, 8
mov dword [rsp], 100
mov eax, [rsp]
add rsp, 8`, notes: [] },
            { code: `mov rax, rsp
sub rsp, 32
add rsp, 32
cmp rax, rsp`, notes: [] }
          ]
        },
        {
          id: "frames", n: 3, title: "stack frames with rbp", level: 2,
          gloss: "Anchors locals at a fixed base with rbp and tears the frame down with leave.",
          examples: [
            { code: `push rbp
mov rbp, rsp
sub rsp, 16
mov qword [rbp - 8], 3
leave`, notes: [{ at: "leave", text: "mov rsp, rbp then pop rbp" }] },
            { code: `push rbp
mov rbp, rsp
mov rax, [rbp]
pop rbp`, notes: [] },
            { code: `push rbp
mov rbp, rsp
sub rsp, 32
mov dword [rbp - 4], 9
mov rsp, rbp
pop rbp`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "procedures",
      n: 11,
      title: "procedures",
      concepts: [
        {
          id: "call-ret", n: 1, title: "call and ret", level: 1,
          gloss: "Calls a procedure with call and returns to the caller with ret.",
          examples: [
            { code: `global _start
_start:
    mov rdi, 21
    call double
    mov edi, eax
    mov eax, 60
    syscall
double:
    lea rax, [rdi * 2]
    ret`, notes: [{ at: "call", text: "pushes the return address" }] },
            { code: `global _start
_start:
    call five
    mov edi, eax
    mov eax, 60
    syscall
five:
    mov eax, 5
    ret`, notes: [] },
            { code: `global _start
_start:
    mov rdi, 3
    call square
    mov edi, eax
    mov eax, 60
    syscall
square:
    mov rax, rdi
    imul rax, rdi
    ret`, notes: [] }
          ]
        },
        {
          id: "sysv-arguments", n: 2, title: "System V arguments", level: 2,
          gloss: "Passes the first arguments in rdi, rsi, rdx, rcx, r8 and r9 and returns in rax.",
          examples: [
            { code: `global _start
_start:
    mov rdi, 4
    mov rsi, 5
    call add2
    mov edi, eax
    mov eax, 60
    syscall
add2:
    lea rax, [rdi + rsi]
    ret`, notes: [{ at: "rdi", text: "first argument" }, { at: "rsi", text: "second argument" }] },
            { code: `global _start
_start:
    mov rdi, 6
    mov rsi, 7
    call mul2
    mov edi, eax
    mov eax, 60
    syscall
mul2:
    mov rax, rdi
    imul rax, rsi
    ret`, notes: [] },
            { code: `global _start
_start:
    mov rdi, 20
    mov rsi, 5
    call diff
    mov edi, eax
    mov eax, 60
    syscall
diff:
    mov rax, rdi
    sub rax, rsi
    ret`, notes: [] }
          ]
        },
        {
          id: "callee-saved", n: 3, title: "preserving registers", level: 3,
          gloss: "Saves and restores rbx, rbp and r12 to r15 because the caller expects them unchanged.",
          examples: [
            { code: `global _start
_start:
    mov rbx, 7
    call work
    mov edi, ebx
    mov eax, 60
    syscall
work:
    push rbx
    mov rbx, 99
    pop rbx
    ret`, notes: [{ at: "push rbx", text: "save callee-saved register" }] },
            { code: `global _start
_start:
    mov r12, 5
    call tweak
    mov edi, r12d
    mov eax, 60
    syscall
tweak:
    push r12
    inc r12
    pop r12
    ret`, notes: [] },
            { code: `global _start
_start:
    call counter
    mov edi, eax
    mov eax, 60
    syscall
counter:
    push rbx
    mov ebx, 42
    mov eax, ebx
    pop rbx
    ret`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "syscalls",
      n: 12,
      title: "system calls",
      concepts: [
        {
          id: "exit", n: 1, title: "exit status", level: 1,
          gloss: "Ends the process with syscall number 60 and an exit code in rdi.",
          examples: [
            { code: `global _start
_start:
    mov eax, 60
    xor edi, edi
    syscall`, notes: [{ at: "60", text: "exit system call number" }] },
            { code: `global _start
_start:
    mov eax, 60
    mov edi, 3
    syscall`, notes: [] },
            { code: `global _start
_start:
    mov rax, 60
    mov rdi, 42
    syscall`, notes: [] }
          ]
        },
        {
          id: "write", n: 2, title: "write to standard output", level: 1,
          gloss: "Prints bytes with syscall number 1 using a file descriptor, a buffer and a length.",
          examples: [
            { code: `section .data
msg db "Hello", 10
section .text
global _start
_start:
    mov eax, 1
    mov edi, 1
    mov esi, msg
    mov edx, 6
    syscall`, notes: [{ at: "mov eax, 1", text: "write system call" }] },
            { code: `section .data
msg db "done", 10
len equ $ - msg
section .text
global _start
_start:
    mov eax, 1
    mov edi, 1
    mov esi, msg
    mov edx, len
    syscall`, notes: [] },
            { code: `section .data
err db "error", 10
section .text
global _start
_start:
    mov eax, 1
    mov edi, 2
    mov esi, err
    mov edx, 6
    syscall`, notes: [{ at: "mov edi, 2", text: "standard error" }] }
          ]
        },
        {
          id: "read", n: 3, title: "read from standard input", level: 2,
          gloss: "Reads bytes into a buffer with syscall number 0 and gets the count in rax.",
          examples: [
            { code: `section .bss
buf resb 64
section .text
global _start
_start:
    xor eax, eax
    xor edi, edi
    mov esi, buf
    mov edx, 64
    syscall`, notes: [{ at: "xor eax, eax", text: "read system call" }] },
            { code: `section .bss
line resb 128
section .text
global _start
_start:
    xor eax, eax
    xor edi, edi
    mov esi, line
    mov edx, 128
    syscall
    mov edi, eax`, notes: [] },
            { code: `section .bss
key resb 1
section .text
global _start
_start:
    xor eax, eax
    xor edi, edi
    mov esi, key
    mov edx, 1
    syscall`, notes: [] }
          ]
        }
      ]
    }
  ]
};
