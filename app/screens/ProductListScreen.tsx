import React, { FC, useEffect, useRef, useState } from "react"
import { AppStackScreenProps } from "app/navigators"
import { ImageStyle, View, ViewStyle, useWindowDimensions } from "react-native"
import { colors, spacing } from "app/theme"
import { Icon, Text, TextField, Toggle, ViewCart } from "app/components/atoms"
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import { Card, Header } from "app/components/molecules"
import { NoDataAvailable } from "app/components/molecules/NoDataAvailable"
import { ProductList, ProductListData } from "app/components/organisms/ProductList"
import SlidingUpContainer from "app/components/molecules/SlidingUpContainer"
import ItemCard from "app/components/molecules/ItemCard"
import { ScrollView } from "react-native-gesture-handler"

interface ProductListScreenProps extends AppStackScreenProps<"ProductList"> { }

const MockDataList: ProductListData[] = [
  {
    id: 1,
    name: "Veuve Clicquot Brut Set x 6 法國凱歌香檳 x 6",
    price: "NT 36,000",
    image: require("../../assets/data/image1.png"),
    count: 0,
  },
  {
    id: 2,
    name: "Veuve Clicquot Brut Set x 6 法國凱歌香檳 x 6",
    price: "NT 36,000",
    image: require("../../assets/data/image2.png"),
    count: 0,
  },
  {
    id: 3,
    name: "Veuve Clicquot Brut Set x 6 法國凱歌香檳 x 6",
    price: "NT 36,000",
    image: require("../../assets/data/image3.png"),
    count: 0,
  },
]

const EmptyRoute = () => (<NoDataAvailable text="No Data Available" />);

const renderTabBar = (props: any) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: colors.palette.purple }}
    style={{ backgroundColor: colors.background, minHeight: 34 }}
    labelStyle={{ textTransform: "none" }}
  />
);

export const ProductListScreen: FC<ProductListScreenProps> = function ContactsScreen(_props
) {
  const { navigation } = _props;
  const panelRef = useRef(null)
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'champagne', title: 'Champagne' },
    { key: 'gin', title: 'Gin' },
    { key: 'vodka', title: 'Vodka' },
    { key: 'wiskey', title: 'Wiskey' },
  ]);
  const [dataList, setDataList] = useState(JSON.parse(JSON.stringify(MockDataList)));
  const [addToCart, setAddToCard] = useState<ProductListData[]>([]);

  useEffect(() => {
    const addToCartTemp: ProductListData[] = []

    for (let data of dataList) {
      if (data.count > 0) {
        addToCartTemp.push(data);
      }
    }
    setAddToCard(addToCartTemp);
  }, [dataList])

  const renderSearchIcon = () => (<Icon icon="search" size={20} style={$iconStyle} />);

  const onClickedHandler = (data: ProductListData[]) => {
    setDataList(data);
  }

  const renderList = () => {
    if (dataList.length > 0) {
      return (<ProductList data={dataList} onPressStepper={onClickedHandler} onAddToCart={onClickedHandler} />)
    } else {
      return EmptyRoute();
    }
  }

  const generateCartItems = () => {
    return addToCart.map((item, index) => (
      <ItemCard
        data={item}
        key={item.id.toString()}
        index={index}
        onDeleteItem={onDeleteCartItem}
        onPressStepper={onPressStepperCartHandler}
      />
    ));
  }

  const onDeleteCartItem = (index: number) => {
    const tempData = JSON.parse(JSON.stringify(addToCart));

    const tempDataList = JSON.parse(JSON.stringify(dataList));
    const foundIdx = tempDataList.findIndex((x: ProductListData) => x.id == tempData[index].id);
    if (foundIdx !== -1) {
      tempDataList[foundIdx].count = 0;
    }

    setDataList(tempDataList);

    tempData.splice(index, 1);
    setAddToCard(tempData);
  }

  const onPressStepperCartHandler = (type: string, index: number) => {
    const tempDataList = JSON.parse(JSON.stringify(dataList));
    const foundIdx = tempDataList.findIndex((x: ProductListData) => x.id == addToCart[index].id);
    if (foundIdx !== -1) {
      if (type === "increment") {
        tempDataList[foundIdx].count += 1;
      } else {
        tempDataList[foundIdx].count -= 1;
      }

      setDataList(tempDataList);
    }
  }

  const geTotalPrice = () => {
    let total: number = 0;
    for (let data of addToCart) {
      const { price } = data;
      const splice = price.split("NT ");
      const priceTemp = splice[1].replace(",", "");
      total += parseInt(priceTemp);
    }

    const totalStr = Number(total)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, '$&,');

    return totalStr.split(".")[0];
  }

  const cartContainer = () => (
    <ScrollView>
      <View style={$cartContainer}>
        <View style={$cartHeaderWrapper}>
          <Text text="Total" style={{ color: colors.palette.white }} size="sm" />
          <Text text={`NT ${geTotalPrice()}`} style={{ color: colors.palette.pr4 }} size="sm" />
        </View>
        <Card
          style={$cartCardWrapper}
          LeftComponent={
            <Text text="Customize order?" style={{ color: colors.palette.white }} size="sm" weight="bold" />
          }
          RightComponent={
            <Toggle variant="switch" value={false} inputInnerStyle={{ backgroundColor: colors.palette.warnig }} />
          }
        />
        {generateCartItems()}
      </View>
    </ScrollView>
  )

  return (
    <View style={$container}>
      <Header
        leftIcon="back"
        leftIconColor={colors.palette.white}
        onLeftPress={() => navigation.goBack()}
      />
      <TextField
        placeholder="Search spirit"
        inputWrapperStyle={$inputWrapper}
        style={{ color: "white" }}
        containerStyle={{ marginLeft: spacing.xl, marginRight: spacing.xl }}
        RightAccessory={renderSearchIcon}
      />
      <TabView
        navigationState={{ index, routes }}
        renderScene={SceneMap({
          champagne: renderList,
          gin: EmptyRoute,
          vodka: EmptyRoute,
          wiskey: EmptyRoute,
        })}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
        style={{ marginTop: spacing.md }}
        pagerStyle={{ margin: spacing.sm }}
      />
      <ViewCart
        text={addToCart.length > 0 ? `View cart (${addToCart.length})` : 'View cart'}
        onPress={() => panelRef.current.show()}
      />
      <SlidingUpContainer ref={panelRef} tx="productListScreen.cartText">
        {cartContainer()}
      </SlidingUpContainer>
    </View>
  )
}

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}

const $inputWrapper: ViewStyle = {
  backgroundColor: "#262626",
  padding: spacing.xs,
  borderColor: "#323232"
}

const $iconStyle: ImageStyle = {
  marginTop: spacing.xs,
  marginRight: spacing.md
}

const $cartContainer: ViewStyle = {
  display: "flex",
  flex: 1,
  margin: spacing.lg,
  paddingBottom: 30
}

const $cartHeaderWrapper: ViewStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: spacing.md
}

const $cartCardWrapper: ViewStyle = {
  backgroundColor: colors.palette.cardBg,
  padding: spacing.md,
  minHeight: 45,
  borderColor: colors.palette.cardBg
}
