import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import FilterSidebar from '../components/FilterSidebar';
import { properties } from '../data/properties';
import { Search, X, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const INITIAL_SHOW = 8;

export default function PropertiesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [visibleCount, setVisibleCount] = useState(INITIAL_SHOW);

  // Read from URL
  const urlStatus = searchParams.get('status') || 'all';
  const urlLocation = searchParams.get('location') || '';
  const urlType = searchParams.get('type') || '';
  const urlSearch = searchParams.get('search') || '';

  const [filters, setFilters] = useState({
    status: urlStatus,
    location: urlLocation,
    type: urlType,
    search: urlSearch
  });

  // Sync URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.status!== 'all') params.set('status', filters.status);
    if (filters.location) params.set('location', filters.location);
    if (filters.type) params.set('type', filters.type);
    if (filters.search.trim()) params.set('search', filters.search.trim());
    setSearchParams(params, { replace: true });
    setVisibleCount(INITIAL_SHOW); // Reset pagination on filter change
  }, [filters, setSearchParams]);

  // Update state when URL changes back/forward
  useEffect(() => {
    setFilters({
      status: urlStatus,
      location: urlLocation,
      type: urlType,
      search: urlSearch
    });
  }, [urlStatus, urlLocation, urlType, urlSearch]);

  // Filter properties
  const filteredProperties = useMemo(() => {
    let result = properties;

    if (filters.status!== 'all') {
      result = result.filter(p => p.status.toLowerCase() === filters.status);
    }

    if (filters.location) {
      result = result.filter(p =>
        p.location.toLowerCase().replace(' ', '-') === filters.location
      );
    }

    if (filters.type) {
      result = result.filter(p => p.category.toLowerCase() === filters.type);
    }

    if (filters.search.trim()) {
      const query = filters.search.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.location.toLowerCase().includes(query)
      );
    }

    return result;
  }, [filters]);

  const visibleProperties = filteredProperties.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProperties.length;

  const clearFilters = () => {
    setFilters({ status: 'all', location: '', type: '', search: '' });
  };

  const pageTitle =
    filters.status === 'rent'? 'Properties For Rent' :
    filters.status === 'sale'? 'Properties For Sale' :
    filters.status === 'new build'? 'New Developments' : 'All Properties';

  return (
    <div className="min-h-screen bg-brick-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 pt-24">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="mb-2 text-4xl font-black tracking-tight md:text-5xl">
              {pageTitle}
            </h1>
            <p className="text-zinc-400">
              {filteredProperties.length} properties found in Accra
              {filters.location && ` • ${filters.location.replace('-', ' ')}`}
            </p>
          </div>

          {/* Search + Filter Toggle */}
          <div className="flex w-full gap-3 lg:w-auto">
            <div className="flex flex-1 rounded-2xl border border-white/10 bg-brick-card lg:w-80">
              <input
                type="text"
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
                placeholder="Search by location or title..."
                className="flex-1 bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-500"
              />
              {filters.search && (
                <button
                  onClick={() => setFilters({...filters, search: ''})}
                  className="p-3 text-zinc-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
              <div className="m-1 rounded-xl bg-brick-gold p-2 text-brick-navy">
                <Search className="h-4 w-4" />
              </div>
            </div>
            <button
              onClick={() => setShowFilters(true)}
              className="flex items-center gap-2 rounded-2xl border border-white/10 bg-brick-card px-4 py-3 text-white lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Status Tabs */}
        <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
          {['all', 'sale', 'rent', 'new build'].map(status => (
            <button
              key={status}
              onClick={() => setFilters({...filters, status})}
              className={`whitespace-nowrap rounded-full px-6 py-2 text-sm font-semibold transition ${
                filters.status === status
                 ? 'bg-brick-gold text-brick-navy'
                  : 'bg-brick-card text-zinc-300 hover:bg-brick-card/80'
              }`}
            >
              {status === 'all'? 'All' : status === 'new build'? 'New Builds' : `For ${status}`}
            </button>
          ))}
        </div>

        <div className="flex gap-8">
          {/* Sidebar - Desktop */}
          <div className="hidden lg:block">
            <FilterSidebar filters={filters} setFilters={setFilters} />
          </div>

          {/* Mobile Sidebar */}
          <AnimatePresence>
            {showFilters && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowFilters(false)}
                  className="fixed inset-0 z-40 bg-black/60 lg:hidden"
                />
                <motion.div
                  initial={{ x: -320 }}
                  animate={{ x: 0 }}
                  exit={{ x: -320 }}
                  className="lg:hidden"
                >
                  <FilterSidebar
                    filters={filters}
                    setFilters={setFilters}
                    isOpen={showFilters}
                    onClose={() => setShowFilters(false)}
                  />
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Properties Grid */}
          <div className="flex-1">
            {filteredProperties.length === 0? (
              <div className="py-32 text-center">
                <p className="mb-4 text-xl text-zinc-400">No properties found</p>
                <button
                  onClick={clearFilters}
                  className="font-semibold text-brick-gold hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <>
                <motion.div
                  layout
                  className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
                >
                  <AnimatePresence initial={false}>
                    {visibleProperties.map((property, i) => (
                      <motion.div
                        key={property.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2, delay: i * 0.03 }}
                      >
                        <PropertyCard property={property} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>

                {hasMore && (
                  <div className="mt-12 text-center">
                    <button
                      onClick={() => setVisibleCount(prev => prev + INITIAL_SHOW)}
                      className="inline-flex items-center gap-2 rounded-full border-2 border-brick-gold px-8 py-3 font-bold text-brick-gold transition hover:bg-brick-gold hover:text-brick-navy"
                    >
                      Show More <ChevronDown className="h-4 w-4" />
                    </button>
                    <p className="mt-3 text-sm text-zinc-500">
                      Showing {visibleCount} of {filteredProperties.length} properties
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
