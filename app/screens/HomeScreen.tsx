import React, { FC } from "react"
import { AppStackScreenProps } from "app/navigators"
import { View, ViewStyle } from "react-native"
import { colors } from "app/theme"
import { Button } from "app/components/atoms"
import { Header } from "app/components/molecules"

interface ContactsScreenProps extends AppStackScreenProps<"Home"> { }

export const HomeScreen: FC<ContactsScreenProps> = function HomeScreen(_props
) {
  const { navigation } = _props;

  return (
    <View style={$container}>
      <Header
        titleTx="homeScreen.heading"
        style={{ backgroundColor: colors.palette.purple }}
        titleStyle={{ color: colors.palette.white }}
      />
      <View style={$buttonContainer}>
        <Button
          text="Go To Winery List"
          onPress={() => {
            navigation.navigate("ProductList")
          }}
        />
      </View>
    </View>
  )
}

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}

const $buttonContainer: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}
