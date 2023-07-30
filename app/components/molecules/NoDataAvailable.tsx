import React from "react"
import { View, ViewStyle } from "react-native"
import { TxKeyPath } from "../../i18n"
import { colors } from "../../theme"
import { Text } from "../atoms"

export interface NoDataAvailableProps {
  /**
   * Text which is looked up via i18n.
   */
  tx?: TxKeyPath
  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string
}

export function NoDataAvailable(props: NoDataAvailableProps) {
  const { tx, text } = props

  return (
    <View
      style={$container}>
      <Text text={text} tx={tx} style={{ color: colors.palette.white }} />
    </View>
  )
}

const $container: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
}