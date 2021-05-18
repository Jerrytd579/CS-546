function fibonacci(num)
{
    if(num == 0) return 0;
    if(num == 1) return 1;

    return fibonacci(num-1) + fibonacci(num-2)
}

function is_prime(num){
    // https://www.thepolyglotdeveloper.com/2015/04/determine-if-a-number-is-prime-using-javascript/
    if(num <= 1) return false;

    for(var i = 2; i < num; i++){
        if(num % i === 0){
            return false;
        }
    }

    return true;
}

(function () {
  
    let staticForm = document.getElementById('staticForm');
    let results = document.getElementById('results');
    let errorDiv = document.getElementById('error');

    if(staticForm){
        let num = document.getElementById('staticbox');

        staticForm.addEventListener('submit', (event) => {
            event.preventDefault();

            try{
                const numberValue = num.value;
                var regex = /^\d+$/;

                if(!numberValue) throw 'Error: numberValue undefined';
                if(!numberValue.match(regex)) throw 'Error: numberValue must be a number.';
                if(numberValue.includes('.')) throw 'Error: numberValue must be an integer.';

                const parsedNumberValue = parseInt(numberValue);
                if(parsedNumberValue < 0) throw 'Error: number cannot be negative.';
                
                const fib = fibonacci(parsedNumberValue);

                let result = `The Fibonacci of ${parsedNumberValue} is ${fib}.`;
                /*
                    let li = document.createElement('li');
                    li.innerHTML = textInput.value;
                    myUl.appendChild(li);
                    myForm.reset();
                    textInput.focus();
                */
                let li = document.createElement('li');

                if(is_prime(parsedNumberValue)){
                    li.className = 'is-prime';
                }
                else{
                    li.className = 'not-prime';
                }

                li.innerHTML = result;
                
                results.appendChild(li);
                staticForm.reset();

            } catch(e){
                const message = typeof e === 'string' ? e : e.message;
                errorDiv.classList.remove('hidden');     
            }
        })
    }
})();