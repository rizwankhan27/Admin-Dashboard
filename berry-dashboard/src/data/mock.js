const names = ['Olivia Reed','Liam Carter','Emma Stone','Noah Brooks','Ava Hughes','Ethan Cole','Mia Foster','Lucas Grant','Zoe Bennett','Owen Price'];
const st = ['Active','Inactive','Pending'];
export const users = names.map((n, i) => ({ id: i + 1, name: n, email: n.split(' ')[0].toLowerCase() + '@example.com', role: ['Admin','Editor','Viewer'][i % 3], status: st[i % 2], joined: `2025-0${(i % 9) + 1}-1${i % 9}` }));
export const customers = names.map((n, i) => ({ id: i + 1, name: n, email: n.split(' ')[0].toLowerCase() + '@shop.com', phone: `+1 555 01${10 + i}`, orders: (i * 3) % 17 + 1, status: st[i % 2] }));
const prods = ['Wireless Headset','Smart Watch','Desk Lamp','Mechanical Keyboard','Backpack','Webcam','Speaker','Monitor Stand'];
export const products = prods.map((p, i) => ({ id: i + 1, name: p, sku: `SKU-${1000 + i}`, category: ['Audio','Wearables','Office'][i % 3], price: 19 + i * 17, stock: [0, 4, 52, 130][i % 4], status: [0, 4, 52, 130][i % 4] === 0 ? 'Out of stock' : 'In stock' }));
const pay = ['Paid','Pending','Failed'], os = ['Completed','Processing','Cancelled'];
export const orders = Array.from({ length: 12 }, (_, i) => ({ id: `#ORD-${2001 + i}`, customer: names[i % 10], product: prods[i % 8], date: `2026-09-${String(i + 5).padStart(2, '0')}`, amount: 40 + i * 23, payment: pay[i % 3], status: os[i % 3] }));
export const transactions = orders.map((o, i) => ({ id: `TXN-${9001 + i}`, customer: o.customer, method: ['Card','PayPal','Bank'][i % 3], date: o.date, amount: o.amount, status: o.payment }));
const mo = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
export const revenue = { year: mo.map((m, i) => ({ name: m, revenue: 12000 + i * 1800 + (i % 3) * 2500, orders: 300 + i * 40 })),
  half: mo.slice(6).map((m, i) => ({ name: m, revenue: 24000 + i * 2400, orders: 540 + i * 45 })) };
export const traffic = [{ name: 'Organic', value: 45 }, { name: 'Direct', value: 25 }, { name: 'Social', value: 18 }, { name: 'Referral', value: 12 }];
