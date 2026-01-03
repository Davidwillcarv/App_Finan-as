import Layout from "../components/Layout";
import "./Settings.css";
import { useFinance } from "../context/FinanceContext";

const CATEGORIES = ["Moradia", "Alimentação", "Transporte", "Lazer", "Outros"];

export default function Settings() {
  const finance = useFinance();

  // 🔴 PROTEÇÃO CONTRA CONTEXTO QUEBRADO
  if (!finance) {
    return (
      <Layout>
        <p>Erro ao carregar configurações.</p>
      </Layout>
    );
  }

  const {
    limit = 0,
    categoryLimits = {},
    month = 1,
    year = new Date().getFullYear(),
    currency = "BRL",
    setLimit,
    setCategoryLimit,
    setPeriod,
    setCurrency,
  } = finance;

  return (
    <Layout>
      <div className="settings-page">
        <h1>Configurações</h1>

        <div className="settings-card">
          <h2>Limite mensal</h2>
          <input
            type="number"
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
          />
        </div>

        <div className="settings-card">
          <h2>Limite por categoria</h2>
          {CATEGORIES.map((cat) => (
            <div key={cat} className="row">
              <span>{cat}</span>
              <input
                type="number"
                value={categoryLimits[cat] || ""}
                onChange={(e) => setCategoryLimit(cat, Number(e.target.value))}
              />
            </div>
          ))}
        </div>

        <div className="settings-card">
          <h2>Período ativo</h2>
          <div className="row">
            <select
              value={month}
              onChange={(e) => setPeriod(Number(e.target.value), year)}
            >
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>

            <input
              type="number"
              value={year}
              onChange={(e) => setPeriod(month, Number(e.target.value))}
            />
          </div>
        </div>

        <div className="settings-card">
          <h2>Moeda</h2>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="BRL">Real (R$)</option>
            <option value="USD">Dólar ($)</option>
            <option value="EUR">Euro (€)</option>
          </select>
        </div>
      </div>
    </Layout>
  );
}
