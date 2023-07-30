import React, { FC, useEffect, useState } from "react"
import { AppStackScreenProps } from "app/navigators"
import { ImageStyle, View, ViewStyle, useWindowDimensions } from "react-native"
import { colors, spacing } from "app/theme"
import { Icon, TextField, Footer } from "app/components/atoms"
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import { Header } from "app/components/molecules"
import { NoDataAvailable } from "app/components/molecules/NoDataAvailable"
import { ProductList, ProductListData } from "app/components/organisms/ProductList"

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
  {
    id: 4,
    name: "Veuve Clicquot Brut Set x 6 法國凱歌香檳 x 6",
    price: "NT 36,000",
    image: require("../../assets/data/image2.png"),
    count: 0,
  },
  {
    id: 5,
    name: "Veuve Clicquot Brut Set x 6 法國凱歌香檳 x 6",
    price: "NT 36,000",
    image: require("../../assets/data/image3.png"),
    count: 0,
  },
  {
    id: 6,
    name: "Veuve Clicquot Brut Set x 6 法國凱歌香檳 x 6",
    price: "NT 36,000",
    image: require("../../assets/data/image1.png"),
    count: 0,
  }
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
      <Footer text={addToCart.length > 0 ? `View cart (${addToCart.length})` : 'View cart'} />
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
