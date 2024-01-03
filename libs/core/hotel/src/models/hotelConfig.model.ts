export interface HotelConfigModel {
  timeToSendNotAttendedNotification: number;
  modules: Modules;
  fiveStarsModal: FiveStarsModal;
  preStayFeatures: Feature[];
  selectedUiTemplate: number;
  serviceCost: ServiceCost;
  passwordGuest: string;
  enableNewHome: boolean;
  baseLanguage: BaseLanguage;
  currency: Currency;
  contactURL: ContactURL;
  promotionSidebar: PromotionSidebar;
  notificationTokens: string[];
  features: Feature[];
  openAnonymousOnWelcome: boolean;
  redirectNewHome: boolean;
}

export interface BaseLanguage {
  englishName: string;
  unicode: string;
  code: string;
  name: string;
  prefix: string;
}

export interface ContactURL {
  url: string;
  status: boolean;
  icon: string;
}

export interface Currency {
  status: boolean;
  symbol: string;
  decimal: string;
  alphabetCode: string;
  locale: string;
  numberCode: string;
}

export interface Feature {
  key: string;
  name: string;
  enabled: boolean;
}

export interface FiveStarsModal {
  link: string;
  title: string;
  status: boolean;
  button: string;
  description: string;
}

export interface Modules {
  free: number;
}

export interface PromotionSidebar {
  name: string;
}

export interface ServiceCost {
  roomService: RoomService;
}

export interface RoomService {
  status: boolean;
  cost: number;
  conditionValue: number;
  condition: string;
  estimatedTime: number;
  tooltip: string;
}
