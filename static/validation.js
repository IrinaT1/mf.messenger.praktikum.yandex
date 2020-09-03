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

    setValidation(fieldName) {
        this.waitForElementToAppear(fieldName).subscribe(inputField => {
            this.fields.push(inputField);
            const self = this;
            inputField.addEventListener("focusout", function (event) {
                self._showError(inputField);
            });
    
            inputField.addEventListener("focusin", function (event) {
                self._hideError(inputField);
            });
        });
    }
    
    checkFormValidity() {
        return this.formRef.checkValidity();
    }

    showErrors() {
        this.fields.forEach((field) => {
            this._showError(field);
        });
    }

    hideErrors() {
        this.fields.forEach((field) => {
            this._hideError(field);
        });
    }

    _showError(inputField) {
        let parent = inputField.parentElement;
        let errorNode = parent.querySelector(".error-text");
        let label = parent.querySelector(".inputtext-floating-label").textContent;

        if (inputField.validity.typeMismatch) {
            errorNode.textContent = `Please enter valid ${label}`;
            inputField.classList.add('error');
        } else if (inputField.validity.valueMissing) {
            errorNode.textContent = `${label} can't be blank`;
            inputField.classList.add('error');
        } else {
            errorNode.textContent = "";
            inputField.classList.remove('error');
        }
    }

    _hideError(inputField) {
        let parent = inputField.parentElement;
        let errorNode = parent.querySelector(".error-text");

        errorNode.textContent = "";
        inputField.classList.remove('error');
    }
    
}