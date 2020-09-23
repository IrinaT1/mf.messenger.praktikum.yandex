export class Field {
    private validationConditions: Record<string, Function>[];
    private errorNode: HTMLSelectElement;
    private label: string;
    
    constructor(public fieldName: string, public fieldNode: HTMLSelectElement) {
        this.validationConditions = [];

        this.errorNode = this.fieldNode.parentElement.querySelector(".error-text");
        this.label = this.fieldNode.parentElement.querySelector(".inputtext-floating-label").textContent;

        let self = this;

        this.setValidationCondition(function() {return self.fieldNode.validity.typeMismatch; }, `Please enter valid ${self.label}`);
        this.setValidationCondition(function() {return self.fieldNode.validity.valueMissing; }, `${self.label} can't be blank`);
    }

    get value(): string {
        return this.fieldNode.value;
    }


    setValidationCondition(f: Function, errorText: string) :void {
        let condition = {};
        condition[errorText] = f;
        this.validationConditions.push(condition);
    }

    addListeners(): void {
        let self = this;
        this.fieldNode.addEventListener("focusout", function (event) {
            self.showError();
        });

        this.fieldNode.addEventListener("focusin", function (event) {
            self.hideError();
        });
    }

    hasError(): boolean {
        for (let condition of this.validationConditions) {
            let error = Object.keys(condition)[0];
            let f = condition[error];

            if (f(this.value)) {
                return true;              
            }
        } 
        return false;       
    }

    showError(): void {
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

    hideError(): void {
        this.fieldNode.setCustomValidity("");
        this.errorNode.textContent = "";
        this.fieldNode.classList.remove('error');
    }

    clear(): void {
        this.hideError();
        this.fieldNode.value = "";
    }
}