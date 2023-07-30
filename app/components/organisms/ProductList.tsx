import { View, ViewStyle } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import { ProductItem } from "../molecules/ProductItem"
import { useCallback } from "react"

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
  const onStepperHandler = useCallback((type: string, index: number) => {
    const temp = JSON.parse(JSON.stringify(props.data));
    if (type === "increment") {
      temp[index].count += 1;
    } else {
      temp[index].count -= 1;
    }
    props.onPressStepper(temp);
  }, [])

  const onAddToCartHandler = useCallback((index: number) => {
    const temp = JSON.parse(JSON.stringify(props.data));
    temp[index].count += temp[index].count + 1;
    props.onAddToCart(temp);
  }, [])

  const renderItem = (data: ProductListData, index: number) => (
    <ProductItem
      data={data}
      index={index}
      onAddToCart={onAddToCartHandler}
      onPressStepper={onStepperHandler}
    />
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