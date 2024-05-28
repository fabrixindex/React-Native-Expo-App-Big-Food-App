import { FlatList, StyleSheet, Text, View } from "react-native";
import ProductItem from "../components/ProductItem/productItem";
import { useState, useEffect } from "react";
import { useGetProductsByCategoryQuery } from "../services/shopServices";
import GoBackButton from "../components/GoBackNavigation/goBackNavigation";
import Loader from "../components/Loader/loader"; 

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
        {error ? (
          <Text>{error}</Text>
        ) : isLoading ? (
          <Loader />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={productsFiltered}
            renderItem={({ item }) => (
              <ProductItem product={item} navigation={navigation} />
            )}
            keyExtractor={(producto) => producto.id}
            style={styles.flatList}
          />
        )}
        <GoBackButton navigation={navigation} />
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
