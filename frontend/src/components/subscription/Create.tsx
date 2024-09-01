import { useCallback, useEffect, useState } from "react";
import { BooleanInput, Button, Create, Loading, SelectInput, SimpleForm, TextInput, Toolbar, useCreate, useNotify, useRedirect } from "react-admin";

import dropin, { Dropin } from 'braintree-web-drop-in';

const CreateSubscription = () => {
    const [braintreeInstance, setBraintreeInstance] = useState<Dropin | undefined>(undefined);
    const redirect = useRedirect();
    const notify = useNotify();
    const [create, { isLoading }] = useCreate();

    useEffect(() => {
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
    }, []);


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
                                onError: (e: any) => notify(`An error occurred when creating subscription: ${e.message}`)
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
                <TextInput source="name" label="Name" required />
                <SelectInput source="subscriptionType" label="Subscription type" choices={[
                    { id: 'monthly', name: 'Monthly subscription 9.90 EUR (per month)' },
                    { id: 'yearly', name: 'Yearly subscription 79.90 EUR (per year)' },
                ]} required />
                <BooleanInput source="hasThermometer" label="Include thermometer 14.90 EUR (one-time)" defaultValue={false} />
                <div id="braintree-div" />
            </SimpleForm>
        </Create>
    )
};

export default CreateSubscription;
