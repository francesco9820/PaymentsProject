enum SubscriptionTypes {
    MONTHLY = 'monthly',
    YEARLY = 'yearly',
};

export const mapSubscriptionTypsToBillingFrequency = {
    [SubscriptionTypes.MONTHLY]: 12,
    [SubscriptionTypes.YEARLY]: 1,
};

export default SubscriptionTypes;
