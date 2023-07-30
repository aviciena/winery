import React from "react"
import { ViewStyle, TextStyle } from "react-native"
import { colors, spacing } from "app/theme"
import { Text } from "./Text"
import LinearGradient from 'react-native-linear-gradient';

export interface FooterProps {
    text?: string
}

export function Footer(props: FooterProps) {
    const { text } = props

    return (
        <LinearGradient
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            colors={[colors.palette.purple, colors.palette.robinEggBlue]}
            style={[$header, { height: 80 }]}
        >
            <Text text={text} preset="bold" size="lg" style={$textColor} />
        </LinearGradient>
    )
}

const $header: ViewStyle = {
    width: "100%",
    alignItems: "center",
    paddingTop: spacing.sm,
}

const $textColor: TextStyle = {
    color: colors.palette.white,
}