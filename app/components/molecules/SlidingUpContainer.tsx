import i18n from "i18n-js"
import { colors, spacing } from "app/theme";
import React, { ReactNode, useImperativeHandle, useRef } from "react";
import { TextStyle, View, ViewStyle } from "react-native";
import SlidingUpPanel from "rn-sliding-up-panel";
import { Text } from "../atoms";
import { translate, TxKeyPath } from "../../i18n"

interface SlidingUpContainerProps {
  /**
   * Ref.
   */
  ref: HTMLInputElement,
  /**
   * Children components.
   */
  children: ReactNode,
  /**
   * Text which is looked up via i18n.
   */
  tx?: TxKeyPath
  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string
  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  txOptions?: i18n.TranslateOptions
}

const INITIAL_HEIGHT = 800

const SlidingUpContainer = React.forwardRef((props: SlidingUpContainerProps, ref: any) => {
  const { children, text, tx, txOptions } = props;
  const forwardRef = useRef(null);

  const i18nText = tx && translate(tx, txOptions)
  const title = i18nText || text

  useImperativeHandle(ref, () => ({
    show() {
      forwardRef?.current.show(INITIAL_HEIGHT)
    },
    hide() {
      forwardRef?.current.hide()
    }
  }))

  return (
    <SlidingUpPanel ref={forwardRef}>
      <View style={$container}>
        <View style={$headerContainer} >
          <View style={$line} />
          <Text text={title} size="lg" weight="bold" style={$titleHeader} />
        </View>
        {children}
      </View>
    </SlidingUpPanel >
  )
});

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background
}

const $headerContainer: ViewStyle = {
  width: "100%",
  alignItems: 'center',
  marginTop: spacing.xl,
  marginBottom: spacing.lg
}

const $line: ViewStyle = {
  height: 3,
  width: 50,
  backgroundColor: colors.palette.black70
}

const $titleHeader: TextStyle = {
  color: colors.palette.pr4,
  marginTop: spacing.lg
}

export default SlidingUpContainer;