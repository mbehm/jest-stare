"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const util_1 = require("util");
const moment = require("moment");
const chalk = require("chalk");
class Logger {
    static get get() {
        if ((0, util_1.isNullOrUndefined)(this.mLog)) {
            this.mLog = new Logger();
        }
        return this.mLog;
    }
    static isValidLevel(level) {
        return Logger.LEVELS.indexOf(level) < 0 ? false : true;
    }
    static validateLevel(level) {
        if (!Logger.isValidLevel(level)) {
            throw new Error("invalid level");
        }
    }
    constructor() {
        this.mLevel = Logger.LEVEL_DEFAULT;
        this.mPrefix = false;
        this.mColor = true;
        this.mLevel = this.mLevel.toLocaleLowerCase();
        this.mIsOn = true;
        Logger.validateLevel(this.mLevel);
    }
    isTraceEnabled() {
        return Logger.LEVELS.indexOf("trace") >= Logger.LEVELS.indexOf(this.level) ? this.on : false;
    }
    isDebugEnabled() {
        return Logger.LEVELS.indexOf("debug") >= Logger.LEVELS.indexOf(this.level) ? this.on : false;
    }
    isInfoEnabled() {
        return Logger.LEVELS.indexOf("info") >= Logger.LEVELS.indexOf(this.level) ? this.on : false;
    }
    isWarnEnabled() {
        return Logger.LEVELS.indexOf("warn") >= Logger.LEVELS.indexOf(this.level) ? this.on : false;
    }
    isErrorEnabled() {
        return Logger.LEVELS.indexOf("error") >= Logger.LEVELS.indexOf(this.level) ? this.on : false;
    }
    isFatalEnabled() {
        return Logger.LEVELS.indexOf("fatal") >= Logger.LEVELS.indexOf(this.level) ? this.on : false;
    }
    trace(message, ...args) {
        if (!this.isTraceEnabled()) {
            return;
        }
        let adjustedMessage = message;
        if (this.prefix) {
            adjustedMessage = this.buildPrefix("TRACE") + message;
        }
        if (this.color) {
            adjustedMessage = chalk.cyan(adjustedMessage);
        }
        return this.writeStdout(adjustedMessage, args);
    }
    debug(message, ...args) {
        if (!this.isDebugEnabled()) {
            return;
        }
        let adjustedMessage = message;
        if (this.prefix) {
            adjustedMessage = this.buildPrefix("DEBUG") + message;
        }
        if (this.color) {
            adjustedMessage = chalk.green(adjustedMessage);
        }
        return this.writeStdout(adjustedMessage, args);
    }
    info(message, ...args) {
        if (!this.isInfoEnabled()) {
            return;
        }
        let adjustedMessage = message;
        if (this.prefix) {
            adjustedMessage = this.buildPrefix("INFO") + message;
        }
        if (this.color) {
            adjustedMessage = chalk.blue(adjustedMessage);
        }
        return this.writeStdout(adjustedMessage, args);
    }
    warn(message, ...args) {
        if (!this.isWarnEnabled()) {
            return;
        }
        let adjustedMessage = message;
        if (this.prefix) {
            adjustedMessage = this.buildPrefix("WARN") + message;
        }
        if (this.color) {
            adjustedMessage = chalk.yellow(adjustedMessage);
        }
        return this.writeStderr(adjustedMessage, args);
    }
    error(message, ...args) {
        if (!this.isErrorEnabled()) {
            return;
        }
        let adjustedMessage = message;
        if (this.prefix) {
            adjustedMessage = this.buildPrefix("ERROR") + message;
        }
        if (this.color) {
            adjustedMessage = chalk.red(adjustedMessage);
        }
        return this.writeStderr(adjustedMessage, args);
    }
    fatal(message, ...args) {
        if (!this.isFatalEnabled()) {
            return;
        }
        let adjustedMessage = message;
        if (this.prefix) {
            adjustedMessage = this.buildPrefix("FATAL") + message;
        }
        if (this.color) {
            adjustedMessage = chalk.magenta(adjustedMessage);
        }
        return this.writeStderr(adjustedMessage, args);
    }
    writeStderr(message, ...args) {
        const data = this.format(message, args);
        process.stderr.write(this.format(message, args));
        return data;
    }
    writeStdout(message, ...args) {
        const data = this.format(message, args);
        process.stdout.write(data);
        return data;
    }
    format(data, ...args) {
        let formatted = data;
        if (this.formatEnabled && !(0, util_1.isNullOrUndefined)(args) && args.length > 0) {
            let defined = false;
            args.forEach((arg) => {
                arg.forEach((ntry) => {
                    if (ntry.length > 0) {
                        defined = true;
                    }
                });
            });
            if (defined) {
                formatted = (0, util_1.format)(data, args);
            }
        }
        return formatted + "\n";
    }
    buildPrefix(type) {
        return "[" + moment().format("YYYY/MM/DD HH:MM:SS") + "]" + " " + "[" + type + "]" + " ";
    }
    get formatEnabled() {
        return true;
    }
    set color(isEnabled) {
        this.mColor = isEnabled;
    }
    get color() {
        return this.mColor;
    }
    set on(isOn) {
        this.mIsOn = isOn;
    }
    get on() {
        return this.mIsOn;
    }
    get level() {
        return this.mLevel;
    }
    get prefix() {
        return this.mPrefix;
    }
    set prefix(prefix) {
        this.mPrefix = prefix;
    }
}
exports.Logger = Logger;
Logger.LEVELS = ["trace", "debug", "info", "warn", "error", "fatal"];
Logger.LEVEL_DEFAULT = "info";
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL0xvZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQkFBaUQ7QUFDakQsaUNBQWlDO0FBQ2pDLCtCQUErQjtBQU8vQixNQUFhLE1BQU07SUFzQlIsTUFBTSxLQUFLLEdBQUc7UUFDakIsSUFBSSxJQUFBLHdCQUFpQixFQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUM5QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksTUFBTSxFQUFFLENBQUM7U0FDNUI7UUFDRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQVNNLE1BQU0sQ0FBQyxZQUFZLENBQUMsS0FBYTtRQUNwQyxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDM0QsQ0FBQztJQVFNLE1BQU0sQ0FBQyxhQUFhLENBQUMsS0FBYTtRQUNyQyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUM3QixNQUFNLElBQUksS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1NBQ3BDO0lBQ0wsQ0FBQztJQStDRDtRQUNJLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQztRQUNuQyxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNuQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUM5QyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN0QyxD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