// DO NOT EDIT! This test has been generated by /html/canvas/tools/gentest.py.
// OffscreenCanvas test in a worker:2d.fillStyle.get.transparent
// Description:
// Note:

importScripts("/resources/testharness.js");
importScripts("/html/canvas/resources/canvas-tests.js");

var t = async_test("");
var t_pass = t.done.bind(t);
var t_fail = t.step_func(function(reason) {
    throw reason;
});
t.step(function() {

  var canvas = new OffscreenCanvas(100, 50);
  var ctx = canvas.getContext('2d');

  ctx.fillStyle = 'rgba(0,0,0,0)';
  _assertSame(ctx.fillStyle, 'rgba(0, 0, 0, 0)', "ctx.fillStyle", "'rgba(0, 0, 0, 0)'");
  t.done();
});
done();
