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

interface BrandValue {
  title: string
  description: string
}

interface BrandSectionConfig {
  sectionNumber: string
  title: string
  missionTitle: string
  missionText: string
  valuesTitle: string
  values: BrandValue[]
}

interface PersonaItem {
  number: string
  title: string
  description: string
  image?: string
}

interface PersonasConfig {
  sectionNumber: string
  title: string
  items: PersonaItem[]
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
  brandSection: BrandSectionConfig
  personas: PersonasConfig 
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
  updateBrandSection: (data: Partial<BrandSectionConfig>) => void
  updatePersonas: (data: Partial<PersonasConfig>) => void
  updateIdentity: (data: Partial<IdentityConfig>) => void
  updateTypography: (data: Partial<TypographyConfig>) => void
  updateColors: (data: Partial<ColorsConfig>) => void
  updateApplication: (data: Partial<ApplicationConfig>) => void
  updateDownloads: (data: Partial<DownloadsConfig>) => void
  updateCredits: (data: Partial<CreditsConfig>) => void
  updateNavigation: (data: Partial<NavigationConfig>) => void

  addIntroductionTopic: () => void
  removeIntroductionTopic: (index: number) => void
  
  addBrandValue: () => void
  removeBrandValue: (index: number) => void

  addPersonaItem: () => void
  removePersonaItem: (index: number) => void
  
  addColor: () => void
  removeColor: (index: number) => void
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
      { number: '02', title: 'Marca', subtitle: 'História e valores', href: '#brand' },
      { number: '03', title: 'Público-alvo', subtitle: 'Personas', href: '#personas' },
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

  brandSection: {
    sectionNumber: '02',
    title: 'Marca',
    missionTitle: 'Missão',
    missionText: 'Elevar o comum ao extraordinário através de experiências visuais que transcendem expectativas.',
    valuesTitle: 'Valores',
    values: [
      { title: 'Excelência', description: 'Comprometidos com os mais altos padrões em cada detalhe.' },
      { title: 'Autenticidade', description: 'Fiéis à nossa essência, sem comprometer a nossa visão.' },
    ]
  },

  personas: {
    sectionNumber: '03',
    title: 'Público-alvo / Persona',
    items: [
      { number: '01', title: 'CONSTRUTOR', description: 'Foco em grandes obras.', image: '' },
      { number: '02', title: 'PROPRIETÁRIO', description: 'Busca valorização.', image: '' },
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
    
    // AQUI ESTAVA O PROBLEMA - Fonte padrão agora é editável e a secundária está VAZIA
    primaryFontTitle: 'Fonte Principal',
    primaryFontName: 'Outfit', // Apenas nome display
    primaryFontUrl: '', 
    primaryFontAlphabet: 'Aa Bb Cc',
    primaryFontCharacters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ\nabcdefghijklmnopqrstuvwxyz\n0123456789',
    weightsTitle: 'Pesos Tipográficos',
    primaryWeights: [
      { name: 'Light', weight: 300 },
      { name: 'Regular', weight: 400 },
      { name: 'Bold', weight: 700 },
    ],

    // SECUNDÁRIA ZERADA
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
  updateBrandSection: (data) => set((state) => ({ brandSection: { ...state.brandSection, ...data } })),
  updatePersonas: (data) => set((state) => ({ personas: { ...state.personas, ...data } })),
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

  addBrandValue: () => set((state) => ({ brandSection: { ...state.brandSection, values: [...state.brandSection.values, { title: "Novo Valor", description: "Descrição" }] } })),
  removeBrandValue: (index) => set((state) => {
    const newList = [...state.brandSection.values];
    newList.splice(index, 1);
    return { brandSection: { ...state.brandSection, values: newList } };
  }),

  addPersonaItem: () => set((state) => ({ personas: { ...state.personas, items: [...state.personas.items, { number: '00', title: 'NOVA PERSONA', description: 'Descrição', image: '' }] } })),
  removePersonaItem: (index) => set((state) => {
    const newList = [...state.personas.items];
    newList.splice(index, 1);
    return { personas: { ...state.personas, items: newList } };
  }),

  addColor: () => set((state) => ({ colors: { ...state.colors, primaryColors: [...state.colors.primaryColors, { name: "Nova Cor", hex: "#000000", usage: "Uso" }] } })),
  removeColor: (index) => set((state) => {
    const newList = [...state.colors.primaryColors];
    newList.splice(index, 1);
    return { colors: { ...state.colors, primaryColors: newList } };
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
    const { isEditorMode, toggleEditorMode, updateHero, updateIndexSection, updateIntroduction, updateAboutBrand, updateBrandSection, updatePersonas, updateIdentity, updateTypography, updateColors, updateApplication, updateDownloads, updateCredits, updateNavigation, addIntroductionTopic, removeIntroductionTopic, addBrandValue, removeBrandValue, addPersonaItem, removePersonaItem, addColor, removeColor, addColorGuideline, removeColorGuideline, addApplicationItem, removeApplicationItem, addDownloadItem, removeDownloadItem, addTeamMember, removeTeamMember, loadProject, saveProject, ...projectData } = state;

    try {
      await api.post(`/project/${slug}`, { settings: projectData });
      toast.success("Alterações salvas na nuvem com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao salvar o projeto.");
    }
  }
}))