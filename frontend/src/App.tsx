import {
  Admin,
  Resource,
} from "react-admin";

import { Layout } from "./Layout";

import { authProvider } from "./utils/authProvider";

import CustomLogin from "./components/authentication/CustomLogin";
import SubscriptionList from "./components/subscription/List";

import dataProvider from "./utils/dataProvider";
import CreateSubscription from "./components/subscription/Create";

export const App = () => (
  <Admin 
    layout={Layout} 
    loginPage={<CustomLogin />} 
    authProvider={authProvider}
    dataProvider={dataProvider}
  >
    <Resource
      name="subscription"
      list={<SubscriptionList />}
      create={<CreateSubscription />}
    />
  </Admin>
);
