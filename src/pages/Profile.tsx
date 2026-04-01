import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  User, 
  Settings, 
  ShoppingBag, 
  Bike, 
  Store, 
  LogOut, 
  ChevronRight,
  Shield,
  CreditCard,
  MapPin,
  Bell,
  HelpCircle
} from "lucide-react";
import { motion } from "motion/react";
import { useAuth } from "../context/AuthContext";
import { Button } from "../shared/components/ui/Button";
import { Avatar } from "../shared/components/ui/Avatar";
import { PageHeader } from "../shared/components/layout/PageHeader";
import { toast } from "sonner";

export default function Profile() {
  const { user, logout, login } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Sessão encerrada com sucesso");
    navigate("/");
  };

  const menuItems = [
    { 
      icon: ShoppingBag, 
      label: "Meus Pedidos", 
      description: "Histórico e acompanhamento",
      onClick: () => navigate("/") 
    },
    { 
      icon: MapPin, 
      label: "Meus Endereços", 
      description: "Gerenciar locais de entrega",
      onClick: () => {} 
    },
    { 
      icon: CreditCard, 
      label: "Pagamentos", 
      description: "Cartões e métodos salvos",
      onClick: () => {} 
    },
    { 
      icon: Bell, 
      label: "Notificações", 
      description: "Alertas e promoções",
      onClick: () => {} 
    },
  ];

  const businessItems = [
    { 
      icon: Store, 
      label: "Área do Lojista", 
      description: "Gerencie sua loja e pedidos",
      onClick: () => {
        login("vendedor");
        navigate("/seller/dashboard");
      }
    },
    { 
      icon: Bike, 
      label: "Área do Entregador", 
      description: "Ganhe dinheiro entregando",
      onClick: () => {
        login("entregador");
        navigate("/delivery/pizza-top"); // Mocking a slug for now
      }
    },
    { 
      icon: Shield, 
      label: "Área Administrativa", 
      description: "Gestão global da plataforma",
      onClick: () => navigate("/admin/dashboard") 
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 pb-32">
      <PageHeader 
        title="Meu Perfil" 
        subtitle="Gerencie sua conta e preferências"
        onBack={() => navigate("/")}
      />

      <main className="max-w-2xl mx-auto p-6 flex flex-col gap-8">
        {/* Profile Card */}
        <section className="bg-zinc-900 border border-zinc-800 rounded-[40px] p-8 shadow-2xl flex flex-col items-center gap-6 text-center">
          <div className="relative group">
            <Avatar 
              src="https://picsum.photos/seed/henri/200/200" 
              fallback={user?.name || "Usuário"} 
              size="xl" 
              className="rounded-[40px] border-4 border-zinc-950 shadow-2xl group-hover:scale-105 transition-transform duration-500"
            />
            <button className="absolute bottom-2 right-2 p-3 bg-orange-500 text-white rounded-2xl border-4 border-zinc-900 shadow-lg hover:scale-110 transition-transform">
              <Settings className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-black uppercase tracking-tight text-white">
              {user?.name || "Visitante"}
            </h2>
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
              {user?.email || "henri.rodrigues@email.com"}
            </p>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-full">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
              Conta Verificada
            </span>
          </div>
        </section>

        {/* General Menu */}
        <div className="flex flex-col gap-4">
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 px-4">
            Geral
          </h3>
          <div className="bg-zinc-900 border border-zinc-800 rounded-[40px] overflow-hidden shadow-2xl">
            {menuItems.map((item, i) => (
              <button
                key={i}
                onClick={item.onClick}
                className="w-full p-6 flex items-center justify-between group hover:bg-zinc-800/50 transition-colors border-b border-zinc-800 last:border-0"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-zinc-950 rounded-2xl group-hover:bg-orange-500/10 group-hover:text-orange-500 transition-colors">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-black uppercase tracking-tight text-white group-hover:text-orange-500 transition-colors">
                      {item.label}
                    </span>
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                      {item.description}
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-zinc-700 group-hover:text-white transition-colors" />
              </button>
            ))}
          </div>
        </div>

        {/* Business Menu */}
        <div className="flex flex-col gap-4">
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 px-4">
            Negócios
          </h3>
          <div className="bg-zinc-900 border border-zinc-800 rounded-[40px] overflow-hidden shadow-2xl">
            {businessItems.map((item, i) => (
              <button
                key={i}
                onClick={item.onClick}
                className="w-full p-6 flex items-center justify-between group hover:bg-zinc-800/50 transition-colors border-b border-zinc-800 last:border-0"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-zinc-950 rounded-2xl group-hover:bg-orange-500/10 group-hover:text-orange-500 transition-colors">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-black uppercase tracking-tight text-white group-hover:text-orange-500 transition-colors">
                      {item.label}
                    </span>
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                      {item.description}
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-zinc-700 group-hover:text-white transition-colors" />
              </button>
            ))}
          </div>
        </div>

        {/* Logout Button */}
        <Button 
          variant="danger" 
          className="w-full h-16 text-sm font-black uppercase tracking-[0.2em] rounded-[32px]"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5 mr-3" />
          Sair da Conta
        </Button>

        <div className="flex flex-col items-center gap-4 pt-8">
          <div className="flex items-center gap-6">
            <button className="text-[10px] font-black uppercase tracking-widest text-zinc-600 hover:text-white transition-colors">
              Termos
            </button>
            <div className="w-1 h-1 rounded-full bg-zinc-800" />
            <button className="text-[10px] font-black uppercase tracking-widest text-zinc-600 hover:text-white transition-colors">
              Privacidade
            </button>
            <div className="w-1 h-1 rounded-full bg-zinc-800" />
            <button className="text-[10px] font-black uppercase tracking-widest text-zinc-600 hover:text-white transition-colors">
              Ajuda
            </button>
          </div>
          <span className="text-[10px] font-bold text-zinc-800 uppercase tracking-[0.3em]">
            FoodApp v1.0.0
          </span>
        </div>
      </main>
    </div>
  );
}
