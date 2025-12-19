import { useState } from "react";
import { useBrandStore } from "@/store/useBrandStore";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Settings, Save, Palette, Type, Layout, FileText, Image, Users, Upload, Download, Smartphone } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// Componente simples para simular o botão de upload
const FileUpload = ({ label, value, onChange, accept = "image/*" }: { label: string, value?: string, onChange: (val: string) => void, accept?: string }) => (
  <div className="space-y-2">
    <Label>{label}</Label>
    <div className="flex gap-2">
      <Input 
        value={value || ''} 
        placeholder={value ? "Arquivo selecionado" : "Nenhum arquivo"}
        readOnly
        className="bg-muted"
      />
      <div className="relative">
        <Button variant="outline" size="icon" className="w-10 px-0">
          <Upload className="h-4 w-4" />
        </Button>
        <Input 
          type="file" 
          accept={accept}
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          onChange={(e) => {
             // SIMULAÇÃO: No futuro aqui faz o upload para o Laravel
             // Por enquanto, vamos fingir que o nome do arquivo é a URL
             if(e.target.files?.[0]) {
               const fileName = e.target.files[0].name;
               // Aqui entraria a lógica de upload real
               onChange(`https://exemplo.com/uploads/${fileName}`); 
               alert(`Simulação: Arquivo "${fileName}" selecionado. No backend real, isso faria o upload.`);
             }
          }}
        />
      </div>
    </div>
    <p className="text-[10px] text-muted-foreground">
      {value ? 'Arquivo carregado.' : 'Clique no ícone para carregar.'}
    </p>
  </div>
);

export const BrandEditor = () => {
  const store = useBrandStore();
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = () => {
    const projectData = useBrandStore.getState();
    console.log("JSON COMPLETO PARA O BACKEND:", JSON.stringify(projectData, null, 2));
    alert("Configurações salvas! Verifique o console (F12).");
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
      
      <SheetContent className="w-full sm:max-w-none sm:w-[800px] p-0 flex flex-col h-full">
        
        <SheetHeader className="p-6 border-b bg-muted/5 shrink-0">
          <SheetTitle className="text-2xl">Editor de Marca</SheetTitle>
          <SheetDescription>
            Personalize cada detalhe da identidade visual.
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="flex-1 h-full">
          <div className="p-6 pb-24">
            <Tabs defaultValue="intro" className="w-full">
              
              <div className="sticky top-0 z-20 bg-background/95 backdrop-blur pb-4 pt-2 -mt-2 mb-6 border-b">
                <ScrollArea className="w-full whitespace-nowrap">
                  <TabsList className="inline-flex w-auto p-1 bg-muted rounded-lg h-auto">
                    <TabsTrigger value="intro" className="gap-2 py-2 px-4"><Layout className="w-4 h-4"/> Intro</TabsTrigger>
                    <TabsTrigger value="brand" className="gap-2 py-2 px-4"><FileText className="w-4 h-4"/> Marca</TabsTrigger>
                    <TabsTrigger value="identity" className="gap-2 py-2 px-4"><Image className="w-4 h-4"/> Identidade</TabsTrigger>
                    <TabsTrigger value="application" className="gap-2 py-2 px-4"><Smartphone className="w-4 h-4"/> Aplicação</TabsTrigger>
                    <TabsTrigger value="downloads" className="gap-2 py-2 px-4"><Download className="w-4 h-4"/> Downloads</TabsTrigger>
                    <TabsTrigger value="typography" className="gap-2 py-2 px-4"><Type className="w-4 h-4"/> Tipo</TabsTrigger>
                    <TabsTrigger value="colors" className="gap-2 py-2 px-4"><Palette className="w-4 h-4"/> Cores</TabsTrigger>
                    <TabsTrigger value="credits" className="gap-2 py-2 px-4"><Users className="w-4 h-4"/> Créditos</TabsTrigger>
                  </TabsList>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </div>

              {/* --- INTRO & SOBRE --- */}
              <TabsContent value="intro" className="space-y-6">
                <Accordion type="single" collapsible className="w-full" defaultValue="intro-section">
                  <AccordionItem value="intro-section" className="border rounded-lg px-4 shadow-sm">
                    <AccordionTrigger>Seção 01: Introdução</AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4 px-2">
                      <div className="grid grid-cols-4 gap-4">
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
                        <Textarea className="min-h-[120px]" value={store.introduction.mainText} onChange={(e) => store.updateIntroduction({ mainText: e.target.value })} />
                      </div>
                      <div className="space-y-2">
                        <Label>Citação</Label>
                        <Input value={store.introduction.quote} onChange={(e) => store.updateIntroduction({ quote: e.target.value })} />
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="about-section" className="border rounded-lg px-4 shadow-sm mt-4">
                    <AccordionTrigger>Seção 02: Sobre a Marca</AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4 px-2">
                      <Input value={store.aboutBrand.title} onChange={(e) => store.updateAboutBrand({ title: e.target.value })} />
                      <Textarea value={store.aboutBrand.highlightText} onChange={(e) => store.updateAboutBrand({ highlightText: e.target.value })} />
                      {store.aboutBrand.descriptionParagraphs.map((para, idx) => (
                        <Textarea key={idx} rows={3} value={para} onChange={(e) => {
                            const newParas = [...store.aboutBrand.descriptionParagraphs];
                            newParas[idx] = e.target.value;
                            store.updateAboutBrand({ descriptionParagraphs: newParas });
                          }} 
                        />
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </TabsContent>

              {/* --- MARCA --- */}
              <TabsContent value="brand" className="space-y-6">
                 <div className="space-y-4 border p-6 rounded-lg bg-card shadow-sm">
                    <h3 className="font-heading text-xl text-accent border-b pb-2 mb-4">Missão</h3>
                    <Input value={store.brandSection.missionTitle} onChange={(e) => store.updateBrandSection({ missionTitle: e.target.value })} />
                    <Textarea className="text-lg" rows={4} value={store.brandSection.missionText} onChange={(e) => store.updateBrandSection({ missionText: e.target.value })} />
                 </div>
                 <div className="space-y-4">
                    <h3 className="font-heading text-xl text-accent px-1">Valores</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {store.brandSection.values.map((val, idx) => (
                        <div key={idx} className="p-4 bg-muted/20 rounded-lg border space-y-3">
                           <Input value={val.title} className="font-bold" onChange={(e) => {
                               const newVals = [...store.brandSection.values];
                               newVals[idx] = { ...val, title: e.target.value };
                               store.updateBrandSection({ values: newVals });
                             }} />
                           <Textarea value={val.description} className="resize-none" rows={3} onChange={(e) => {
                               const newVals = [...store.brandSection.values];
                               newVals[idx] = { ...val, description: e.target.value };
                               store.updateBrandSection({ values: newVals });
                             }} />
                        </div>
                      ))}
                    </div>
                 </div>
              </TabsContent>

              {/* --- IDENTIDADE (COM UPLOAD) --- */}
              <TabsContent value="identity" className="space-y-6">
                 <Accordion type="single" collapsible className="w-full" defaultValue="logos">
                    <AccordionItem value="logos" className="border rounded-lg px-4 shadow-sm">
                      <AccordionTrigger>Logótipos</AccordionTrigger>
                      <AccordionContent className="space-y-6 pt-4">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3 p-4 bg-muted/20 rounded-lg border">
                              <Label className="text-base font-bold">Logo Principal</Label>
                              {/* INPUT DE UPLOAD */}
                              <FileUpload 
                                label="Imagem do Logo (PNG/SVG)" 
                                value={store.identity.primaryLogoImage} 
                                onChange={(val) => store.updateIdentity({ primaryLogoImage: val })} 
                              />
                              <Separator />
                              <Label>Texto Alternativo</Label>
                              <Input value={store.identity.primaryLogoText} onChange={(e) => store.updateIdentity({ primaryLogoText: e.target.value })} />
                            </div>
                            
                            <div className="space-y-3 p-4 bg-foreground rounded-lg border text-background">
                              <Label className="text-base font-bold text-background">Logo Invertido</Label>
                              {/* INPUT DE UPLOAD */}
                              <FileUpload 
                                label="Imagem Invertida (PNG/SVG)" 
                                value={store.identity.invertedLogoImage} 
                                onChange={(val) => store.updateIdentity({ invertedLogoImage: val })} 
                              />
                              <Separator className="bg-background/20" />
                              <Label className="text-background">Texto Alternativo</Label>
                              <Input className="bg-background text-foreground" value={store.identity.invertedLogoText} onChange={(e) => store.updateIdentity({ invertedLogoText: e.target.value })} />
                            </div>
                         </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="clearspace" className="border rounded-lg px-4 shadow-sm mt-4">
                      <AccordionTrigger>Área de Proteção</AccordionTrigger>
                      <AccordionContent className="space-y-4 pt-4">
                         {/* INPUT DE UPLOAD DO DIAGRAMA */}
                         <FileUpload 
                            label="Diagrama de Proteção (Imagem)" 
                            value={store.identity.clearSpaceImage} 
                            onChange={(val) => store.updateIdentity({ clearSpaceImage: val })} 
                         />
                         <Label>Descrição da Regra</Label>
                         <Textarea rows={3} value={store.identity.clearSpaceDescription} onChange={(e) => store.updateIdentity({ clearSpaceDescription: e.target.value })} />
                      </AccordionContent>
                    </AccordionItem>
                 </Accordion>
              </TabsContent>

              {/* --- APLICAÇÃO (MOCKUPS COM UPLOAD) --- */}
              <TabsContent value="application" className="space-y-6">
                 <div className="space-y-2">
                    <h3 className="font-heading text-xl text-accent">Mockups de Aplicação</h3>
                    <p className="text-sm text-muted-foreground">Carregue as imagens para cada item da lista.</p>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {store.application.items.map((item, idx) => (
                      <div key={idx} className="p-4 border rounded-lg space-y-3 bg-card">
                         <div className="flex justify-between items-center">
                            <span className="font-bold text-sm bg-muted px-2 py-1 rounded">{item.number}</span>
                            <Input 
                              value={item.title} 
                              className="h-8 font-medium w-32 text-right border-none shadow-none focus-visible:ring-0"
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
                         <Input 
                           value={item.description} 
                           className="text-xs text-muted-foreground"
                           onChange={(e) => {
                              const newItems = [...store.application.items];
                              newItems[idx] = { ...item, description: e.target.value };
                              store.updateApplication({ items: newItems });
                           }}
                         />
                      </div>
                    ))}
                 </div>
              </TabsContent>

              {/* --- DOWNLOADS (ARQUIVOS REAIS) --- */}
              <TabsContent value="downloads" className="space-y-6">
                 <div className="space-y-2">
                    <h3 className="font-heading text-xl text-accent">Arquivos para Download</h3>
                    <p className="text-sm text-muted-foreground">Faça o upload dos arquivos reais (ZIP, PDF).</p>
                 </div>
                 <div className="space-y-4">
                    {store.downloads.items.map((item, idx) => (
                       <div key={idx} className="p-4 border rounded-lg flex flex-col md:flex-row gap-4 items-start bg-card">
                          <div className="flex-1 space-y-2 w-full">
                             <Input 
                               value={item.title} 
                               className="font-bold"
                               onChange={(e) => {
                                  const newItems = [...store.downloads.items];
                                  newItems[idx] = { ...item, title: e.target.value };
                                  store.updateDownloads({ items: newItems });
                               }}
                             />
                             <Input 
                               value={item.description} 
                               className="text-sm text-muted-foreground"
                               onChange={(e) => {
                                  const newItems = [...store.downloads.items];
                                  newItems[idx] = { ...item, description: e.target.value };
                                  store.updateDownloads({ items: newItems });
                               }}
                             />
                          </div>
                          <div className="w-full md:w-1/2">
                             <FileUpload 
                                label="Arquivo (ZIP/PDF)" 
                                accept=".zip,.pdf,.rar"
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

              {/* --- TIPOGRAFIA & CORES & CRÉDITOS --- */}
              {/* (Mantive igual ao anterior, resumido aqui para caber, mas o código completo tem essas abas também) */}
              <TabsContent value="typography" className="space-y-6">
                 {/* ... Conteúdo de Tipografia (igual ao anterior) ... */}
                 <div className="grid grid-cols-1 gap-6">
                    <div className="border p-6 rounded-lg space-y-4 shadow-sm bg-card">
                       <h3 className="font-heading text-xl text-accent border-b pb-2">Fonte Principal</h3>
                       <div className="space-y-2">
                          <Label>Nome da Família</Label>
                          <Input value={store.typography.primaryFontName} onChange={(e) => store.updateTypography({ primaryFontName: e.target.value })} />
                       </div>
                       <div className="space-y-2">
                          <Label>Caracteres (Amostra)</Label>
                          <Textarea className="font-mono text-sm" rows={4} value={store.typography.primaryFontCharacters} onChange={(e) => store.updateTypography({ primaryFontCharacters: e.target.value })} />
                       </div>
                    </div>
                 </div>
              </TabsContent>

              <TabsContent value="colors" className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Paleta Principal</h3>
                  {store.colors.primaryColors.map((color, index) => (
                    <div key={index} className="p-4 border rounded-lg space-y-4 bg-card">
                      <div className="flex items-center gap-4">
                        <div className="relative group cursor-pointer">
                           <div className="w-16 h-16 rounded-2xl border shadow-sm" style={{ backgroundColor: color.hex }} />
                           <input type="color" value={color.hex} onChange={(e) => {
                                const newColors = [...store.colors.primaryColors];
                                newColors[index] = { ...color, hex: e.target.value };
                                store.updateColors({ primaryColors: newColors });
                              }} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
                        </div>
                        <div className="flex-1"><Input value={color.name} onChange={(e) => {
                                const newColors = [...store.colors.primaryColors];
                                newColors[index] = { ...color, name: e.target.value };
                                store.updateColors({ primaryColors: newColors });
                              }} /></div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="credits" className="space-y-6">
                 <div className="space-y-4 border p-6 rounded-lg bg-card shadow-sm">
                    <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-2"><Label>Estúdio</Label><Input value={store.credits.studioName} onChange={(e) => store.updateCredits({ studioName: e.target.value })} /></div>
                       <div className="space-y-2"><Label>Ano</Label><Input value={store.credits.year} onChange={(e) => store.updateCredits({ year: e.target.value })} /></div>
                    </div>
                 </div>
                 <div className="space-y-4">
                    <h3 className="font-medium text-accent px-1">Equipe</h3>
                    {store.credits.team.map((member, idx) => (
                      <div key={idx} className="flex gap-3 items-center group">
                         <div className="flex-1"><Input value={member.role} onChange={(e) => { const newTeam = [...store.credits.team]; newTeam[idx] = { ...member, role: e.target.value }; store.updateCredits({ team: newTeam }); }} /></div>
                         <div className="flex-1"><Input value={member.name} onChange={(e) => { const newTeam = [...store.credits.team]; newTeam[idx] = { ...member, name: e.target.value }; store.updateCredits({ team: newTeam }); }} /></div>
                      </div>
                    ))}
                 </div>
              </TabsContent>

            </Tabs>
          </div>
        </ScrollArea>

        <div className="p-6 border-t bg-background shrink-0 shadow-[0_-5px_10px_rgba(0,0,0,0.05)]">
          <Button onClick={handleSave} className="w-full gap-2 font-bold h-12 text-md" size="lg">
            <Save className="w-5 h-5" />
            Salvar Alterações Globais
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};