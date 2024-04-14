import * as React from "react";
import { Header, Icon } from "@rneui/themed";

export default function HeaderApp({ onPress, icon, text, icon2, onPressRight }) {
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
            leftComponent={{ icon: icon, color: "black", onPress: onPress }}
            leftContainerStyle={{}}
            linearGradientProps={{}}
            placement="center"
            rightComponent={{ icon: icon2, color: "black", text: text, onPress: onPressRight }}
            rightContainerStyle={{}}
            statusBarProps={{}}
        />
    );
}