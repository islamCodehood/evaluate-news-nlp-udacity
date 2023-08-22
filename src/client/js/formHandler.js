import { checkForName } from "./nameChecker";

function handleSubmit(event) {
    event.preventDefault()
    const results = document.getElementById('results');
    // check what text was put into the form field
    let city = document.getElementById('city').value
    const daysBeforeTravel = document.getElementById('date').value
    console.log(checkForName(city))
    if (Client.checkForName(city) !== null) {
        fetch('http://localhost:8030/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                city,
                daysBeforeTravel,
            })
        })
            .then(res => res.json())
            .then((res) => {
                console.log(res)
            //     const html = `
            // <img class="result" src="${image}" alt="city image">
            // <div class="result">${image}</div>
            // `
            //     //reset results
            //     results.innerHTML = ""
            //     //add new content
            //     results.innerHTML = html
                return res;
            }).catch(function (err) {
                console.log(err)
            });

    } else {
        alert("please enter a valid url")
    }
    

}

export { handleSubmit }
