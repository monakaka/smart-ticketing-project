// buy tickets btn navigation
document.getElementById('buy-ticket-btn').addEventListener('click', function () {
    const paribahan = document.getElementById('paribahan');
    paribahan.scrollIntoView({ behavior: "smooth" });
})

// seats click function
const allSeats = document.getElementsByClassName('seat-btn');

let counter = 0;
for (let seat of allSeats) {
    seat.addEventListener('click', function (e) {
        const restSeats = getElementNumberId('rest-seat');
        const selectedSeatsCount = getElementNumberId('selected-seat-count');
        const seatName = e.target.innerText;

        //  counter iteration part 
        counter++

        // maximum seat control control
        const totalSelectSeat = getElementNumberId('selected-seat-count');
        if (totalSelectSeat === 4) {
            alert('You are able to buy maximum 4 tickets!');
            return;
        }

        // set selected-Bg-color
        const selectedBtn = e.target;
        selectedBtn.classList.add('bg-primaryColor');
        selectedBtn.classList.add('text-white');
        selectedBtn.classList.add('pointer-events-none');

        // set selected total seats
        const newSelectedSeats = selectedSeatsCount + 1;
        setElement('selected-seat-count', newSelectedSeats)

        // set rest seats
        const newRestSeats = restSeats - 1;
        setElement('rest-seat', newRestSeats);

        // seat details set and create function call
        seatDetails(seatName);

        // total price calculation
        totalPriceCalculation();


        // coupon btn enable part
        const couponBtn = document.getElementById('coupon-btn');

        if (counter === 4) {
            couponBtn.classList.remove('bg-gray-300');
            couponBtn.removeAttribute('disabled');
            couponBtn.classList.add('bg-primaryColor');
        }

    })
}

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

// total price calculation
function totalPriceCalculation() {
    const previousTotalPrice = getElementNumberId('total-price');
    const perSeatPrice = getElementNumberId('per-seat-price');
    const newTotalPrice = previousTotalPrice + perSeatPrice;
    setElement('total-price', newTotalPrice);
    setElement('grand-total', newTotalPrice);
}


// coupon calculation -----
document.getElementById('coupon-btn').addEventListener('click', function () {
    const discountContainer = document.getElementById('discount-total');
    const couponCodeFieldContainer = document.getElementById('coupon-container');
    const couponField = document.getElementById('coupon-field');
    const couponCode = couponField.value;
    const totalPrice = getElementNumberId('total-price');

    if (couponCode === 'NEW15') {
        const discount = totalPrice * 15 / 100;
        const grandPrice = totalPrice - discount;
        setElement('grand-total', grandPrice);
        discountContainer.innerHTML = `
                     <p>Discount</p>
                     <p>BDT <span>${discount}</span></p>
            `
        couponCodeFieldContainer.classList.add('hidden');
    }
    else if (couponCode === 'Couple 20') {
        const discount = totalPrice * 20 / 100;
        const grandPrice = totalPrice - discount;
        setElement('grand-total', grandPrice);
        discountContainer.innerHTML = `
                     <p>Discount Total</p>
                     <p>BDT <span>${discount}</span></p>
            `
        couponCodeFieldContainer.classList.add('hidden');
    }
    else {
        alert('Invalid Coupon !')
    }
})

// next button enable part 
document.getElementById('num-field').addEventListener('keyup', function (e) {
    const phnNumber = document.getElementById('num-field').value;
    const selectedSeat = getElementNumberId('selected-seat-count');
    const nextBtn = document.getElementById('next-btn');
    const value = parseInt(e.key);
    if ((!isNaN(value) || phnNumber) && selectedSeat > 0) {
        nextBtn.classList.remove('bg-gray-300');
        nextBtn.classList.remove('pointer-events-none');
        nextBtn.classList.add('bg-primaryColor')
        nextBtn.addEventListener('click', function () {
            my_modal_4.showModal();
        });
    }
    else {
        nextBtn.classList.add('bg-gray-300');
        nextBtn.classList.add('pointer-events-none');
        nextBtn.classList.remove('bg-primaryColor')
    }

});

// get element with convert in number
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