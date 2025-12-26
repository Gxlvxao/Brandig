import { create } from 'zustand'
import { api } from '@/lib/api'
import { toast } from "sonner"

interface HeroConfig {
  titleLine1: string
  titleLine2: string
  agencyName: string
  videoUrl?: string
}

interface IndexItem {
  number: string
  title: string
  subtitle: string
  href: string
}

interface IndexConfig {
  sectionNumber: string
  title: string
  items: IndexItem[]
}

interface IntroItem {
  number: string
  text: string
}

interface IntroductionConfig {
  sectionNumber: string
  title: string
  mainText: string
  quote: string
  contentList: IntroItem[] 
}

interface AboutBrandConfig {
  sectionNumber: string
  title: string
  highlightText: string
  descriptionParagraphs: string[]
  quote: string
}

interface StrategyItem {
  title: string;
  description: string;
}

export type StrategyCardType = 'identity' | 'market' | 'text';

export interface StrategyCard {
  id: string;
  type: StrategyCardType;
  title: string;
  
  mission?: StrategyItem;
  vision?: StrategyItem;
  values?: StrategyItem;
  
  persona?: StrategyItem;
  pain?: StrategyItem;
  solution?: StrategyItem;

  textBody?: string; 
}

interface BrandStrategyConfig {
  sectionNumber: string;
  title: string;
  cards: StrategyCard[];
}

interface IdentityConfig {
  sectionNumber: string
  title: string
  logoSectionTitle: string
  primaryLogoText: string
  primaryLogoLabel: string
  primaryLogoImage?: string 
  invertedLogoText: string
  invertedLogoLabel: string
  invertedLogoImage?: string 
  clearSpaceTitle: string
  clearSpaceLogoText: string
  clearSpaceDescription: string
  clearSpaceImage?: string 
  minSizeTitle: string
  minSizePrintLabel: string
  minSizePrintValue: string
  minSizeDigitalLabel: string
  minSizeDigitalValue: string
}

interface FontWeight {
  name: string
  weight: number
}

interface TypographyConfig {
  sectionNumber: string
  title: string
  primaryFontTitle: string
  primaryFontName: string
  primaryFontUrl?: string
  primaryFontAlphabet: string
  primaryFontCharacters: string
  weightsTitle: string
  primaryWeights: FontWeight[]
  secondaryFontTitle: string
  secondaryFontName: string
  secondaryFontUrl?: string
  secondaryFontAlphabet: string
  secondaryFontDescription: string
  secondaryWeightsTitle: string
  secondaryWeights: FontWeight[]
  extraFonts?: { name: string, url: string }[] 
}

interface ColorItem {
  name: string
  hex: string
  usage: string
}

interface ColorsConfig {
  sectionNumber: string
  title: string
  primaryPaletteTitle: string
  primaryColors: ColorItem[]
  secondaryPaletteTitle: string
  secondaryColors: ColorItem[]
  usageTitle: string
  usageGuidelines: string[]
}

interface ApplicationItem {
  title: string
  description: string
  number: string
  image?: string 
}

interface ApplicationConfig {
  sectionNumber: string
  title: string
  items: ApplicationItem[]
}

interface DownloadItem {
  iconName: 'Package' | 'Image' | 'FileText'
  title: string
  description: string
  size: string
  format: string
  fileUrl?: string 
}

interface DownloadsConfig {
  sectionNumber: string
  title: string
  description: string
  items: DownloadItem[]
}

interface TeamMember {
  role: string
  name: string
}

interface CreditsConfig {
  sectionNumber: string
  title: string
  team: TeamMember[]
  studioName: string
  year: string
}

interface NavigationConfig {
  logoText: string
  logoImage?: string
  showBoth: boolean
}

interface BrandState {
  isEditorMode: boolean
  hero: HeroConfig
  indexSection: IndexConfig 
  introduction: IntroductionConfig
  aboutBrand: AboutBrandConfig
  
