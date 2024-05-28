import { FlatList, StyleSheet, View } from "react-native";
import CategoryItem from "../components/CategoryItem/categoryItem";
import { useGetCategoriesQuery } from "../services/shopServices";
import Loader from "../components/Loader/loader"; 

const Home = ({ route, navigation }) => {
  const { data: categories, error, isLoading } = useGetCategoriesQuery();

  return (
    <View style={styles.flatListContainer}>
      {isLoading ? (
        <Loader />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          keyExtractor={(x) => x}
          data={categories}
          renderItem={({ item }) => (
            <CategoryItem 
              navigation={navigation} 
              category={item} 
            />
          )}
          style={styles.flatList} 
        />
      )}
    </View>
  );
};

export default Home;

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
