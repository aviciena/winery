import React from "react"
import { ViewStyle, TextStyle } from "react-native"
import { colors } from "app/theme"
import { Text } from "./Text"
import LinearGradient from 'react-native-linear-gradient';
import { Button } from "./Button";

export interface FooterProps {
    text?: string,
    onPress?: () => void
}

export function ViewCart(props: FooterProps) {
    const { text, onPress } = props;

    return (
        <LinearGradient
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            colors={[colors.palette.purple, colors.palette.robinEggBlue]}
            style={[$header]}
        >
            <Button
                onPress={() => onPress && onPress()}
                style={{ backgroundColor: "transparent", borderWidth: 0 }}
                pressedStyle={{ backgroundColor: colors.palette.purple }}
            >
                <Text text={text} preset="bold" size="lg" style={$textColor} />
            </Button>
        </LinearGradient>
    )
}

const $header: ViewStyle = {
    width: "100%",
    height: 80,
}

const $textColor: TextStyle = {
    color: colors.palette.white,
}