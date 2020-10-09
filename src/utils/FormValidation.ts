import {Field} from './Field';

export class FormValidation {
    private fields: Array<Field>;
    constructor(private formSelector: string) {
        this.fields = []; 
    }

    get formRef(): HTMLSelectElement {
        return document.querySelector(this.formSelector); 
    }

    setValidation(fieldName: string, validationConditionObject: Record<string, Function> = {}) {

        const inputField: HTMLSelectElement = this.formRef.querySelector(`[name=${fieldName}]`);
        const field = new Field(fieldName, inputField);
        if (!this.fields.includes(field)) {
            this.fields.push(field);
        }

        for (const errorText of Object.keys(validationConditionObject)) {
            field.setValidationCondition(validationConditionObject[errorText], errorText);
        }

        field.addListeners();
    }

    checkFormValidity(): boolean {
        const valid = !(this.fields.some(field => field.hasError())); 
        return valid && this.formRef.checkValidity();
    }

    showErrors(): void {
        this.fields.forEach((field) => {
            field.showError();
        });
    }

    hideErrors(): void {
        this.fields.forEach((field) => {
            field.hideError();
        });
    }

    get values(): Record<string, string> {
        const obj = {};
        this.fields.forEach((field) => {
            obj[field.fieldName] = field.value;
        });
        return obj;
    }

    field(name: string): Field {
        let result: Field;
        this.fields.forEach((field) => {
            if (field.fieldName === name) {
                result = field;
            }
        }); 
        return result;      
    }

    discardChanges(): void {
        this.fields.forEach((field) => {
            field.discardChange();
        });
    }
}