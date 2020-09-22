var Field = /** @class */ (function () {
    function Field(fieldName, fieldNode) {
        this.fieldName = fieldName;
        this.fieldNode = fieldNode;
        this.validationConditions = [];
        this.errorNode = this.fieldNode.parentElement.querySelector(".error-text");
        this.label = this.fieldNode.parentElement.querySelector(".inputtext-floating-label").textContent;
        var self = this;
        this.setValidationCondition(function () { return self.fieldNode.validity.typeMismatch; }, "Please enter valid " + self.label);
        this.setValidationCondition(function () { return self.fieldNode.validity.valueMissing; }, self.label + " can't be blank");
    }
    Object.defineProperty(Field.prototype, "value", {
        get: function () {
            return this.fieldNode.value;
        },
        enumerable: false,
        configurable: true
    });
    Field.prototype.setValidationCondition = function (f, errorText) {
        var condition = {};
        condition[errorText] = f;
        this.validationConditions.push(condition);
    };
    Field.prototype.addListeners = function () {
        var self = this;
        this.fieldNode.addEventListener("focusout", function (event) {
            self.showError();
        });
        this.fieldNode.addEventListener("focusin", function (event) {
            self.hideError();
        });
    };
    Field.prototype.hasError = function () {
        for (var _i = 0, _a = this.validationConditions; _i < _a.length; _i++) {
            var condition = _a[_i];
            var error = Object.keys(condition)[0];
            var f = condition[error];
            if (f(this.value)) {
                return true;
            }
        }
        return false;
    };
    Field.prototype.showError = function () {
        for (var _i = 0, _a = this.validationConditions; _i < _a.length; _i++) {
            var condition = _a[_i];
            var error = Object.keys(condition)[0];
            var f = condition[error];
            if (f(this.value)) {
                this.fieldNode.setCustomValidity(error);
                this.errorNode.textContent = error;
                this.fieldNode.classList.add('error');
            }
        }
    };
    Field.prototype.hideError = function () {
        this.fieldNode.setCustomValidity("");
        this.errorNode.textContent = "";
        this.fieldNode.classList.remove('error');
    };
    return Field;
}());
export { Field };
//# sourceMappingURL=field.js.map