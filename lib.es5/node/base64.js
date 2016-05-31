"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.encode = encode;
/* global: Buffer */

function encode(data) {
  return new Buffer(data).toString("base64");
}

var isSupported = exports.isSupported = true;