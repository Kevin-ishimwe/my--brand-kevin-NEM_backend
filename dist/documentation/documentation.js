"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _message = _interopRequireDefault(require("./message.doc"));
var _blog = _interopRequireDefault(require("./blog.doc"));
var _user = _interopRequireDefault(require("./user.doc"));
var _comment = _interopRequireDefault(require("./comment.doc"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const swaggerDocumentation = {
  openapi: '3.0.0',
  info: {
    title: 'my brand-kevin API 3.0',
    description: "this is an API for my portfolio website, You can now help me improve the API whether it's by making changes to the  definition itself or to the code.That way, with time,`I can improve the API in general,`  and expose some of the new features u can also checkout my website at [https://kevin-ishimwe.github.io/my-brand-Kevin/]",
    contact: {
      name: 'kevin',
      email: 'ishimwekevin45@gmail.com'
    }
  },
  tags: [{
    name: 'messages',
    description: 'message routes '
  }, {
    name: 'blogs',
    description: 'blog routes '
  }, {
    name: 'users',
    description: 'user routes '
  }, {
    name: 'comment',
    description: 'comment routes '
  }],
  paths: _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, _message.default), _blog.default), _user.default), _comment.default)
};
var _default = swaggerDocumentation;
exports.default = _default;