import { BooleanField, CreateButton, Datagrid, List, NumberField, TextField } from "react-admin";

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
        </Datagrid>
    </List>
);

export default SubscriptionList;
