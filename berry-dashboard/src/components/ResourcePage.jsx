import { useState, useMemo } from 'react';
import { Box, Button, Card, Chip, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputAdornment, Snackbar, Alert,
  Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, TextField, Typography, Stack } from '@mui/material';
import { Add, Delete, Edit, Search } from '@mui/icons-material';
const color = s => (['Active','Paid','Completed','In stock'].includes(s) ? 'success' : ['Pending','Processing'].includes(s) ? 'warning' : 'error');
// Reusable CRUD table: search, sort, pagination, add/edit dialog with validation, delete confirmation.
export default function ResourcePage({ title, initial, columns, fields, statusKeys = ['status'] }) {
  const [rows, setRows] = useState(initial);
  const [q, setQ] = useState(''); const [sort, setSort] = useState({ key: columns[0].key, dir: 'asc' });
  const [page, setPage] = useState(0); const [edit, setEdit] = useState(null); const [del, setDel] = useState(null);
  const [toast, setToast] = useState(''); const [errors, setErrors] = useState({});
  const view = useMemo(() => rows.filter(r => Object.values(r).join(' ').toLowerCase().includes(q.toLowerCase()))
    .sort((a, b) => (a[sort.key] > b[sort.key] ? 1 : -1) * (sort.dir === 'asc' ? 1 : -1)), [rows, q, sort]);
  const save = () => {
    const err = {}; fields.forEach(f => { if (!String(edit[f] ?? '').trim()) err[f] = 'Required'; });
    setErrors(err); if (Object.keys(err).length) return;
    setRows(rs => edit.id ? rs.map(r => (r.id === edit.id ? edit : r)) : [{ ...edit, id: Date.now() }, ...rs]);
    setToast(edit.id ? 'Saved changes (demo data)' : `${title} added (demo data)`); setEdit(null);
  };
  return (
    <Box className="page">
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" spacing={2} mb={2}>
        <Typography variant="h4" fontWeight={700}>{title}</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => { setErrors({}); setEdit({}); }}>Add {title.replace(/s$/, '')}</Button>
      </Stack>
      <Card>
        <Box p={2}><TextField size="small" fullWidth placeholder={`Search ${title.toLowerCase()}`} value={q} onChange={e => { setQ(e.target.value); setPage(0); }}
          InputProps={{ startAdornment: <InputAdornment position="start"><Search /></InputAdornment> }} inputProps={{ 'aria-label': 'Search' }} /></Box>
        <TableContainer><Table size="small">
          <TableHead><TableRow>
            {columns.map(c => <TableCell key={c.key}><TableSortLabel active={sort.key === c.key} direction={sort.dir}
              onClick={() => setSort(s => ({ key: c.key, dir: s.key === c.key && s.dir === 'asc' ? 'desc' : 'asc' }))}>{c.label}</TableSortLabel></TableCell>)}
            <TableCell align="right">Actions</TableCell></TableRow></TableHead>
          <TableBody>
            {view.slice(page * 6, page * 6 + 6).map(r => (
              <TableRow key={r.id} hover>
                {columns.map(c => <TableCell key={c.key}>{statusKeys.includes(c.key) ? <Chip size="small" label={r[c.key]} color={color(r[c.key])} /> : c.money ? `$${r[c.key]}` : r[c.key]}</TableCell>)}
                <TableCell align="right"><IconButton aria-label="Edit" onClick={() => { setErrors({}); setEdit(r); }}><Edit fontSize="small" /></IconButton>
                  <IconButton aria-label="Delete" onClick={() => setDel(r)}><Delete fontSize="small" /></IconButton></TableCell>
              </TableRow>))}
            {!view.length && <TableRow><TableCell colSpan={columns.length + 1} align="center">No results. Try a different search or add a new record.</TableCell></TableRow>}
          </TableBody></Table></TableContainer>
        <TablePagination component="div" count={view.length} page={page} rowsPerPage={6} rowsPerPageOptions={[6]} onPageChange={(_, p) => setPage(p)} />
      </Card>
      <Dialog open={!!edit} onClose={() => setEdit(null)} fullWidth maxWidth="xs">
        <DialogTitle>{edit?.id ? 'Edit' : 'Add'} {title.replace(/s$/, '')}</DialogTitle>
        <DialogContent><Stack spacing={2} mt={1}>{fields.map(f => <TextField key={f} label={f[0].toUpperCase() + f.slice(1)} value={edit?.[f] ?? ''}
          error={!!errors[f]} helperText={errors[f]} onChange={e => setEdit({ ...edit, [f]: e.target.value })} />)}</Stack></DialogContent>
        <DialogActions><Button onClick={() => setEdit(null)}>Cancel</Button><Button variant="contained" onClick={save}>Save</Button></DialogActions>
      </Dialog>
      <Dialog open={!!del} onClose={() => setDel(null)}><DialogTitle>Delete this record?</DialogTitle>
        <DialogActions><Button onClick={() => setDel(null)}>Cancel</Button>
          <Button color="error" onClick={() => { setRows(rs => rs.filter(r => r.id !== del.id)); setDel(null); setToast('Deleted'); }}>Delete</Button></DialogActions></Dialog>
      <Snackbar open={!!toast} autoHideDuration={2500} onClose={() => setToast('')}><Alert severity="success" variant="filled">{toast}</Alert></Snackbar>
    </Box>
  );
}
