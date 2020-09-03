export function waitForElementToAppear(formSelector, elementName) {                                          
    return Rx.Observable.create(function(observer) {                            
        let el_ref;
        let form = document.querySelector(formSelector);                                                  
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

export function setValidation(formSelector, fieldName) {
    waitForElementToAppear(formSelector, fieldName).subscribe(inputField => {

        let parent = inputField.parentElement;
        let errorNode = parent.querySelector(".error-text");
        let label = parent.querySelector(".inputtext-floating-label").textContent;

        inputField.addEventListener("focusout", function (event) {
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
        });

        inputField.addEventListener("focusin", function (event) {
            errorNode.textContent = "";
            inputField.classList.remove('error');
        });
    });
}

export function checkFormValidity(formSelector) {
    var form = document.querySelector(formSelector);
    return form.checkValidity();
}


