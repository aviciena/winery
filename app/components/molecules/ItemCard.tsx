import React from "react"
import { ImageStyle, View, ViewStyle, Image, TextStyle } from "react-native"
import { colors, spacing } from "app/theme"
import { Icon, Text } from "app/components/atoms"
import UIStepper from 'react-native-ui-stepper';
import { ProductListData } from "../organisms/ProductList";

interface ItemCardProps {
  data: ProductListData,
  index: number,
  onDeleteItem?: (index: number) => void
  onPressStepper?: (type: string, index: number) => void
}

export default function ItemCard(props: ItemCardProps) {
  const { data, index, onDeleteItem, onPressStepper } = props;

  const onPressStepperHanlder = (type: string, index: number) => {
    onPressStepper(type, index);
  }

  return (
    <View
      style={{
        marginTop: spacing.xl,
        borderRadius: spacing.md,
        padding: spacing.md,
        borderWidth: 1,
        shadowColor: colors.palette.neutral800,
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.08,
        shadowRadius: 12.81,
        elevation: 16,
        minHeight: 96,
        flexDirection: "column",
        backgroundColor: colors.palette.cardBg,
        borderColor: colors.palette.cardBg,
      }}
    >
      <View style={{ display: "flex", gap: 20, flexDirection: "row" }}>
        <Image
          style={$imageContainer}
          source={data.image}
        />
        <View style={{ flexDirection: "column" }}>
          <Text style={$titleStyle}>{data.name}</Text>
          <Text style={$priceStyle}>{data.price}</Text>
        </View>
      </View>
      <View style={$line} />
      <View style={{ display: "flex", gap: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Icon icon="delete" size={20} onPress={() => onDeleteItem(index)} />
        <UIStepper
          width={110}
          height={41}
          borderWidth={0}
          borderColor="transparent"
          textColor={colors.palette.white}
          tintColor={colors.palette.white}
          value={data.count}
          displayValue={true}
          onIncrement={() => onPressStepperHanlder("increment", index)}
          onDecrement={() => onPressStepperHanlder("decrement", index)}
        />
      </View>
    </View>
  );
}

const $imageContainer: ImageStyle = {
  alignSelf: "center",
  width: 120,
  height: 109
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

const $line: ViewStyle = {
  height: 1,
  width: "100%",
  backgroundColor: colors.palette.blackLine,
  marginTop: spacing.sm,
  marginBottom: spacing.sm
}