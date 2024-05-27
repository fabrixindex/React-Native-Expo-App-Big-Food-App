import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import OrderItem from '../components/OrderItem/orderItem';
import { useGetOrdersQuery } from '../services/shopServices';
import { useSelector } from 'react-redux';

const OrderScreen = () => {
  const { localId } = useSelector(state => state.auth.value);
  const { data: orders, isSuccess } = useGetOrdersQuery(localId);
  const [ordersFiltered, setOrdersFiltered] = useState([]);

  useEffect(() => {
    if (isSuccess && orders) {
      const responseTransformed = Object.values(orders);
      const filteredOrders = responseTransformed.filter(order => { 
        return order.user === localId;
      });
      setOrdersFiltered(filteredOrders);
    }
  }, [orders, isSuccess, localId])

  return (
    <View style={styles.container}>
      {ordersFiltered.length > 0 ? (
        <FlatList
          data={ordersFiltered}
          keyExtractor={(item, index) => item.id || index.toString()}
          renderItem={({ item }) => <OrderItem order={item} />}
        />
      ) : (
        <Text style={styles.emptyText}>No orders found</Text>
      )}
    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center'
  }
});
