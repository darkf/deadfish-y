/* ISC License

Copyright (c) 2016 darkf

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. 

IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT,
OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE,
DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER
TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE
OF THIS SOFTWARE. */

"use strict";

function newContext() {
    return {x: 0, stack: [], lastChar: null, fn: null, name: null, env: {}};
}

function evalc(ctx, c) {
    if(ctx.name === "") {
        ctx.name = c;
        ctx.lastChar = "";
        return;
    }
    if(ctx.fn !== null) {
        if(c === "X") {
            ctx.env[ctx.name] = ctx.fn;
            ctx.fn = ctx.name = null;
            return;
        }

        ctx.fn += c;
        return;
    }
    if(ctx.lastChar === "C") { // call
        ctx.lastChar = "";
        ctx.stack.push(ctx.x);
        run(ctx.env[c], ctx);
        ctx.x = ctx.stack.pop();
        return;
    }
    else if(ctx.lastChar === "t") { // swap x with var
        if(ctx.env[c] === undefined)
            ctx.env[c] = 0;
        const y = ctx.env[c];
        ctx.env[c] = ctx.x;
        ctx.x = y;
        ctx.lastChar = "";
        return;
    }

    switch(c) {
        case 'i': ctx.x++; break;
        case 'o': console.log(ctx.x); break;
        case 'X': ctx.fn = ctx.name = ""; break; // start a function
        case 'C': break; // call
        case 't': break; // swap
    }

    if(ctx.fn === null)
        ctx.lastChar = c;
}

function run(s, ctx) {
    ctx = ctx || newContext();
    for(let c of s)
        evalc(ctx, c);
    return ctx;
}

run("XfiiioX Cf ii Cf");
run("XfiiitaX ii Cf ta o");
run("XftaiiitaX iiiii ta Cf ta o");