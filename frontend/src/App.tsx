import {
  Admin,
  Resource,
} from "react-admin";

import { Layout } from "./Layout";

import { authProvider } from "./utils/authProvider";
import dataProvider from "./utils/dataProvider";

import CustomLogin from "./components/authentication/CustomLogin";
import SubscriptionList from "./components/subscription/List";
import CreateSubscription from "./components/subscription/Create";
import ShowSubscription from "./components/subscription/Show";

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
      show={<ShowSubscription />}
    />
  </Admin>
);
