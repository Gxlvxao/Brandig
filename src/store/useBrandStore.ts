import { create } from 'zustand'
import { api } from '@/lib/api' // Importando nossa conexão com o Laravel
import { toast } from "sonner"   // Para avisos visuais de sucesso/erro

// --- Interfaces das Seções ---

interface HeroConfig {
  titleLine1: string
  titleLine2: string
  agencyName: string
}

interface IntroductionConfig {
  sectionNumber: string
  title: string
  mainText: string
  quote: string
  contentList: string[]
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

interface IdentityConfig {
  sectionNumber: string
  title: string
  
  // Logos
  logoSectionTitle: string
  primaryLogoText: string
  primaryLogoLabel: string
  primaryLogoImage?: string 

  invertedLogoText: string
  invertedLogoLabel: string
  invertedLogoImage?: string 

  // Área de Proteção
  clearSpaceTitle: string
  clearSpaceLogoText: string
  clearSpaceDescription: string
  clearSpaceImage?: string 

  // Dimensões
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
  primaryFontAlphabet: string
  primaryFontCharacters: string
  weightsTitle: string
  primaryWeights: FontWeight[]
  secondaryFontTitle: string
  secondaryFontName: string
  secondaryFontAlphabet: string
  secondaryFontDescription: string
  secondaryWeightsTitle: string
  secondaryWeights: FontWeight[]
}

interface ColorItem {
  name: string
  hex: string
  rgb: string
  cmyk: string
  usage: string
  gradientStops: string[]
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
}

// --- Interface Principal do Estado ---

interface BrandState {
  isEditorMode: boolean
  
  // Seções
  hero: HeroConfig
  introduction: IntroductionConfig
  aboutBrand: AboutBrandConfig
  brandSection: BrandSectionConfig
  identity: IdentityConfig
  typography: TypographyConfig
  colors: ColorsConfig
  application: ApplicationConfig
  downloads: DownloadsConfig
  credits: CreditsConfig
  navigation: NavigationConfig
  
  // Actions de UI
  toggleEditorMode: () => void
  updateHero: (data: Partial<HeroConfig>) => void
  updateIntroduction: (data: Partial<IntroductionConfig>) => void
  updateAboutBrand: (data: Partial<AboutBrandConfig>) => void
  updateBrandSection: (data: Partial<BrandSectionConfig>) => void
  updateIdentity: (data: Partial<IdentityConfig>) => void
  updateTypography: (data: Partial<TypographyConfig>) => void
  updateColors: (data: Partial<ColorsConfig>) => void
  updateApplication: (data: Partial<ApplicationConfig>) => void
  updateDownloads: (data: Partial<DownloadsConfig>) => void
  updateCredits: (data: Partial<CreditsConfig>) => void
  updateNavigation: (data: Partial<NavigationConfig>) => void

