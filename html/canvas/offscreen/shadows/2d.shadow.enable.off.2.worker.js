// DO NOT EDIT! This test has been generated by /html/canvas/tools/gentest.py.
// OffscreenCanvas test in a worker:2d.shadow.enable.off.2
// Description:Shadows are not drawn when only shadowColor is set
// Note:

importScripts("/resources/testharness.js");
importScripts("/html/canvas/resources/canvas-tests.js");

var t = async_test("Shadows are not drawn when only shadowColor is set");
var t_pass = t.done.bind(t);
var t_fail = t.step_func(function(reason) {
    throw reason;
});
t.step(function() {

  var canvas = new OffscreenCanvas(100, 50);
  var ctx = canvas.getContext('2d');

  ctx.globalCompositeOperation = 'destination-atop';
  ctx.shadowColor = '#f00';
  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  _assertPixel(canvas, 50,25, 0,255,0,255);
  t.done();
});
done();
