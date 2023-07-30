import React, { useState } from "react";
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { ProductListData } from "../organisms/ProductList";
import { Card } from "./Card";
import UIStepper from 'react-native-ui-stepper';
import { Button, Text } from "../atoms";
import { colors, spacing } from "app/theme";

interface ProductItemProps {
  data: ProductListData,
  index: number,
  onPressStepper?: (type: string, index: number) => void
  onAddToCart?: (index: number) => void
}

export function ProductItem(props: ProductItemProps) {
  const { index, data, onAddToCart, onPressStepper } = props;

  return (
    <Card
      verticalAlignment="space-between"
      style={{ backgroundColor: colors.background, borderWidth: 0 }}
      LeftComponent={
        <View>
          <Text style={$titleStyle}>{data.name}</Text>
          <Text style={$priceStyle}>{data.price}</Text>
          {data.count === 0 &&
            <Button
              tx="productListScreen.addToCart"
              style={$buttonStyle}
              textStyle={{ color: colors.palette.white }}
              pressedStyle={{ backgroundColor: colors.palette.purple }}
              onPress={() => { onAddToCart(index) }}
            />
          }
          {data.count > 0 &&
            <UIStepper
              width={110}
              height={41}
              borderColor={colors.palette.white}
              textColor={colors.palette.white}
              tintColor={colors.palette.white}
              initialValue={data.count}
              displayValue={true}
              onIncrement={() => onPressStepper("increment", index)}
              onDecrement={() => onPressStepper("decrement", index)}
            />
          }
        </View>
      }
      RightComponent={
        <Image
          style={$imageContainer}
          source={data.image}
        />
      } />
  )
}

const $titleStyle: TextStyle = {
  color: colors.palette.white,
  width: 229,
}

const $priceStyle: TextStyle = {
  color: colors.palette.info,
  width: 210,
  marginTop: spacing.sm,
  marginBottom: spacing.sm
}

const $buttonStyle: ViewStyle = {
  backgroundColor: colors.buttonColor,
  borderWidth: 0,
  minHeight: 31,
  width: 115
}

const $imageContainer: ImageStyle = {
  alignSelf: "center",
  width: 114,
  height: 114
}