  brandStrategy: BrandStrategyConfig;

  identity: IdentityConfig
  typography: TypographyConfig
  colors: ColorsConfig
  application: ApplicationConfig
  downloads: DownloadsConfig
  credits: CreditsConfig
  navigation: NavigationConfig
  
  toggleEditorMode: () => void
  
  updateHero: (data: Partial<HeroConfig>) => void
  updateIndexSection: (data: Partial<IndexConfig>) => void 
  updateIntroduction: (data: Partial<IntroductionConfig>) => void
  updateAboutBrand: (data: Partial<AboutBrandConfig>) => void
  
  updateBrandStrategy: (data: Partial<BrandStrategyConfig>) => void;
  addStrategyCard: (type: StrategyCardType) => void;
  removeStrategyCard: (id: string) => void;
  updateStrategyCard: (id: string, data: Partial<StrategyCard>) => void;

  updateIdentity: (data: Partial<IdentityConfig>) => void
  updateTypography: (data: Partial<TypographyConfig>) => void
  updateColors: (data: Partial<ColorsConfig>) => void
  updateApplication: (data: Partial<ApplicationConfig>) => void
  updateDownloads: (data: Partial<DownloadsConfig>) => void
  updateCredits: (data: Partial<CreditsConfig>) => void
  updateNavigation: (data: Partial<NavigationConfig>) => void

  addIntroductionTopic: () => void
  removeIntroductionTopic: (index: number) => void
  
  addColor: () => void
  removeColor: (index: number) => void
  
  addSecondaryColor: () => void
  removeSecondaryColor: (index: number) => void

  addColorGuideline: () => void
  removeColorGuideline: (index: number) => void

  addApplicationItem: () => void
  removeApplicationItem: (index: number) => void

  addDownloadItem: () => void
  removeDownloadItem: (index: number) => void

  addTeamMember: () => void
  removeTeamMember: (index: number) => void

  loadProject: (slug: string) => Promise<void>
  saveProject: (slug: string) => Promise<void>
}

