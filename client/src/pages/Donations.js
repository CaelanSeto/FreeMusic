import StripeCheckout from 'react-stripe-checkout';
import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import { number } from 'yup';

const MySwal = withReactContent(Swal);

function Donations() {


    const publishableKey =
        'pk_test_51LlEDRFEvmZ7SBdbiDWpgIa1UuHPg9Nba1hhzeXFS9eC3NWnt0VAhLHP6mKEp21KRpvwKPHbaN0pvsKv1bT0YzcU00q4K4b8bI'
    const [donation, setDonation] = useState({
        amount: 0,
    })

    const donateWithStripe = donation.amount;

    const handleChange = (event) => {
       setDonation(event.target.value);
    }

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
                url: 'http://localhost:5000/donation',
                method: 'post',
                data: {
                    amount: setDonation,
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
            <h3>Please leave us a donation to help us to continue to provide free music</h3>
            <br></br>
            <p>How much would you like to donate </p>
            <input type="number" placeholder="$.." onChange={handleChange} value={donation} />
            <StripeCheckout
                stripeKey={publishableKey}
                label="Donate Now"
                name="Donate With Credit Card"
                billingAddress
                shippingAddress
                amount={donateWithStripe}
                description={`Thank You for your Donation of $${donation}`}
                token={donateNow}
            />

        </div>
    )
}

export default Donations
