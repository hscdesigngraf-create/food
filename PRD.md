# PRD - Documento de Requisitos do Produto: UltraDelivery App

## 1. Visão Geral
O **UltraDelivery** é uma plataforma full-stack de delivery multi-perfil, projetada para conectar clientes, lojistas e entregadores em um ecossistema fluido e moderno. O aplicativo foca em uma experiência de usuário premium, com interface em modo escuro, animações suaves e gestão em tempo real.

---

## 2. Público-Alvo
- **Clientes:** Usuários que buscam conveniência para pedir comida e produtos.
- **Lojistas (Sellers):** Estabelecimentos que desejam gerenciar vendas, cardápios e finanças.
- **Entregadores (Drivers):** Profissionais autônomos que realizam a logística de entrega.
- **Administradores (Admin):** Gestores da plataforma que monitoram a saúde do sistema e aprovam novos parceiros.

---

## 3. Módulos e Telas

### 3.1. Módulo do Cliente (Customer)
- **Home (Explorar):** Listagem de lojas, filtros por categoria (Pizza, Burger, Japa, etc.), busca inteligente e banners promocionais.
- **Cardápio da Loja:** Visualização de produtos, categorias internas, detalhes de itens e adição ao carrinho.
- **Checkout:** Resumo do pedido, seleção de endereço, método de pagamento e finalização.
- **Acompanhamento (Tracking):** Status do pedido em tempo real (Pendente, Preparando, Em Rota, Entregue).
- **Perfil:** Gestão de dados pessoais e atalhos para áreas de Lojista/Entregador.

### 3.2. Módulo do Lojista (Seller)
- **Dashboard:** Visão geral de vendas, pedidos do dia e métricas de desempenho.
- **Gestão de Pedidos:** Controle de fluxo (Aceitar, Preparar, Despachar).
- **Gestão de Cardápio:** Adição, edição e remoção de produtos e categorias.
- **Financeiro:** Relatórios de faturamento, taxas e histórico de repasses.
- **Configurações da Loja:** Horários de funcionamento, raio de entrega e perfil da loja.

### 3.3. Módulo do Entregador (Driver)
- **Onboarding:** Fluxo de cadastro e envio de documentos.
- **Dashboard:** Status de disponibilidade (Online/Offline) e ganhos do dia.
- **Entregas Disponíveis:** Lista de pedidos aguardando coleta próximos à localização.
- **Entrega Ativa:** Navegação para coleta e entrega, com chat e suporte.
- **Carteira (Wallet):** Histórico de ganhos por entrega e solicitações de saque.

### 3.4. Módulo Administrativo (Admin)
- **Painel de Controle:** Métricas globais da plataforma (Receita total, usuários ativos, saúde do servidor).
- **Gestão de Parceiros:** Aprovação de novas lojas e entregadores.
- **Financeiro Global:** Monitoramento de taxas de serviço e fluxo de caixa da plataforma.

---

## 4. Funcionalidades e Lógicas de Negócio

### 4.1. Fluxo de Pedido
1. **Seleção:** Cliente escolhe itens -> Carrinho calcula total e taxas.
2. **Pagamento:** Lógica de validação de saldo/cartão (Simulada).
3. **Notificação:** Lojista recebe alerta sonoro/visual do novo pedido.
4. **Logística:** Após preparo, o sistema notifica entregadores num raio de X km.
5. **Entrega:** Entregador aceita -> Coleta -> Entrega -> Finalização com código/foto.

### 4.2. Lógica de Botões (Exemplos)
- **Botão "Adicionar ao Carrinho":** Verifica se o item é da mesma loja que os itens já presentes (evita pedidos multi-loja simultâneos).
- **Botão "Ficar Online" (Entregador):** Ativa a geolocalização e começa a ouvir o socket de novas entregas.
- **Botão "Aceitar Pedido" (Lojista):** Altera o status no banco de dados e dispara notificação push para o cliente.

---

## 5. Identidade Visual e Estilo

### 5.1. Design System
- **Tema:** Dark Mode (Zinc-950) para redução de fadiga ocular e estética moderna.
- **Cor Primária:** Laranja Vibrante (`#f97316`) - Associada a energia e apetite.
- **Cores de Suporte:**
    - Sucesso: Emerald-500
    - Erro: Red-500
    - Neutros: Zinc-800, Zinc-400
- **Tipografia:** Inter (Sans-serif) com pesos variando de Regular a Black para hierarquia clara.

### 5.2. Componentes UI
- **Botões:** Arredondados (Pill-shaped), com sombras suaves e efeitos de escala ao clicar.
- **Cards:** Bordas arredondadas (3xl), fundos em Zinc-900 e bordas sutis.
- **Animações:** Uso de `framer-motion` para transições de página, modais deslizantes e feedbacks táteis.

---

## 6. Tecnologias Utilizadas
- **Frontend:** React + TypeScript + Vite.
- **Estilização:** Tailwind CSS.
- **Animações:** Framer Motion (motion/react).
- **Ícones:** Lucide React.
- **Estado:** Context API (Auth, Cart, Store, Driver).
- **Notificações:** Sonner (Toasts).
