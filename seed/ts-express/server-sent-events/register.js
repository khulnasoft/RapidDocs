"use strict";
/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
function register(expressApp, services) {
    expressApp.use("", services.completions.toRouter());
}
exports.register = register;
