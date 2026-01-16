import React, { useState, useEffect } from 'react';
import DealsBoard from './DealsBoard';
import ClientsList from './ClientList';
import DealForm from './DealForm';
import { AppView, DealStatus, ClientStatus } from '../types';
import type { Deal, NavItem, Client } from '../types';

import { useAppDispatch, useAppSelector } from '../store/hooks'; 
import { fetchDeals, createDeal, updateDeal, deleteDeal } from '../features/auth/dealThunks';

const INITIAL_CLIENTS: Client[] = [
  { id: '1', name: 'James Holt', email: 'james@acmecorp.com', company: 'Acme Corp', role: 'CTO', status: ClientStatus.ACTIVE, lastContact: '2 days ago', avatar: 'https://i.pravatar.cc/150?u=1' },
];

const NAV_ITEMS: NavItem[] = [
  { 
      id: AppView.DASHBOARD, 
      label: 'Deals Pipeline', 
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg> 
  },
  {
      id: AppView.CLIENTS,
      label: 'Clients',
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
  }
];

const Panel: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.LANDING);
  const [activeNav, setActiveNav] = useState<string>(AppView.DASHBOARD);
  
  const dispatch = useAppDispatch();
  const { items: deals, loading, error } = useAppSelector((state) => state.deals);

  useEffect(() => {
    dispatch(fetchDeals());
  }, [dispatch]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [targetStage, setTargetStage] = useState<DealStatus>(DealStatus.NEW);
  const [editingDeal, setEditingDeal] = useState<Deal | null>(null);

  const navigateTo = (view: AppView) => {
    setCurrentView(view);
    setActiveNav(view);
  };

  

  const handleOpenCreateForm = (status: DealStatus) => {
    setEditingDeal(null);
    setTargetStage(status);
    setIsFormOpen(true);
  };

  const handleOpenEditForm = (deal: Deal) => {
    setEditingDeal(deal);
    setIsFormOpen(true);
  };
  const handleFormSubmit = async (dealData: Omit<Deal, 'did'>) => {
    try {
        if (editingDeal) {
            await dispatch(updateDeal({ 
                did: editingDeal.did, 
                data: dealData 
            })).unwrap(); 
        } else {
            await dispatch(createDeal(dealData)).unwrap();
        }
        setIsFormOpen(false);
    } catch (err) {
        console.error("Failed to save deal:", err);
        alert("Ошибка при сохранении!");
    }
  };

  const handleDeleteDeal = async (did: number) => {
     if (window.confirm('Are you sure you want to delete this deal?')) {
        dispatch(deleteDeal(did));
     }
  };

  const getPageTitle = () => {
      switch(currentView) {
          case AppView.DASHBOARD: return 'Deals Pipeline';
          case AppView.CLIENTS: return 'Clients Overview';
          default: return '';
      }
  }

  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
      <DealForm 
        key={isFormOpen ? (editingDeal ? `edit-${editingDeal.did}` : 'create') : 'closed'}
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        onSubmit={handleFormSubmit}
        initialStatus={targetStage}
        dealToEdit={editingDeal} 
      />

      <aside className="w-20 md:w-72 bg-white border-r border-gray-200 flex flex-col flex-shrink-0 z-20 shadow-xl shadow-gray-100/50">
        <div className="h-20 flex items-center px-6 border-b border-gray-50">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-200 flex-shrink-0">
            <span className="text-white font-bold">F</span>
          </div>
          <span className="ml-3 font-bold text-xl tracking-tight text-gray-900 hidden md:block">BigFloppa CRM</span>
        </div>

        <div className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => navigateTo(item.id as AppView)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-200 group
                ${activeNav === item.id 
                  ? 'bg-indigo-50 text-indigo-700 shadow-sm' 
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}
            >
              <span className={`transition-colors ${activeNav === item.id ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-600'}`}>
                {item.icon}
              </span>
              <span className="font-semibold text-sm hidden md:block">{item.label}</span>
              {activeNav === item.id && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-600 hidden md:block"></span>
              )}
            </button>
          ))}
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 bg-gray-50">
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 flex-shrink-0 z-10">
            <div className="flex items-center gap-4">
                 <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                    {getPageTitle()}
                 </h1>
                 {loading && <span className="text-sm text-indigo-500">Loading...</span>}
                 {error && <span className="text-sm text-red-500">Error: {error}</span>}
            </div>
            
            <div className="flex items-center gap-4">
                <button 
                    onClick={() => handleOpenCreateForm(DealStatus.NEW)}
                    className="px-4 py-2 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 flex items-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                    <span className="hidden md:inline">Add Deal</span>
                </button>
            </div>
        </header>

        <div className="flex-1 p-8 overflow-hidden">
          {currentView === AppView.DASHBOARD && (
            <DealsBoard 
                deals={deals} 
                onAddClick={handleOpenCreateForm}
                onEditClick={handleOpenEditForm} 
                onDeleteClick={handleDeleteDeal} 
            />
          )}
          {currentView === AppView.CLIENTS && <ClientsList clients={INITIAL_CLIENTS} />}
        </div>
      </main>
    </div>
  );
};

export default Panel;