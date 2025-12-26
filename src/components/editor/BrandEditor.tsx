import { useState } from "react";
import { useParams } from "react-router-dom";
import { useBrandStore } from "@/store/useBrandStore";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Settings, Save, Palette, Type, Layout, Image, Users, Upload, Download, Smartphone, Loader2, Home, Plus, Trash2, List, Target, AlignLeft } from "lucide-react"; 
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { api } from "@/lib/api"; 
import { toast } from "sonner"; 

// Componente de Upload
const FileUpload = ({ label, value, onChange, accept = "image/*" }: { label: string, value?: string, onChange: (val: string) => void, accept?: string }) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 500 * 1024 * 1024) {
      toast.error("Arquivo muito grande. Limite de 500MB.");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      onChange(response.data.url);
      toast.success("Arquivo enviado com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao enviar arquivo.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex gap-2">
        <Input 
          value={value || ''} 
          placeholder={isUploading ? "Enviando..." : (value ? "Arquivo carregado" : "Nenhum arquivo")}
          readOnly
          className={`bg-muted ${isUploading ? 'animate-pulse' : ''}`}
        />
        <div className="relative">
          <Button variant="outline" size="icon" className="w-10 px-0" disabled={isUploading}>
            {isUploading ? (
              <Loader2 className="h-4 w-4 animate-spin text-accent" />
            ) : (
              <Upload className="h-4 w-4" />
            )}
          </Button>
          <Input 
            type="file" 
            accept={accept}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            onChange={handleUpload}
            disabled={isUploading}
          />
        </div>
      </div>
    </div>
  );
};

