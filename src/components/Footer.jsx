import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }} className="mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Ad slot - footer */}
        <div className="ad-slot mb-8" style={{ minHeight: '90px' }}>
          <span>Espaço publicitário</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl" role="img" aria-hidden="true">💸</span>
              <span className="font-bold text-lg bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                QuantoPerdi
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Descubra quanto dinheiro você perdeu ao longo dos anos. 
              Simuladores financeiros gratuitos para abrir seus olhos.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-200 mb-3 text-sm uppercase tracking-wider">Simuladores</h4>
            <div className="flex flex-col gap-2">
              <Link to="/perda-poupanca" className="text-sm text-gray-400 hover:text-red-400 no-underline transition-colors">📉 Investimento Perdido</Link>
              <Link to="/perda-cartao" className="text-sm text-gray-400 hover:text-red-400 no-underline transition-colors">💳 Juros do Cartão</Link>
              <Link to="/gastos-invisiveis" className="text-sm text-gray-400 hover:text-red-400 no-underline transition-colors">🚬 Gastos Invisíveis</Link>
              <Link to="/perda-inflacao" className="text-sm text-gray-400 hover:text-red-400 no-underline transition-colors">📊 Perda com Inflação</Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-200 mb-3 text-sm uppercase tracking-wider">Informações</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Os cálculos utilizam dados históricos e médias reais. 
              Resultados são aproximados e não constituem recomendação de investimento. 
              Consulte um profissional certificado antes de tomar decisões financeiras.
            </p>
          </div>
        </div>
        
        <div className="pt-6 text-center" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} QuantoPerdi. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
