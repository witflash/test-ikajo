;(function () {
    
    function validateForm (e) {
        var inputs = e.currentTarget.querySelectorAll('input');
        isValide = true;
        e.preventDefault();
        for (var i = 0; i < inputs.length; i++) {
            var input = inputs[i];
            checkInput(input);
        }
        submitForm();
    };
    
    function checkInput (input) {
        if (!input.value.trim()) {
            input.classList.add(notValideClass);
            input.parentElement.classList.add(emptyClass);
            isValide = false;
            return false;
        }
        if ( input.type == 'email' && !input.value.match(regex) ) {
            input.classList.add(notValideClass);            
            input.parentElement.classList.add(notEmailClass);
            isValide = false;            
            return false;
        }
        userInput[input.name] = input.value;
    };

    function submitForm () {
        console.log('isValide: ', isValide);
        if (isValide) {
            console.log(userInput);
            alert('Thank you!');
        }
    };

    function clearField (e) {
        var item = e.target;
        if (item.type == "text" || item.type == "email") {
            item.classList.remove(notValideClass);
            item.parentElement.classList.remove(emptyClass);
            item.parentElement.classList.remove(notEmailClass);          
        }
    }
    
    var form = document.getElementById('form-start'),
        userInput = {},
        isValide,
        notValideClass = 'js-not-valide',
        notEmailClass = 'js-not-email',
        emptyClass = 'js-empty-field',
        regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    form.addEventListener('click', clearField)
    form.addEventListener('submit', validateForm);

}());