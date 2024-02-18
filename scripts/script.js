const allSeats = document.getElementsByClassName('seat-btn');

for (let seat of allSeats) {
    seat.addEventListener('click', function (e) {
        const restSeats = getElementNumberId('rest-seat');
        const selectedSeatsCount = getElementNumberId('selected-seat-count');
        const seatName = e.target.innerText;

        // set selected-Bg-color 
        const selectedBtn = e.target;
        selectedBtn.classList.add('bg-primaryColor')


        // set rest seats
        const newRestSeats = restSeats - 1;
        setElement('rest-seat', newRestSeats);

        // set selected total seats 
        const newSelectedSeats = selectedSeatsCount + 1;
        setElement('selected-seat-count', newSelectedSeats)


        // seat details set and create function call
        seatDetails(seatName);

        // total price calculation
        totalPriceCalculation();

    })
}

// total price calculation 
function totalPriceCalculation() {
    const previousTotalPrice = getElementNumberId('total-price');
    const newTotalPrice = previousTotalPrice + 550;
    setElement('total-price', newTotalPrice);
    setElement('grand-total', newTotalPrice);
}

// coupon calculation function
document.getElementById('coupon-btn').addEventListener('click', function () {
    const couponField = document.getElementById('coupon-field');
    const couponCode = couponField.value;
    const totalPrice = getElementNumberId('total-price');
    if (couponCode === 'NEW15') {
        const discount = totalPrice * 15 / 100;
        const grandPrice = totalPrice - discount;
        setElement('grand-total', grandPrice);
    }
    else if (couponCode === 'Couple 20') {
        const discount = totalPrice * 20 / 100;
        const grandPrice = totalPrice - discount;
        setElement('grand-total', grandPrice);
    }
})


// seat details create function
function seatDetails(seatName) {
    const seatDetailsContainer = document.getElementById('seat-details-container');
    const div = document.createElement('div');
    div.classList.add('flex');
    div.classList.add('justify-between');
    div.classList.add('items-center');

    div.innerHTML = `
            <p>${seatName}</p>
            <p>Economy</p>
            <p>550</p>         
        `
    seatDetailsContainer.appendChild(div);
}



// if i want a element with convert in number 
function getElementNumberId(id) {
    const element = document.getElementById(id);
    const elementCount = parseInt(element.innerText);
    return elementCount;
}


// set element 
function setElement(elementId, value) {
    const restSeatsBox = document.getElementById(elementId);
    restSeatsBox.innerText = value;
}