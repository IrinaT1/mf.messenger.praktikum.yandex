export class Field {
    private validationConditions: Record<string, Function>[];
    private errorNode: HTMLSelectElement;
    private label: string;

    constructor(public fieldName: string, public fieldNode: HTMLSelectElement) {
        this.validationConditions = [];

        this.errorNode = this.fieldNode.parentElement.querySelector(".error-text");
        this.label = this.fieldNode.parentElement.querySelector(".inputtext-floating-label").textContent;

        this.setValidationCondition(() => { return this.fieldNode.validity.typeMismatch; }, `Please enter valid ${this.label}`);
        this.setValidationCondition(() => { return this.fieldNode.validity.valueMissing; }, `${this.label} can't be blank`);
    }

    get value(): string {
        return this.fieldNode.value;
    }


    setValidationCondition(f: Function, errorText: string): void {
        const condition = {};
        condition[errorText] = f;
        this.validationConditions.push(condition);
    }

    addListeners(): void {
        this.fieldNode.addEventListener("focusout", (event) => {
            this.showError();
        });

        this.fieldNode.addEventListener("focusin", (event) => {
            this.hideError();
        });
    }

    hasError(): boolean {
        for (const condition of this.validationConditions) {
            const error = Object.keys(condition)[0];
            const f = condition[error];

            if (f(this.value)) {
                return true;
            }
        }
        return false;
    }

    showError(): void {
        for (const condition of this.validationConditions) {
            const error = Object.keys(condition)[0];
            const f = condition[error];

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

    discardChange(): void {
        this.hideError();
        this.fieldNode.value = this.fieldNode.getAttribute("value");
    }
}