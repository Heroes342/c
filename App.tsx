import NavigationProvider from "./src/navigation";
import { Text } from "react-native";
import { persistor, store } from "./src/redux/index";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <NavigationProvider />
      </PersistGate>
    </Provider>
  );
};
export default App;
