function handleSubmit(event) {
    event.preventDefault()
    const results = document.getElementById('results');
    // check what text was put into the form field
    let formText = document.getElementById('name').value
    Client.checkForName(formText)

    fetch('http://localhost:8080/data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            text: formText
        })
    })
        .then(res => res.json())
        .then((res) => {
            console.log(res)
            const { agreement, subjectivity, confidence, irony } = res;
            const html = `
        <div class="result">Agreement: ${agreement}</div>
        <div class="result">Subjectivity: ${subjectivity}</div>
        <div class="result">Confidence: ${confidence}</div>
        <div class="result">Irony: ${irony}</div>
        `
        //reset results
            results.innerHTML = ""
            //add new content
            results.innerHTML = html
        }).catch(function (err) {
            console.log(err)
        });
}

export { handleSubmit }
