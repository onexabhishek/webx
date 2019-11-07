"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var prettier_1 = require("prettier");
var lex = require("pug-lexer");
var logger_1 = require("./logger");
var options_1 = require("./options");
var doctype_shortcut_registry_1 = require("./doctype-shortcut-registry");
var makeString = prettier_1.util.makeString;
var logger = logger_1.createLogger(console);
if (process.env.NODE_ENV === 'test') {
    logger.setLogLevel(logger_1.LogLevel.DEBUG);
}
function previousNormalAttributeToken(tokens, index) {
    for (var i = index - 1; i > 0; i--) {
        var token = tokens[i];
        if (token.type === 'start-attributes') {
            return;
        }
        if (token.type === 'attribute') {
            if (token.name !== 'class' && token.name !== 'id') {
                return token;
            }
        }
    }
    return;
}
function printIndent(previousToken, result, indent, indentLevel) {
    if (previousToken) {
        switch (previousToken.type) {
            case 'newline':
            case 'outdent':
                result += indent.repeat(indentLevel);
                break;
            case 'indent':
                result += indent;
                break;
        }
    }
    return result;
}
function formatText(text, singleQuote) {
    var result = '';
    while (text) {
        var start = text.indexOf('{{');
        if (start !== -1) {
            result += text.slice(0, start);
            text = text.substring(start + 2);
            var end = text.indexOf('}}');
            if (end !== -1) {
                var code = text.slice(0, end);
                code = code.trim();
                code = prettier_1.format(code, { parser: 'babel', singleQuote: !singleQuote, printWidth: 9000 });
                if (code.endsWith(';\n')) {
                    code = code.slice(0, -2);
                }
                result += "{{ " + code + " }}";
                text = text.slice(end + 2);
            }
            else {
                result += '{{';
                result += text;
                text = '';
            }
        }
        else {
            result += text;
            text = '';
        }
    }
    return result;
}
exports.plugin = {
    languages: [
        {
            name: 'Pug',
            parsers: ['pug'],
            tmScope: 'text.jade',
            aceMode: 'jade',
            codemirrorMode: 'pug',
            codemirrorMimeType: 'text/x-pug',
            extensions: ['.jade', '.pug'],
            linguistLanguageId: 179,
            vscodeLanguageIds: ['jade']
        }
    ],
    parsers: {
        pug: {
            parse: function (text, parsers, options) {
                logger.debug('[parsers:pug:parse]:', { text: text });
                var tokens = lex(text, {});
                return tokens;
            },
            astFormat: 'pug-ast',
            hasPragma: function (text) {
                return text.startsWith('//- @prettier\n') || text.startsWith('//- @format\n');
            },
            locStart: function (node) {
                logger.debug('[parsers:pug:locStart]:', { node: node });
                return 0;
            },
            locEnd: function (node) {
                logger.debug('[parsers:pug:locEnd]:', { node: node });
                return 0;
            },
            preprocess: function (text, options) {
                logger.debug('[parsers:pug:preprocess]:', { text: text });
                return text;
            }
        }
    },
    printers: {
        'pug-ast': {
            print: function (path, _a, print) {
                var printWidth = _a.printWidth, singleQuote = _a.singleQuote, tabWidth = _a.tabWidth, useTabs = _a.useTabs, attributeSeparator = _a.attributeSeparator;
                var tokens = path.stack[0];
                var result = '';
                var indentLevel = 0;
                var indent = ' '.repeat(tabWidth);
                if (useTabs) {
                    indent = '\t';
                }
                var pipelessText = false;
                var alwaysUseAttributeSeparator = options_1.resolveAttributeSeparatorOption(attributeSeparator);
                var startTagPosition = 0;
                var startAttributePosition = 0;
                var previousAttributeRemapped = false;
                var wrapAttributes = false;
                var codeInterpolationOptions = { singleQuote: !singleQuote, printWidth: 9000 };
                var _loop_1 = function (index) {
                    var token = tokens[index];
                    var previousToken = tokens[index - 1];
                    var nextToken = tokens[index + 1];
                    logger.debug('[printers:pug-ast:print]:', JSON.stringify(token));
                    switch (token.type) {
                        case 'tag':
                            result = printIndent(previousToken, result, indent, indentLevel);
                            if (!(token.val === 'div' && (nextToken.type === 'class' || nextToken.type === 'id'))) {
                                result += token.val;
                            }
                            startTagPosition = result.length;
                            break;
                        case 'start-attributes':
                            if (nextToken && nextToken.type === 'attribute') {
                                previousAttributeRemapped = false;
                                startAttributePosition = result.length;
                                result += '(';
                                var start = result.lastIndexOf('\n') + 1;
                                var lineLength = result.substring(start).length;
                                logger.debug(lineLength, printWidth);
                                var tempToken = nextToken;
                                var tempIndex = index + 1;
                                while (tempToken.type === 'attribute') {
                                    lineLength += tempToken.name.length + 1 + tempToken.val.toString().length;
                                    logger.debug(lineLength, printWidth);
                                    tempToken = tokens[++tempIndex];
                                }
                                if (lineLength > printWidth) {
                                    wrapAttributes = true;
                                }
                            }
                            break;
                        case 'attribute': {
                            if (token.name === 'class' &&
                                typeof token.val === 'string' &&
                                (token.val.startsWith('"') || token.val.startsWith("'"))) {
                                var val = token.val;
                                val = val.substring(1, val.length - 1);
                                val = val.trim();
                                val = val.replace(/\s\s+/g, ' ');
                                var classes = val.split(' ');
                                var specialClasses = [];
                                var validClassNameRegex = /^-?[_a-zA-Z]+[_a-zA-Z0-9-]*$/;
                                for (var _i = 0, classes_1 = classes; _i < classes_1.length; _i++) {
                                    var className = classes_1[_i];
                                    if (!validClassNameRegex.test(className)) {
                                        specialClasses.push(className);
                                        continue;
                                    }
                                    var position = startAttributePosition;
                                    result = [result.slice(0, position), "." + className, result.slice(position)].join('');
                                    startAttributePosition += 1 + className.length;
                                    result = result.replace(/div\./, '.');
                                }
                                if (specialClasses.length > 0) {
                                    token.val = makeString(specialClasses.join(' '), singleQuote ? "'" : '"', false);
                                    previousAttributeRemapped = false;
                                }
                                else {
                                    previousAttributeRemapped = true;
                                    break;
                                }
                            }
                            else if (token.name === 'id' &&
                                typeof token.val === 'string' &&
                                (token.val.startsWith('"') || token.val.startsWith("'"))) {
                                var val = token.val;
                                val = val.substring(1, val.length - 1);
                                val = val.trim();
                                var position = startTagPosition;
                                result = [result.slice(0, position), "#" + val, result.slice(position)].join('');
                                startAttributePosition += 1 + val.length;
                                result = result.replace(/div#/, '#');
                                if (previousToken.type === 'attribute' && previousToken.name !== 'class') {
                                    previousAttributeRemapped = true;
                                }
                                break;
                            }
                            var hasNormalPreviousToken = previousNormalAttributeToken(tokens, index);
                            if (previousToken &&
                                previousToken.type === 'attribute' &&
                                (!previousAttributeRemapped || hasNormalPreviousToken)) {
                                if (alwaysUseAttributeSeparator || /^(\(|\[|:).*/.test(token.name)) {
                                    result += ',';
                                }
                                if (!wrapAttributes) {
                                    result += ' ';
                                }
                            }
                            previousAttributeRemapped = false;
                            if (wrapAttributes) {
                                result += '\n';
                                result += indent.repeat(indentLevel + 1);
                            }
                            result += "" + token.name;
                            if (typeof token.val === 'boolean') {
                                if (token.val !== true) {
                                    result += "=" + token.val;
                                }
                            }
                            else {
                                var val = token.val;
                                if (/^((v-bind|v-on|v-slot)?:|v-model|v-on|@).*/.test(token.name)) {
                                    val = val.trim();
                                    val = val.slice(1, -1);
                                    val = prettier_1.format(val, __assign({ parser: '__vue_expression' }, codeInterpolationOptions));
                                    var quotes = singleQuote ? "'" : '"';
                                    val = "" + quotes + val + quotes;
                                }
                                else if (/^(\(.*\)|\[.*\])$/.test(token.name)) {
                                    val = val.trim();
                                    val = val.slice(1, -1);
                                    val = prettier_1.format(val, __assign({ parser: '__ng_interpolation' }, codeInterpolationOptions));
                                    var quotes = singleQuote ? "'" : '"';
                                    val = "" + quotes + val + quotes;
                                }
                                else if (/^\*.*$/.test(token.name)) {
                                    val = val.trim();
                                    val = val.slice(1, -1);
                                    val = prettier_1.format(val, __assign({ parser: '__ng_directive' }, codeInterpolationOptions));
                                    var quotes = singleQuote ? "'" : '"';
                                    val = "" + quotes + val + quotes;
                                }
                                else if (/^(["']{{)(.*)(}}["'])$/.test(val)) {
                                    val = val.slice(3, -3);
                                    val = val.trim();
                                    val = val.replace(/\s\s+/g, ' ');
                                    var quotes = singleQuote ? "'" : '"';
                                    val = quotes + "{{ " + val + " }}" + quotes;
                                }
                                else if (/^["'](.*)["']$/.test(val)) {
                                    val = makeString(val.slice(1, -1), singleQuote ? "'" : '"', false);
                                }
                                else if (val === 'true') {
                                    break;
                                }
                                else {
                                    val = val.trim();
                                    val = val.replace(/\s\s+/g, ' ');
                                    if (val.startsWith('{ ')) {
                                        val = "{" + val.substring(2, val.length);
                                    }
                                }
                                if (token.mustEscape === false) {
                                    result += '!';
                                }
                                result += "=" + val;
                            }
                            break;
                        }
                        case 'end-attributes':
                            if (wrapAttributes) {
                                result += '\n';
                                result += indent.repeat(indentLevel);
                            }
                            wrapAttributes = false;
                            if (result.endsWith('(')) {
                                result = result.substring(0, result.length - 1);
                            }
                            else if (previousToken && previousToken.type === 'attribute') {
                                result += ')';
                            }
                            if (nextToken && (nextToken.type === 'text' || nextToken.type === 'path')) {
                                result += ' ';
                            }
                            break;
                        case 'indent':
                            result += '\n';
                            result += indent.repeat(indentLevel);
                            indentLevel++;
                            break;
                        case 'outdent':
                            if (previousToken && previousToken.type !== 'outdent') {
                                if (token.loc.start.line - previousToken.loc.end.line > 1) {
                                    result += '\n';
                                }
                                result += '\n';
                            }
                            indentLevel--;
                            break;
                        case 'class':
                            result = printIndent(previousToken, result, indent, indentLevel);
                            result += "." + token.val;
                            if (nextToken && nextToken.type === 'text') {
                                result += ' ';
                            }
                            break;
                        case 'eos':
                            while (result.endsWith('\n')) {
                                result = result.substring(0, result.length - 1);
                            }
                            result += '\n';
                            break;
                        case 'comment':
                            result = printIndent(previousToken, result, indent, indentLevel);
                            result += "//" + (token.buffer ? '' : '-') + token.val.replace(/\s\s+/g, ' ');
                            break;
                        case 'newline':
                            if (previousToken && token.loc.start.line - previousToken.loc.end.line > 1) {
                                result += '\n';
                            }
                            result += '\n';
                            break;
                        case 'text': {
                            var val = token.val;
                            val = val.replace(/\s\s+/g, ' ');
                            if (previousToken) {
                                switch (previousToken.type) {
                                    case 'newline':
                                        if (pipelessText === false) {
                                            result += indent.repeat(indentLevel);
                                            if (/^ .+$/.test(val)) {
                                                result += '|\n';
                                                result += indent.repeat(indentLevel);
                                            }
                                            result += '|';
                                            if (/.*\S.*/.test(token.val)) {
                                                result += ' ';
                                            }
                                        }
                                        else {
                                            result += indent.repeat(indentLevel);
                                            result += indent;
                                        }
                                        break;
                                    case 'indent':
                                        result += indent;
                                        result += '|';
                                        if (/.*\S.*/.test(token.val)) {
                                            result += ' ';
                                        }
                                        break;
                                    case 'start-pipeless-text':
                                        result += indent;
                                        break;
                                    case 'interpolated-code':
                                    case 'end-pug-interpolation':
                                        if (/^ .+$/.test(val)) {
                                            result += ' ';
                                        }
                                        break;
                                }
                            }
                            var needsTrailingWhitespace = false;
                            if (nextToken && val.endsWith(' ')) {
                                switch (nextToken.type) {
                                    case 'interpolated-code':
                                    case 'start-pug-interpolation':
                                        needsTrailingWhitespace = true;
                                        break;
                                }
                            }
                            val = val.trim();
                            val = formatText(val, singleQuote);
                            if (previousToken && (previousToken.type === 'tag' || previousToken.type === 'id')) {
                                val = " " + val;
                            }
                            result += val;
                            if (needsTrailingWhitespace) {
                                result += ' ';
                            }
                            break;
                        }
                        case 'interpolated-code':
                            if (previousToken) {
                                switch (previousToken.type) {
                                    case 'tag':
                                    case 'end-attributes':
                                        result += ' ';
                                        break;
                                    case 'indent':
                                        result = printIndent(previousToken, result, indent, indentLevel);
                                        result += '| ';
                                        break;
                                }
                            }
                            result += "#{" + token.val + "}";
                            break;
                        case 'code':
                            result = printIndent(previousToken, result, indent, indentLevel);
                            result += token.buffer ? '=' : '-';
                            result += " " + token.val;
                            break;
                        case 'id': {
                            var lastPositionOfNewline = result.lastIndexOf('\n');
                            if (lastPositionOfNewline === -1) {
                                lastPositionOfNewline = 0;
                            }
                            var position = result.indexOf('.', lastPositionOfNewline);
                            if (position === -1) {
                                position = result.length;
                            }
                            var _indent = '';
                            if (previousToken) {
                                switch (previousToken.type) {
                                    case 'newline':
                                    case 'outdent':
                                        _indent = indent.repeat(indentLevel);
                                        break;
                                    case 'indent':
                                        _indent = indent;
                                        break;
                                }
                            }
                            result = [result.slice(0, position), _indent, "#" + token.val, result.slice(position)].join('');
                            break;
                        }
                        case 'start-pipeless-text':
                            pipelessText = true;
                            result += '\n';
                            result += indent.repeat(indentLevel);
                            break;
                        case 'end-pipeless-text':
                            pipelessText = false;
                            break;
                        case 'doctype':
                            result += 'doctype';
                            if (token.val) {
                                result += " " + token.val;
                            }
                            break;
                        case 'dot':
                            result += '.';
                            break;
                        case 'block':
                            result = printIndent(previousToken, result, indent, indentLevel);
                            result += 'block ';
                            if (token.mode !== 'replace') {
                                result += token.mode;
                            }
                            result += token.val;
                            break;
                        case 'extends':
                            result += 'extends ';
                            break;
                        case 'path':
                            if (previousToken && previousToken.type === 'include') {
                                result += ' ';
                            }
                            result += token.val;
                            break;
                        case 'start-pug-interpolation':
                            result += '#[';
                            break;
                        case 'end-pug-interpolation':
                            result += ']';
                            break;
                        case 'include':
                            result = printIndent(previousToken, result, indent, indentLevel);
                            result += 'include';
                            break;
                        case 'filter':
                            result += ":" + token.val;
                            break;
                        case 'call': {
                            result = printIndent(previousToken, result, indent, indentLevel);
                            result += "+" + token.val;
                            var args = token.args;
                            if (args) {
                                args = args.trim();
                                args = args.replace(/\s\s+/g, ' ');
                                result += "(" + args + ")";
                            }
                            break;
                        }
                        case 'mixin': {
                            result = printIndent(previousToken, result, indent, indentLevel);
                            result += "mixin " + token.val;
                            var args = token.args;
                            if (args) {
                                args = args.trim();
                                args = args.replace(/\s\s+/g, ' ');
                                result += "(" + args + ")";
                            }
                            break;
                        }
                        case 'if':
                            result = printIndent(previousToken, result, indent, indentLevel);
                            result += "if " + token.val;
                            break;
                        case 'mixin-block':
                            result = printIndent(previousToken, result, indent, indentLevel);
                            result += 'block';
                            break;
                        case 'else':
                            result = printIndent(previousToken, result, indent, indentLevel);
                            result += 'else';
                            break;
                        case '&attributes':
                            result += "&attributes(" + token.val + ")";
                            break;
                        case 'text-html':
                            result = printIndent(previousToken, result, indent, indentLevel);
                            var match = /^<(.*?)>(.*)<\/(.*?)>$/.exec(token.val);
                            logger.debug(match);
                            if (match) {
                                result += match[1] + " " + match[2];
                                break;
                            }
                            var entry = Object.entries(doctype_shortcut_registry_1.DOCTYPE_SHORTCUT_REGISTRY).find(function (_a) {
                                var key = _a[0];
                                return key === token.val.toLowerCase();
                            });
                            if (entry) {
                                result += entry[1];
                                break;
                            }
                            result += token.val;
                            break;
                        case 'each':
                            result = printIndent(previousToken, result, indent, indentLevel);
                            result += "each " + token.val + " in " + token.code;
                            break;
                        default:
                            throw new Error('Unhandled token: ' + JSON.stringify(token));
                    }
                };
                for (var index = 0; index < tokens.length; index++) {
                    _loop_1(index);
                }
                logger.debug(result);
                return result;
            },
            embed: function (path, print, textToDoc, options) {
                return null;
            },
            insertPragma: function (text) {
                return "//- @prettier\n" + text;
            }
        }
    },
    options: options_1.options,
    defaultOptions: {}
};
exports.languages = exports.plugin.languages;
exports.parsers = exports.plugin.parsers;
exports.printers = exports.plugin.printers;
exports.options = exports.plugin.options;
exports.defaultOptions = exports.plugin.defaultOptions;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLHFDQUFvRztBQUVwRywrQkFBaUM7QUFDakMsbUNBQTBEO0FBQzFELHFDQUFxRztBQUVyRyx5RUFBd0U7QUFFaEUsSUFBQSx1Q0FBVSxDQUFVO0FBRTVCLElBQU0sTUFBTSxHQUFXLHFCQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDN0MsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNLEVBQUU7SUFDcEMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxpQkFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0NBQ25DO0FBRUQsU0FBUyw0QkFBNEIsQ0FBQyxNQUFlLEVBQUUsS0FBYTtJQUNuRSxLQUFLLElBQUksQ0FBQyxHQUFXLEtBQUssR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUMzQyxJQUFNLEtBQUssR0FBVSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0IsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLGtCQUFrQixFQUFFO1lBQ3RDLE9BQU87U0FDUDtRQUNELElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxXQUFXLEVBQUU7WUFDL0IsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLE9BQU8sSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLElBQUksRUFBRTtnQkFDbEQsT0FBTyxLQUFLLENBQUM7YUFDYjtTQUNEO0tBQ0Q7SUFDRCxPQUFPO0FBQ1IsQ0FBQztBQUVELFNBQVMsV0FBVyxDQUFDLGFBQW9CLEVBQUUsTUFBYyxFQUFFLE1BQWMsRUFBRSxXQUFtQjtJQUM3RixJQUFJLGFBQWEsRUFBRTtRQUNsQixRQUFRLGFBQWEsQ0FBQyxJQUFJLEVBQUU7WUFDM0IsS0FBSyxTQUFTLENBQUM7WUFDZixLQUFLLFNBQVM7Z0JBQ2IsTUFB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