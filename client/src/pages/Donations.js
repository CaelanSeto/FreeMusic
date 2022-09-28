import StripeCheckout from 'react-stripe-checkout';
import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';


const MySwal = withReactContent(Swal);

function Donations() {


    const publishableKey =
        'pk_test_51LlEDRFEvmZ7SBdbiDWpgIa1UuHPg9Nba1hhzeXFS9eC3NWnt0VAhLHP6mKEp21KRpvwKPHbaN0pvsKv1bT0YzcU00q4K4b8bI'
    const [donation, setDonation] = useState({
        amount: 10,
    })

    const donateWithStripe = donation.amount * 100;

    const handleSuccess = () => {
        MySwal.fire({
          icon: 'success',
          title: 'Payment was successful',
          time: 4000,
        });
      };
      const handleFailure = () => {
        MySwal.fire({
          icon: 'error',
          title: 'Payment was not successful',
          time: 4000,
        });
      };
      

    const donateNow = async token => {
        try {
            const response = await axios({
                url: 'http://18.217.161.38:5000/donation',
                method: 'post',
                data: {
                    amount: donation.amount * 100,
                    token,
                }
            });
            if (response.status === 200) {
                handleSuccess();
            }
        } catch (error) {
            handleFailure();
            console.log(error)
        }
    }

    return (
        <div>
            <h2>Our Donations Page</h2>
            <br></br>
            <h3>Donate $10 to help us to continue to provide free music</h3>
            <br></br>
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
