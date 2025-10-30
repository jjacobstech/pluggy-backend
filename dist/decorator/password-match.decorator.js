"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsPasswordMatch = IsPasswordMatch;
const class_validator_1 = require("class-validator");
const password_match_validator_1 = require("../validators/password-match.validator");
function IsPasswordMatch(property, validationOptions) {
    return (object, propertyName) => {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [property],
            validator: password_match_validator_1.PasswordMatch,
        });
    };
}
//# sourceMappingURL=password-match.decorator.js.map