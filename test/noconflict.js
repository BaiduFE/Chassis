$(document).ready(function() {

	module("Chassis.noConflict");

	asyncTest('noConflict', 2, function() {
		var originalChassis = window.Chassis,
			noConflictChassis = Chassis.noConflict();

		equal(window.Chassis, undefined, 'Returned window.Chassis');

		window.Chassis = noConflictChassis;

		equal(window.Chassis, originalChassis, 'Chassis is still pointing to the original Chassis');
		
		start();
	});

});
