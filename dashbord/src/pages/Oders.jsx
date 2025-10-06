import React from 'react'
import Banner from '../components/Banner'
import OrderFilter from '../components/orders/OrderFilter'
import OrderDetails from '../components/orders/OrderDetails'

const Oders = () => {
  const [length, setLength] = React.useState(10);
  const [status, setStatus] = React.useState('');
  const [sort, setSort] = React.useState('');

      // const loadOrders = async () => {
      //   try {
      //     const res = await fetchOrders();
      //     setOrders(res.data.data);
      //   } catch (err) {
      //     console.error("Error fetching orders:", err);
      //   } finally {
      //     setLoading(false);
      //   }
      // };

      // const handleStatusChange = async (id, newStatus) => {
      //   try {
      //     // await updateOrderStatus(id, newStatus);
      //     loadOrders();
      //   } catch (err) {
      //     console.error("Failed to update order:", err);
      //   }
      // };

      // const handleDelete = async (id) => {
      //   if (!window.confirm("Are you sure you want to delete this order?"))
      //     return;
      //   try {
      //     await deleteOrder(id);
      //     loadOrders();
      //   } catch (err) {
      //     console.error("Failed to delete order:", err);
      //   }
      // };

  return (
    <div>
      <Banner page={'Orders'} />
      <OrderFilter seLength={setLength} seSort={setSort} seStatus={setStatus} />
      <OrderDetails Length={length} Status={status} Sort={sort} />
    </div>
  )
};

export default Oders;