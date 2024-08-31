import { BooleanInput, Create, SelectInput, SimpleForm, TextInput } from "react-admin";

const CreateSubscription = () => (
    <Create>
        <SimpleForm>
            <TextInput source="name" label="Name" />
            <SelectInput source="subscriptionType" label="Subscription type" choices={[
                { id: 'monthly', name: 'Monthly subscription 9.90 EUR (per month)' },
                { id: 'yearly', name: 'Yearly subscription 79.90 EUR (per year)' },
            ]} />
            <BooleanInput source="hasThermometer" label="Include thermometer 14.90 EUR (one-time) " />
        </SimpleForm>
    </Create>
);

export default CreateSubscription;
