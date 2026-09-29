/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { VehicleModal } from './components/VehicleModal';
import { BookingModal } from './components/BookingModal';
import { ProfessionalAuditModal } from './components/ProfessionalAuditModal';
import { HomeView } from './views/HomeView';
import { InventoryView } from './views/InventoryView';
import { ServicesView } from './views/ServicesView';
import { InspectionView } from './views/InspectionView';
import { ContactView } from './views/ContactView';
import { VinCheckerView } from './views/VinCheckerView';
import { Vehicle } from './data/cars';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'inventory' | 'services' | 'vin-checker' | 'inspection' | 'contact'>('home');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingServiceType, setBookingServiceType] = useState('pre-purchase-inspection');
  const [auditModalOpen, setAuditModalOpen] = useState(false);
  const [currency, setCurrency] = useState<'NGN' | 'USD'>('NGN');

  const handleSelectVehicle = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const handleBookInspection = () => {
    setBookingServiceType('pre-purchase-inspection');
    setBookingModalOpen(true);
  };

  const handleBookService = (serviceId: string) => {
    setBookingServiceType(serviceId);
    setBookingModalOpen(true);
  };

  const handleBookTestDrive = (vehicle: Vehicle) => {
    setBookingServiceType('pre-purchase-inspection');
    setSelectedVehicle(vehicle);
    setBookingModalOpen(true);
  };

  const handleOpenVinDecoder = (vin: string) => {
    setActiveTab('vin-checker');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-emerald-500/20 selection:text-emerald-900">
      
      {/* Primary Top Bar Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAudit={() => setAuditModalOpen(true)}
      />

      {/* Main Page View Content */}
      <main className="flex-1 pb-16">
        {activeTab === 'home' && (
          <HomeView
            onSelectVehicle={handleSelectVehicle}
            onBookInspection={handleBookInspection}
            onNavigateTab={setActiveTab}
            currency={currency}
          />
        )}

        {activeTab === 'inventory' && (
          <InventoryView
            onSelectVehicle={handleSelectVehicle}
            currency={currency}
            onBookInspection={handleBookInspection}
          />
        )}

        {activeTab === 'services' && (
          <ServicesView
            onBookService={handleBookService}
            currency={currency}
          />
        )}

        {activeTab === 'vin-checker' && (
          <VinCheckerView
            onBookInspection={handleBookInspection}
            currency={currency}
          />
        )}

        {activeTab === 'inspection' && (
          <InspectionView
            onBookInspection={handleBookInspection}
            currency={currency}
          />
        )}

        {activeTab === 'contact' && (
          <ContactView />
        )}
      </main>

      {/* Footer */}
      <Footer
        setActiveTab={setActiveTab}
        onOpenAudit={() => setAuditModalOpen(true)}
      />

      {/* Modals & Floating Tools */}
      <VehicleModal
        vehicle={selectedVehicle}
        onClose={() => setSelectedVehicle(null)}
        currency={currency}
        onBookTestDrive={handleBookTestDrive}
        onOpenVinDecoder={handleOpenVinDecoder}
      />

      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        serviceTypeDefault={bookingServiceType}
        selectedVehicle={selectedVehicle}
        currency={currency}
      />

      <ProfessionalAuditModal
        isOpen={auditModalOpen}
        onClose={() => setAuditModalOpen(false)}
      />

      {/* WhatsApp Floating Support */}
      <WhatsAppFloatingButton
        currentVehicleName={selectedVehicle?.name}
      />
    </div>
  );
}
