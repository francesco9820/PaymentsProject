import braintree from 'braintree';

import User from '../models/User';

import SubscriptionTypes, { mapSubscriptionTypsToBillingFrequency } from '../costants/SubscriptionTypes';

const brainTreeErrorsTypes = {
    NOT_FOUND: 'notFoundError',
};

class Braintree {
    private gateway: braintree.BraintreeGateway;

    constructor () {
        this.gateway = new braintree.BraintreeGateway({
            environment: braintree.Environment.Sandbox,
            merchantId: process.env.BRAINTREEMERCHANTID || '',
            publicKey: process.env.BRAINTREEPUBLICKEY || '',
            privateKey: process.env.BRAINTREEPRIVATEKEY || '',
        });
    }

    public async findCustomer(
        customerId: string,
    ) {
        let customer;
        try {
            customer = await this.gateway.customer.find(customerId);
        } catch (e: any) {
            if (e.type !== brainTreeErrorsTypes.NOT_FOUND) throw new Error(`Unknown error from braintree find customer: ${e}`);
        }

        return customer;
    }

    public async createCustomer(
        customerId: string,
        paymentMethodNonce: string,
    ) {
        const userCustomer = await User.findOne({
            _id: customerId,
        });
        if (!userCustomer) throw new Error(`Could not find customer with user ${customerId}`);
 
        const {
            customer
        } = await this.gateway.customer.create({
            id: customerId,
            email: userCustomer.email,
            paymentMethodNonce,
        });

        return customer;
    }

    public async updateCustomerPaymentMethod(
        customerId: string,
        paymentMethodNonce: string,
    ) {
        const {
            customer: updatedCustomer
        } = await this.gateway.customer.update(
            customerId,
            {
                paymentMethodNonce,
            }
        );

        return updatedCustomer;
    }

    public async createSubscription(
        subscriptionType: SubscriptionTypes,
        hasThermometer: boolean,
        paymentMethodToken: string,
    ) {
        const { plans } = await this.gateway.plan.all();

        const selectedPlan = plans.find(
            (p) => p.id === subscriptionType,
        );
        if (!selectedPlan) throw new Error(`Missing plan of type ${subscriptionType}`);

        const subscriptionAddOns = [];
        if (hasThermometer) {
            const addOns = await this.gateway.addOn.all();

            if (addOns.length !== 1) throw new Error(`Unexpected number of addons: ${addOns.length}`);

            subscriptionAddOns.push({
                inheritedFromId: addOns[0].id,
                amount: addOns[0].amount,
            })
        }

        try {
            const { subscription } = await this.gateway.subscription.create({
                paymentMethodToken,
                planId: selectedPlan.id,
                addOns: {
                    add: subscriptionAddOns,
                }
            })

            return subscription;
        } catch (e: any) {
            throw new Error(e.name + ' ' + e.type + ' ' + e.message);
        }
    }

    public async findSubscription(
        subscriptionId: string,
    ) {
        try {
            const subscription = await this.gateway.subscription.find(subscriptionId);

            return subscription
        } catch (e: any) {
            throw new Error(`Could not find subscription on Braintree with id ${subscriptionId}: ${e.name}`);
        }
    }

    public async subscriptionProcess({
        customerId,
        subscriptionType,
        hasThermometer,
        paymentMethodNonce,
    }:{
        customerId: string,
        subscriptionType: SubscriptionTypes,
        hasThermometer: boolean,
        paymentMethodNonce: string,
    }) {
        let customer = await this.findCustomer(
            customerId,
        );

        if (!customer) {
            customer = await this.createCustomer(
                customerId,
                paymentMethodNonce,
            )
        } else {
            customer = await this.updateCustomerPaymentMethod(
                customerId,
                paymentMethodNonce,
            );
        }

        if (!customer.paymentMethods || customer.paymentMethods.length === 0) throw new Error(`Payment methods in customer ${customer.id} missing`);

        const paymentMethodToken = customer.paymentMethods[0].token;

        const subscription = await this.createSubscription(
            subscriptionType,
            hasThermometer,
            paymentMethodToken,
        );

        return {
            braitreeSubscriptionId: subscription.id,
        }
    }
}

export default Braintree;