export const useBrandStore = create<BrandState>((set, get) => ({
  isEditorMode: true,
  
  hero: {
    titleLine1: 'Your branding, your future,',
    titleLine2: 'is Here',
    agencyName: 'POR MAXSELL ADVISOR',
    videoUrl: ''
  },

  indexSection: {
    sectionNumber: '00',
    title: 'Índice',
    items: [
      { number: '01', title: 'Introdução', subtitle: 'A essência da marca', href: '#introduction' },
      { number: '02', title: 'Sobre a Marca', subtitle: 'História e propósito', href: '#about-brand' },
      { number: '03', title: 'Estratégia', subtitle: 'Identidade e Mercado', href: '#strategy' },
      { number: '04', title: 'Identidade Visual', subtitle: 'Elementos gráficos', href: '#identity' },
      { number: '05', title: 'Tipografia', subtitle: 'Sistema tipográfico', href: '#typography' },
      { number: '06', title: 'Cores', subtitle: 'Paleta cromática', href: '#colors' },
      { number: '07', title: 'Aplicação', subtitle: 'Mockups e exemplos', href: '#application' },
      { number: '08', title: 'Downloads', subtitle: 'Recursos da marca', href: '#downloads' },
      { number: '09', title: 'Créditos', subtitle: 'Equipa criativa', href: '#credits' },
    ]
  },

  introduction: {
    sectionNumber: '01',
    title: 'Introdução',
    mainText: 'Este brand book é mais do que um guia — é uma imersão na identidade visual e conceptual de uma marca que respira sofisticação.',
    quote: '"O luxo está nos detalhes que não se veem à primeira vista."',
    contentList: [
      { number: '01', text: 'Sobre a marca' },
      { number: '02', text: 'Quem é João Fernandes' },
      { number: '03', text: 'Propósito da marca' },
    ]
  },

  aboutBrand: {
    sectionNumber: '02',
    title: 'Sobre a Marca',
    highlightText: 'Uma marca que nasce da paixão pelo detalhe e da busca incansável pela excelência em cada experiência.',
    descriptionParagraphs: [
      'A nossa identidade é construída sobre pilares sólidos de autenticidade, sofisticação e uma conexão genuína com quem nos escolhe.',
    ],
    quote: '"A verdadeira elegância está na simplicidade intencional."'
  },

  brandStrategy: {
    sectionNumber: '03',
    title: 'Estratégia',
    cards: [
      {
        id: 'default-identity',
        type: 'identity',
        title: 'Identidade Corporativa',
        mission: { title: 'Missão', description: 'Elevar o padrão do mercado através de soluções inovadoras.' },
        vision: { title: 'Visão', description: 'Ser referência mundial em nosso segmento até 2030.' },
        values: { title: 'Valores', description: '• Inovação\n• Transparência\n• Excelência' },
      },
      {
        id: 'default-market',
        type: 'market',
        title: 'Contexto de Mercado',
        persona: { title: 'A Persona', description: 'Empreendedores visionários que buscam parceria estratégica.' },
        pain: { title: 'A Dor', description: 'Dificuldade em encontrar parceiros que alinhem criatividade com resultados.' },
        solution: { title: 'A Solução', description: 'Metodologia proprietária que integra design e dados.' },
      }
    ]
  },

  identity: {
    sectionNumber: '04',
    title: 'Identidade Visual',
    logoSectionTitle: 'Logótipo',
    primaryLogoText: 'SENSORIAL',
    primaryLogoLabel: 'Versão Principal',
    primaryLogoImage: '', 
    invertedLogoText: 'SENSORIAL',
    invertedLogoLabel: 'Versão Invertida',
    invertedLogoImage: '', 
    clearSpaceTitle: 'Área de Proteção',
    clearSpaceLogoText: 'SENSORIAL',
    clearSpaceDescription: 'A letra "S" define a área mínima de proteção em redor do logótipo.',
    clearSpaceImage: '', 
    minSizeTitle: 'Dimensões Mínimas',
    minSizePrintLabel: 'Impressão',
    minSizePrintValue: 'Mínimo 25mm',
    minSizeDigitalLabel: 'Digital',
    minSizeDigitalValue: 'Mínimo 80px'
  },

  typography: {
    sectionNumber: '05',
    title: 'Tipografia',
    primaryFontTitle: 'Fonte Principal',
    primaryFontName: 'Outfit', 
    primaryFontUrl: '', 
    primaryFontAlphabet: 'Aa Bb Cc',
    primaryFontCharacters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ\nabcdefghijklmnopqrstuvwxyz\n0123456789',
    weightsTitle: 'Pesos Tipográficos',
    primaryWeights: [
      { name: 'Light', weight: 300 },
      { name: 'Regular', weight: 400 },
      { name: 'Bold', weight: 700 },
    ],
    secondaryFontTitle: 'Fonte Secundária',
    secondaryFontName: '', 
    secondaryFontUrl: '',
    secondaryFontAlphabet: '',
    secondaryFontDescription: '',
    secondaryWeightsTitle: '',
    secondaryWeights: [], 
    extraFonts: []
  },

  colors: {
    sectionNumber: '06',
    title: 'Cores',
    primaryPaletteTitle: 'Paleta Principal',
    primaryColors: [
      {
        name: 'Preto Profundo',
        hex: '#0A0A0B',
        usage: 'Fundo principal',
      },
      {
        name: 'Branco Quente',
        hex: '#E8E4DD',
        usage: 'Texto principal',
      },
      {
        name: 'Amarelo Luz',
        hex: '#D4A842',
        usage: 'Destaque e acentos',
      }
    ],
    secondaryPaletteTitle: 'Paleta Secundária',
    secondaryColors: [
      {
        name: 'Cinza Neutro',
        hex: '#808080',
        usage: 'Elementos de apoio',
      }
    ],
    usageTitle: 'Diretrizes de Uso',
    usageGuidelines: [
      'O preto profundo é a base de toda a comunicação visual.',
      'O amarelo luz deve ser usado com moderação.',
    ]
  },

  application: {
    sectionNumber: '07',
    title: 'Aplicação',
    items: [
      { title: 'Cartão de Visita', description: 'Frente e verso', number: '01', image: '' },
      { title: 'Papel Timbrado', description: 'A4 corporativo', number: '02', image: '' },
    ]
  },

  downloads: {
    sectionNumber: '08',
    title: 'Downloads',
    description: 'Aceda a todos os recursos da marca.',
    items: [
      { 
        iconName: 'Package', 
        title: 'Kit Completo', 
        description: 'Todos os ficheiros da marca',
        size: '45 MB',
        format: 'ZIP',
        fileUrl: '' 
      },
    ]
  },

  credits: {
    sectionNumber: '09',
    title: 'Créditos',
    studioName: 'Studio Sensorial',
    year: '2024',
    team: [
      { role: 'Direção Criativa', name: 'Maria Santos' },
    ]
  },

  navigation: {
    logoText: 'SENSORIAL',
    logoImage: '',
    showBoth: false
  },

  toggleEditorMode: () => set((state) => ({ isEditorMode: !state.isEditorMode })),
  
  updateHero: (data) => set((state) => ({ hero: { ...state.hero, ...data } })),
  updateIndexSection: (data) => set((state) => ({ indexSection: { ...state.indexSection, ...data } })), 
  updateIntroduction: (data) => set((state) => ({ introduction: { ...state.introduction, ...data } })),
  updateAboutBrand: (data) => set((state) => ({ aboutBrand: { ...state.aboutBrand, ...data } })),
  
  updateBrandStrategy: (data) => set((state) => ({ brandStrategy: { ...state.brandStrategy, ...data } })),
  
  addStrategyCard: (type) => set((state) => {
    const newCard: StrategyCard = {
      id: crypto.randomUUID(), 
      type,
      title: type === 'identity' ? 'Nova Identidade' : type === 'market' ? 'Novo Contexto' : 'Novo Texto',
      mission: { title: 'Missão', description: '' },
      vision: { title: 'Visão', description: '' },
      values: { title: 'Valores', description: '' },
      persona: { title: 'Persona', description: '' },
      pain: { title: 'Dor', description: '' },
      solution: { title: 'Solução', description: '' },
      textBody: ''
    };
    return { brandStrategy: { ...state.brandStrategy, cards: [...state.brandStrategy.cards, newCard] } };
  }),

  removeStrategyCard: (id) => set((state) => ({
    brandStrategy: {
      ...state.brandStrategy,
      cards: state.brandStrategy.cards.filter(c => c.id !== id)
    }
  })),

  updateStrategyCard: (id, data) => set((state) => ({
    brandStrategy: {
      ...state.brandStrategy,
      cards: state.brandStrategy.cards.map(card => card.id === id ? { ...card, ...data } : card)
    }
  })),

  updateIdentity: (data) => set((state) => ({ identity: { ...state.identity, ...data } })),
  updateTypography: (data) => set((state) => ({ typography: { ...state.typography, ...data } })),
  updateColors: (data) => set((state) => ({ colors: { ...state.colors, ...data } })),
  updateApplication: (data) => set((state) => ({ application: { ...state.application, ...data } })),
  updateDownloads: (data) => set((state) => ({ downloads: { ...state.downloads, ...data } })),
  updateCredits: (data) => set((state) => ({ credits: { ...state.credits, ...data } })),
  updateNavigation: (data) => set((state) => ({ navigation: { ...state.navigation, ...data } })),

  addIntroductionTopic: () => set((state) => ({ introduction: { ...state.introduction, contentList: [...state.introduction.contentList, { number: '00', text: 'Novo Tópico' }] } })),
  removeIntroductionTopic: (index) => set((state) => {
    const newList = [...state.introduction.contentList];
    newList.splice(index, 1);
    return { introduction: { ...state.introduction, contentList: newList } };
  }),

  addColor: () => set((state) => ({ colors: { ...state.colors, primaryColors: [...state.colors.primaryColors, { name: "Nova Cor", hex: "#000000", usage: "Uso" }] } })),
  removeColor: (index) => set((state) => {
    const newList = [...state.colors.primaryColors];
    newList.splice(index, 1);
    return { colors: { ...state.colors, primaryColors: newList } };
  }),

  addSecondaryColor: () => set((state) => ({ colors: { ...state.colors, secondaryColors: [...state.colors.secondaryColors, { name: "Nova Cor Secundária", hex: "#888888", usage: "Uso Secundário" }] } })),
  removeSecondaryColor: (index) => set((state) => {
    const newList = [...state.colors.secondaryColors];
    newList.splice(index, 1);
    return { colors: { ...state.colors, secondaryColors: newList } };
  }),

  addColorGuideline: () => set((state) => ({ colors: { ...state.colors, usageGuidelines: [...state.colors.usageGuidelines, "Nova diretriz"] } })),
  removeColorGuideline: (index) => set((state) => {
    const newList = [...state.colors.usageGuidelines];
    newList.splice(index, 1);
    return { colors: { ...state.colors, usageGuidelines: newList } };
  }),

  addApplicationItem: () => set((state) => ({ application: { ...state.application, items: [...state.application.items, { title: "Novo Item", description: "Descrição", number: "00", image: "" }] } })),
  removeApplicationItem: (index) => set((state) => {
    const newList = [...state.application.items];
    newList.splice(index, 1);
    return { application: { ...state.application, items: newList } };
  }),

  addDownloadItem: () => set((state) => ({ downloads: { ...state.downloads, items: [...state.downloads.items, { title: "Novo Arquivo", description: "Descrição", iconName: "FileText", size: "0 MB", format: "PDF", fileUrl: "" }] } })),
  removeDownloadItem: (index) => set((state) => {
    const newList = [...state.downloads.items];
    newList.splice(index, 1);
    return { downloads: { ...state.downloads, items: newList } };
  }),

  addTeamMember: () => set((state) => ({ credits: { ...state.credits, team: [...state.credits.team, { role: "Função", name: "Nome" }] } })),
  removeTeamMember: (index) => set((state) => {
    const newList = [...state.credits.team];
    newList.splice(index, 1);
    return { credits: { ...state.credits, team: newList } };
  }),

  loadProject: async (slug: string) => {
    try {
      const response = await api.get(`/project/${slug}`);
      const settings = response.data.settings;
      if (settings) {
        set((state) => ({ ...state, ...settings }));
      }
    } catch (error) {
      console.log("Projeto novo ou erro ao carregar.");
    }
  },

  saveProject: async (slug: string) => {
    const state = get();
    const { 
        isEditorMode, toggleEditorMode, updateHero, updateIndexSection, updateIntroduction, 
        updateAboutBrand, updateBrandStrategy, addStrategyCard, removeStrategyCard, updateStrategyCard, 
        updateIdentity, updateTypography, 
        updateColors, updateApplication, updateDownloads, updateCredits, updateNavigation, 
        addIntroductionTopic, removeIntroductionTopic, 
        addColor, removeColor, addSecondaryColor, removeSecondaryColor,
        addColorGuideline, removeColorGuideline, addApplicationItem, removeApplicationItem, 
        addDownloadItem, removeDownloadItem, addTeamMember, removeTeamMember, 
        loadProject, saveProject, 
        ...projectData 
    } = state;

    try {
      await api.post(`/project/${slug}`, { settings: projectData });
      toast.success("Alterações salvas na nuvem com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao salvar o projeto.");
    }
  }
}))