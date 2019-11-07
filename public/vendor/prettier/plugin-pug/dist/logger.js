"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["DEBUG"] = 0] = "DEBUG";
    LogLevel[LogLevel["LOG"] = 1] = "LOG";
    LogLevel[LogLevel["INFO"] = 2] = "INFO";
    LogLevel[LogLevel["WARN"] = 3] = "WARN";
    LogLevel[LogLevel["ERROR"] = 4] = "ERROR";
    LogLevel[LogLevel["OFF"] = 5] = "OFF";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
var Logger = (function () {
    function Logger(logger, level) {
        if (logger === void 0) { logger = console; }
        if (level === void 0) { level = LogLevel.INFO; }
        this.logger = logger;
        this.level = level;
    }
    Logger.prototype.setLogLevel = function (level) {
        this.level = level;
    };
    Logger.prototype.debug = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        this.message.apply(this, __spreadArrays([LogLevel.DEBUG, message], optionalParams));
    };
    Logger.prototype.log = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        this.message.apply(this, __spreadArrays([LogLevel.LOG, message], optionalParams));
    };
    Logger.prototype.info = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        this.message.apply(this, __spreadArrays([LogLevel.INFO, message], optionalParams));
    };
    Logger.prototype.warn = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        this.message.apply(this, __spreadArrays([LogLevel.WARN, message], optionalParams));
    };
    Logger.prototype.error = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        this.message.apply(this, __spreadArrays([LogLevel.ERROR, message], optionalParams));
    };
    Logger.prototype.message = function (level, message) {
        var _a;
        var optionalParams = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            optionalParams[_i - 2] = arguments[_i];
        }
        if (this.level !== LogLevel.OFF && this.level <= level) {
            (_a = this.logger)[Logger.LOG_LEVELS[level]].apply(_a, __spreadArrays([message], optionalParams));
        }
    };
    Logger.LOG_LEVELS = [
        'debug',
        'log',
        'info',
        'warn',
        'error'
    ];
    return Logger;
}());
exports.Logger = Logger;
function createLogger(logger) {
    if (logger === void 0) { logger = console; }
    return new Logger(logger);
}
exports.createLogger = createLogger;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2xvZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFZLFFBT1g7QUFQRCxXQUFZLFFBQVE7SUFDbkIseUNBQUssQ0FBQTtJQUNMLHFDQUFHLENBQUE7SUFDSCx1Q0FBSSxDQUFBO0lBQ0osdUNBQUksQ0FBQTtJQUNKLHlDQUFLLENBQUE7SUFDTCxxQ0FBRyxDQUFBO0FBQ0osQ0FBQyxFQVBXLFFBQVEsR0FBUixnQkFBUSxLQUFSLGdCQUFRLFFBT25CO0FBVUQ7SUFTQyxnQkFBb0MsTUFBeUIsRUFBVSxLQUErQjtRQUFsRSx1QkFBQSxFQUFBLGdCQUF5QjtRQUFVLHNCQUFBLEVBQUEsUUFBa0IsUUFBUSxDQUFDLElBQUk7UUFBbEUsV0FBTSxHQUFOLE1BQU0sQ0FBbUI7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUEwQjtJQUFHLENBQUM7SUFFbkcsNEJBQVcsR0FBbEIsVUFBbUIsS0FBZTtRQUNqQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUNwQixDQUFDO0lBRU0sc0JBQUssR0FBWixVQUFhLE9BQWE7UUFBRSx3QkFBd0I7YUFBeEIsVUFBd0IsRUFBeEIscUJBQXdCLEVBQXhCLElBQXdCO1lBQXhCLHVDQUF3Qjs7UUFDbkQsSUFBSSxDQUFDLE9BQU8sT0FBWixJQUFJLGtCQUFTLFFBQVEsQ0FBQyxLQUFLLEVBQUUsT0FBTyxHQUFLLGNBQWMsR0FBRTtJQUMxRCxDQUFDO0lBRU0sb0JBQUcsR0FBVixVQUFXLE9BQWE7UUFBRSx3QkFBd0I7YUFBeEIsVUFBd0IsRUFBeEIscUJBQXdCLEVBQXhCLElBQXdCO1lBQXhCLHVDQUF3Qjs7UUFDakQsSUFBSSxDQUFDLE9BQU8sT0FBWixJQUFJLGtCQUFTLFFBQVEsQ0FBQyxHQUFHLEVBQUUsT0FBTyxHQUFLLGNBQWMsR0FBRTtJQUN4RCxDQUFDO0lBRU0scUJBQUksR0FBWCxVQUFZLE9BQWE7UUFBRSx3QkFBd0I7YUFBeEIsVUFBd0IsRUFBeEIscUJBQXdCLEVBQXhCLElBQXdCO1lBQXhCLHVDQUF3Qjs7UUFDbEQsSUFBSSxDQUFDLE9BQU8sT0FBWixJQUFJLGtCQUFTLFFBQVEsQ0FBQyxJQUFJLEVBQUUsT0FBTyxHQUFLLGNBQWMsR0FBRTtJQUN6RCxDQUFDO0lBRU0scUJBQUksR0FBWCxVQUFZLE9BQWE7UUFBRSx3QkFBd0I7YUFBeEIsVUFBd0IsRUFBeEIscUJBQXdCLEVBQXhCLElBQXdCO1lBQXhCLHVDQUF3Qjs7UUFDbEQsSUFBSSxDQUFDLE9BQU8sT0FBWixJQUFJLGtCQUFTLFFBQVEsQ0FBQyxJQUFJLEVBQUUsT0FBTyxHQUFLLGNBQWMsR0FBRTtJQUN6RCxDQUFDO0lBRU0sc0JBQUssR0FBWixVQUFhLE9BQWE7UUFBRSx3QkFBd0I7YUFBeEIsVUFBd0IsRUFBeEIscUJBQXdCLEVBQXhCLElBQXdCO1lBQXhCLHVDQUF3Qjs7UUFDbkQsSUFBSSxDQUFDLE9BQU8sT0FBWixJQUFJLGtCQUFTLFFBQVEsQ0FBQyxLQUFLLEVBQUUsT0FBTyxHQUFLLGNBQWMsR0FBRTtJQUMxRCxDQUFDO0lBRU8sd0JBQU8sR0FBZixVQUFnQixLQUFlLEVBQUUsT0FBYTs7UUFBRSx3QkFBd0I7YUFBeEIsVUFBd0IsRUFBeEIscUJBQXdCLEVBQXhCLElBQXdCO1lBQXhCLHVDQUF3Qjs7UUFDdkUsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLFFBQVEsQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxLQUFLLEVBQUU7WUFDdkQsQ0FBQSxLQUFBLElBQUksQ0FBQyxNQUFNLENBQUEsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQWUsQ0FBQyxDQUFDLDJCQUFDLE9BQU8sR0FBSyxjQUFjLEdBQUU7U0FDNUU7SUFDRixDQUFDO0lBdEN1QixpQkFBVSxHQUE4QztRQUMvRSxPQUFPO1FBQ1AsS0FBSztRQUNMLE1BQU07UUFDTixNQUFNO1FBQ04sT0FBTztLQUNQLENBQUM7SUFpQ0gsYUFBQztDQUFBLEFBeENELElBd0NDO0FBeENZLHdCQUFNO0FBMENuQixTQUFnQixZQUFZLENBQUMsTUFBeUI7SUFBekIsdUJBQUEsRUFBQSxnQkFBeUI7SUFDckQsT0FBTyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMzQixDQUFDO0FBRkQsb0NBRUMifQ==