import { useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { AppBar, Avatar, Box, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Toolbar, Tooltip, Typography, useMediaQuery, InputBase } from '@mui/material';
import { Menu as MenuIcon, Dashboard, People, Contacts, Inventory2, ShoppingCart, Payments, DarkMode, LightMode, Search } from '@mui/icons-material';
import { useApp } from '../context/AppContext';
import { useTheme } from '@mui/material/styles';
const nav = [['Dashboard', '/dashboard', <Dashboard />], ['Users', '/users', <People />], ['Customers', '/customers', <Contacts />],
  ['Products', '/products', <Inventory2 />], ['Orders', '/orders', <ShoppingCart />], ['Transactions', '/transactions', <Payments />]];
export default function MainLayout() {
  const theme = useTheme(); const desktop = useMediaQuery(theme.breakpoints.up('md'));
  const [open, setOpen] = useState(true); const [anchor, setAnchor] = useState(null);
  const { mode, toggleMode, user, logout } = useApp(); const { pathname } = useLocation();
  const W = open ? 240 : 72;
  const drawer = (
    <Box sx={{ width: desktop ? W : 240, transition: 'width .25s', overflowX: 'hidden' }}>
      <Toolbar><Typography variant="h6" color="primary" fontWeight={800} noWrap>{open || !desktop ? 'Berry-style' : 'B'}</Typography></Toolbar>
      <List>{nav.map(([label, to, icon]) => (
        <Tooltip key={to} title={!open && desktop ? label : ''} placement="right">
          <ListItemButton component={NavLink} to={to} selected={pathname.startsWith(to)} onClick={() => !desktop && setOpen(false)} sx={{ mx: 1, borderRadius: 2 }}>
            <ListItemIcon sx={{ minWidth: 40 }}>{icon}</ListItemIcon><ListItemText primary={label} /></ListItemButton></Tooltip>))}</List>
    </Box>);
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Drawer variant={desktop ? 'permanent' : 'temporary'} open={desktop ? true : open} onClose={() => setOpen(false)} sx={{ width: desktop ? W : 0, '& .MuiDrawer-paper': { width: desktop ? W : 240, transition: 'width .25s', border: 0 } }}>{drawer}</Drawer>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <AppBar position="sticky" color="inherit" elevation={0} sx={{ bgcolor: 'background.default' }}>
          <Toolbar sx={{ gap: 1 }}>
            <IconButton aria-label="Toggle sidebar" onClick={() => setOpen(o => !o)}><MenuIcon /></IconButton>
            <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', bgcolor: 'background.paper', borderRadius: 2, px: 1.5, flex: '0 1 320px' }}>
              <Search fontSize="small" /><InputBase placeholder="Search…" sx={{ ml: 1, flex: 1 }} inputProps={{ 'aria-label': 'Global search' }} /></Box>
            <Box sx={{ flex: 1 }} />
            <IconButton aria-label="Toggle theme" onClick={toggleMode}>{mode === 'light' ? <DarkMode /> : <LightMode />}</IconButton>
            <IconButton aria-label="Account menu" onClick={e => setAnchor(e.currentTarget)}><Avatar sx={{ bgcolor: 'primary.main', width: 34, height: 34 }}>{user?.name[0]}</Avatar></IconButton>
            <Menu anchorEl={anchor} open={!!anchor} onClose={() => setAnchor(null)}>
              <MenuItem disabled>{user?.email}</MenuItem><MenuItem onClick={logout}>Logout</MenuItem></Menu>
          </Toolbar>
        </AppBar>
        <Box sx={{ p: { xs: 2, md: 3 } }}><Outlet /></Box>
      </Box>
    </Box>
  );
}
