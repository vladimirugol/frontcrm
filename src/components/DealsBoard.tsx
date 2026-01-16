import React from 'react';
import { DealStatus, type Deal } from '../types';

interface DealsBoardProps {
  deals: Deal[];
  onAddClick: (status: DealStatus) => void;
  onEditClick: (deal: Deal) => void;
  onDeleteClick: (did: number) => void;
}

const DealsBoard: React.FC<DealsBoardProps> = ({ deals, onAddClick, onEditClick, onDeleteClick }) => {
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
  };

  const getStatusBorderColor = (status: DealStatus) => {
     switch (status) {
         case DealStatus.NEW: return 'border-blue-200';
         case DealStatus.QUALIFIED: return 'border-purple-200';
         case DealStatus.NEGOTIATION: return 'border-amber-200';
         case DealStatus.WON: return 'border-emerald-200';
         default: return 'border-gray-200';
     }
  }

  return (
    <div className="h-full overflow-x-auto pb-4">
      <div className="flex gap-6 min-w-max h-full">
        {Object.values(DealStatus).map((status) => {
          const stageDeals = deals.filter(d => d.dealStatus === status);

          return (
            <div key={status} className="w-80 flex flex-col h-full">
              <div className="flex items-center justify-between mb-4 px-1">
                <div className="flex items-center gap-2">
                    <h3 className="font-bold text-gray-700 text-sm uppercase tracking-wide">{status}</h3>
                    <span className="bg-gray-100 text-gray-500 text-xs font-bold px-2 py-0.5 rounded-full">{stageDeals.length}</span>
                </div>
              </div>
              
              <div className="flex-1 bg-gray-50/50 rounded-2xl border border-gray-200/60 p-3 flex flex-col gap-3 overflow-y-auto">
                {stageDeals.map(deal => (
                  <div 
                    key={deal.did} 
                    className={`bg-white p-4 rounded-xl border-l-4 shadow-sm hover:shadow-md transition-all group relative ${getStatusBorderColor(status)} border-gray-100 border-r border-t border-b`}
                  >
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded">
                            #{deal.did}
                        </span>
                        <div className="flex gap-1 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                                onClick={(e) => { e.stopPropagation(); onEditClick(deal); }}
                                className="p-1 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded"
                                title="Edit"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                            </button>
                            <button 
                                onClick={(e) => { e.stopPropagation(); onDeleteClick(deal.did); }}
                                className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"
                                title="Delete"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                            </button>
                        </div>
                    </div>
                    <h4 className="font-bold text-gray-900 leading-tight mb-2 text-sm">{deal.title}</h4>
                    <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                         <div className="flex items-center gap-1 text-gray-500">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            <span className="text-xs font-medium">Budget</span>
                         </div>
                        <span className="font-bold text-gray-900 text-sm">{formatCurrency(deal.budget)}</span>
                    </div>
                  </div>
                ))}

                <button 
                    onClick={() => onAddClick(status)}
                    className="w-full py-3 rounded-xl border border-dashed border-gray-300 text-gray-400 hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50 transition-all text-sm font-medium flex items-center justify-center gap-2"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                    New Deal
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DealsBoard;