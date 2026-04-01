import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Bike, 
  MapPin, 
  Clock, 
  Phone, 
  MessageSquare, 
  ChevronLeft, 
  CheckCircle2, 
  Package, 
  Store as StoreIcon,
  Navigation,
  Star,
  AlertCircle,
  QrCode,
  Info,
  ArrowLeft
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useStore } from "../../../context/StoreContext";
import { PageHeader } from "../../../shared/components/layout/PageHeader";
import { Button } from "../../../shared/components/ui/Button";
import { Badge } from "../../../shared/components/ui/Badge";
import { Avatar } from "../../../shared/components/ui/Avatar";
import { OrderTimeline } from "../../../shared/components/OrderTimeline";
import { OrderStatus, DeliveryMode } from "../../../shared/orderStateMachine";
import { toast } from "sonner";
import { CancelOrderModal } from "../../../shared/components/CancelOrderModal";
import { RatingModal } from "../../../shared/components/RatingModal";
import { Store, Order } from "../../../shared/types";

const OrderTrackingPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const { stores, updateOrderStatus } = useStore();
  
  // Find the order and store
  const { order, store } = useMemo(() => {
    for (const s of (stores as unknown as Store[])) {
      const o = s.orders.find(order => order.id === orderId);
      if (o) return { order: o, store: s };
    }
    return { order: null, store: null };
  }, [stores, orderId]);

  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);

  // Simulation of order progress
  useEffect(() => {
    if (!order || !store) return;

    const deliveryFlow: any[] = [
      'novo', 'aceito', 'preparo', 'pronto', 'entrega', 'concluido'
    ];
    
    let currentIndex = deliveryFlow.indexOf(order.status);

    const timer = setInterval(() => {
      if (currentIndex < deliveryFlow.length - 1) {
        const nextStatus = deliveryFlow[currentIndex + 1];
        updateOrderStatus(store.slug, order.id, nextStatus, { silent: true });
        
        if (nextStatus === 'concluido') {
          setIsRatingModalOpen(true);
          clearInterval(timer);
        }
      }
    }, 10000); // Progress every 10 seconds

    return () => clearInterval(timer);
  }, [order?.status, store?.slug, order?.id]);

  if (!order || !store) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 gap-6">
        <div className="w-24 h-24 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-4xl">
          📦
        </div>
        <div className="flex flex-col items-center gap-2 text-center">
          <h2 className="text-xl font-black uppercase tracking-tight text-white">Pedido não encontrado</h2>
          <p className="text-sm text-zinc-500 font-medium">Não conseguimos localizar o pedido #{orderId}.</p>
        </div>
        <Button variant="primary" onClick={() => navigate("/")}>
          Voltar para Home
        </Button>
      </div>
    );
  }

  const handleCancelOrder = (reason: string) => {
    updateOrderStatus(store.slug, order.id, "cancelado");
    toast.error("Pedido cancelado", {
      description: `Motivo: ${reason}`
    });
  };

  // Map internal status to timeline status
  const timelineStatusMap: Record<string, OrderStatus> = {
    'novo': 'confirmed',
    'aceito': 'preparing',
    'preparo': 'preparing',
    'pronto': 'ready',
    'entrega': 'in_transit',
    'concluido': 'delivered',
    'cancelado': 'cancelled_by_customer'
  };

  return (
    <div className="min-h-screen bg-zinc-950 pb-32">
      <PageHeader 
        title={`Pedido #${order.id}`} 
        subtitle="Acompanhe seu pedido em tempo real"
        onBack={() => navigate("/")}
      />

      <main className="max-w-5xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Map & Status */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          {/* Tracking Map Placeholder */}
          {order.status !== 'concluido' && order.status !== 'cancelado' && (
            <div className="relative h-[300px] md:h-[400px] bg-zinc-900 border border-zinc-800 rounded-[40px] overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800/20 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-orange-500/20 blur-3xl animate-pulse" />
                  <div className="relative w-20 h-20 rounded-full border-4 border-orange-500 flex items-center justify-center bg-zinc-950 shadow-2xl">
                    <Bike className="w-10 h-10 text-orange-500 animate-bounce" />
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between pointer-events-none">
                <div className="p-4 bg-zinc-950/80 backdrop-blur-md border border-zinc-800 rounded-2xl flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Estimativa</span>
                    <span className="text-sm font-black text-white">{store.settings.tempoPreparo}</span>
                  </div>
                </div>
                
                <div className="p-4 bg-zinc-950/80 backdrop-blur-md border border-zinc-800 rounded-2xl flex items-center gap-3">
                  <div className="w-10 h-10 bg-zinc-900 rounded-xl flex items-center justify-center">
                    <Navigation className="w-5 h-5 text-orange-500" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Distância</span>
                    <span className="text-sm font-black text-white">{order.distancia?.toFixed(1) || "2.4"} km</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Status Timeline */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-[40px] p-10 shadow-2xl">
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-white mb-10">Status do Pedido</h2>
            <OrderTimeline mode="delivery" currentStatus={timelineStatusMap[order.status]} />
          </div>
        </div>

        {/* Right Column: Info & Actions */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          {/* Store Info */}
          <section className="bg-zinc-900 border border-zinc-800 rounded-[40px] p-8 flex flex-col gap-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-white">Loja</h2>
              <Badge variant="orange" size="xs">{store.settings.categoria}</Badge>
            </div>
            
            <div className="flex items-center gap-4">
              <Avatar 
                src={store.settings.logo} 
                fallback={store.settings.nome} 
                size="lg" 
                className="rounded-2xl border border-zinc-800"
              />
              <div className="flex flex-col flex-1 gap-1">
                <h3 className="text-sm font-black uppercase tracking-tight text-white">{store.settings.nome}</h3>
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{store.settings.descricao}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => window.open(`https://wa.me/${store.settings.whatsapp}`)}>
                <Phone className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
            </div>
          </section>

          {/* Delivery Confirmation Code */}
          {order.status === 'entrega' && (
            <div className="bg-orange-500 border border-orange-400 rounded-[32px] p-8 flex flex-col gap-4 shadow-2xl shadow-orange-500/20">
              <div className="flex items-center gap-3 text-white">
                <Info className="w-5 h-5" />
                <h3 className="text-sm font-black uppercase tracking-widest">Código de Entrega</h3>
              </div>
              <p className="text-xs font-bold text-orange-100 uppercase tracking-widest">Informe este código ao entregador para confirmar o recebimento:</p>
              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 flex items-center justify-center">
                <span className="text-4xl font-black text-white tracking-[0.5em]">{order.id.slice(-4)}</span>
              </div>
            </div>
          )}

          {/* Order Summary */}
          <section className="bg-zinc-900 border border-zinc-800 rounded-[40px] p-8 flex flex-col gap-6 shadow-2xl">
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-white">Resumo do Pedido</h2>
            <div className="flex flex-col gap-4">
              {order.items.map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-zinc-800/50 last:border-0">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-black text-orange-500">{item.quantidade}x</span>
                    <span className="text-xs font-black uppercase tracking-tight text-white">{item.nome}</span>
                  </div>
                  <span className="text-xs font-black text-zinc-400">R$ {(item.precoFinal * item.quantidade).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
              <span className="text-sm font-black uppercase tracking-widest text-white">Total Pago</span>
              <span className="text-xl font-black text-orange-500">R$ {order.total.toFixed(2)}</span>
            </div>
          </section>

          {/* Actions */}
          {['novo', 'aceito'].includes(order.status) && (
            <Button 
              variant="danger" 
              className="w-full h-16 text-sm font-black uppercase tracking-[0.2em]"
              onClick={() => setIsCancelModalOpen(true)}
            >
              Cancelar Pedido
            </Button>
          )}

          <Button 
            variant="ghost" 
            className="w-full"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para a Home
          </Button>
        </div>
      </main>

      <CancelOrderModal 
        isOpen={isCancelModalOpen} 
        onClose={() => setIsCancelModalOpen(false)} 
        onConfirm={handleCancelOrder} 
      />

      <RatingModal 
        isOpen={isRatingModalOpen} 
        onClose={() => setIsRatingModalOpen(false)} 
        onSubmit={(rating, comment) => {
          toast.success("Obrigado pela sua avaliação!");
          console.log({ rating, comment });
        }} 
      />
    </div>
  );
};

export default OrderTrackingPage;
