// Editor-style previews for projects that only have a GitHub repo (no live site
// or PDF to screenshot). File trees, snippets and language splits are taken
// from the actual repos; `# …` / `// …` marks lines trimmed for space.

export type RepoLang = 'python' | 'tsx'

export type RepoPreviewData = {
  branch: string
  /** Path shown in the editor tab / breadcrumb. */
  path: string
  lang: RepoLang
  tree: Array<{ name: string; depth?: number; dir?: boolean; active?: boolean }>
  /** Share of the repo by language, as reported by GitHub (percent). */
  languages: Array<{ name: string; pct: number }>
  code: string
}

// GitHub linguist colours, so the language bar reads like the one on GitHub.
export const LANGUAGE_COLORS: Record<string, string> = {
  'Jupyter Notebook': '#DA5B0B',
  Python: '#3572A5',
  HTML: '#E34C26',
  Makefile: '#427819',
  TypeScript: '#3178C6',
  Java: '#B07219',
  CSS: '#563D7C',
  JavaScript: '#F1E05A',
  PowerShell: '#012456',
  Shell: '#89E051',
}

export const REPO_PREVIEWS: Record<string, RepoPreviewData> = {
  // telecom-churn-analysis
  '01': {
    branch: 'main',
    path: 'notebooks/main_analysis.ipynb',
    lang: 'python',
    tree: [
      { name: 'data', dir: true },
      { name: 'docs', dir: true },
      { name: 'notebooks', dir: true },
      { name: 'main_analysis.ipynb', depth: 1, active: true },
      { name: 'presentation', dir: true },
      { name: 'HYPOTHESES.md' },
      { name: 'README.md' },
      { name: 'requirements.txt' },
    ],
    languages: [{ name: 'Jupyter Notebook', pct: 100 }],
    code: `X_train_1, X_test_1 = X_train_full[feature_cols_1], X_test_full[feature_cols_1]

model_1 = XGBClassifier(n_estimators=300, learning_rate=0.05, max_depth=6,
                        eval_metric="logloss", random_state=42)
model_1.fit(X_train_1, y_train)
y_pred_1 = model_1.predict(X_test_1)
y_proba_1 = model_1.predict_proba(X_test_1)[:, 1]

acc_1 = accuracy_score(y_test, y_pred_1)
auc_1 = roc_auc_score(y_test, y_proba_1)
f1_1 = f1_score(y_test, y_pred_1)
cm_1 = confusion_matrix(y_test, y_pred_1)

print(f"[Corrida 1] Accuracy={acc_1:.4f}  AUC-ROC={auc_1:.4f}  F1={f1_1:.4f}")
print(cm_1)`,
  },

  // seguros_colsubsidio
  '02': {
    branch: 'main',
    path: 'motor.py',
    lang: 'python',
    tree: [
      { name: 'apuntes', dir: true },
      { name: 'dashboards', dir: true },
      { name: 'data', dir: true },
      { name: 'scripts', dir: true },
      { name: 'app.py' },
      { name: 'mcp_server.py' },
      { name: 'motor.py', active: true },
      { name: 'server.py' },
    ],
    languages: [
      { name: 'HTML', pct: 62.7 },
      { name: 'Python', pct: 36 },
      { name: 'Makefile', pct: 1.3 },
    ],
    code: `def recomendar(perfil: dict) -> dict:
    error_validacion = _validar_perfil(perfil)
    if error_validacion is not None:
        return error_validacion

    necesidad = perfil.get("necesidad")
    # …
    pool, hipotesis_activadas = _evaluar_universo(perfil, necesidad)
    ranking = _rankear_pool(pool)

    recomendaciones = []
    for posicion, (producto_id, info) in enumerate(ranking[:3], start=1):
        score_reportado = round(min(max(info["score"], 0.0), 1.0), 2)
        es_declarada = info["necesidad_origen"] == necesidad
        razon = _razon_recomendacion(info, necesidad, score_reportado)
        recomendaciones.append(
            _armar_recomendacion(posicion, producto_id, info["score"], razon, es_declarada)
        )

    return {
        "recomendaciones": recomendaciones,
        "hipotesis_activadas": hipotesis_activadas,
        "necesidad": necesidad,
    }`,
  },

  // trident-ai
  '04': {
    branch: 'main',
    path: 'backend-python/app/services/chat_service.py',
    lang: 'python',
    tree: [
      { name: 'backend-java', dir: true },
      { name: 'backend-python', dir: true },
      { name: 'app/services', depth: 1, dir: true },
      { name: 'chat_service.py', depth: 2, active: true },
      { name: 'docs', dir: true },
      { name: 'frontend-react', dir: true },
      { name: 'readme.md' },
      { name: 'start-trident.ps1' },
    ],
    languages: [
      { name: 'TypeScript', pct: 86.5 },
      { name: 'Java', pct: 6.1 },
      { name: 'Python', pct: 5 },
      { name: 'CSS', pct: 1.5 },
      { name: 'PowerShell', pct: 0.7 },
      { name: 'JavaScript', pct: 0.2 },
    ],
    code: `class ChatService:
    def __init__(self):
        self.ollama = OllamaClient()
        self.repository = ChatRepository()

    async def process_chat(self, mode: str, prompt: str, model: str) -> Dict[str, Any]:
        start_time = time.time()

        ollama_response = await self.ollama.generate(model, prompt)
        response_time = time.time() - start_time
        response_text = ollama_response["response"]

        self.repository.save(
            mode=mode,
            prompt=prompt,
            response=response_text,
            model_used=model,
            response_time=response_time
        )`,
  },

  // siwar-app
  '09': {
    branch: 'main',
    path: 'src/app/caza-el-bug.tsx',
    lang: 'tsx',
    tree: [
      { name: 'assets', dir: true },
      { name: 'src', dir: true },
      { name: 'app', depth: 1, dir: true },
      { name: 'caza-el-bug.tsx', depth: 2, active: true },
      { name: 'curso.tsx', depth: 2 },
      { name: 'components', depth: 1, dir: true },
      { name: 'data', depth: 1, dir: true },
      { name: 'package.json' },
    ],
    languages: [
      { name: 'TypeScript', pct: 98.2 },
      { name: 'JavaScript', pct: 1.4 },
      { name: 'Shell', pct: 0.4 },
    ],
    code: `/**
 * Pantalla 4 · Caza el bug — código roto: se toca la línea del bug y se confirma.
 * Tono de voz: nunca "error", siempre "casi lo tienes".
 */
const MENSAJE_FALLO = 'Uy, cerquita. Esa línea está bien — revisa las otras con calma.';

export default function CazaElBug() {
  const { colores } = useTema();
  const router = useRouter();
  const { leccion: idLeccion } = useLocalSearchParams<{ leccion?: string }>();
  const ubicada = leccionDelReto(idLeccion);
  const { cazarBug, leccionesCompletadas, marcarActividad } = useProgreso();

  // Abrir el reto cuenta como día activo para la racha, aunque sea repaso.
  useEffect(() => {
    marcarActividad();
  }, [marcarActividad]);

  const [lineaMarcada, setLineaMarcada] = useState<number | null>(null);
  const [resuelto, setResuelto] = useState(false);`,
  },
}
