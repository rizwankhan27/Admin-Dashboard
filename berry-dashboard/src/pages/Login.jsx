import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Alert, Box, Button, Card, Checkbox, FormControlLabel, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useApp, DEMO } from '../context/AppContext';
export default function Login() {
  const { login, user } = useApp(); const nav = useNavigate();
  const [f, setF] = useState({ email: DEMO.email, password: DEMO.password }); const [show, setShow] = useState(false);
  const [err, setErr] = useState(''); const [busy, setBusy] = useState(false);
  if (user) return <Navigate to="/dashboard" replace />;
  const submit = e => { e.preventDefault();
    if (!/\S+@\S+\.\S+/.test(f.email)) return setErr('Enter a valid email address.');
    if (f.password.length < 6) return setErr('Password must be at least 6 characters.');
    setErr(''); setBusy(true);
    setTimeout(() => { if (login(f.email, f.password)) nav('/dashboard'); else { setErr('Incorrect email or password.'); setBusy(false); } }, 600); };
  return (
    <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center', p: 2, background: 'linear-gradient(135deg,#5e35b1,#2196f3)' }}>
      <Card className="page" component="form" onSubmit={submit} sx={{ p: 4, width: '100%', maxWidth: 400, display: 'grid', gap: 2 }}>
        <Typography variant="h5" fontWeight={800} color="primary">Sign in</Typography>
        <Alert severity="info">Demo only, not secure authentication. Credentials are pre-filled.</Alert>
        {err && <Alert severity="error">{err}</Alert>}
        <TextField label="Email" value={f.email} onChange={e => setF({ ...f, email: e.target.value })} />
        <TextField label="Password" type={show ? 'text' : 'password'} value={f.password} onChange={e => setF({ ...f, password: e.target.value })}
          InputProps={{ endAdornment: <InputAdornment position="end"><IconButton aria-label="Show password" onClick={() => setShow(s => !s)}>{show ? <VisibilityOff /> : <Visibility />}</IconButton></InputAdornment> }} />
        <FormControlLabel control={<Checkbox defaultChecked />} label="Remember me" />
        <Button type="submit" variant="contained" size="large" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</Button>
      </Card>
    </Box>
  );
}
