/**
 * @fileOverview history 基类
 */

var History = Router.History = function() {

	// hash开头的斜杠和结尾的空白符
	this.rRouteStripper = /^[#\/]|\s+$/g;

	// 路径开头和结尾的连续斜杠
	this.rRootStripper = /^\/+|\/+$/g;

	this.handlers = [];
	this.location = window.location;
    this.history = window.history;
};

History.extend = Chassis.extend;
History.started = false;