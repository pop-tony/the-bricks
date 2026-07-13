import axios from 'axios';
import React, { useState, useEffect, useMemo } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { toast } from 'sonner';
import { MapPin, Phone, Mail, Calendar, CreditCard, Package, Truck, CheckCircle, Clock, AlertCircle, RefreshCw, ShoppingBag, XCircle, RotateCcw, Search, X, Users, TrendingUp, DollarSign, Plus, Edit3, Trash2, Eye, Home, Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];

const StatCard = ({ title, value, change, icon: Icon, subtext }) => {
  const isPositive = change >= 0;
  const changeColor = isPositive? 'text-brick-charcoal' : 'text-brick-muted';
  const Arrow = isPositive? '▲' : '▼';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease }}
      className="border border-brick-subtle bg-brick-white p-8"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.15em] text-brick-muted">{title}</p>
          <p className="font-serif mt-3 text-3xl text-brick-black">{value}</p>
        </div>
        <Icon className="h-5 w-5 text-brick-gold" />
      </div>
      {change!== undefined && (
        <div className={`mt-6 flex items-center gap-1 text-xs ${changeColor}`}>
          <span>{Arrow}</span>
          <span className="font-medium">{Math.abs(change)}%</span>
          <span className="text-brick-muted">{subtext || 'vs last period'}</span>
        </div>
      )}
    </motion.div>
  );
};

const StatusBadge = ({ status, type = 'order' }) => {
  const orderConfig = {
    pending: { label: 'Pending', class: 'text-brick-muted border-brick-muted' },
    paid: { label: 'Paid', class: 'text-brick-gold border-brick-gold' },
    processing: { label: 'Processing', class: 'text-brick-charcoal border-brick-charcoal' },
    shipped: { label: 'Shipped', class: 'text-brick-charcoal border-brick-charcoal' },
    delivered: { label: 'Delivered', class: 'text-brick-black border-brick-black' },
    cancelled: { label: 'Closed', class: 'text-brick-muted border-brick-muted' },
    returned: { label: 'Returned', class: 'text-brick-muted border-brick-muted' },
    pending_sync: { label: 'Pending Sync', class: 'text-brick-charcoal border-brick-charcoal' },
    out_for_delivery: { label: 'Out for Delivery', class: 'text-brick-charcoal border-brick-charcoal' }
  };

  const propertyConfig = {
    draft: { label: 'Draft', class: 'text-brick-muted border-brick-muted' },
    published: { label: 'Published', class: 'text-brick-gold border-brick-gold' },
    sold: { label: 'Sold', class: 'text-brick-black border-brick-black' },
    archived: { label: 'Archived', class: 'text-brick-muted border-brick-muted' }
  };

  const enquiryConfig = {
    pending: { label: 'New', class: 'text-brick-gold border-brick-gold' },
    confirmed: { label: 'Resolved', class: 'text-brick-black border-brick-black' },
    cancelled: { label: 'Closed', class: 'text-brick-muted border-brick-muted' }
  };

  const configs = { order: orderConfig, property: propertyConfig, enquiry: enquiryConfig };
  const c = configs[type]?.[status] || configs.order.pending;

  return (
    <span className={`inline-flex border px-3 py-1 text-sm font-medium uppercase tracking-[0.15em] ${c.class}`}>
      {c.label}
    </span>
  );
};

const ORDER_STATUS_GROUPS = {
  all: { label: 'All Orders', icon: Package, statuses: null },
  pending_sync: { label: 'Pending Sync', icon: AlertCircle, statuses: ['pending_sync'] },
  pending: { label: 'Payment Pending', icon: Clock, statuses: ['pending'] },
  paid: { label: 'Paid', icon: CheckCircle, statuses: ['paid'] },
  processing: { label: 'Processing', icon: Package, statuses: ['processing'] },
  shipped: { label: 'Shipped', icon: Truck, statuses: ['shipped', 'out_for_delivery'] },
  delivered: { label: 'Delivered', icon: CheckCircle, statuses: ['delivered'] },
  cancelled: { label: 'Cancelled', icon: XCircle, statuses: ['cancelled', 'returned'] }
};

const PROPERTY_STATUS_GROUPS = {
  all: { label: 'All Listings', icon: Home, statuses: null },
  published: { label: 'Published', icon: CheckCircle, statuses: ['published'] },
  draft: { label: 'Draft', icon: Edit3, statuses: ['draft'] },
  sold: { label: 'Sold', icon: DollarSign, statuses: ['sold'] },
  archived: { label: 'Archived', icon: XCircle, statuses: ['archived'] }
};

