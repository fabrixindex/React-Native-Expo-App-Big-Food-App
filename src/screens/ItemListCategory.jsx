import { FlatList, StyleSheet, Text, View } from "react-native";
import ProductItem from "../components/ProductItem/productItem";
import { useState, useEffect } from "react";
import { useGetProductsByCategoryQuery } from "../services/shopServices";
import GoBackButton from "../components/GoBackNavigation/goBackNavigation";

const ItemListCategory = ({
  setCategorySelected = () => {},
  navigation,
  route
}) => {
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [error, setError] = useState("");
  const [keyWord, setKeyWord] = useState("");

  const { category: categorySelected } = route.params;
  const { data: productsFetched, error: errorFromFetch, isLoading } = useGetProductsByCategoryQuery(categorySelected);

  useEffect(() => {

    const regexDigits = /\d/
    const hasDigits = regexDigits.test(keyWord)
    if (hasDigits) {
      setError("Don't use digits")
      return
    }
   
    const regexThreeOrMore = /[a-zA-Z]{3,}/
    const hasThreeOrMoreChars = regexThreeOrMore.test(keyWord)

    if (!hasThreeOrMoreChars && keyWord.length) {
      setError("Type 3 or more characters")
      return
    }

    if (!isLoading) {
      const productsFilter = productsFetched.filter((product) =>
        product.title.toLocaleLowerCase().includes(keyWord.toLocaleLowerCase())
      )
      setProductsFiltered(productsFilter)
      setError("")
    }
  }, [keyWord, categorySelected, productsFetched, isLoading])

  return (
    <>
      <View style={styles.flatListContainer}>
        <GoBackButton navigation={navigation} />
        {error ? (
          <Text>{error}</Text>
        ) : isLoading ? (
          <Text>Loading...</Text>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={productsFiltered}
            renderItem={({ item }) => (
              <ProductItem product={item} navigation={navigation} />
            )}
            keyExtractor={(producto) => producto.id}
          />
        )}
      </View>
    </>
  );
};

export default ItemListCategory;

const styles = StyleSheet.create({
  flatListContainer: {
    width: "100%",
    backgroundColor: "white",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },  
  flatList: {
    width: "95%", 
  },
});
