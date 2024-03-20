// DO NOT EDIT! This test has been generated by /html/canvas/tools/gentest.py.
// OffscreenCanvas test in a worker:2d.canvas.context.unrecognised.badsuffix
// Description:Context name "2d" plus a suffix is unrecognised
// Note:

importScripts("/resources/testharness.js");
importScripts("/html/canvas/resources/canvas-tests.js");

var t = async_test("Context name \"2d\" plus a suffix is unrecognised");
var t_pass = t.done.bind(t);
var t_fail = t.step_func(function(reason) {
    throw reason;
});
t.step(function() {

  var canvas = new OffscreenCanvas(100, 50);
  var ctx = canvas.getContext('2d');

  var offscreenCanvas2 = new OffscreenCanvas(100, 50);
  assert_throws_js(TypeError, function() { offscreenCanvas2.getContext("2d#"); });
  t.done();
});
done();
