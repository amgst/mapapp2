import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Package, Truck, CheckCircle, AlertCircle, Clock, Eye } from 'lucide-react';

interface OrderDetails {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  productType: string;
  productSize: string;
  aspectRatio: string;
  status: 'pending' | 'processing' | 'ready' | 'shipped' | 'error';
  createdAt: string;
  updatedAt: string;
  totalAmount: number;
  sessionId: string;
  designData: any;
  productionNotes: string;
  trackingNumber?: string;
}

const AdminOrderDetails: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [productionNotes, setProductionNotes] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');

  const statusConfig = {
    pending: { icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-100', label: 'Pending' },
    processing: { icon: Package, color: 'text-blue-600', bg: 'bg-blue-100', label: 'Processing' },
    ready: { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100', label: 'Ready' },
    shipped: { icon: Truck, color: 'text-gray-600', bg: 'bg-gray-100', label: 'Shipped' },
    error: { icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-100', label: 'Error' }
  };

  useEffect(() => {
    // Simulate loading order details
    setTimeout(() => {
      setOrder({
        id: orderId || 'ORD-001',
        customerName: 'John Smith',
        customerEmail: 'john@example.com',
        customerPhone: '+1 (555) 123-4567',
        shippingAddress: {
          street: '123 Main Street',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'United States'
        },
        productType: 'Cutting Board',
        productSize: 'Rectangle - Large',
        aspectRatio: '2.62:1',
        status: 'pending',
        createdAt: '2024-01-15T10:30:00Z',
        updatedAt: '2024-01-15T10:30:00Z',
        totalAmount: 89.99,
        sessionId: 'sess_123',
        designData: { mapBounds: {}, customizations: [] },
        productionNotes: 'Customer requested extra deep engraving'
      });
      setProductionNotes('Customer requested extra deep engraving');
      setIsLoading(false);
    }, 1000);
  }, [orderId]);

  const handleStatusUpdate = (newStatus: OrderDetails['status']) => {
    if (order) {
      setOrder({ ...order, status: newStatus, updatedAt: new Date().toISOString() });
    }
  };

  const handleSaveNotes = () => {
    if (order) {
      setOrder({ ...order, productionNotes });
      // TODO: Save to backend
    }
  };

  const handleAddTracking = () => {
    if (order && trackingNumber) {
      setOrder({ ...order, trackingNumber, status: 'shipped' });
      // TODO: Save to backend
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-600">Order not found</p>
        </div>
      </div>
    );
  }

  const StatusIcon = statusConfig[order.status].icon;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Dashboard
            </button>
            <div>
              <h1 className="text-2xl font-bold text-black">Order {order.id}</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  statusConfig[order.status].bg
                } ${statusConfig[order.status].color}`}>
                  <StatusIcon className="w-3 h-3" />
                  {statusConfig[order.status].label}
                </span>
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-gray-500">Created {formatDate(order.createdAt)}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 text-gray-600 hover:text-black transition-colors">
              <Download className="w-5 h-5" />
            </button>
            <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2">
              <Eye className="w-4 h-4" />
              View Design
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-black mb-4">Customer Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <p className="text-black">{order.customerName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <p className="text-black">{order.customerEmail}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <p className="text-black">{order.customerPhone}</p>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-black mb-4">Shipping Address</h2>
              <div className="text-black">
                <p>{order.shippingAddress.street}</p>
                <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
                <p>{order.shippingAddress.country}</p>
              </div>
            </div>

            {/* Product Details */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-black mb-4">Product Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Type</label>
                  <p className="text-black">{order.productType}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
                  <p className="text-black">{order.productSize}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Aspect Ratio</label>
                  <p className="text-black">{order.aspectRatio}</p>
                </div>
              </div>
            </div>

            {/* Design Preview */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-black mb-4">Design Preview</h2>
              <div className="bg-gray-100 rounded-lg p-8 text-center">
                <div className="w-full max-w-md mx-auto h-48 bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg border-2 border-dashed border-amber-300 flex items-center justify-center">
                  <p className="text-amber-700 font-medium">Map Design Preview</p>
                </div>
                <p className="text-gray-600 text-sm mt-2">Session ID: {order.sessionId}</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status Management */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-black mb-4">Status Management</h2>
              <div className="space-y-3">
                {Object.entries(statusConfig).map(([status, config]) => {
                  const Icon = config.icon;
                  return (
                    <button
                      key={status}
                      onClick={() => handleStatusUpdate(status as OrderDetails['status'])}
                      className={`w-full p-3 rounded-lg border-2 transition-all flex items-center gap-3 ${
                        order.status === status
                          ? 'border-black bg-gray-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${config.color}`} />
                      <span className="font-medium">{config.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Production Notes */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-black mb-4">Production Notes</h2>
              <textarea
                value={productionNotes}
                onChange={(e) => setProductionNotes(e.target.value)}
                placeholder="Add production notes..."
                className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent resize-none"
              />
              <button
                onClick={handleSaveNotes}
                className="mt-3 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Save Notes
              </button>
            </div>

            {/* Tracking Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-black mb-4">Shipping</h2>
              {order.trackingNumber ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tracking Number</label>
                  <p className="text-black font-mono">{order.trackingNumber}</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    placeholder="Enter tracking number"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                  <button
                    onClick={handleAddTracking}
                    disabled={!trackingNumber}
                    className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    Mark as Shipped
                  </button>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-black mb-4">Order Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-black">${(order.totalAmount * 0.9).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-black">${(order.totalAmount * 0.1).toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-2">
                  <div className="flex justify-between font-semibold">
                    <span className="text-black">Total</span>
                    <span className="text-black">${order.totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetails;