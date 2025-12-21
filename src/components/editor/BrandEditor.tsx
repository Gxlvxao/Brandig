import { useState } from "react";
import { useBrandStore } from "@/store/useBrandStore";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Settings, Save, Palette, Type, Layout, FileText, Image, Users, Upload, Download, Smartphone, Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { api } from "@/lib/api"; // Importando a API
import { toast } from "sonner"; // Importando notificações

// Componente de Upload Real Conectado ao Laravel
const FileUpload = ({ label, value, onChange, accept = "image/*" }: { label: string, value?: string, onChange: (val: string) => void, accept?: string }) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      // Envia para o Backend Laravel
      const response = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      // Recebe a URL pública do Laravel
      onChange(response.data.url);
      toast.success("Arquivo enviado com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao enviar arquivo. Verifique o servidor.");
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
          placeholder={isUploading ? "Enviando para o servidor..." : (value ? "Arquivo carregado" : "Nenhum arquivo")}
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
      <p className="text-[10px] text-muted-foreground">
        {value ? 'Arquivo salvo no servidor.' : 'Clique no ícone para fazer upload.'}
      </p>
    </div>
  );
};

export const BrandEditor = () => {
  const store = useBrandStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Salva usando o slug de demonstração (ou dinâmico se tiver)
    await store.saveProject('demo-brand');
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
      
      {/* LARGURA AUMENTADA AQUI: w-[90vw] e max-w-[1000px] */}
      <SheetContent className="w-full sm:max-w-none sm:w-[90vw] md:max-w-[1000px] p-0 flex flex-col h-full border-l-2 border-border/50 shadow-2xl">
        
        <SheetHeader className="p-6 border-b bg-muted/5 shrink-0">
          <SheetTitle className="text-2xl font-heading">Editor de Marca</SheetTitle>
          <SheetDescription>
            Personalize a identidade visual e o conteúdo. As alterações são salvas na nuvem.
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="flex-1 h-full">
          <div className="p-6 pb-24">
            <Tabs defaultValue="intro" className="w-full">
              
              {/* Navegação Horizontal Stickada e Estilizada */}
              <div className="sticky top-0 z-20 bg-background/95 backdrop-blur pb-4 pt-2 -mt-2 mb-8 border-b">
                <ScrollArea className="w-full whitespace-nowrap">
                  <TabsList className="inline-flex w-auto p-1 bg-muted/50 rounded-xl h-auto border">
                    <TabsTrigger value="intro" className="gap-2 py-2.5 px-5 data-[state=active]:bg-background data-[state=active]:shadow-sm"><Layout className="w-4 h-4"/> Intro</TabsTrigger>
                    <TabsTrigger value="brand" className="gap-2 py-2.5 px-5 data-[state=active]:bg-background data-[state=active]:shadow-sm"><FileText className="w-4 h-4"/> Marca</TabsTrigger>
                    <TabsTrigger value="identity" className="gap-2 py-2.5 px-5 data-[state=active]:bg-background data-[state=active]:shadow-sm"><Image className="w-4 h-4"/> Identidade</TabsTrigger>
                    <TabsTrigger value="application" className="gap-2 py-2.5 px-5 data-[state=active]:bg-background data-[state=active]:shadow-sm"><Smartphone className="w-4 h-4"/> Aplicação</TabsTrigger>
                    <TabsTrigger value="downloads" className="gap-2 py-2.5 px-5 data-[state=active]:bg-background data-[state=active]:shadow-sm"><Download className="w-4 h-4"/> Downloads</TabsTrigger>
                    <TabsTrigger value="typography" className="gap-2 py-2.5 px-5 data-[state=active]:bg-background data-[state=active]:shadow-sm"><Type className="w-4 h-4"/> Tipo</TabsTrigger>
                    <TabsTrigger value="colors" className="gap-2 py-2.5 px-5 data-[state=active]:bg-background data-[state=active]:shadow-sm"><Palette className="w-4 h-4"/> Cores</TabsTrigger>
                    <TabsTrigger value="credits" className="gap-2 py-2.5 px-5 data-[state=active]:bg-background data-[state=active]:shadow-sm"><Users className="w-4 h-4"/> Créditos</TabsTrigger>
                  </TabsList>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </div>

              {/* --- INTRO & SOBRE --- */}
              <TabsContent value="intro" className="space-y-6">
                <Accordion type="single" collapsible className="w-full" defaultValue="intro-section">
                  <AccordionItem value="intro-section" className="border rounded-xl px-4 shadow-sm bg-card/50">
                    <AccordionTrigger className="hover:no-underline py-4">Seção 01: Introdução</AccordionTrigger>
                    <AccordionContent className="space-y-6 pt-2 pb-6 px-2">
                      <div className="grid grid-cols-4 gap-6">
                         <div className="col-span-1 space-y-2">
                           <Label>Número</Label>
                           <Input value={store.introduction.sectionNumber} onChange={(e) => store.updateIntroduction({ sectionNumber: e.target.value })} />
                         </div>
                         <div className="col-span-3 space-y-2">
                           <Label>Título</Label>
                           <Input value={store.introduction.title} onChange={(e) => store.updateIntroduction({ title: e.target.value })} />
                         </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Texto Principal</Label>
                        <Textarea className="min-h-[120px] text-base" value={store.introduction.mainText} onChange={(e) => store.updateIntroduction({ mainText: e.target.value })} />
                      </div>
                      <div className="space-y-2">
                        <Label>Citação</Label>
                        <Input value={store.introduction.quote} onChange={(e) => store.updateIntroduction({ quote: e.target.value })} />
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="about-section" className="border rounded-xl px-4 shadow-sm bg-card/50 mt-6">
                    <AccordionTrigger className="hover:no-underline py-4">Seção 02: Sobre a Marca</AccordionTrigger>
                    <AccordionContent className="space-y-6 pt-2 pb-6 px-2">
                      <div className="space-y-2">
                        <Label>Título</Label>
                        <Input value={store.aboutBrand.title} onChange={(e) => store.updateAboutBrand({ title: e.target.value })} />
                      </div>
                      <div className="space-y-2">
                        <Label>Texto Destaque (Esquerda)</Label>
                        <Textarea rows={3} value={store.aboutBrand.highlightText} onChange={(e) => store.updateAboutBrand({ highlightText: e.target.value })} />
                      </div>
                      <div className="space-y-4">
                        <Label>Parágrafos Descritivos (Direita)</Label>
                        {store.aboutBrand.descriptionParagraphs.map((para, idx) => (
                          <Textarea key={idx} rows={4} value={para} onChange={(e) => {
                              const newParas = [...store.aboutBrand.descriptionParagraphs];
                              newParas[idx] = e.target.value;
                              store.updateAboutBrand({ descriptionParagraphs: newParas });
                            }} 
                          />
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </TabsContent>

              {/* --- MARCA --- */}
              <TabsContent value="brand" className="space-y-8">
                 <div className="space-y-6 border p-8 rounded-xl bg-card shadow-sm">
                    <h3 className="font-heading text-2xl text-accent border-b pb-4 mb-2">Missão</h3>
                    <div className="space-y-3">
                      <Label>Título da Seção</Label>
                      <Input value={store.brandSection.missionTitle} onChange={(e) => store.updateBrandSection({ missionTitle: e.target.value })} />
                    </div>
                    <div className="space-y-3">
                      <Label>Texto da Missão</Label>
                      <Textarea className="text-lg leading-relaxed min-h-[100px]" value={store.brandSection.missionText} onChange={(e) => store.updateBrandSection({ missionText: e.target.value })} />
                    </div>
                 </div>
                 <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="font-heading text-2xl text-accent">Valores</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {store.brandSection.values.map((val, idx) => (
                        <div key={idx} className="p-6 bg-muted/20 rounded-xl border hover:border-accent/30 transition-colors space-y-4">
                           <Input 
                             value={val.title} 
                             className="font-bold text-lg bg-transparent border-0 border-b rounded-none px-0 focus-visible:ring-0 focus-visible:border-accent" 
                             onChange={(e) => {
                               const newVals = [...store.brandSection.values];
                               newVals[idx] = { ...val, title: e.target.value };
                               store.updateBrandSection({ values: newVals });
                             }} 
                           />
                           <Textarea 
                             value={val.description} 
                             className="resize-none min-h-[80px]" 
                             onChange={(e) => {
                               const newVals = [...store.brandSection.values];
                               newVals[idx] = { ...val, description: e.target.value };
                               store.updateBrandSection({ values: newVals });
                             }} 
                           />
                        </div>
                      ))}
                    </div>
                 </div>
              </TabsContent>

              {/* --- IDENTIDADE (COM UPLOAD) --- */}
              <TabsContent value="identity" className="space-y-6">
                 <Accordion type="single" collapsible className="w-full" defaultValue="logos">
                    <AccordionItem value="logos" className="border rounded-xl px-4 shadow-sm bg-card/50">
                      <AccordionTrigger className="hover:no-underline py-4">Logótipos</AccordionTrigger>
                      <AccordionContent className="space-y-8 pt-2 pb-6">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4 p-6 bg-background rounded-xl border shadow-sm">
                              <div className="flex items-center justify-between">
                                <Label className="text-lg font-bold">Logo Principal</Label>
                                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">Fundo Claro</span>
                              </div>
                              <FileUpload 
                                label="Imagem (PNG/SVG)" 
                                value={store.identity.primaryLogoImage} 
                                onChange={(val) => store.updateIdentity({ primaryLogoImage: val })} 
                              />
                              <Separator />
                              <div className="space-y-2">
                                <Label>Texto Alternativo</Label>
                                <Input value={store.identity.primaryLogoText} onChange={(e) => store.updateIdentity({ primaryLogoText: e.target.value })} />
                              </div>
                            </div>
                            
                            <div className="space-y-4 p-6 bg-foreground rounded-xl border shadow-sm text-background">
                              <div className="flex items-center justify-between">
                                <Label className="text-lg font-bold text-background">Logo Invertido</Label>
                                <span className="text-xs text-foreground bg-background px-2 py-1 rounded">Fundo Escuro</span>
                              </div>
                              <FileUpload 
                                label="Imagem Invertida (PNG/SVG)" 
                                value={store.identity.invertedLogoImage} 
                                onChange={(val) => store.updateIdentity({ invertedLogoImage: val })} 
                              />
                              <Separator className="bg-background/20" />
                              <div className="space-y-2">
                                <Label className="text-background/80">Texto Alternativo</Label>
                                <Input className="bg-background/10 border-background/20 text-background placeholder:text-background/50 focus-visible:ring-background/30" value={store.identity.invertedLogoText} onChange={(e) => store.updateIdentity({ invertedLogoText: e.target.value })} />
                              </div>
                            </div>
                         </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="clearspace" className="border rounded-xl px-4 shadow-sm bg-card/50 mt-6">
                      <AccordionTrigger className="hover:no-underline py-4">Área de Proteção</AccordionTrigger>
                      <AccordionContent className="space-y-6 pt-2 pb-6">
                         <div className="p-6 border-2 border-dashed rounded-xl bg-muted/10">
                           <FileUpload 
                              label="Diagrama de Proteção (Imagem Explicativa)" 
                              value={store.identity.clearSpaceImage} 
                              onChange={(val) => store.updateIdentity({ clearSpaceImage: val })} 
                           />
                         </div>
                         <div className="space-y-2">
                           <Label>Descrição da Regra</Label>
                           <Textarea rows={3} value={store.identity.clearSpaceDescription} onChange={(e) => store.updateIdentity({ clearSpaceDescription: e.target.value })} />
                         </div>
                      </AccordionContent>
                    </AccordionItem>
                 </Accordion>
              </TabsContent>

              {/* --- APLICAÇÃO (MOCKUPS COM UPLOAD) --- */}
              <TabsContent value="application" className="space-y-6">
                 <div className="flex items-center justify-between border-b pb-4 mb-6">
                    <div>
                      <h3 className="font-heading text-2xl text-accent">Mockups de Aplicação</h3>
                      <p className="text-sm text-muted-foreground mt-1">Carregue as imagens para apresentar a marca em situações reais.</p>
                    </div>
                 </div>
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {store.application.items.map((item, idx) => (
                      <div key={idx} className="p-6 border rounded-xl space-y-4 bg-card shadow-sm hover:shadow-md transition-shadow">
                         <div className="flex justify-between items-center pb-2 border-b">
                            <span className="font-mono text-sm bg-accent/10 text-accent px-3 py-1 rounded-full">{item.number}</span>
                            <Input 
                              value={item.title} 
                              className="h-8 font-bold w-40 text-right border-none shadow-none focus-visible:ring-0 bg-transparent"
                              onChange={(e) => {
                                const newItems = [...store.application.items];
                                newItems[idx] = { ...item, title: e.target.value };
                                store.updateApplication({ items: newItems });
                              }}
                            />
                         </div>
                         <FileUpload 
                            label="Imagem do Mockup" 
                            value={item.image} 
                            onChange={(val) => {
                                const newItems = [...store.application.items];
                                newItems[idx] = { ...item, image: val };
                                store.updateApplication({ items: newItems });
                            }} 
                         />
                         <div className="space-y-1">
                           <Label className="text-xs text-muted-foreground">Descrição</Label>
                           <Input 
                             value={item.description} 
                             onChange={(e) => {
                                const newItems = [...store.application.items];
                                newItems[idx] = { ...item, description: e.target.value };
                                store.updateApplication({ items: newItems });
                             }}
                           />
                         </div>
                      </div>
                    ))}
                 </div>
              </TabsContent>

              {/* --- DOWNLOADS --- */}
              <TabsContent value="downloads" className="space-y-6">
                 <div className="flex items-center justify-between border-b pb-4 mb-6">
                    <div>
                      <h3 className="font-heading text-2xl text-accent">Central de Downloads</h3>
                      <p className="text-sm text-muted-foreground mt-1">Faça o upload dos arquivos finais (ZIP, PDF, Fontes).</p>
                    </div>
                 </div>
                 <div className="space-y-4">
                    {store.downloads.items.map((item, idx) => (
                       <div key={idx} className="p-6 border rounded-xl flex flex-col lg:flex-row gap-6 items-start bg-card shadow-sm">
                          <div className="flex-1 space-y-4 w-full">
                             <div>
                               <Label className="text-xs text-muted-foreground uppercase tracking-wider">Título do Recurso</Label>
                               <Input 
                                 value={item.title} 
                                 className="font-bold text-lg"
                                 onChange={(e) => {
                                    const newItems = [...store.downloads.items];
                                    newItems[idx] = { ...item, title: e.target.value };
                                    store.updateDownloads({ items: newItems });
                                 }}
                               />
                             </div>
                             <div>
                               <Label className="text-xs text-muted-foreground uppercase tracking-wider">Descrição</Label>
                               <Input 
                                 value={item.description} 
                                 onChange={(e) => {
                                    const newItems = [...store.downloads.items];
                                    newItems[idx] = { ...item, description: e.target.value };
                                    store.updateDownloads({ items: newItems });
                                 }}
                               />
                             </div>
                          </div>
                          <div className="w-full lg:w-1/2 bg-muted/20 p-4 rounded-lg border">
                             <FileUpload 
                                label="Arquivo para Download" 
                                accept=".zip,.pdf,.rar,.ttf,.otf"
                                value={item.fileUrl} 
                                onChange={(val) => {
                                    const newItems = [...store.downloads.items];
                                    newItems[idx] = { ...item, fileUrl: val };
                                    store.updateDownloads({ items: newItems });
                                }} 
                             />
                          </div>
                       </div>
                    ))}
                 </div>
              </TabsContent>

              {/* --- TIPOGRAFIA --- */}
              <TabsContent value="typography" className="space-y-6">
                 <div className="grid grid-cols-1 gap-8">
                    <div className="border p-8 rounded-xl space-y-6 shadow-sm bg-card">
                       <h3 className="font-heading text-2xl text-accent border-b pb-4">Fonte Principal</h3>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div className="space-y-2">
                            <Label>Nome da Família</Label>
                            <Input value={store.typography.primaryFontName} onChange={(e) => store.updateTypography({ primaryFontName: e.target.value })} />
                         </div>
                         <div className="space-y-2">
                            <Label>Alfabeto Demo</Label>
                            <Input value={store.typography.primaryFontAlphabet} onChange={(e) => store.updateTypography({ primaryFontAlphabet: e.target.value })} />
                         </div>
                       </div>
                       <div className="space-y-2">
                          <Label>Caracteres (Amostra)</Label>
                          <Textarea className="font-mono text-sm leading-loose tracking-widest min-h-[100px]" value={store.typography.primaryFontCharacters} onChange={(e) => store.updateTypography({ primaryFontCharacters: e.target.value })} />
                       </div>
                    </div>
                 </div>
              </TabsContent>

              {/* --- CORES --- */}
              <TabsContent value="colors" className="space-y-6">
                <div className="space-y-6">
                  <h3 className="text-2xl font-medium">Paleta Principal</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {store.colors.primaryColors.map((color, index) => (
                      <div key={index} className="p-4 border rounded-xl space-y-4 bg-card shadow-sm hover:shadow-md transition-all">
                        <div className="flex items-center gap-4">
                          <div className="relative group cursor-pointer shrink-0">
                             <div className="w-16 h-16 rounded-2xl border shadow-sm transition-transform group-hover:scale-105" style={{ backgroundColor: color.hex }} />
                             <input type="color" value={color.hex} onChange={(e) => {
                                  const newColors = [...store.colors.primaryColors];
                                  newColors[index] = { ...color, hex: e.target.value };
                                  store.updateColors({ primaryColors: newColors });
                                }} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
                          </div>
                          <div className="flex-1 space-y-1">
                            <Label className="text-xs text-muted-foreground uppercase">Nome da Cor</Label>
                            <Input value={color.name} className="font-bold" onChange={(e) => {
                                  const newColors = [...store.colors.primaryColors];
                                  newColors[index] = { ...color, name: e.target.value };
                                  store.updateColors({ primaryColors: newColors });
                                }} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* --- CRÉDITOS --- */}
              <TabsContent value="credits" className="space-y-6">
                 <div className="space-y-4 border p-8 rounded-xl bg-card shadow-sm">
                    <h3 className="font-heading text-lg mb-4">Informações Gerais</h3>
                    <div className="grid grid-cols-2 gap-6">
                       <div className="space-y-2"><Label>Estúdio</Label><Input value={store.credits.studioName} onChange={(e) => store.updateCredits({ studioName: e.target.value })} /></div>
                       <div className="space-y-2"><Label>Ano</Label><Input value={store.credits.year} onChange={(e) => store.updateCredits({ year: e.target.value })} /></div>
                    </div>
                 </div>
                 <div className="space-y-4">
                    <h3 className="font-medium text-accent px-1">Equipe</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {store.credits.team.map((member, idx) => (
                        <div key={idx} className="flex gap-3 items-center group p-3 border rounded-lg bg-card/50">
                           <div className="flex-1 space-y-1">
                              <Label className="text-xs text-muted-foreground">Cargo</Label>
                              <Input value={member.role} onChange={(e) => { const newTeam = [...store.credits.team]; newTeam[idx] = { ...member, role: e.target.value }; store.updateCredits({ team: newTeam }); }} />
                           </div>
                           <div className="flex-1 space-y-1">
                              <Label className="text-xs text-muted-foreground">Nome</Label>
                              <Input value={member.name} onChange={(e) => { const newTeam = [...store.credits.team]; newTeam[idx] = { ...member, name: e.target.value }; store.updateCredits({ team: newTeam }); }} />
                           </div>
                        </div>
                      ))}
                    </div>
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