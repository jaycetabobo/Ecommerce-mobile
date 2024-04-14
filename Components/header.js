import * as React from "react";
import { Header, Icon } from "@rneui/themed";

export default function HeaderApp({ onPress }) {
    return (
        <Header
            backgroundColor="#EEEEEE"
            backgroundImageStyle={{}}
            barStyle="default"
            centerComponent={{
                text: "BUYNABAI",
                style: { color: "black", fontSize: 20, fontWeight: "bold" }
            }}
            centerContainerStyle={{}}
            containerStyle={{ width: 'auto', borderBottomWidth: 1, borderBottomColor: "black" }}
            leftComponent={{ icon: "menu", color: "black", onPress: onPress }}
            leftContainerStyle={{}}
            linearGradientProps={{}}
            placement="center"
            rightComponent={{ icon: "shopping-cart", color: "black" }}
            rightContainerStyle={{}}
            statusBarProps={{}}
        />
    );
}