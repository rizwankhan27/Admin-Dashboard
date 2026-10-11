import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useApp } from './context/AppContext';
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ResourcePage from './components/ResourcePage';
import * as d from './data/mock';
const Protected = () => (useApp().user ? <MainLayout /> : <Navigate to="/login" replace />);
const col = (...k) => k.map(x => ({ key: x[0], label: x[1], money: x[2] }));
export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<Protected />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<ResourcePage title="Users" initial={d.users} fields={['name', 'email', 'role', 'status']} columns={col(['name', 'Name'], ['email', 'Email'], ['role', 'Role'], ['status', 'Status'], ['joined', 'Joined'])} />} />
        <Route path="/customers" element={<ResourcePage title="Customers" initial={d.customers} fields={['name', 'email', 'phone', 'status']} columns={col(['name', 'Name'], ['email', 'Email'], ['phone', 'Phone'], ['orders', 'Orders'], ['status', 'Status'])} />} />
        <Route path="/products" element={<ResourcePage title="Products" initial={d.products} fields={['name', 'sku', 'category', 'price', 'stock', 'status']} columns={col(['name', 'Product'], ['sku', 'SKU'], ['category', 'Category'], ['price', 'Price', true], ['stock', 'Stock'], ['status', 'Status'])} />} />
        <Route path="/orders" element={<ResourcePage title="Orders" initial={d.orders} fields={['customer', 'product', 'amount', 'payment', 'status']} statusKeys={['payment', 'status']} columns={col(['id', 'Order'], ['customer', 'Customer'], ['product', 'Product'], ['date', 'Date'], ['amount', 'Total', true], ['payment', 'Payment'], ['status', 'Status'])} />} />
        <Route path="/transactions" element={<ResourcePage title="Transactions" initial={d.transactions} fields={['customer', 'method', 'amount', 'status']} columns={col(['id', 'Transaction'], ['customer', 'Customer'], ['method', 'Method'], ['date', 'Date'], ['amount', 'Amount', true], ['status', 'Status'])} />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
