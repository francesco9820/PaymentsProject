import { BooleanField, CreateButton, Datagrid, DateField, List, NumberField, TextField } from "react-admin";

const SubscriptionList = () => (
    <List
        actions={<CreateButton />}
    >
        <Datagrid
            bulkActionButtons={false}
        >
            <TextField source="name" label="Name" />
            <TextField source="subscriptionType" label="Name" />
            <BooleanField source="hasThermometer" label="Thermometer" />
            <NumberField source="price" options={{ style: 'currency', currency: 'EUR' }} label="Price"/>
            <TextField source="status" label="Subscription status" />
            <DateField source="nextBillingDate" label="Next billing date" />
        </Datagrid>
    </List>
);

export default SubscriptionList;
