import { ArrayField, Datagrid, DateField, NumberField, Show, SimpleShowLayout, TextField } from "react-admin";

import CancelSubscription from "./CancelSubscription";

const ShowSubscription = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="name" label="Name" />
            <TextField source="subscriptionType" label="Name" />
            <NumberField source="price" options={{ style: 'currency', currency: 'EUR' }} label="Price"/>
            <TextField source="status" label="Subscription status" />
            <DateField source="nextBillingDate" label="Next billing date" />
            <NumberField source="balance" options={{ style: 'currency', currency: 'EUR' }} label="Balance"/>
            <DateField source="expirationDate" label="Expiration date"/>
            <ArrayField source="addOns" label="Thermometer">
                <Datagrid
                    bulkActionButtons={false}
                >
                    <TextField source="name" label="Name" />
                    <NumberField source="quantity" label="Quantity" />
                    <NumberField source="amount" options={{ style: 'currency', currency: 'EUR' }} label="Amount"/>
                </Datagrid>
            </ArrayField>
            <CancelSubscription />
        </SimpleShowLayout>
    </Show>
);

export default ShowSubscription;
