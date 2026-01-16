import React from 'react';
import type { Client } from '../types';
import {ClientStatus} from '../types'
interface ClientsListProps {
  clients: Client[];
}

const ClientList: React.FC<ClientsListProps> = ({ clients }) => {
  const getStatusColor = (status: ClientStatus) => {
    switch (status) {
      case ClientStatus.ACTIVE: return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case ClientStatus.LEAD: return 'bg-blue-50 text-blue-700 border-blue-100';
      case ClientStatus.INACTIVE: return 'bg-gray-50 text-gray-500 border-gray-100';
      default: return 'bg-gray-50 text-gray-700 border-gray-100';
    }
  };

  return (
    <div className="h-full flex flex-col animate-fadeIn">
      <div className="mb-6 flex justify-between items-center">
        <div>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Clients</h2>
            <p className="text-gray-500 mt-1">Manage your relationships and contacts.</p>
        </div>
        <button className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-indigo-300 transition-all flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
            Add Client
        </button>
      </div>

      <div className="flex-1 bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
        <div className="grid grid-cols-12 gap-4 p-5 border-b border-gray-100 bg-gray-50/50">
            <div className="col-span-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Name</div>
            <div className="col-span-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Company</div>
            <div className="col-span-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</div>
            <div className="col-span-3 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Last Contact</div>
        </div>
        <div className="flex-1 overflow-y-auto">
            {clients.map((client) => (
                <div key={client.id} className="grid grid-cols-12 gap-4 p-5 border-b border-gray-50 hover:bg-gray-50/80 transition-colors group cursor-pointer items-center">
                    <div className="col-span-4 flex items-center gap-4">
                        <div>
                            <h4 className="font-bold text-gray-900 leading-tight">{client.name}</h4>
                            <p className="text-xs text-gray-500 mt-0.5">{client.email}</p>
                        </div>
                    </div>
                    <div className="col-span-3">
                        <p className="font-semibold text-gray-700 text-sm">{client.company}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{client.role}</p>
                    </div>
                    <div className="col-span-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold border ${getStatusColor(client.status)}`}>
                            {client.status}
                        </span>
                    </div>
                    <div className="col-span-3 text-right">
                        <p className="text-sm font-medium text-gray-500">{client.lastContact}</p>
                    </div>
                </div>
            ))}
        </div>
        
        <div className="p-4 border-t border-gray-100 bg-gray-50/30 flex justify-center">
            <button className="text-xs font-bold text-gray-400 hover:text-indigo-600 transition-colors uppercase tracking-wider">View All Clients</button>
        </div>
      </div>
    </div>
  );
};

export default ClientList;