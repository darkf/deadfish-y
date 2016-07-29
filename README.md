**Deadfish y** (DFy) is a variant of [Deadfish](https://esolangs.org/wiki/Deadfish) and [Deadfish x](https://esolangs.org/wiki/Deadfish_x) which fixes design oversights and extends the languages to support implicit function arguments.

Instead of having a single global value which is operated upon by commands, in DFy the operations act upon the function-local value, referred to here as `x`.

So, `iiio` works as you would expect in Deadfish, but in `XfiiioX Cf ii Cf`, the function `f` does not modify the outer (global) value of `x` (though `x` is inherited to `f`.)

Here is a list of commands:

| Command | Description                                                                 |
| ------- |-----------------------------------------------------------------------------|
| i       | Increment x                                                                 |
| o       | Output x as an integer                                                      |
| Xf...X  | Defines a function `f` (any letter), whose body follows, terminated by `X`  |
| Cf      | Call `f`, the callee inheriting the current value of `x`                    |
| ta      | Swaps the current value of `x` with the variable `a` (initially zero)       |

Examples
========

`XfiiioX Cf ii Cf` -- `f` adds three to its input and outputs it. It's called once with `x=0`, then again with `x=2`.


`XfiiitaX ii Cf ta o` -- `f` adds three to its input, then writes the result to the variable `a`. It is called with `x=2` and then `a` is output.


`XftaiiitaX iiiii ta Cf ta o` -- `f` increments `a` by three. It is called with `a=5`, then `a` is printed.