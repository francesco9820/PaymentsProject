import { useCallback, useEffect, useState } from "react";
import { BooleanInput, Button, Create, Loading, SelectInput, SimpleForm, TextInput, Toolbar, useCreate, useRedirect } from "react-admin";

import dropin, { Dropin } from 'braintree-web-drop-in';

const CreateSubscription = () => {
    const [braintreeInstance, setBraintreeInstance] = useState<Dropin | undefined>(undefined);
    const redirect = useRedirect();
    const [create, { isLoading }] = useCreate();

    useEffect(() => {
        if (!process.env.TOKENIZATIONKEYBRAINTREE) return;

        const initialiseBraintree = () => dropin.create({
            // Insert your tokenization key here
            authorization: process.env.TOKENIZATIONKEYBRAINTREE || '',
            container: '#braintree-div'
        }, function (error, instance) {
            if (error)
                console.error(error)
            else
                setBraintreeInstance(instance);
        });

        if (braintreeInstance) {
            braintreeInstance
                .teardown()
                .then(() => initialiseBraintree());
        } else {
            initialiseBraintree();
        }
    }, [process.env.TOKENIZATIONKEYBRAINTREE]);


    const handlePayment = useCallback((
        formData: any,
    ) => {
        if (braintreeInstance) {
            braintreeInstance.requestPaymentMethod(
                (error, payload) => {
                    if (error) {
                        console.error(error);
                    } else {
                        const paymentMethodNonce = payload.nonce;
                        console.log("payment method nonce", payload.nonce);

                        create(
                            'subscription',
                            {
                                data: {
                                    ...formData,
                                    paymentMethodNonce,
                                }
                            },
                            {
                                onSuccess: () => redirect('/subscription'),
                            }
                        )
                    }
                });
        }
            
        return true;
    }, [braintreeInstance]);

    if (isLoading) return <Loading />;

    return (
        <Create>
            <SimpleForm 
                onSubmit={handlePayment}
                toolbar={<Toolbar><Button label="Make payment" type="submit"/></Toolbar>}
            >
                <TextInput source="name" label="Name" />
                <SelectInput source="subscriptionType" label="Subscription type" choices={[
                    { id: 'monthly', name: 'Monthly subscription 9.90 EUR (per month)' },
                    { id: 'yearly', name: 'Yearly subscription 79.90 EUR (per year)' },
                ]} />
                <BooleanInput source="hasThermometer" label="Include thermometer 14.90 EUR (one-time) " />
                <div id={"braintree-div"} />
            </SimpleForm>
        </Create>
    )
};

export default CreateSubscription;
