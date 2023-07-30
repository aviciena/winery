import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import { Card } from "../molecules"
import { Button, Text } from "../atoms"
import { colors, spacing } from "app/theme"
import UIStepper from 'react-native-ui-stepper';
import { useEffect } from "react"

export interface ProductListData {
  id: number,
  name: string,
  price: string,
  image: any,
  count: number
}

interface ProductListProps {
  data: ProductListData[],
  onPressStepper?: (data: ProductListData[]) => void
  onAddToCart?: (data: ProductListData[]) => void
}

export function ProductList(props: ProductListProps) {
  const onStepperHandler = (type: string, index: number) => {
    const temp = JSON.parse(JSON.stringify(props.data));
    if (type === "increment") {
      temp[index].count += 1;
    } else {
      temp[index].count -= 1;
    }
    props.onPressStepper(temp);
  }

  const onAddToCartHandler = (index: number) => {
    const temp = JSON.parse(JSON.stringify(props.data));
    temp[index].count += temp[index].count + 1;
    props.onAddToCart(temp);
  }

  const renderItem = (data: ProductListData, index: number) => (
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
              onPress={() => { onAddToCartHandler(index) }}
            />
          }
          {data.count > 0 &&
            <UIStepper
              width={120}
              height={40}
              borderColor={colors.palette.white}
              textColor={colors.palette.white}
              tintColor={colors.palette.white}
              value={data.count}
              displayValue={true}
              onIncrement={() => onStepperHandler("increment", index)}
              onDecrement={() => onStepperHandler("decrement", index)}
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

  return (
    <View style={$container}>
      <FlatList
        data={props.data}
        renderItem={({ item, index }) => renderItem(item, index)}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  )
}

const $container: ViewStyle = {
  flex: 1,
  width: '95%'
}

const $titleStyle: TextStyle = {
  color: colors.palette.white,
  width: 210
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