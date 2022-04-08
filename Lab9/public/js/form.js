function primeNumber(number) {
    result = true;

    if (number <= 1) {
        alert("Neither prime not composite!");
        return;
    }
    else if (isNaN(number)) {
        throw "You must input a number!";
    }
    else {
        for (let i = 2; i < number; i++) {
            if ((number % i) == 0) {
                result = false;
            }
        }
    }
    return result;
}


// We can take advantage of functional scoping; our event listener has access to its outer functional scope
// This means that these variables are accessible in our callback
(function () {
    let staticForm = document.getElementById('static-form');

    if (staticForm) {
        // We can store references to our elements; it's better to
        // store them once rather than re-query the DOM traversal each time
        // that the event runs.
        let number = document.getElementById('number');
        let errorContainer = document.getElementById('error-container');
        let errorTextElement = errorContainer.getElementsByClassName(
            'text-goes-here'
        )[0];

        let resultContainer = document.getElementById('attempts');
        let resultTextElement = resultContainer.getElementsByClassName(
            'text-goes-here'
        )[0];
            
        // Listen for form submit event
        staticForm.addEventListener('submit', (event) => {
            event.preventDefault();
        try {
            var ul = document.getElementById("attempts");
            var li = document.createElement("li")

            // hide containers by default
            errorContainer.classList.add('hidden');
            resultContainer.classList.add('hidden');

            // Values come from inputs as strings, no matter what :(
            let numberValue = number.value;
            let parsedNumberValue = parseInt(numberValue);

            // Makes result green if prime and red if composite
            if(primeNumber(parsedNumberValue)){
                li.setAttribute("class", "is-prime");
                resultTextElement = number.value + ' is a prime number';
            }
            else{
                li.setAttribute("class", "not-prime");
                resultTextElement = number.value + ' is NOT a prime number';
            }
            resultContainer.classList.remove('hidden');
            li.appendChild(document.createTextNode(resultTextElement));
            ul.appendChild(li);
        } catch (e) {
            let message = typeof e === 'string' ? e : alert(e.message);
            errorTextElement.textContent = e;
            errorContainer.classList.remove('hidden');
        }
    });
}
})();