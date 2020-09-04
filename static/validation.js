export class FormValidation {
    constructor(formSelector) {
        this.formSelector = formSelector;
        this.fields = [];
    }

    get formRef() {
        return document.querySelector(this.formSelector); 
    }

    waitForElementToAppear(elementName) {  
        const self = this;                                        
        return Rx.Observable.create(function(observer) {                            
            let el_ref;
            let form = self.formRef;                                                  
            const f = () => {                                                   
                el_ref = form.querySelector(`[name=${elementName}]`); 
                if (el_ref) {                                              
                    observer.next(el_ref);                                   
                    observer.complete();                                     
                    return;                                                  
                }                                                            
                window.requestAnimationFrame(f);                             
            };                                                               
            f();                                                             
        });                                                                  
    }

    setValidation(fieldName, validationConditionObject = {}) {
        this.waitForElementToAppear(fieldName).subscribe(inputField => {

            let field = new Field(fieldName, inputField);
            if (!this.fields.includes(field)) {
                this.fields.push(field);
            }

            for (let errorText of Object.keys(validationConditionObject)) {
                field.setValidationCondition(validationConditionObject[errorText], errorText);
            }

            field.addListeners();
        });
    }

    checkFormValidity() {
        let valid = true;
        this.fields.forEach((field) => {
            if (field.hasError()) {
                valid = false;
            }
        });
        return valid && this.formRef.checkValidity();
    }

    showErrors() {
        this.fields.forEach((field) => {
            field.showError();
        });
    }

    hideErrors() {
        this.fields.forEach((field) => {
            field.hideError();
        });
    }

    get values() {
        let obj = {};
        this.fields.forEach((field) => {
            obj[field.fieldName] = field.value;
        });
        return obj;
    }
}

class Field {
    constructor(fieldName, fieldNode) {
        this.fieldName = fieldName;
        this.fieldNode = fieldNode;
        this.validationConditions = [];

        this.errorNode = this.fieldNode.parentElement.querySelector(".error-text");
        this.label = this.fieldNode.parentElement.querySelector(".inputtext-floating-label").textContent;

        let self = this;

        this.setValidationCondition(function() {return self.fieldNode.validity.typeMismatch; }, `Please enter valid ${self.label}`);
        this.setValidationCondition(function() {return self.fieldNode.validity.valueMissing; }, `${self.label} can't be blank`);
    }

    get value() {
        return this.fieldNode.value;
    }


    setValidationCondition(f, errorText) {
        let condition = {};
        condition[errorText] = f;
        this.validationConditions.push(condition);
    }

    addListeners() {
        let self = this;
        this.fieldNode.addEventListener("focusout", function (event) {
            self.showError();
        });

        this.fieldNode.addEventListener("focusin", function (event) {
            self.hideError();
        });
    }

    hasError() {
        for (let condition of this.validationConditions) {
            let error = Object.keys(condition)[0];
            let f = condition[error];

            if (f(this.value)) {
                return true;              
            }
        } 
        return false;       
    }

    showError() {
        for (let condition of this.validationConditions) {
            let error = Object.keys(condition)[0];
            let f = condition[error];

            if (f(this.value)) {
                this.fieldNode.setCustomValidity(error);
                this.errorNode.textContent = error;
                this.fieldNode.classList.add('error');                
            }
        }
    }

    hideError() {
        this.fieldNode.setCustomValidity("");
        this.errorNode.textContent = "";
        this.fieldNode.classList.remove('error');
    }
}