import { Field } from "./field.js";
var FormValidation = /** @class */ (function () {
    function FormValidation(formSelector) {
        this.formSelector = formSelector;
        this.fields = [];
    }
    Object.defineProperty(FormValidation.prototype, "formRef", {
        get: function () {
            return document.querySelector(this.formSelector);
        },
        enumerable: false,
        configurable: true
    });
    FormValidation.prototype.setValidation = function (fieldName, validationConditionObject) {
        if (validationConditionObject === void 0) { validationConditionObject = {}; }
        var inputField = this.formRef.querySelector("[name=" + fieldName + "]");
        var field = new Field(fieldName, inputField);
        if (!this.fields.includes(field)) {
            this.fields.push(field);
        }
        for (var _i = 0, _a = Object.keys(validationConditionObject); _i < _a.length; _i++) {
            var errorText = _a[_i];
            field.setValidationCondition(validationConditionObject[errorText], errorText);
        }
        field.addListeners();
    };
    FormValidation.prototype.checkFormValidity = function () {
        var valid = !(this.fields.some(function (field) { return field.hasError(); }));
        return valid && this.formRef.checkValidity();
    };
    FormValidation.prototype.showErrors = function () {
        this.fields.forEach(function (field) {
            field.showError();
        });
    };
    FormValidation.prototype.hideErrors = function () {
        this.fields.forEach(function (field) {
            field.hideError();
        });
    };
    Object.defineProperty(FormValidation.prototype, "values", {
        get: function () {
            var obj = {};
            this.fields.forEach(function (field) {
                obj[field.fieldName] = field.value;
            });
            return obj;
        },
        enumerable: false,
        configurable: true
    });
    FormValidation.prototype.field = function (name) {
        var result;
        this.fields.forEach(function (field) {
            if (field.fieldName === name) {
                result = field;
            }
        });
        return result;
    };
    return FormValidation;
}());
export { FormValidation };
//# sourceMappingURL=FormValidation.js.map