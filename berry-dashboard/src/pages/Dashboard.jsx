import { useState } from 'react';
import { Box, Card, Grid, Typography, ToggleButton, ToggleButtonGroup, Table, TableHead, TableBody, TableRow, TableCell, Chip } from '@mui/material';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend, BarChart, Bar } from 'recharts';
import { revenue, traffic, orders } from '../data/mock';
import { useApp } from '../context/AppContext';
const stats = [['Total Revenue', '$248,300', '+12.4%', true], ['Total Users', '12,480', '+5.1%', true], ['Total Orders', '3,942', '-2.3%', false], ['Pending Orders', '86', '+1.8%', false]];
const pal = ['#5e35b1', '#2196f3', '#00c853', '#ffab00'];
export default function Dashboard() {
  const { user } = useApp(); const [range, setRange] = useState('year');
  return (
    <Box className="page">
      <Typography variant="h4" fontWeight={700}>Welcome back, {user.name.split(' ')[0]}</Typography>
      <Typography color="text.secondary" mb={3}>{new Date().toLocaleDateString(undefined, { dateStyle: 'full' })} · Sample data</Typography>
      <Grid container spacing={2}>
        {stats.map(([l, v, c, up], i) => <Grid item xs={12} sm={6} lg={3} key={l}>
          <Card sx={{ p: 2.5, bgcolor: i === 0 ? 'primary.main' : 'background.paper', color: i === 0 ? '#fff' : 'inherit', transition: 'transform .2s', '&:hover': { transform: 'translateY(-3px)' } }}>
            <Typography variant="body2">{l}</Typography><Typography variant="h4" fontWeight={700}>{v}</Typography>
            <Typography variant="body2" sx={{ color: i === 0 ? '#fff' : up ? 'success.main' : 'error.main' }}>{c} vs last period</Typography></Card></Grid>)}
        <Grid item xs={12} lg={8}><Card sx={{ p: 2.5 }}>
          <Box display="flex" justifyContent="space-between" flexWrap="wrap" gap={1} mb={1}><Typography variant="h6">Revenue overview</Typography>
            <ToggleButtonGroup size="small" exclusive value={range} onChange={(_, v) => v && setRange(v)}><ToggleButton value="year">This year</ToggleButton><ToggleButton value="half">Last 6 months</ToggleButton></ToggleButtonGroup></Box>
          <ResponsiveContainer width="100%" height={280}><AreaChart data={revenue[range]}><CartesianGrid strokeDasharray="3 3" opacity={0.3} /><XAxis dataKey="name" /><YAxis /><Tooltip />
            <Area dataKey="revenue" stroke="#5e35b1" fill="#5e35b1" fillOpacity={0.25} /></AreaChart></ResponsiveContainer></Card></Grid>
        <Grid item xs={12} lg={4}><Card sx={{ p: 2.5 }}><Typography variant="h6">Traffic sources</Typography>
          <ResponsiveContainer width="100%" height={280}><PieChart><Pie data={traffic} dataKey="value" innerRadius={55} outerRadius={90}>{traffic.map((_, i) => <Cell key={i} fill={pal[i]} />)}</Pie><Tooltip /><Legend /></PieChart></ResponsiveContainer></Card></Grid>
        <Grid item xs={12} md={5}><Card sx={{ p: 2.5 }}><Typography variant="h6">Monthly orders</Typography>
          <ResponsiveContainer width="100%" height={240}><BarChart data={revenue[range]}><XAxis dataKey="name" /><YAxis /><Tooltip /><Bar dataKey="orders" fill="#2196f3" radius={[6, 6, 0, 0]} /></BarChart></ResponsiveContainer></Card></Grid>
        <Grid item xs={12} md={7}><Card sx={{ p: 2.5, overflowX: 'auto' }}><Typography variant="h6" mb={1}>Recent orders</Typography>
          <Table size="small"><TableHead><TableRow><TableCell>Order</TableCell><TableCell>Customer</TableCell><TableCell>Amount</TableCell><TableCell>Status</TableCell></TableRow></TableHead>
            <TableBody>{orders.slice(0, 5).map(o => <TableRow key={o.id} hover><TableCell>{o.id}</TableCell><TableCell>{o.customer}</TableCell><TableCell>${o.amount}</TableCell>
              <TableCell><Chip size="small" label={o.status} color={o.status === 'Completed' ? 'success' : o.status === 'Cancelled' ? 'error' : 'warning'} /></TableCell></TableRow>)}</TableBody></Table></Card></Grid>
      </Grid>
    </Box>
  );
}
