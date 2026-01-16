

export const ClientStatus = {
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
  LEAD: 'Lead'
} as const;

export type ClientStatus = typeof ClientStatus[keyof typeof ClientStatus];

export interface Client {
  id: string;
  name: string;
  email: string;
  company: string;
  role: string;
  status: ClientStatus;
  lastContact: string;
  avatar: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export const AppView = {
  LANDING: 'LANDING',
  DASHBOARD: 'DASHBOARD',
  CLIENTS: 'CLIENTS',
  ASSETS: 'ASSETS'
} as const;

export type AppView = typeof AppView[keyof typeof AppView];

export const DealStatus = {
    NEW : 'NEW',
    QUALIFIED : 'QUALIFIED',
    NEGOTIATION : 'NEGOTIATION',
    WON : 'WON'
} as const


export interface Deal {
    did: number;            
    title: string;          
    budget: number;        
    dealStatus: DealStatus; 
}
export type DealStatus = typeof DealStatus[keyof typeof DealStatus];
export interface Client {
    id: string;
    name: string;
    email: string;
    company: string;
    role: string;
    status: ClientStatus;
    lastContact: string;
    avatar: string;
}