export const BrandEditor = () => {
  const { slug } = useParams(); 
  const store = useBrandStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    const projectSlug = slug || 'demo-brand';
    await store.saveProject(projectSlug);
    setIsSaving(false);
    setIsOpen(false);
  };

  if (!store.isEditorMode) return null;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          size="lg"
          className="fixed bottom-6 right-6 z-50 shadow-2xl gap-2 rounded-full h-14 px-6 animate-in fade-in slide-in-from-bottom-10 hover:scale-105 transition-transform"
        >
          <Settings className="w-5 h-5" />
          Editar Marca
        </Button>
      </SheetTrigger>
      
      <SheetContent className="w-full sm:max-w-none sm:w-[96vw] md:max-w-[1400px] p-0 flex flex-col h-full border-l-2 border-border/50 shadow-2xl">
        
        <SheetHeader className="p-6 border-b bg-muted/5 shrink-0">
          <SheetTitle className="text-2xl font-heading">Editor de Marca</SheetTitle>
          <SheetDescription>Sistema de Gestão Modular</SheetDescription>
        </SheetHeader>

        <ScrollArea className="flex-1 h-full">
          <div className="p-6 pb-24">
            <Tabs defaultValue="hero" className="w-full">
              
              <div className="sticky top-0 z-20 bg-background/95 backdrop-blur pb-4 pt-2 -mt-2 mb-8 border-b">
                <ScrollArea className="w-full whitespace-nowrap">
                  <TabsList className="inline-flex w-auto p-1 bg-muted/50 rounded-xl h-auto border">
                    <TabsTrigger value="hero" className="gap-2 py-2.5 px-5"><Home className="w-4 h-4"/> Capa & Nav</TabsTrigger>
                    <TabsTrigger value="index" className="gap-2 py-2.5 px-5"><List className="w-4 h-4"/> Índice</TabsTrigger>
                    <TabsTrigger value="intro" className="gap-2 py-2.5 px-5"><Layout className="w-4 h-4"/> Intro</TabsTrigger>
                    
                    {/* NOVA ABA: Estratégia (Contexto + Identidade) */}
                    <TabsTrigger value="context" className="gap-2 py-2.5 px-5"><Target className="w-4 h-4"/> Estratégia</TabsTrigger>
                    
                    <TabsTrigger value="identity" className="gap-2 py-2.5 px-5"><Image className="w-4 h-4"/> Identidade Visual</TabsTrigger>
                    <TabsTrigger value="colors" className="gap-2 py-2.5 px-5"><Palette className="w-4 h-4"/> Cores</TabsTrigger>
                    <TabsTrigger value="typography" className="gap-2 py-2.5 px-5"><Type className="w-4 h-4"/> Tipo</TabsTrigger>
                    <TabsTrigger value="application" className="gap-2 py-2.5 px-5"><Smartphone className="w-4 h-4"/> Aplicação</TabsTrigger>
                    <TabsTrigger value="downloads" className="gap-2 py-2.5 px-5"><Download className="w-4 h-4"/> Downloads</TabsTrigger>
                    <TabsTrigger value="credits" className="gap-2 py-2.5 px-5"><Users className="w-4 h-4"/> Créditos</TabsTrigger>
                  </TabsList>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </div>

              {/* 1. CAPA E NAV */}
              <TabsContent value="hero" className="space-y-6">
                 <div className="border p-8 rounded-xl bg-card shadow-sm space-y-6">
                    <h3 className="font-heading text-2xl text-accent border-b pb-4">Navegação</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-2"><Label>Texto do Logo</Label><Input value={store.navigation.logoText} onChange={(e) => store.updateNavigation({ logoText: e.target.value })} /></div>
                       <div className="space-y-2"><FileUpload label="Imagem do Logo (Opcional)" value={store.navigation.logoImage} onChange={(val) => store.updateNavigation({ logoImage: val })} /></div>
                    </div>
                    <div className="flex items-center space-x-2 pt-2">
                      <Switch id="show-both" checked={store.navigation.showBoth} onCheckedChange={(checked) => store.updateNavigation({ showBoth: checked })} />
                      <Label htmlFor="show-both">Mostrar Imagem e Texto juntos</Label>
                    </div>
                 </div>
                 <div className="border p-8 rounded-xl bg-card shadow-sm space-y-6">
                    <h3 className="font-heading text-2xl text-accent border-b pb-4">Capa (Hero)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-2"><Label>Título Linha 1</Label><Input value={store.hero.titleLine1} onChange={(e) => store.updateHero({ titleLine1: e.target.value })} /></div>
                       <div className="space-y-2"><Label>Título Linha 2</Label><Input value={store.hero.titleLine2} onChange={(e) => store.updateHero({ titleLine2: e.target.value })} /></div>
                    </div>
                    <div className="space-y-2"><FileUpload label="Vídeo de Fundo (MP4)" accept="video/mp4" value={store.hero.videoUrl} onChange={(val) => store.updateHero({ videoUrl: val })} /><p className="text-xs text-muted-foreground">Recomendado: MP4 leve.</p></div>
                    <Input value={store.hero.agencyName} onChange={(e) => store.updateHero({ agencyName: e.target.value })} placeholder="Rodapé" />
                 </div>
              </TabsContent>

              {/* 2. ÍNDICE */}
              <TabsContent value="index" className="space-y-6">
                 <div className="border p-8 rounded-xl bg-card shadow-sm space-y-6">
                    <h3 className="font-heading text-2xl text-accent border-b pb-4">Configuração do Índice</h3>
                    <div className="grid grid-cols-2 gap-6">
                       <div className="space-y-2"><Label>Número da Seção</Label><Input value={store.indexSection.sectionNumber} onChange={(e) => store.updateIndexSection({ sectionNumber: e.target.value })} /></div>
                       <div className="space-y-2"><Label>Título</Label><Input value={store.indexSection.title} onChange={(e) => store.updateIndexSection({ title: e.target.value })} /></div>
                    </div>
                    
                    <div className="space-y-4 pt-4 border-t">
                       <div className="flex justify-between items-center"><Label className="text-lg">Itens do Menu</Label></div>
                       <div className="space-y-4">
                          {store.indexSection.items.map((item, idx) => (
                             <div key={idx} className="p-4 border rounded-lg bg-muted/20 grid grid-cols-1 md:grid-cols-2 gap-4 relative">
                                <div className="space-y-1"><Label className="text-xs">Número</Label><Input value={item.number} onChange={(e) => { const newItems = [...store.indexSection.items]; newItems[idx] = { ...item, number: e.target.value }; store.updateIndexSection({ items: newItems }); }} /></div>
                                <div className="space-y-1"><Label className="text-xs">Título</Label><Input value={item.title} onChange={(e) => { const newItems = [...store.indexSection.items]; newItems[idx] = { ...item, title: e.target.value }; store.updateIndexSection({ items: newItems }); }} /></div>
                                <div className="space-y-1"><Label className="text-xs">Subtítulo</Label><Input value={item.subtitle} onChange={(e) => { const newItems = [...store.indexSection.items]; newItems[idx] = { ...item, subtitle: e.target.value }; store.updateIndexSection({ items: newItems }); }} /></div>
                                <div className="space-y-1"><Label className="text-xs">Link (#id)</Label><Input value={item.href} className="font-mono text-accent" onChange={(e) => { const newItems = [...store.indexSection.items]; newItems[idx] = { ...item, href: e.target.value }; store.updateIndexSection({ items: newItems }); }} /></div>
                             </div>
                          ))}
                       </div>
                    </div>
                 </div>
              </TabsContent>

              {/* 3. INTRO */}
              <TabsContent value="intro" className="space-y-6">
                <Accordion type="single" collapsible className="w-full" defaultValue="intro-section">
                  <AccordionItem value="intro-section" className="border rounded-xl px-4 shadow-sm bg-card/50">
                    <AccordionTrigger className="hover:no-underline py-4">Introdução</AccordionTrigger>
                    <AccordionContent className="space-y-6 pt-2 pb-6 px-2">
                      <Input value={store.introduction.title} onChange={(e) => store.updateIntroduction({ title: e.target.value })} />
                      <Textarea value={store.introduction.mainText} onChange={(e) => store.updateIntroduction({ mainText: e.target.value })} />
                      <div className="space-y-3 pt-4 border-t">
                        <div className="flex justify-between items-center"><Label className="text-accent font-bold">Tópicos</Label><Button size="sm" variant="outline" onClick={store.addIntroductionTopic}><Plus className="w-3 h-3 mr-1"/> Adicionar</Button></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {store.introduction.contentList.map((item, idx) => (
                            <div key={idx} className="flex gap-2 items-center">
                              <Input className="w-20 text-center font-mono" value={item.number} onChange={(e) => { const newList = [...store.introduction.contentList]; newList[idx] = { ...item, number: e.target.value }; store.updateIntroduction({ contentList: newList }); }} />
                              <Input className="flex-1" value={item.text} onChange={(e) => { const newList = [...store.introduction.contentList]; newList[idx] = { ...item, text: e.target.value }; store.updateIntroduction({ contentList: newList }); }} />
                              <Button size="icon" variant="ghost" className="text-destructive shrink-0" onClick={() => store.removeIntroductionTopic(idx)}><Trash2 className="w-4 h-4"/></Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </TabsContent>

              {/* 4. ESTRATÉGIA (SUBSTITUI MARKET CONTEXT) */}
              <TabsContent value="context" className="space-y-6">
                 <div className="border p-8 rounded-xl bg-card shadow-sm space-y-6">
                    <div className="flex justify-between items-center border-b pb-4">
                        <h3 className="font-heading text-2xl text-accent">Estratégia da Marca</h3>
                        
                        {/* Botão para Adicionar Novos Cards */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button className="gap-2">
                                    <Plus className="w-4 h-4"/> Adicionar Card
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => store.addStrategyCard('identity')}>
                                    <Target className="w-4 h-4 mr-2"/> Identidade (Missão/Visão)
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => store.addStrategyCard('market')}>
                                    <Users className="w-4 h-4 mr-2"/> Mercado (Persona/Dor)
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => store.addStrategyCard('text')}>
                                    <AlignLeft className="w-4 h-4 mr-2"/> Texto Livre
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    
                    {/* Header da Seção */}
                    <div className="grid grid-cols-4 gap-4">
                      <div className="col-span-1">
                        <Label>Número</Label>
                        <Input 
                          value={store.brandStrategy.sectionNumber} 
                          onChange={(e) => store.updateBrandStrategy({ sectionNumber: e.target.value })}
                        />
                      </div>
                      <div className="col-span-3">
                        <Label>Título da Seção</Label>
                        <Input 
                          value={store.brandStrategy.title} 
                          onChange={(e) => store.updateBrandStrategy({ title: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="border-t border-border my-6" />

                    {/* LISTA DINÂMICA DE CARDS */}
                    <div className="space-y-8">
                        {store.brandStrategy.cards.map((card, index) => (
                            <div key={card.id} className="border rounded-xl overflow-hidden bg-background shadow-sm">
                                <div className="p-4 bg-muted/30 border-b flex justify-between items-center">
                                    <div className="flex items-center gap-2 font-bold">
                                        <div className="bg-accent/10 text-accent w-6 h-6 rounded flex items-center justify-center text-xs">{index + 1}</div>
                                        {card.type === 'identity' && <span className="flex items-center gap-2 text-sm"><Target className="w-4 h-4"/> Identidade</span>}
                                        {card.type === 'market' && <span className="flex items-center gap-2 text-sm"><Users className="w-4 h-4"/> Mercado</span>}
                                        {card.type === 'text' && <span className="flex items-center gap-2 text-sm"><AlignLeft className="w-4 h-4"/> Texto</span>}
                                    </div>
                                    <Button variant="destructive" size="sm" onClick={() => store.removeStrategyCard(card.id)}><Trash2 className="w-4 h-4"/></Button>
                                </div>
                                
                                <div className="p-6 space-y-6">
                                    <div className="space-y-2">
                                        <Label>Título do Card</Label>
                                        <Input value={card.title} onChange={(e) => store.updateStrategyCard(card.id, { title: e.target.value })} />
                                    </div>

                                    {/* FORMULÁRIO: IDENTIDADE */}
                                    {card.type === 'identity' && (
                                        <div className="grid grid-cols-1 gap-6">
                                            <div className="p-4 bg-muted/10 rounded border space-y-2">
                                                <Label className="text-accent font-semibold">Topo (Missão)</Label>
                                                <Input 
                                                    placeholder="Título" 
                                                    value={card.mission?.title} 
                                                    onChange={(e) => store.updateStrategyCard(card.id, { mission: { ...card.mission!, title: e.target.value } })} 
                                                />
                                                <Textarea 
                                                    placeholder="Descrição" 
                                                    value={card.mission?.description} 
                                                    onChange={(e) => store.updateStrategyCard(card.id, { mission: { ...card.mission!, description: e.target.value } })} 
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="p-4 bg-muted/10 rounded border space-y-2">
                                                    <Label className="text-accent font-semibold">Esq (Visão)</Label>
                                                    <Input 
                                                        placeholder="Título" 
                                                        value={card.vision?.title} 
                                                        onChange={(e) => store.updateStrategyCard(card.id, { vision: { ...card.vision!, title: e.target.value } })} 
                                                    />
                                                    <Textarea 
                                                        className="h-24" 
                                                        placeholder="Descrição" 
                                                        value={card.vision?.description} 
                                                        onChange={(e) => store.updateStrategyCard(card.id, { vision: { ...card.vision!, description: e.target.value } })} 
                                                    />
                                                </div>
                                                <div className="p-4 bg-muted/10 rounded border space-y-2">
                                                    <Label className="text-accent font-semibold">Dir (Valores)</Label>
                                                    <Input 
                                                        placeholder="Título" 
                                                        value={card.values?.title} 
                                                        onChange={(e) => store.updateStrategyCard(card.id, { values: { ...card.values!, title: e.target.value } })} 
                                                    />
                                                    <Textarea 
                                                        className="h-24" 
                                                        placeholder="Descrição" 
                                                        value={card.values?.description} 
                                                        onChange={(e) => store.updateStrategyCard(card.id, { values: { ...card.values!, description: e.target.value } })} 
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* FORMULÁRIO: MERCADO */}
                                    {card.type === 'market' && (
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className="p-4 bg-muted/10 rounded border space-y-2">
                                                <Label className="text-accent font-semibold">Col 1 (Persona)</Label>
                                                <Input 
                                                    value={card.persona?.title} 
                                                    onChange={(e) => store.updateStrategyCard(card.id, { persona: { ...card.persona!, title: e.target.value } })} 
                                                />
                                                <Textarea 
                                                    className="h-32" 
                                                    value={card.persona?.description} 
                                                    onChange={(e) => store.updateStrategyCard(card.id, { persona: { ...card.persona!, description: e.target.value } })} 
                                                />
                                            </div>
                                            <div className="p-4 bg-muted/10 rounded border space-y-2">
                                                <Label className="text-accent font-semibold">Col 2 (Dor)</Label>
                                                <Input 
                                                    value={card.pain?.title} 
                                                    onChange={(e) => store.updateStrategyCard(card.id, { pain: { ...card.pain!, title: e.target.value } })} 
                                                />
                                                <Textarea 
                                                    className="h-32" 
                                                    value={card.pain?.description} 
                                                    onChange={(e) => store.updateStrategyCard(card.id, { pain: { ...card.pain!, description: e.target.value } })} 
                                                />
                                            </div>
                                            <div className="p-4 bg-muted/10 rounded border space-y-2">
                                                <Label className="text-accent font-semibold">Col 3 (Solução)</Label>
                                                <Input 
                                                    value={card.solution?.title} 
                                                    onChange={(e) => store.updateStrategyCard(card.id, { solution: { ...card.solution!, title: e.target.value } })} 
                                                />
                                                <Textarea 
                                                    className="h-32" 
                                                    value={card.solution?.description} 
                                                    onChange={(e) => store.updateStrategyCard(card.id, { solution: { ...card.solution!, description: e.target.value } })} 
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {/* FORMULÁRIO: TEXTO */}
                                    {card.type === 'text' && (
                                        <div className="space-y-2">
                                            <Label>Corpo do Texto</Label>
                                            <Textarea 
                                                className="min-h-[200px]" 
                                                value={card.textBody} 
                                                onChange={(e) => store.updateStrategyCard(card.id, { textBody: e.target.value })} 
                                                placeholder="Digite o conteúdo aqui..." 
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                 </div>
              </TabsContent>

              {/* 5. IDENTIDADE */}
              <TabsContent value="identity" className="space-y-6">
                 <div className="space-y-4 border p-8 rounded-xl bg-card shadow-sm">
                   <h3 className="font-heading text-2xl text-accent border-b pb-4">Logótipos</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <Label>Logo Principal</Label>
                          <FileUpload label="Imagem" value={store.identity.primaryLogoImage} onChange={(val) => store.updateIdentity({ primaryLogoImage: val })} />
                          <Input value={store.identity.primaryLogoText} onChange={(e) => store.updateIdentity({ primaryLogoText: e.target.value })} placeholder="Alt Text" />
                        </div>
                        <div className="space-y-4">
                          <Label>Logo Invertido</Label>
                          <FileUpload label="Imagem" value={store.identity.invertedLogoImage} onChange={(val) => store.updateIdentity({ invertedLogoImage: val })} />
                        </div>
                    </div>
                 </div>
              </TabsContent>

              {/* 6. CORES - ATUALIZADO */}
              <TabsContent value="colors" className="space-y-8">
                {/* Paleta Principal */}
                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b pb-4">
                    <h3 className="text-2xl font-medium">Paleta Principal</h3>
                    <Button onClick={store.addColor}><Plus className="w-4 h-4 mr-2"/> Adicionar Cor</Button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {store.colors.primaryColors.map((color, index) => (
                      <div key={index} className="p-4 border rounded-xl space-y-4 bg-card shadow-sm relative group">
                        <Button size="icon" variant="destructive" className="absolute -top-2 -right-2 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10" onClick={() => store.removeColor(index)}><Trash2 className="w-4 h-4"/></Button>
                        <div className="flex items-center gap-4">
                          <div className="relative cursor-pointer shrink-0">
                             <div className="w-16 h-16 rounded-2xl border shadow-sm" style={{ backgroundColor: color.hex }} />
                             <input type="color" value={color.hex} onChange={(e) => { const newColors = [...store.colors.primaryColors]; newColors[index] = { ...color, hex: e.target.value }; store.updateColors({ primaryColors: newColors }); }} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
                          </div>
                          <div className="flex-1 space-y-1"><Label className="text-xs text-muted-foreground">Nome</Label><Input value={color.name} className="font-bold" onChange={(e) => { const newColors = [...store.colors.primaryColors]; newColors[index] = { ...color, name: e.target.value }; store.updateColors({ primaryColors: newColors }); }} /></div>
                        </div>
                        <Input value={color.usage} placeholder="Função da cor" onChange={(e) => { const newColors = [...store.colors.primaryColors]; newColors[index] = { ...color, usage: e.target.value }; store.updateColors({ primaryColors: newColors }); }} />
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground italic">* O sistema gera automaticamente as variações de opacidade (Chapa 5).</p>
                </div>

                {/* Paleta Secundária (NOVA) */}
                <div className="space-y-6 pt-4 border-t">
                  <div className="flex justify-between items-center border-b pb-4">
                    <h3 className="text-2xl font-medium">Paleta Secundária</h3>
                    <Button onClick={store.addSecondaryColor} variant="outline"><Plus className="w-4 h-4 mr-2"/> Adicionar Cor</Button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {(store.colors.secondaryColors || []).map((color, index) => (
                      <div key={index} className="p-4 border rounded-xl space-y-4 bg-card shadow-sm relative group">
                        <Button size="icon" variant="destructive" className="absolute -top-2 -right-2 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10" onClick={() => store.removeSecondaryColor(index)}><Trash2 className="w-4 h-4"/></Button>
                        <div className="flex items-center gap-4">
                          <div className="relative cursor-pointer shrink-0">
                             {/* Visualização da cor */}
                             <div className="w-16 h-16 rounded-2xl border shadow-sm" style={{ backgroundColor: color.hex }} />
                             <input type="color" value={color.hex} onChange={(e) => { const newColors = [...(store.colors.secondaryColors || [])]; newColors[index] = { ...color, hex: e.target.value }; store.updateColors({ secondaryColors: newColors }); }} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
                          </div>
                          <div className="flex-1 space-y-1"><Label className="text-xs text-muted-foreground">Nome</Label><Input value={color.name} className="font-bold" onChange={(e) => { const newColors = [...(store.colors.secondaryColors || [])]; newColors[index] = { ...color, name: e.target.value }; store.updateColors({ secondaryColors: newColors }); }} /></div>
                        </div>
                        <Input value={color.usage} placeholder="Função da cor" onChange={(e) => { const newColors = [...(store.colors.secondaryColors || [])]; newColors[index] = { ...color, usage: e.target.value }; store.updateColors({ secondaryColors: newColors }); }} />
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground italic">* O sistema gera automaticamente o degradê para branco na visualização.</p>
                </div>

                <div className="space-y-6 pt-4 border-t">
                  <div className="flex justify-between items-center border-b pb-2"><h3 className="text-2xl font-medium">Diretrizes</h3><Button size="sm" variant="outline" onClick={store.addColorGuideline}><Plus className="w-3 h-3 mr-1"/> Add</Button></div>
                  <div className="space-y-3">
                    {store.colors.usageGuidelines.map((item, idx) => (
                      <div key={idx} className="flex gap-2 items-center"><span className="text-accent text-xl">•</span><Input value={item} onChange={(e) => { const newList = [...store.colors.usageGuidelines]; newList[idx] = e.target.value; store.updateColors({ usageGuidelines: newList }); }} /><Button size="icon" variant="ghost" className="text-destructive" onClick={() => store.removeColorGuideline(idx)}><Trash2 className="w-4 h-4"/></Button></div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* 7. TIPOGRAFIA */}
              <TabsContent value="typography" className="space-y-6">
                 <div className="border p-8 rounded-xl space-y-6 shadow-sm bg-card">
                    <h3 className="font-heading text-2xl text-accent border-b pb-4">Fonte Principal</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2"><Label>Nome</Label><Input value={store.typography.primaryFontName} onChange={(e) => store.updateTypography({ primaryFontName: e.target.value })} /></div>
                      <div className="space-y-2">
                        <FileUpload 
                          label="Arquivo (.ttf, .otf)" 
                          accept=".ttf,.otf,.woff,.woff2" 
                          value={store.typography.primaryFontUrl} 
                          onChange={(val) => store.updateTypography({ primaryFontUrl: val })} 
                        />
                      </div>
                    </div>
                    
                    {/* FONTES EXTRAS */}
                    <div className="space-y-6 pt-6 border-t mt-6">
                        <div className="flex justify-between items-center"><h3 className="font-heading text-xl">Outras Fontes</h3><Button size="sm" variant="outline" onClick={() => { const currentExtras = store.typography.extraFonts || []; store.updateTypography({ extraFonts: [...currentExtras, { name: 'Nova Fonte', url: '' }] }); }}><Plus className="w-4 h-4 mr-2"/> Adicionar</Button></div>
                        <div className="space-y-4">
                          {(store.typography.extraFonts || []).map((font, idx) => (
                             <div key={idx} className="flex gap-4 items-end border p-4 rounded-lg bg-muted/20 relative group">
                                <Button size="icon" variant="ghost" className="absolute top-2 right-2 text-destructive h-6 w-6" onClick={() => { const newExtras = [...(store.typography.extraFonts || [])]; newExtras.splice(idx, 1); store.updateTypography({ extraFonts: newExtras }); }}><Trash2 className="w-3 h-3"/></Button>
                                <div className="flex-1 space-y-2"><Label>Nome</Label><Input value={font.name} onChange={(e) => { const newExtras = [...(store.typography.extraFonts || [])]; newExtras[idx] = { ...font, name: e.target.value }; store.updateTypography({ extraFonts: newExtras }); }} /></div>
                                <div className="flex-1 space-y-2">
                                  <FileUpload 
                                    label="Arquivo" 
                                    accept=".ttf,.otf,.woff,.woff2"
                                    value={font.url} 
                                    onChange={(val) => { const newExtras = [...(store.typography.extraFonts || [])]; newExtras[idx] = { ...font, url: val }; store.updateTypography({ extraFonts: newExtras }); }} 
                                  />
                                </div>
                             </div>
                          ))}
                        </div>
                    </div>
                 </div>
              </TabsContent>

              {/* 8. APLICAÇÃO */}
              <TabsContent value="application" className="space-y-6">
                 <div className="flex justify-end mb-4"><Button onClick={store.addApplicationItem}><Plus className="w-4 h-4 mr-2"/> Novo Mockup</Button></div>
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {store.application.items.map((item, idx) => (
                      <div key={idx} className="p-6 border rounded-xl space-y-4 bg-card shadow-sm relative group">
                          <Button size="icon" variant="ghost" className="absolute top-2 right-2 text-destructive opacity-0 group-hover:opacity-100" onClick={() => store.removeApplicationItem(idx)}><Trash2 className="w-4 h-4"/></Button>
                          <div className="flex justify-between items-center pb-2 border-b">
                             <Input value={item.number} className="w-16 font-mono text-sm bg-accent/10 text-accent text-center" onChange={(e) => { const newItems = [...store.application.items]; newItems[idx] = { ...item, number: e.target.value }; store.updateApplication({ items: newItems }); }} />
                             <Input value={item.title} className="h-8 font-bold w-full text-right border-none bg-transparent" onChange={(e) => { const newItems = [...store.application.items]; newItems[idx] = { ...item, title: e.target.value }; store.updateApplication({ items: newItems }); }} />
                          </div>
                          <FileUpload label="Imagem" value={item.image} onChange={(val) => { const newItems = [...store.application.items]; newItems[idx] = { ...item, image: val }; store.updateApplication({ items: newItems }); }} />
                          <Input value={item.description} onChange={(e) => { const newItems = [...store.application.items]; newItems[idx] = { ...item, description: e.target.value }; store.updateApplication({ items: newItems }); }} />
                      </div>
                    ))}
                 </div>
              </TabsContent>

              {/* 9. DOWNLOADS */}
              <TabsContent value="downloads" className="space-y-6">
                  <div className="flex justify-end mb-4"><Button onClick={store.addDownloadItem}><Plus className="w-4 h-4 mr-2"/> Novo Arquivo</Button></div>
                  <div className="space-y-4">
                    {store.downloads.items.map((item, idx) => (
                        <div key={idx} className="p-6 border rounded-xl flex flex-col lg:flex-row gap-6 items-start bg-card shadow-sm relative group">
                          <Button size="icon" variant="ghost" className="absolute top-2 right-2 text-destructive opacity-0 group-hover:opacity-100" onClick={() => store.removeDownloadItem(idx)}><Trash2 className="w-4 h-4"/></Button>
                          <div className="flex-1 space-y-4 w-full">
                              <Input value={item.title} className="font-bold text-lg" onChange={(e) => { const newItems = [...store.downloads.items]; newItems[idx] = { ...item, title: e.target.value }; store.updateDownloads({ items: newItems }); }} />
                              <Input value={item.description} onChange={(e) => { const newItems = [...store.downloads.items]; newItems[idx] = { ...item, description: e.target.value }; store.updateDownloads({ items: newItems }); }} />
                          </div>
                          <div className="w-full lg:w-1/2 bg-muted/20 p-4 rounded-lg border">
                              <FileUpload label="Arquivo" accept=".zip,.pdf,.rar" value={item.fileUrl} onChange={(val) => { const newItems = [...store.downloads.items]; newItems[idx] = { ...item, fileUrl: val }; store.updateDownloads({ items: newItems }); }} />
                          </div>
                        </div>
                    ))}
                  </div>
              </TabsContent>

              {/* 10. CRÉDITOS */}
              <TabsContent value="credits" className="space-y-6">
                 <div className="space-y-4 border p-8 rounded-xl bg-card shadow-sm">
                    <div className="grid grid-cols-2 gap-6">
                       <div className="space-y-2"><Label>Estúdio</Label><Input value={store.credits.studioName} onChange={(e) => store.updateCredits({ studioName: e.target.value })} /></div>
                       <div className="space-y-2"><Label>Ano</Label><Input value={store.credits.year} onChange={(e) => store.updateCredits({ year: e.target.value })} /></div>
                    </div>
                 </div>
                 <div className="flex justify-end"><Button size="sm" onClick={store.addTeamMember}><Plus className="w-4 h-4 mr-2"/> Adicionar Membro</Button></div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {store.credits.team.map((member, idx) => (
                      <div key={idx} className="flex gap-3 items-center group p-3 border rounded-lg bg-card/50 relative">
                          <div className="flex-1"><Input value={member.role} onChange={(e) => { const newTeam = [...store.credits.team]; newTeam[idx] = { ...member, role: e.target.value }; store.updateCredits({ team: newTeam }); }} /></div>
                          <div className="flex-1"><Input value={member.name} onChange={(e) => { const newTeam = [...store.credits.team]; newTeam[idx] = { ...member, name: e.target.value }; store.updateCredits({ team: newTeam }); }} /></div>
                          <Button size="icon" variant="ghost" className="text-destructive h-8 w-8" onClick={() => store.removeTeamMember(idx)}><Trash2 className="w-3 h-3"/></Button>
                      </div>
                    ))}
                 </div>
              </TabsContent>

            </Tabs>
          </div>
        </ScrollArea>

        <div className="p-6 border-t bg-background shrink-0 shadow-[0_-5px_10px_rgba(0,0,0,0.05)]">
          <Button onClick={handleSave} disabled={isSaving} className="w-full gap-2 font-bold h-12 text-md" size="lg">
            {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            {isSaving ? 'Salvando na Nuvem...' : 'Salvar Alterações Globais'}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};