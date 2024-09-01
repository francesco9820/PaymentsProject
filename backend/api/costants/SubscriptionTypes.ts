import { ManipulateType } from "dayjs";

enum SubscriptionTypes {
    MONTHLY = 'monthly',
    YEARLY = 'yearly',
};

export const mapSubscriptionTypsToBillingFrequency: Record<SubscriptionTypes, ManipulateType> = {
    [SubscriptionTypes.MONTHLY]: 'month',
    [SubscriptionTypes.YEARLY]: 'year',
};

export default SubscriptionTypes;
