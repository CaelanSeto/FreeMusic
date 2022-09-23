import StripeCheckout from 'react-stripe-checkout';
import React, { useState } from 'react';
import axios from 'axios';

function Donations() {

    const publishableKey =
        'pk_test_51LlEDRFEvmZ7SBdbiDWpgIa1UuHPg9Nba1hhzeXFS9eC3NWnt0VAhLHP6mKEp21KRpvwKPHbaN0pvsKv1bT0YzcU00q4K4b8bI'
    const [donation, setDonation] = useState({
        amount: "amount",
    })

    const donateWithStripe = donation.amount * 100;

    const donateNow = async token => {
        try {
            const response = await axios({
                url: 'http:localhost://5000/donation',
                method: 'post',
                data: {
                    amount: donation.amount * 100,
                    token,
                }
            });
            if (response.status === 200) {
                console.log("Your payment was successful")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <h2>Our Donations Page</h2>
            <br></br>
            <h3>Please leave us a donation to help us to continue to provide free music</h3>
            <br></br>
            <p>How much would you like to donate </p>
            <input type="number" placeholder="$.." onChange={(event) => {
                setDonation(event.target.value);
            }} />
            <StripeCheckout
                stripeKey={publishableKey}
                label="Donate Now"
                name="Donate With Credit Card"
                billingAddress
                shippingAddress
                amount={donateWithStripe}
                description={`Thank You for your Donation of $${donation.amount}`}
                token={donateNow}
            />

        </div>
    )
}

export default Donations
