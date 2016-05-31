"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _http = require("http");

var http = _interopRequireWildcard(_http);

var _url = require("url");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function noop() {}

var Request = function () {
  function Request() {
    _classCallCheck(this, Request);

    this._method = "";
    this._url = "";
    this._headers = {};
    this._resHeaders = {};
    this._request = null;

    this.status = 0;

    this.onerror = noop;
    this.onload = noop;
    this.onprogress = noop;

    // Ignored field
    this.withCredentials = false;
  }

  _createClass(Request, [{
    key: "open",
    value: function open(method, url, _async) {
      this._method = method;
      this._url = url;
    }
  }, {
    key: "setRequestHeader",
    value: function setRequestHeader(key, value) {
      this._headers[key] = value;
    }
  }, {
    key: "send",
    value: function send(body) {
      var _this = this;

      var options = (0, _url.parse)(this._url);
      options.method = this._method;
      options.headers = this._headers;

      var req = this._request = http.request(options);
      req.on("response", function (res) {
        _this.status = res.statusCode;
        _this._resHeaders = res.headers;

        _this.onload();
      });

      req.on("error", function () {
        _this.onerror();
      });

      req.end(body);
    }
  }, {
    key: "getResponseHeader",
    value: function getResponseHeader(key) {
      return this._resHeaders[key.toLowerCase()];
    }
  }, {
    key: "abort",
    value: function abort() {
      if (this._req !== null) this._req.abort();
    }
  }]);

  return Request;
}();

exports.default = Request;