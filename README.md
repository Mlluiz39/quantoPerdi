# QuantoPerdi

**QuantoPerdi** é um projeto com foco educacional, viralização e alto tráfego orgânico (SEO) projetado para revelar o impacto das más decisões financeiras ao longo do tempo. O diferencial da aplicação não é prometer ganhos irreais, mas sim mostrar aos usuários, através da dor concreta da perda, o quanto de dinheiro foi desperdiçado com juros rotativos de cartão de crédito, inflação, gastos invisíveis e oportunidades de investimento perdidas.

## 🚀 Simuladores Inclusos

1. **📉 Investimento Perdido**: Mostra quanto você teria acumulado (juros compostos) se tivesse investido aquele dinheiro em diferentes aplicações (Poupança, CDI, Ibovespa, etc.).
2. **💳 Juros do Cartão**: Demonstra o avassalador multiplicador do crédito rotativo do cartão. Mostra a dívida crescendo mês a mês.
3. **🚬 Gastos Invisíveis**: "É só um cafezinho", mas vezes 10 anos? Calculadora que converte gastos frequentes em perdas acumuladas em 10 anos de juros compostos.
4. **📊 Perda com Inflação**: Calcula como o seu poder de compra sumiu de um tempo pra cá e explica a inflação com números tangíveis na vida diária.

## 💻 Stack de Tecnologias

- **React 18 + Vite**: Para renderização rápida no lado do cliente.
- **Tailwind CSS v4**: Utilizado para criar o Design System escalável focado em *glassmorphism* e *deep dark theme*, mantendo ótima responsividade em mobile.
- **React Router**: Para roteamento client-side performático.
- **React Helmet Async**: Controle total das tags de SEO por página para melhor indexação e indexabilidade.

## 🛠 Como executar o projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/mlluiz/quantoPerdi.git
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Rode o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
4. Para realizar o build otimizado de produção:
   ```bash
   npm run build
   ```

## 📈 Estratégias de SEO

O projeto conta com forte otimização *On-Page*:
- **Tags Semânticas**: Implementação correta de tags `h1`, `h2`, `h3`, `details` e `summary` (FAQs).
- **JSON-LD**: Metadados via Schema.org instalados para aparecer no Google como Rich Snippet "WebApplication".
- **Dynamic Meta Tags**: Controlados dinamicamente via React Helmet.
- **Sitemap & Robots.txt**: Incluídos nativamente para bots de busca.
- **Mobile-first**: Renderização altamente adaptativa testada para o Google Mobile-First Indexing.

## 💰 Monetização
Os layouts têm `AdBanner` integrados estrategicamente em áreas de visualização e retenção da resposta de cada simulação (pronto para AdSense).
