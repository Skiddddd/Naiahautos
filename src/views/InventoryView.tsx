import React, { useState, useMemo } from 'react';
import { Search, FileCheck, ArrowRight, X, LayoutGrid } from 'lucide-react';
import { VEHICLES_DATA, Vehicle, showroomHeroImg } from '../data/cars';
interface InventoryViewProps {
  onSelectVehicle: (v: Vehicle) => void;
  currency: 'NGN' | 'USD';
  onBookInspection: () => void;
}

export const InventoryView: React.FC<InventoryViewProps> = ({
  onSelectVehicle,
  currency,
  onBookInspection
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMake, setSelectedMake] = useState<string>('All');
  const [selectedBodyType, setSelectedBodyType] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'year' | 'mileage'>('featured');

  const makes = ['All', 'Mercedes-Benz', 'Lexus', 'BMW', 'Toyota', 'Honda', 'Land Rover'];
  const bodyTypes = ['All', 'SUV', 'Sedan'];

  const filteredVehicles = useMemo(() => {
    return VEHICLES_DATA.filter(car => {
      const matchesSearch = 
        car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.vin.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesMake = selectedMake === 'All' || car.make === selectedMake;
      const matchesBody = selectedBodyType === 'All' || car.bodyType === selectedBodyType;

      return matchesSearch && matchesMake && matchesBody;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') {
        return a.priceNgn - b.priceNgn;
      }
      if (sortBy === 'price-desc') {
        return b.priceNgn - a.priceNgn;
      }
      if (sortBy === 'year') {
        return b.year - a.year;
      }
      if (sortBy === 'mileage') {
        return a.mileageKm - b.mileageKm;
      }
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [searchQuery, selectedMake, selectedBodyType, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 bg-slate-50 text-slate-800">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700">
          <span>Official Dealership Showroom</span>
          <span className="text-slate-400">·</span>
          <span>{filteredVehicles.length} Vehicles In Stock</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
          Available Vehicle Inventory
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
          Browse verified foreign-used (Tokunbo) luxury vehicles, SUVs, and executive sedans. All cars have passed our 200-point inspection and have 100% genuine customs clearance.
        </p>
      </div>

      {/* Filter & Search Bar Controls: 3D Console Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 space-y-4 shadow-3d">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          
          {/* Search Field */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-emerald-700 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by make, model, or year (e.g. GLE, Prado, Lexus)..."
              className="w-full inset-3d bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-600 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort Selection */}
          <div className="md:col-span-6 flex flex-wrap items-center justify-start md:justify-end gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-500 shrink-0 font-bold uppercase tracking-wider text-[11px]">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-50 border border-slate-300 text-slate-800 rounded-xl px-3 py-2 text-xs font-bold shadow-[0_2px_0_#cbd5e1] focus:outline-none focus:border-emerald-600 cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="year">Newest Model Year</option>
                <option value="mileage">Lowest Mileage</option>
              </select>
            </div>
          </div>
        </div>

        {/* Filter Tabs with 3D tactile buttons */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
          {/* Make Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-500 mr-1 font-bold uppercase tracking-wider text-[11px]">Brand:</span>
            {makes.map((make) => (
              <button
                key={make}
                onClick={() => setSelectedMake(make)}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  selectedMake === make
                    ? 'btn-3d-emerald'
                    : 'btn-3d-white text-slate-700'
                }`}
              >
                {make}
              </button>
            ))}
          </div>

          {/* Body Type Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 mr-1 font-bold uppercase tracking-wider text-[11px]">Body:</span>
            {bodyTypes.map((body) => (
              <button
                key={body}
                onClick={() => setSelectedBodyType(body)}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  selectedBodyType === body
                    ? 'btn-3d-emerald'
                    : 'btn-3d-white text-slate-700'
                }`}
              >
                {body}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Results: White cards with 3D tilt & emerald accents */}
      {filteredVehicles.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 space-y-3 shadow-sm">
          <p className="text-slate-600 text-sm">No vehicles match your current search and filter criteria.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedMake('All');
              setSelectedBodyType('All');
            }}
            className="text-xs text-emerald-700 font-bold underline cursor-pointer"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map((car) => {
            const priceFormatted = currency === 'NGN'
              ? `NGN ${(car.priceNgn / 1000000).toFixed(1)}M`
              : `$${car.priceUsd.toLocaleString()}`;

            return (
              <TiltCard
                key={car.id}
                maxTilt={8}
                scale={1.02}
                onClick={() => onSelectVehicle(car)}
                className="bg-white border border-slate-200 hover:border-emerald-500 rounded-3xl overflow-hidden shadow-3d hover:shadow-3d-hover transition-all duration-300 flex flex-col cursor-pointer"
              >
                {/* Visual Frame */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  <img
                    src={car.imageUrl}
                    alt={car.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = showroomHeroImg;
                    }}
                  />
                  {/* Floating 3D Badges */}
                  <div 
                    className="absolute top-3 left-3 bg-white/95 backdrop-blur-md border border-slate-200 shadow-[0_4px_10px_rgba(0,0,0,0.2)] px-2.5 py-1 rounded-xl text-[11px] font-extrabold text-emerald-800 flex items-center gap-1.5"
                    style={{ transform: 'translateZ(26px)' }}
                  >
                    <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Customs SGD Verified</span>
                  </div>

                  <div 
                    className="absolute top-3 right-3 bg-[#064E3B] text-lime-300 px-2.5 py-0.5 rounded-xl text-[11px] font-mono font-bold shadow-[0_4px_10px_rgba(0,0,0,0.3)] border border-emerald-700/60"
                    style={{ transform: 'translateZ(26px)' }}
                  >
                    Score: {car.inspectionScore}/100
                  </div>

                  <div 
                    className="absolute bottom-3 right-3 bg-slate-900/85 backdrop-blur-sm text-white px-2.5 py-0.5 rounded-lg text-[11px] font-mono shadow-[0_4px_10px_rgba(0,0,0,0.3)]"
                    style={{ transform: 'translateZ(24px)' }}
                  >
                    VIN: {car.vin}
                  </div>
                </div>

                {/* 3D Elevated Details Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4" style={{ transform: 'translateZ(18px)' }}>
                  <div>
                    <div className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">
                      {car.condition} · {car.bodyType} · {car.drivetrain}
                    </div>
                    <h3 className="text-base font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors mt-0.5">
                      {car.name}
                    </h3>
                    <div className="text-xs text-slate-500 mt-1 line-clamp-1 font-medium">
                      {car.engine}
                    </div>
                  </div>

                  {/* Highlights with subtle 3D inset */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 pt-1" style={{ transform: 'translateZ(16px)' }}>
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 shadow-2xs">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Mileage</span>
                      <span className="font-extrabold font-mono text-slate-800">{car.mileageKm.toLocaleString()} km</span>
                    </div>
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 shadow-2xs">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Location</span>
                      <span className="font-extrabold text-slate-800">Lekki Showroom</span>
                    </div>
                  </div>

                  {/* Bottom Strip */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between" style={{ transform: 'translateZ(24px)' }}>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-bold">Showroom Price</span>
                      <span className="text-xl font-black text-emerald-800 font-mono inline-flex items-center gap-0.5">
                        {currency === 'NGN' ? (
                          <>
                            <Naira />
                            <span>{(car.priceNgn / 1000000).toFixed(1)}M</span>
                          </>
                        ) : (
                          `$${car.priceUsd.toLocaleString()}`
                        )}
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectVehicle(car);
                      }}
                      className="px-4 py-2 btn-3d-emerald text-xs font-bold rounded-xl"
                    >
                      Inspect Car
                    </button>
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </div>
      )}

      {/* Banner for Custom Sourcing: Clean Forest Green & White accent */}
      <div className="bg-gradient-to-r from-[#064E3B] to-[#043E2F] text-white border border-emerald-700/60 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-lg font-bold text-white">Can't Find Your Desired Specification?</h3>
          <p className="text-xs text-emerald-100 max-w-xl">
            We provide direct vehicle importation from Copart, Manheim, and IAAI with custom trim levels, exterior paint colors, and verified accident histories.
          </p>
        </div>
        <button
          onClick={onBookInspection}
          className="px-5 py-3 bg-lime-400 hover:bg-lime-300 text-emerald-950 font-bold text-xs rounded-xl transition-colors cursor-pointer whitespace-nowrap shadow"
        >
          Request Custom Import Quotation
        </button>
      </div>
    </div>
  );
};
