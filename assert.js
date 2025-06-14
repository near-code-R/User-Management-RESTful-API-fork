import assert, { AssertionError } from 'node:assert/strict';
try {
    assert.deepEqual({ name: 'oke' }, { name: 'oke' }, 'ini harusnya 1');
    assert.match("hallo", /pass/)
} catch (error) {
    console.log(error);
}
process.on("exit", (num) => {
    console.log("done");
})