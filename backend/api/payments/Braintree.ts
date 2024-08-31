import braintree from 'braintree';

import User from '../models/User';

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

    private async findCustomer(
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

    private async createCustomer(
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

    private async makeTransaction(
        price: number,
        paymentMethodNonce?: string,
    ) {
        const transactionResult = await this.gateway.transaction.sale({
            amount: price.toString(),
            paymentMethodNonce,
            options: {
              submitForSettlement: true
            }
          });

        console.log('transactionResult', transactionResult);

        if (transactionResult.errors) throw new Error(`An error has occurred when calling braintree ${transactionResult.errors}`);

        return transactionResult;
    }

    public async subscriptionProcess(
        customerId: string,
        price: number,
        paymentMethodNonce: string = 'fake-valid-nonce',
    ) {
        let customer = await this.findCustomer(
            customerId
        );

        if (!customer) {
            customer = await this.createCustomer(
                customerId,
                paymentMethodNonce,
            )
        }

        if (!customer.paymentMethods || customer.paymentMethods.length === 0) throw new Error(`Payment methods in customer ${customer.id} missing`);

        throw new Error(`Customer ${customer.paymentMethods![0].token}`);
    }
}

export default Braintree;
