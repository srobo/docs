---
layout: page
title: Python Troubleshooting
---

# Python Troubleshooting

This is just a selection of common error messages.
If you encounter one that isn't on this list, quickly check your code and search the Internet for it.

<!--- TODO: We should also list common issues with understanding or using the API here. -->

## [Reading the Logs](#ReadingTheLogs) {#ReadingTheLogs}

When your program runs on the robot, the output of `print` statements and any
errors which occur are written to a log file on the USB stick as `log.txt`.

## [Syntax Error](#SyntaxError) {#SyntaxError}

This error message appears when you have entered a statement that doesn't obey the forms of the language.
For example:

~~~~~ python
def foo(s):
	print(s)

foo "Hello World!"  # should be foo("Hello World!")
~~~~~

Error:

~~~~~ not-code
File "<stdin>", line 4
    foo "Hello World!"
                     ^
SyntaxError: invalid syntax
~~~~~

The output shows a problem with the fourth line,
 where we've forgotten to place brackets around the string parameter.
The arrow indicates the place where the interpreter thinks the problem is.
As you can see, this could often be more helpful.

Other causes of syntax errors to look out for are:

* Missing colons at the end of `def`s, `if`s, `for`s, etc.
* Using the wrong number of `=` signs (see the [Variables](#variables) section)
* Missing brackets (e.g. `x = 5 * (3+2`).
* For those outside of the U.K., the decimal point is a period (`.`), not a comma (`,`)

## [Name Error](#NameError) {#NameError}

~~~~~ python
x = 5
print(X)     # wrong case
~~~~~

Error:

~~~~~ not-code
Traceback (most recent call last):
  File "<stdin>", line 2, in <module>
NameError: name 'X' is not defined
~~~~~

This error has occurred because the variable was defined as `x`, but referenced as `X` in uppercase.
As previously alluded to, Python distinguishes between cases, so these are two different variables.

This error has a traceback.
This would list the functions that the error occurred in, if it was inside a function.

## [Index Error](#IndexError) {#IndexError}

If you try to access an element of a list that does not exist, you'll get this error.
For example:

~~~~~ python
a = ["Molly", "Polly", "Dolly"]
print(a[0])
print(a[3])
~~~~~

Error:

~~~~~ not-code
Traceback (most recent call in last):
  File "<stdin>", line 1, in <module>
IndexError: list index out of range
~~~~~

This example illustrates a common cause.
As `a` has three elements, you'd expect it to have a third element.
However, in Python, the 'first' element is number 0, the 'second' is number 1, and so on.
So, the last element in the array is actually number 2, and element number 3 doesn't exist.

## [Indentation Error](#IndentationError) {#IndentationError}

If you forget to indent some code, **or mix tabs and spaces**, you will get an indentation error.
For example:

~~~~~ python
if x < 5:
do_some_stuff()
~~~~~

Error:

~~~~~ not-code
  File "<stdin>", line 2
    do_some_stuff()
                ^
IndentationError: expected an indented block
~~~~~

## [Type Error](#TypeError) {#TypeError}

Variables in Python not only have a value, but also a type. This might be a
string (some characters), an integer (whole number), a float (number with a
decimal point), a robot (your `Robot()` variable) or something else. When you
use these variables, you have to make sure that the types match.

This means that you cannot do something like this:

~~~~~ python
a = "36"
b = 48
c = a + b
~~~~~

Here `a` is a string, and adding it to `b`, which is an integer, is not a valid
operation. You either have to turn the `a` into an integer by doing `int(a)` or
turn `b` into a string by doing `str(b)`.

~~~~~ python
d = int(a) + b  # 84
e = a + str(b)  # "3648"
~~~~~

If you make a mistake while interacting with variables of different types,
you'll get a `TypeError` containing some information about how to fix the
problem.

[identifiers]: #concept-identifiers
[identifier]: #concept-identifiers
[block]: #concept-code-blocks-and-indentation