  // Actions de API (Backend)
  loadProject: (slug: string) => Promise<void>
  saveProject: (slug: string) => Promise<void>
}

// Note o uso de (set, get) aqui para permitir ler o estado atual no saveProject
export const useBrandStore = create<BrandState>((set, get) => ({
  isEditorMode: true,
  
  // --- Dados Iniciais (Padrão) ---

  hero: {
    titleLine1: 'Your branding, your future,',
    titleLine2: 'is Here',
    agencyName: 'POR MAXSELL ADVISOR'
  },

  introduction: {
    sectionNumber: '01',
    title: 'Introdução',
    mainText: 'Este brand book é mais do que um guia — é uma imersão na identidade visual e conceptual de uma marca que respira sofisticação.',
    quote: '"O luxo está nos detalhes que não se veem à primeira vista."',
    contentList: [
      'Sobre a marca',
      'Quem é João Fernandes',
      'Propósito da marca',
      'Missão, visão & valores',
      'Público-alvo / Persona',
      'Proposta de valor',
      'Tom de voz e linguagem',
      'Storytelling da marca',
      'Reputação e percepção'
    ]
  },

  aboutBrand: {
    sectionNumber: '02',
    title: 'Sobre a Marca',
    highlightText: 'Uma marca que nasce da paixão pelo detalhe e da busca incansável pela excelência em cada experiência.',
    descriptionParagraphs: [
      'A nossa identidade é construída sobre pilares sólidos de autenticidade, sofisticação e uma conexão genuína com quem nos escolhe.',
      'Cada decisão, cada elemento visual, cada palavra — tudo é pensado para criar uma experiência memorável e distintiva.'
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
      { title: 'Inovação', description: 'Explorando novas fronteiras mantendo a elegância atemporal.' },
      { title: 'Sensorialidade', description: 'Criando experiências que envolvem todos os sentidos.' }
    ]
  },

  identity: {
    sectionNumber: '03',
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
    sectionNumber: '04',
    title: 'Tipografia',
    primaryFontTitle: 'Fonte Principal',
    primaryFontName: 'Outfit',
    primaryFontAlphabet: 'Aa Bb Cc',
    primaryFontCharacters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ\nabcdefghijklmnopqrstuvwxyz\n0123456789',
    weightsTitle: 'Pesos Tipográficos',
    primaryWeights: [
      { name: 'Light', weight: 300 },
      { name: 'Regular', weight: 400 },
      { name: 'Medium', weight: 500 },
      { name: 'Semibold', weight: 600 },
      { name: 'Bold', weight: 700 },
    ],
    secondaryFontTitle: 'Fonte Secundária',
    secondaryFontName: 'Inter',
    secondaryFontAlphabet: 'Aa Bb Cc',
    secondaryFontDescription: 'Utilizada para corpo de texto, legendas e informação secundária. A sua legibilidade e neutralidade complementam a personalidade da fonte principal.',
    secondaryWeightsTitle: 'Pesos Tipográficos — Inter',
    secondaryWeights: [
      { name: 'Regular', weight: 400 },
      { name: 'Medium', weight: 500 },
      { name: 'Semibold', weight: 600 },
      { name: 'Bold', weight: 700 },
    ]
  },

  colors: {
    sectionNumber: '05',
    title: 'Cores',
    primaryPaletteTitle: 'Paleta Principal',
    primaryColors: [
      {
        name: 'Preto Profundo',
        hex: '#0A0A0B',
        rgb: '10, 10, 11',
        cmyk: '9, 9, 0, 96',
        usage: 'Fundo principal',
        gradientStops: ['#0A0A0B', '#121211', '#1A1917', '#121211', '#0A0A0B']
      },
      {
        name: 'Branco Quente',
        hex: '#E8E4DD',
        rgb: '232, 228, 221',
        cmyk: '0, 2, 5, 9',
        usage: 'Texto principal',
        gradientStops: ['#E8E4DD', '#EDE9E3', '#F5F2ED', '#EDE9E3', '#E8E4DD']
      },
      {
        name: 'Amarelo Luz',
        hex: '#D4A842',
        rgb: '212, 168, 66',
        cmyk: '0, 21, 69, 17',
        usage: 'Destaque e acentos',
        gradientStops: ['#D4A842', '#DCB54E', '#E8C35A', '#DCB54E', '#D4A842']
      }
    ],
    secondaryPaletteTitle: 'Matizes',
    secondaryColors: [
      {
        name: 'Cinza Quente',
        hex: '#1A1917',
        rgb: '26, 25, 23',
        cmyk: '0, 4, 12, 90',
        usage: 'Superfícies',
        gradientStops: ['#1A1917', '#222120', '#2A2928', '#222120', '#1A1917']
      },
      {
        name: 'Cinza Médio',
        hex: '#8B8680',
        rgb: '139, 134, 128',
        cmyk: '0, 4, 8, 45',
        usage: 'Texto secundário',
        gradientStops: ['#8B8680', '#979289', '#A39E95', '#979289', '#8B8680']
      },
      {
        name: 'Cinza Claro',
        hex: '#C2BBB0',
        rgb: '194, 187, 176',
        cmyk: '0, 4, 9, 24',
        usage: 'Texto terciário',
        gradientStops: ['#C2BBB0', '#CBC5BB', '#D4CFC6', '#CBC5BB', '#C2BBB0']
      }
    ],
    usageTitle: 'Diretrizes de Uso',
    usageGuidelines: [
      'O preto profundo é a base de toda a comunicação visual.',
      'O amarelo luz deve ser usado com moderação, apenas para acentos e destaques.',
      'Evitar combinações de alto contraste que comprometam a elegância.',
      'Em fundos claros, inverter a hierarquia mantendo a mesma harmonia cromática.'
    ]
  },

  application: {
    sectionNumber: '06',
    title: 'Aplicação',
    items: [
      { title: 'Cartão de Visita', description: 'Frente e verso', number: '01', image: '' },
      { title: 'Papel Timbrado', description: 'A4 corporativo', number: '02', image: '' },
      { title: 'Envelope', description: 'Formato C5', number: '03', image: '' },
      { title: 'Website', description: 'Página principal', number: '04', image: '' },
      { title: 'App Mobile', description: 'Interface principal', number: '05', image: '' },
      { title: 'Redes Sociais', description: 'Templates de post', number: '06', image: '' },
    ]
  },

  downloads: {
    sectionNumber: '07',
    title: 'Downloads',
    description: 'Aceda a todos os recursos da marca. Ficheiros otimizados para impressão e digital.',
    items: [
      { 
        iconName: 'Package', 
        title: 'Kit Completo', 
        description: 'Todos os ficheiros da marca em formato ZIP',
        size: '45 MB',
        format: 'ZIP',
        fileUrl: '' 
      },
      { 
        iconName: 'Image', 
        title: 'Logótipos', 
        description: 'Versões em PNG, SVG e EPS',
        size: '12 MB',
        format: 'ZIP',
        fileUrl: '' 
      },
      { 
        iconName: 'FileText', 
        title: 'Brand Book PDF', 
        description: 'Documento completo em alta resolução',
        size: '8 MB',
        format: 'PDF',
        fileUrl: '' 
      },
      { 
        iconName: 'FileText', 
        title: 'Fontes', 
        description: 'Outfit e Inter em todos os pesos',
        size: '2 MB',
        format: 'ZIP',
        fileUrl: '' 
      },
    ]
  },

  credits: {
    sectionNumber: '08',
    title: 'Créditos',
    studioName: 'Studio Sensorial',
    year: '2024',
    team: [
      { role: 'Direção Criativa', name: 'Maria Santos' },
      { role: 'Design Visual', name: 'João Ferreira' },
      { role: 'Tipografia', name: 'Ana Costa' },
      { role: 'Fotografia', name: 'Pedro Oliveira' },
      { role: 'Desenvolvimento Web', name: 'Sofia Martins' },
      { role: 'Produção', name: 'Ricardo Silva' },
    ]
  },

  navigation: {
    logoText: 'SENSORIAL'
  },

  // --- Funções de Atualização (UI) ---

  toggleEditorMode: () => set((state) => ({ isEditorMode: !state.isEditorMode })),
  
  updateHero: (data) => set((state) => ({ hero: { ...state.hero, ...data } })),
  updateIntroduction: (data) => set((state) => ({ introduction: { ...state.introduction, ...data } })),
  updateAboutBrand: (data) => set((state) => ({ aboutBrand: { ...state.aboutBrand, ...data } })),
  updateBrandSection: (data) => set((state) => ({ brandSection: { ...state.brandSection, ...data } })),
  updateIdentity: (data) => set((state) => ({ identity: { ...state.identity, ...data } })),
  updateTypography: (data) => set((state) => ({ typography: { ...state.typography, ...data } })),
  updateColors: (data) => set((state) => ({ colors: { ...state.colors, ...data } })),
  updateApplication: (data) => set((state) => ({ application: { ...state.application, ...data } })),
  updateDownloads: (data) => set((state) => ({ downloads: { ...state.downloads, ...data } })),
  updateCredits: (data) => set((state) => ({ credits: { ...state.credits, ...data } })),
  updateNavigation: (data) => set((state) => ({ navigation: { ...state.navigation, ...data } })),

  // --- Funções de Integração (API) ---

  loadProject: async (slug: string) => {
    try {
      const response = await api.get(`/project/${slug}`);
      const settings = response.data.settings; // O Laravel retorna { settings: { ... } }
      
      if (settings) {
        set((state) => ({
          ...state,
          ...settings // Substitui o estado atual pelo que veio do banco
        }));
        console.log("Projeto carregado via API");
      }
    } catch (error) {
      console.log("Projeto novo ou erro ao carregar (ignorável no início).");
    }
  },

  saveProject: async (slug: string) => {
    const state = get(); // Pega o estado atual completo
    
    // Montamos o objeto limpo para salvar (sem funções)
    const projectData = {
      hero: state.hero,
      introduction: state.introduction,
      aboutBrand: state.aboutBrand,
      brandSection: state.brandSection,
      identity: state.identity,
      typography: state.typography,
      colors: state.colors,
      application: state.application,
      downloads: state.downloads,
      credits: state.credits,
      navigation: state.navigation
    };

    try {
      await api.post(`/project/${slug}`, {
        settings: projectData
      });
      toast.success("Alterações salvas na nuvem com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao salvar o projeto. Verifique o servidor.");
    }
  }
}))