export const Admin = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');
  const [propertyStatusFilter, setPropertyStatusFilter] = useState('all');
  const [orders, setOrders] = useState([]);
  const [properties, setProperties] = useState([]);
  const [styleSessions, setStyleSessions] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderSearch, setOrderSearch] = useState('');
  const [propertySearch, setPropertySearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showPropertyModal, setShowPropertyModal] = useState(false);
  const [isEditingProperty, setIsEditingProperty] = useState(false);

  const backendUrl = import.meta.env.VITE_ENV === "development"? import.meta.env.VITE_BACKEND_URL : "/api";

  const openOrderModal = (order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  const closeOrderModal = () => {
    setShowOrderModal(false);
    setTimeout(() => setSelectedOrder(null), 300);
  };

  const openPropertyModal = (property = null) => {
    setSelectedProperty(property);
    setIsEditingProperty(!!property);
    setShowPropertyModal(true);
  };

  const closePropertyModal = () => {
    setShowPropertyModal(false);
    setTimeout(() => {
      setSelectedProperty(null);
      setIsEditingProperty(false);
    }, 300);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersRes, propertiesRes, sessionsRes] = await Promise.all([
          axios.get(`${backendUrl}/order/data`),
          axios.get(`${backendUrl}/properties`),
          axios.get(`${backendUrl}/order/c-data`)
        ]);

        if (ordersRes.data.success) setOrders(ordersRes.data.orders);
        if (propertiesRes.data.success) setProperties(propertiesRes.data.properties);
        if (sessionsRes.data.success) setStyleSessions(sessionsRes.data.consults);
      } catch (error) {
        console.error(error);
        toast.error('Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [backendUrl]);

  useEffect(() => {
    if (!orders?.length) return;
    const customerMap = orders
  .filter(order => order.status!== 'cancelled' && order.email)
  .reduce((acc, order) => {
        const email = order.email;
        if (!acc[email]) {
          acc[email] = {
            _id: email,
            name: order.customerName,
            email: email,
            orders: 0,
            totalSpent: 0,
            lastOrder: order.createdAt
          };
        }
        acc[email].orders += 1;
        acc[email].totalSpent += order.total || 0;
        if (new Date(order.createdAt) > new Date(acc[email].lastOrder)) {
          acc[email].lastOrder = order.createdAt;
        }
        return acc;
      }, {});
    setCustomers(Object.values(customerMap));
  }, [orders]);

  const analytics = useMemo(() => {
    if (!orders.length) {
      return {
        totalRevenue: 0, totalRevenueChange: 0, todayRevenue: 0, todayRevenueChange: 0,
        activeOrders: 0, totalCustomers: 0, totalCustomersChange: 0, revenueData: [], topCategories: []
      };
    }

    const now = new Date();
    const todayStart = new Date(now); todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date(now); todayEnd.setHours(23, 59, 999);
    const yesterdayStart = new Date(todayStart); yesterdayStart.setDate(yesterdayStart.getDate() - 1);
    const yesterdayEnd = new Date(todayEnd); yesterdayEnd.setDate(yesterdayEnd.getDate() - 1);
    const weekAgo = new Date(now); weekAgo.setDate(weekAgo.getDate() - 7);
    const twoWeeksAgo = new Date(now); twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      d.setHours(0, 0, 0, 0);
      return { date: d, day: days[d.getDay()], revenue: 0 };
    });

    // helpers for monthly totals
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const prevMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    let totalRevenueAll = 0;
    let thisMonthRevenue = 0;
    let lastMonthRevenue = 0;

    let thisWeekRevenue = 0, lastWeekRevenue = 0, todayRevenue = 0, yesterdayRevenue = 0, activeOrders = 0;
    const salesByItem = {};
    const thisWeekCustomerEmails = new Set();
    const lastWeekCustomerEmails = new Set();

    orders.forEach(o => {
      const d = new Date(o.createdAt);
      const isCancelled = ['cancelled', 'returned'].includes(o.status);

      if (!isCancelled) {
        totalRevenueAll += o.total || 0;
        if (d >= monthStart) thisMonthRevenue += o.total || 0;
        if (d >= prevMonthStart && d < monthStart) lastMonthRevenue += o.total || 0;
        if (d >= weekAgo) {
          thisWeekRevenue += o.total || 0;
          if (o.email) thisWeekCustomerEmails.add(o.email);
        }
        if (d >= twoWeeksAgo && d < weekAgo) {
          lastWeekRevenue += o.total || 0;
          if (o.email) lastWeekCustomerEmails.add(o.email);
        }
        if (d >= todayStart && d <= todayEnd) todayRevenue += o.total || 0;
        if (d >= yesterdayStart && d <= yesterdayEnd) yesterdayRevenue += o.total || 0;

        const dayIdx = last7Days.findIndex(day => {
          const next = new Date(day.date);
          next.setDate(next.getDate() + 1);
          return d >= day.date && d < next;
        });
        if (dayIdx!== -1) last7Days[dayIdx].revenue += o.total || 0;

        const items = o.items || [{ itemName: o.itemName, quantity: o.quantity || 1, price: o.total }];
        items.forEach(item => {
          const name = item.itemName || 'Unknown';
          if (!salesByItem[name]) salesByItem[name] = { name, value: 0 };
          salesByItem[name].value += item.quantity || 1;
        });
      }

      if (['paid', 'processing', 'shipped', 'out_for_delivery'].includes(o.status)) activeOrders++;
    });

    const getChange = (current, previous) => {
      if (!previous) return current > 0? 100 : 0;
      return +(((current - previous) / previous) * 100).toFixed(1);
    };

    return {
      totalRevenueAll: Math.round(totalRevenueAll),
      totalRevenueChange: getChange(thisWeekRevenue, lastWeekRevenue),
      monthRevenue: Math.round(thisMonthRevenue),
      monthRevenueChange: getChange(thisMonthRevenue, lastMonthRevenue),
      weekRevenue: Math.round(thisWeekRevenue),
      weekRevenueChange: getChange(thisWeekRevenue, lastWeekRevenue),
      todayRevenue: Math.round(todayRevenue),
      todayRevenueChange: getChange(todayRevenue, yesterdayRevenue),
      activeOrders,
      totalCustomers: customers.length,
      totalCustomersChange: getChange(thisWeekCustomerEmails.size, lastWeekCustomerEmails.size),
      revenueData: last7Days.map(d => ({ day: d.day, revenue: Math.round(d.revenue) })),
      topCategories: Object.values(salesByItem).sort((a, b) => b.value - a.value).slice(0, 4)
    };
  }, [orders, customers]);

  const statusCounts = useMemo(() => {
    const counts = { all: orders.length };
    Object.entries(ORDER_STATUS_GROUPS).forEach(([key, group]) => {
      if (group.statuses) {
        counts[key] = orders.filter(o => group.statuses.includes(o.status)).length;
      }
    });
    return counts;
  }, [orders]);

  const propertyStatusCounts = useMemo(() => {
    const counts = { all: properties.length };
    Object.entries(PROPERTY_STATUS_GROUPS).forEach(([key, group]) => {
      if (group.statuses) {
        counts[key] = properties.filter(p => group.statuses.includes(p.status)).length;
      }
    });
    return counts;
  }, [properties]);

  const formatCurrency = (value) => `₵${Number(value || 0).toLocaleString()}`;

  const OverviewTab = ({ analytics }) => (
    <div className="grid gap-6 lg:grid-cols-4">
      <StatCard title="Total Properties" value={properties.length} icon={Home} subtext="all listings" />
      <StatCard title="Published" value={propertyStatusCounts.published || 0} icon={CheckCircle} subtext="live listings" />
      <StatCard title="Sold" value={propertyStatusCounts.sold || 0} icon={DollarSign} subtext="closed sales" />
      <StatCard title="Customers" value={analytics.totalCustomers} change={analytics.totalCustomersChange} icon={Users} subtext="this week" />

      <div className="lg:col-span-4 grid gap-6 grid-cols-1 sm:grid-cols-4 mt-4">
        <StatCard title="Total Revenue" value={formatCurrency(analytics.totalRevenueAll)} change={analytics.totalRevenueChange} icon={DollarSign} subtext="all time" />
        <StatCard title="Monthly Revenue" value={formatCurrency(analytics.monthRevenue)} change={analytics.monthRevenueChange} icon={TrendingUp} subtext="this month" />
        <StatCard title="Weekly Revenue" value={formatCurrency(analytics.weekRevenue)} change={analytics.weekRevenueChange} icon={TrendingUp} subtext="this week" />
        <StatCard title="Daily Revenue" value={formatCurrency(analytics.todayRevenue)} change={analytics.todayRevenueChange} icon={TrendingUp} subtext="today" />
      </div>

      <div className="lg:col-span-2 mt-6 rounded-3xl border border-brick-subtle bg-brick-white p-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-brick-gold text-xs uppercase tracking-[0.2em]">Weekly revenue</p>
            <h2 className="font-serif mt-2 text-2xl text-brick-black">Revenue trend</h2>
          </div>
          <button onClick={refreshOrders} className="rounded-full border border-brick-subtle px-4 py-2 text-xs uppercase tracking-[0.15em] text-brick-charcoal transition-luxe hover:border-brick-charcoal hover:text-brick-black">
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
        <div className="mt-8 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={analytics.revenueData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <CartesianGrid stroke="#E8E6E1" vertical={false} />
              <XAxis dataKey="day" axisLine={false} tickLine={false} stroke="#6B6B6B" />
              <YAxis axisLine={false} tickLine={false} stroke="#6B6B6B" />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Line type="monotone" dataKey="revenue" stroke="#B89B5E" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid gap-6 lg:col-span-2 lg:grid-cols-2 mt-6">
        {Object.entries(PROPERTY_STATUS_GROUPS).slice(0, 4).map(([key, group]) => {
          const Icon = group.icon;
          return (
            <div key={key} className="rounded-3xl border border-brick-subtle bg-brick-white p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-brick-muted">{group.label}</p>
                  <p className="font-serif mt-3 text-3xl text-brick-black">{propertyStatusCounts[key] || 0}</p>
                </div>
                <Icon className="h-5 w-5 text-brick-gold" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const OrdersTab = () => (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {Object.entries(ORDER_STATUS_GROUPS).map(([key, group]) => (
            <button key={key} onClick={() => setOrderStatusFilter(key)} className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.15em] transition-luxe ${orderStatusFilter === key ? 'border-brick-gold bg-brick-gold-light text-brick-black' : 'border-brick-subtle bg-transparent text-brick-charcoal hover:border-brick-charcoal hover:text-brick-black'}`}>
              {group.label} ({statusCounts[key] || 0})
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input value={orderSearch} onChange={(e) => setOrderSearch(e.target.value)} placeholder="Search orders..." className="w-full min-w-[220px] rounded-full border border-brick-subtle bg-brick-white px-4 py-3 text-sm text-brick-charcoal outline-none transition-luxe focus:border-brick-gold" />
          <button onClick={refreshOrders} className="rounded-full bg-brick-charcoal px-5 py-3 text-xs uppercase tracking-[0.2em] text-brick-white transition-luxe hover:bg-brick-gold hover:text-brick-black">
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-brick-subtle bg-brick-white shadow-sm">
        <div className="grid grid-cols-6 gap-4 border-b border-brick-subtle bg-brick-offwhite px-6 py-4 text-xs uppercase tracking-[0.15em] text-brick-muted">
          <span className="col-span-2">Order</span>
          <span>Status</span>
          <span>Date</span>
          <span>Amount</span>
          <span className="text-right">Actions</span>
        </div>
        <div className="max-h-[520px] overflow-y-auto">
          {filteredOrders.map(order => (
            <div key={order._id} className="grid grid-cols-6 gap-4 border-b border-brick-subtle px-6 py-5 text-sm text-brick-charcoal">
              <div className="col-span-2 space-y-1">
                <p className="font-medium">#{order._id?.slice(-8).toUpperCase()}</p>
                <p className="text-xs text-brick-muted">{order.customerName || order.email}</p>
              </div>
              <div className="flex items-center">
                <StatusBadge status={order.status} />
              </div>
              <div>{new Date(order.createdAt).toLocaleDateString()}</div>
              <div className="font-medium">{formatCurrency(order.total)}</div>
              <div className="flex items-center justify-end gap-2">
                <button onClick={() => openOrderModal(order)} className="rounded-full border border-brick-subtle px-3 py-2 text-xs uppercase tracking-[0.15em] text-brick-charcoal transition-luxe hover:border-brick-charcoal hover:text-brick-black">View</button>
                <button onClick={() => updateOrderStatus(order._id, order.status === 'pending' ? 'paid' : 'processing')} className="rounded-full bg-brick-gold px-3 py-2 text-xs uppercase tracking-[0.15em] text-brick-black transition-luxe hover:bg-brick-gold-light">Update</button>
              </div>
            </div>
          ))}
          {!filteredOrders.length && (
            <div className="p-8 text-center text-sm text-brick-muted">No matching orders found.</div>
          )}
        </div>
      </div>
    </div>
  );

  const PropertiesTab = () => (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {Object.entries(PROPERTY_STATUS_GROUPS).map(([key, group]) => (
            <button key={key} onClick={() => setPropertyStatusFilter(key)} className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.15em] transition-luxe ${propertyStatusFilter === key ? 'border-brick-gold bg-brick-gold-light text-brick-black' : 'border-brick-subtle bg-transparent text-brick-charcoal hover:border-brick-charcoal hover:text-brick-black'}`}>
              {group.label} ({propertyStatusCounts[key] || 0})
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input value={propertySearch} onChange={(e) => setPropertySearch(e.target.value)} placeholder="Search properties..." className="w-full min-w-[220px] rounded-full border border-brick-subtle bg-brick-white px-4 py-3 text-sm text-brick-charcoal outline-none transition-luxe focus:border-brick-gold" />
          <button onClick={() => openPropertyModal()} className="rounded-full bg-brick-charcoal px-5 py-3 text-xs uppercase tracking-[0.2em] text-brick-white transition-luxe hover:bg-brick-gold hover:text-brick-black">
            New Property
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-brick-subtle bg-brick-white shadow-sm">
        <div className="grid grid-cols-7 gap-4 border-b border-brick-subtle bg-brick-offwhite px-6 py-4 text-xs uppercase tracking-[0.15em] text-brick-muted">
          <span className="col-span-2">Property</span>
          <span>Location</span>
          <span>Category</span>
          <span>Status</span>
          <span>Price</span>
          <span className="text-right">Actions</span>
        </div>
        <div className="max-h-[520px] overflow-y-auto">
          {filteredProperties.map(property => (
            <div key={property._id} className="grid grid-cols-7 gap-4 border-b border-brick-subtle px-6 py-5 text-sm text-brick-charcoal">
              <div className="col-span-2 space-y-1">
                <p className="font-medium">{property.title}</p>
                <p className="text-xs text-brick-muted">{property.beds} beds • {property.baths} baths</p>
              </div>
              <div>{property.location}</div>
              <div>{property.category}</div>
              <div><StatusBadge status={property.status} type="property" /></div>
              <div className="font-medium">{formatCurrency(property.price)}</div>
              <div className="flex items-center justify-end gap-2">
                <button onClick={() => openPropertyModal(property)} className="rounded-full border border-brick-subtle px-3 py-2 text-xs uppercase tracking-[0.15em] text-brick-charcoal transition-luxe hover:border-brick-charcoal hover:text-brick-black">Edit</button>
                <button onClick={() => deleteProperty(property._id)} className="rounded-full bg-brick-gold px-3 py-2 text-xs uppercase tracking-[0.15em] text-brick-black transition-luxe hover:bg-brick-gold-light">Delete</button>
              </div>
            </div>
          ))}
          {!filteredProperties.length && (
            <div className="p-8 text-center text-sm text-brick-muted">No matching properties found.</div>
          )}
        </div>
      </div>
    </div>
  );

  const EnquiriesTab = () => (
    <div className="space-y-8">
      <div className="rounded-3xl border border-brick-subtle bg-brick-white p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-brick-muted">Enquiries</p>
            <h2 className="font-serif mt-2 text-2xl text-brick-black">Latest client consults</h2>
          </div>
          <div className="rounded-full border border-brick-subtle bg-brick-gold-light px-4 py-3 text-xs uppercase tracking-[0.15em] text-brick-black">{styleSessions.length} total</div>
        </div>
        <div className="mt-8 grid gap-4">
          {styleSessions.map(session => (
            <div key={session._id} className="rounded-3xl border border-brick-subtle p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-medium text-brick-black">{session.name || session.customerName || 'Client'}</p>
                  <p className="text-xs text-brick-muted">{session.email || session.phone}</p>
                </div>
                <StatusBadge status={session.status || 'pending'} type="enquiry" />
              </div>
              <div className="mt-4 flex flex-wrap gap-3 text-sm text-brick-muted">
                <span>{new Date(session.createdAt).toLocaleDateString()}</span>
                <span>{session.message || 'No message available'}</span>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <button onClick={() => updateEnquiryStatus(session._id, 'confirmed')} className="rounded-full border border-brick-subtle px-4 py-2 text-xs uppercase tracking-[0.15em] text-brick-charcoal transition-luxe hover:border-brick-charcoal hover:text-brick-black">Confirm</button>
                <button onClick={() => updateEnquiryStatus(session._id, 'cancelled')} className="rounded-full bg-brick-gold px-4 py-2 text-xs uppercase tracking-[0.15em] text-brick-black transition-luxe hover:bg-brick-gold-light">Close</button>
              </div>
            </div>
          ))}
          {!styleSessions.length && (
            <div className="p-8 text-center text-sm text-brick-muted">No enquiries available.</div>
          )}
        </div>
      </div>
    </div>
  );

  const CustomersTab = () => (
    <div className="space-y-8">
      <div className="rounded-3xl border border-brick-subtle bg-brick-white p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-brick-muted">Customers</p>
            <h2 className="font-serif mt-2 text-2xl text-brick-black">Top customers</h2>
          </div>
          <div className="rounded-full border border-brick-subtle bg-brick-gold-light px-4 py-3 text-xs uppercase tracking-[0.15em] text-brick-black">{customers.length} active</div>
        </div>
        <div className="mt-8 grid gap-4">
          {customers.map(customer => (
            <div key={customer._id} className="rounded-3xl border border-brick-subtle p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-medium text-brick-black">{customer.name || customer.email}</p>
                  <p className="text-xs text-brick-muted">{customer.email}</p>
                </div>
                <div className="flex flex-wrap gap-3 text-sm text-brick-muted">
                  <span>{customer.orders} orders</span>
                  <span>{formatCurrency(customer.totalSpent)}</span>
                </div>
              </div>
            </div>
          ))}
          {!customers.length && (
            <div className="p-8 text-center text-sm text-brick-muted">No customers found yet.</div>
          )}
        </div>
      </div>
    </div>
  );

  const filteredOrders = useMemo(() => {
    const group = ORDER_STATUS_GROUPS[orderStatusFilter];
    let filtered = group.statuses? orders.filter(o => group.statuses.includes(o.status)) : orders;

    if (orderSearch.trim()) {
      const q = orderSearch.toLowerCase();
      filtered = filtered.filter(o =>
        o._id?.toLowerCase().includes(q) ||
        o.customerName?.toLowerCase().includes(q) ||
        o.email?.toLowerCase().includes(q) ||
        o.itemName?.toLowerCase().includes(q) ||
        o.items?.some(i => i.name?.toLowerCase().includes(q))
      );
    }

    return filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [orders, orderStatusFilter, orderSearch]);

  const filteredProperties = useMemo(() => {
    const group = PROPERTY_STATUS_GROUPS[propertyStatusFilter];
    let filtered = group.statuses? properties.filter(p => group.statuses.includes(p.status)) : properties;

    if (propertySearch.trim()) {
      const q = propertySearch.toLowerCase();
      filtered = filtered.filter(p =>
        p.title?.toLowerCase().includes(q) ||
        p.location?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q)
      );
    }

    return filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [properties, propertyStatusFilter, propertySearch]);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await axios.put(`${backendUrl}/order/update-order`, { orderId, status: newStatus });
      if (res.data.success) {
        toast.success('Status updated');
        setOrders(prev => prev.map(o => o._id === orderId? {...o, status: newStatus } : o));
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to update order');
    }
  };

  const deleteProperty = async (propertyId) => {
    if (!confirm('Delete this property? This cannot be undone.')) return;
    try {
      const res = await axios.delete(`${backendUrl}/properties/${propertyId}`);
      if (res.data.success) {
        toast.success('Property deleted');
        setProperties(prev => prev.filter(p => p._id!== propertyId));
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete property');
    }
  };

  const updateEnquiryStatus = async (enquiryId, newStatus) => {
    try {
      const res = await axios.put(`${backendUrl}/order/update-consult`, { consultId: enquiryId, status: newStatus });
      if (res.data.success) {
        toast.success('Enquiry updated');
        setStyleSessions(prev => prev.map(e => e._id === enquiryId? {...e, status: newStatus } : e));
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to update enquiry');
    }
  };

  const refreshOrders = async () => {
    setRefreshing(true);
    try {
      const res = await axios.get(`${backendUrl}/order/data`);
      if (res.data.success) {
        setOrders(res.data.orders);
        toast.success('Orders refreshed');
      }
    } catch (error) {
      toast.error('Failed to refresh');
    } finally {
      setRefreshing(false);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'orders', label: 'Orders' },
    { id: 'properties', label: 'Properties' },
    { id: 'enquiries', label: 'Enquiries' },
    { id: 'customers', label: 'Customers' }
  ];

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-brick-white">
        <div className="text-sm font-medium text-brick-muted">Loading dashboard...</div>
      </div>
    );
  }

  const OrderModal = () => {
    if (!selectedOrder) return null;
    const order = selectedOrder;
    const items = order.items || [{ name: order.itemName, image: order.image, size: order.size, color: order.color, quantity: order.quantity || 1, price: order.total }];

    return (
      <AnimatePresence>
        {showOrderModal && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeOrderModal} className="fixed inset-0 z-50 bg-brick-black/60 backdrop-blur-sm" />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} transition={{ duration: 0.4, ease }} className="relative w-full max-w-5xl overflow-hidden bg-brick-white shadow-luxe">
                <div className="sticky top-0 z-10 flex items-center justify-between border-b border-brick-subtle bg-brick-white p-8">
                  <div>
                    <p className="text-brick-gold text-xs tracking-[0.2em] uppercase">Order Details</p>
                    <h2 className="font-serif mt-1 text-2xl text-brick-black">#{order._id.slice(-8).toUpperCase()}</h2>
                  </div>
                  <button onClick={closeOrderModal} className="p-2 text-brick-muted transition-luxe hover:text-brick-charcoal">
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="overflow-y-auto p-8" style={{ maxHeight: 'calc(90vh - 96px)' }}>
                  <div className="grid gap-8 lg:grid-cols-5">
                    <div className="space-y-6 lg:col-span-2">
                      <div className="border border-brick-subtle p-6">
                        <p className="text-brick-gold text-xs tracking-[0.2em] uppercase mb-4">Status</p>
                                <div className="flex items-center justify-between">
                          <StatusBadge status={order.status} />
                          <div className="text-right">
                            <p className="text-xs text-brick-muted">Placed on</p>
                            <p className="text-sm font-medium text-brick-black">
                              {new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="border border-brick-subtle p-6">
                        <p className="text-brick-gold text-xs tracking-[0.2em] uppercase mb-4">Customer</p>
                        <div className="space-y-3">
                          <p className="text-sm font-medium text-brick-black">{order.customerName}</p>
                          <a href={`mailto:${order.email}`} className="block text-xs text-brick-muted hover:text-brick-gold transition-luxe">{order.email}</a>
                          <a href={`tel:${order.phone}`} className="block text-xs text-brick-muted hover:text-brick-gold transition-luxe">{order.phone}</a>
                        </div>
                      </div>

                      <div className="border border-brick-subtle p-6">
                        <p className="text-brick-gold text-xs tracking-[0.2em] uppercase mb-4">Delivery Address</p>
                        <p className="text-sm leading-relaxed text-brick-charcoal">{order.address}</p>
                      </div>
                    </div>

                    <div className="space-y-6 lg:col-span-3">
                      <div className="border border-brick-subtle p-6">
                        <p className="text-brick-gold text-xs tracking-[0.2em] uppercase mb-4">Order Items</p>
                        <div className="space-y-4">
                          {items.map((item, i) => (
                            <div key={i} className="flex gap-4 border-b border-brick-subtle pb-4 last:border-0 last:pb-0">
                              <img src={item.image || 'https://via.placeholder.com/80'} alt={item.name} className="h-20 w-20 object-cover" />
                              <div className="flex-1">
                                <p className="font-medium text-brick-black">{item.name}</p>
                                <div className="mt-2 flex gap-4 text-xs text-brick-muted">
                                  <span>Qty: {item.quantity || 1}</span>
                                  {item.size && item.size!== 'N/A' && <span className="border border-brick-subtle px-2 py-0.5">{item.size}</span>}
                                  {item.color && item.color!== 'N/A' && <span className="h-3.5 w-3.5 border border-brick-subtle" style={{ backgroundColor: item.color }} />}
                                </div>
                                <p className="font-serif mt-2 text-lg text-brick-black">
                                  ₵{((item.price || order.total / items.length) * (item.quantity || 1)).toLocaleString()}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="border border-brick-subtle p-6">
                        <p className="text-brick-gold text-xs tracking-[0.2em] uppercase mb-4">Payment Summary</p>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between text-brick-muted">
                            <span>Subtotal</span>
                            <span className="font-medium text-brick-black">₵{(order.subtotal || order.total)?.toLocaleString()}</span>
                          </div>
                          {order.shipping > 0 && (
                            <div className="flex justify-between text-brick-muted">
                              <span>Shipping</span>
                              <span className="font-medium text-brick-black">₵{order.shipping.toLocaleString()}</span>
                            </div>
                          )}
                          <div className="border-t border-brick-subtle pt-3 flex justify-between">
                            <span className="font-serif text-lg text-brick-black">Total</span>
                            <span className="font-serif text-2xl text-brick-black">₵{order.total?.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    );
  };

  const PropertyModal = () => {
    const [formData, setFormData] = useState({
      title: '', location: '', category: 'House', price: '', beds: '', baths: '', size: '',
      status: 'draft', description: '', features: '', images: []
    });

    useEffect(() => {
      if (selectedProperty) {
        setFormData({
          title: selectedProperty.title || '',
          location: selectedProperty.location || '',
          category: selectedProperty.category || 'House',
          price: selectedProperty.price || '',
          beds: selectedProperty.beds || '',
          baths: selectedProperty.baths || '',
          size: selectedProperty.size || '',
          status: selectedProperty.status || 'draft',
          description: selectedProperty.description || '',
          features: selectedProperty.features?.join(', ') || '',
          images: selectedProperty.images || []
        });
      } else {
        setFormData({
          title: '', location: '', category: 'House', price: '', beds: '', baths: '', size: '',
          status: 'draft', description: '', features: '', images: []
        });
      }
    }, [selectedProperty]);

    const handleSubmit = async (e) => {
      e.preventDefault();
      const payload = {
    ...formData,
        price: Number(formData.price),
        beds: Number(formData.beds),
        baths: Number(formData.baths),
        size: Number(formData.size),
        features: formData.features.split(',').map(f => f.trim()).filter(Boolean)
      };

      try {
        if (isEditingProperty) {
          const res = await axios.put(`${backendUrl}/properties/${selectedProperty._id}`, payload);
          if (res.data.success) {
            toast.success('Property updated');
            setProperties(prev => prev.map(p => p._id === selectedProperty._id? res.data.property : p));
          }
        } else {
          const res = await axios.post(`${backendUrl}/properties`, payload);
          if (res.data.success) {
            toast.success('Property created');
            setProperties(prev => [res.data.property,...prev]);
          }
        }
        closePropertyModal();
      } catch (error) {
        console.error(error);
        toast.error('Failed to save property');
      }
    };

    return (
      <AnimatePresence>
        {showPropertyModal && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closePropertyModal} className="fixed inset-0 z-50 bg-brick-black/60 backdrop-blur-sm" />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} transition={{ duration: 0.4, ease }} className="relative w-full max-w-4xl overflow-hidden bg-brick-white shadow-luxe">
                <div className="sticky top-0 z-10 flex items-center justify-between border-b border-brick-subtle bg-brick-white p-8">
                  <div>
                    <p className="text-brick-gold text-xs tracking-[0.2em] uppercase">Property Listing</p>
                    <h2 className="font-serif mt-1 text-2xl text-brick-black">{isEditingProperty? 'Edit Property' : 'New Property'}</h2>
                  </div>
                  <button onClick={closePropertyModal} className="p-2 text-brick-muted transition-luxe hover:text-brick-charcoal">
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="overflow-y-auto p-8" style={{ maxHeight: 'calc(90vh - 96px)' }}>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="md:col-span-2">
                      <label className="text-xs uppercase tracking-[0.15em] text-brick-muted">Property Title</label>
                      <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required className="mt-2 w-full border-b border-brick-subtle bg-transparent py-3 text-sm text-brick-charcoal outline-none transition-luxe focus:border-brick-gold" />
                    </div>

                    <div>
                      <label className="text-xs uppercase tracking-[0.15em] text-brick-muted">Location</label>
                      <input type="text" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} required className="mt-2 w-full border-b border-brick-subtle bg-transparent py-3 text-sm text-brick-charcoal outline-none transition-luxe focus:border-brick-gold" />
                    </div>

                    <div>
                      <label className="text-xs uppercase tracking-[0.15em] text-brick-muted">Category</label>
                      <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="mt-2 w-full border-b border-brick-subtle bg-transparent py-3 text-sm text-brick-charcoal outline-none transition-luxe focus:border-brick-gold">
                        <option>House</option>
                        <option>Apartment</option>
                        <option>Land</option>
                        <option>Commercial</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs uppercase tracking-[0.15em] text-brick-muted">Price (GHS)</label>
                      <input type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} required className="mt-2 w-full border-b border-brick-subtle bg-transparent py-3 text-sm text-brick-charcoal outline-none transition-luxe focus:border-brick-gold" />
                    </div>

                    <div>
                      <label className="text-xs uppercase tracking-[0.15em] text-brick-muted">Status</label>
                      <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="mt-2 w-full border-b border-brick-subtle bg-transparent py-3 text-sm text-brick-charcoal outline-none transition-luxe focus:border-brick-gold">
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                        <option value="sold">Sold</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs uppercase tracking-[0.15em] text-brick-muted">Bedrooms</label>
                      <input type="number" value={formData.beds} onChange={(e) => setFormData({...formData, beds: e.target.value})} className="mt-2 w-full border-b border-brick-subtle bg-transparent py-3 text-sm text-brick-charcoal outline-none transition-luxe focus:border-brick-gold" />
                    </div>

                    <div>
                      <label className="text-xs uppercase tracking-[0.15em] text-brick-muted">Bathrooms</label>
                      <input type="number" value={formData.baths} onChange={(e) => setFormData({...formData, baths: e.target.value})} className="mt-2 w-full border-b border-brick-subtle bg-transparent py-3 text-sm text-brick-charcoal outline-none transition-luxe focus:border-brick-gold" />
                    </div>

                    <div>
                      <label className="text-xs uppercase tracking-[0.15em] text-brick-muted">Size (sqm)</label>
                      <input type="number" value={formData.size} onChange={(e) => setFormData({...formData, size: e.target.value})} className="mt-2 w-full border-b border-brick-subtle bg-transparent py-3 text-sm text-brick-charcoal outline-none transition-luxe focus:border-brick-gold" />
                    </div>

                    <div className="md:col-span-2">
                      <label className="text-xs uppercase tracking-[0.15em] text-brick-muted">Description</label>
                      <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} rows={4} className="mt-2 w-full border border-brick-subtle bg-transparent p-4 text-sm text-brick-charcoal outline-none transition-luxe focus:border-brick-gold" />
                    </div>

                    <div className="md:col-span-2">
                      <label className="text-xs uppercase tracking-[0.15em] text-brick-muted">Features (comma separated)</label>
                      <input type="text" value={formData.features} onChange={(e) => setFormData({...formData, features: e.target.value})} placeholder="Swimming Pool, Garden, 24/7 Security" className="mt-2 w-full border-b border-brick-subtle bg-transparent py-3 text-sm text-brick-charcoal outline-none transition-luxe focus:border-brick-gold" />
                    </div>
                  </div>

                  <div className="mt-8 flex gap-4 border-t border-brick-subtle pt-8">
                    <button type="button" onClick={closePropertyModal} className="flex-1 border border-brick-subtle bg-brick-white py-4 text-xs font-medium uppercase tracking-[0.2em] text-brick-charcoal transition-luxe hover:border-brick-charcoal">
                      Cancel
                    </button>
                    <button type="submit" className="flex-1 bg-brick-charcoal py-4 text-xs font-medium uppercase tracking-[0.2em] text-brick-white transition-luxe hover:bg-brick-gold hover:text-brick-black">
                      {isEditingProperty? 'Update Property' : 'Create Property'}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    );
  };

  return (
    <div className="min-h-screen bg-brick-offwhite px-8 py-32 text-brick-charcoal">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}>
          <p className="text-brick-gold text-xs tracking-[0.3em] uppercase">Admin Dashboard</p>
          <h1 className="font-serif mt-2 text-5xl text-brick-black">The Bricks Control</h1>
        </motion.div>

        <div className="mt-8 flex gap-8 border-b border-brick-subtle">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`border-b-2 pb-4 text-sm font-medium transition-luxe ${
                activeTab === tab.id? 'border-brick-gold text-brick-black' : 'border-transparent text-brick-muted hover:text-brick-charcoal'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-8">
          {activeTab === 'overview' && <OverviewTab analytics={analytics} />}
          {activeTab === 'orders' && <OrdersTab />}
          {activeTab === 'properties' && <PropertiesTab />}
          {activeTab === 'enquiries' && <EnquiriesTab />}
          {activeTab === 'customers' && <CustomersTab />}
        </div>
      </div>
      <OrderModal />
      <PropertyModal />
    </div>
  );
};