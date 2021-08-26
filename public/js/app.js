
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#weather-message')
const messageTwo = document.querySelector('#error-message')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    messageOne.textContent = 'Finding your forecast...'
    messageTwo.textContent = ''
    fetch(`/weather?location=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = `Weather for ${data.location}`
                messageTwo.textContent = `${data.forecast}`
            }
        })
    })
})