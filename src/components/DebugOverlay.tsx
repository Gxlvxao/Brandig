import { useBrandStore } from "@/store/useBrandStore";
import { useEffect, useState } from "react";

export const DebugOverlay = () => {
  const store = useBrandStore();
  const [computedFont, setComputedFont] = useState("");
  const [injectedCSS, setInjectedCSS] = useState(false);

  useEffect(() => {
    // Verifica a cada 1s o que o navegador está realmente aplicando
    const interval = setInterval(() => {
        const style = window.getComputedStyle(document.body);
        setComputedFont(style.getPropertyValue('--font-heading'));
        setInjectedCSS(!!document.getElementById('dynamic-brand-style'));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!store.isEditorMode) return null;

  return (
    <div className="fixed top-24 left-4 z-[9999] bg-black/90 text-green-400 p-4 rounded-lg text-xs font-mono max-w-xs md:max-w-sm overflow-hidden shadow-2xl border border-green-500/50 break-words">
      <h3 className="font-bold text-white mb-2 border-b border-white/20 pb-1">🕵️ DEBUG DE FONTE</h3>
      
      <div className="mb-3">
        <strong className="text-white">1. Estado (Store):</strong>
        <div className="pl-2">
            <span className="opacity-70">Nome:</span> {store.typography.primaryFontName || "(vazio)"}<br/>
            <span className="opacity-70">URL:</span> 
            <span className={store.typography.primaryFontUrl ? "text-blue-400" : "text-red-400"}>
                {store.typography.primaryFontUrl ? " Carregada (Ver abaixo)" : " (Vazio - usando padrão)"}
            </span>
        </div>
        {store.typography.primaryFontUrl && (
            <div className="mt-1 p-1 bg-white/10 rounded break-all text-[10px]">
                {store.typography.primaryFontUrl}
            </div>
        )}
      </div>

      <div className="mb-3">
        <strong className="text-white">2. CSS Injetado (GlobalStyle):</strong><br/>
        Status: {injectedCSS ? "✅ <style> presente" : "❌ <style> ausente"}
      </div>

      <div>
        <strong className="text-white">3. Variável CSS (--font-heading):</strong><br/>
        Valor atual: <span className="text-yellow-300">{computedFont}</span>
      </div>
      
      <div className="mt-4 text-[10px] text-gray-400 italic">
        * Se a URL estiver aí, mas a fonte não mudar, verifique se o link abre em nova aba (pode ser erro 404 ou CORS).
      </div>
    </div>
  )
}