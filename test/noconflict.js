$(document).ready(function() {

  module("Chassis.noConflict");

  test('noConflict', 2, function() {
    var noconflictChassis = Chassis.noConflict();
    equal(window.Chassis, undefined, 'Returned window.Chassis');
    window.Chassis = noconflictBackbone;
    equal(window.Chassis, noconflictBackbone, 'Chassis is still pointing to the original Chassis');
  });

});
