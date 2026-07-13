import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import FilterSidebar from '../components/FilterSidebar';
import { properties } from '../data/properties';
import { Search, X, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];
const INITIAL_SHOW = 8;

export default function PropertiesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [visibleCount, setVisibleCount] = useState(INITIAL_SHOW);

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

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.status!== 'all') params.set('status', filters.status);
    if (filters.location) params.set('location', filters.location);
    if (filters.type) params.set('type', filters.type);
    if (filters.search.trim()) params.set('search', filters.search.trim());
    setSearchParams(params, { replace: true });
    setVisibleCount(INITIAL_SHOW);
  }, [filters, setSearchParams]);

  useEffect(() => {
    setFilters({
      status: urlStatus,
      location: urlLocation,
      type: urlType,
      search: urlSearch
    });
  }, [urlStatus, urlLocation, urlType, urlSearch]);

  const filteredProperties = useMemo(() => {
    let result = properties;
    if (filters.status!== 'all') result = result.filter(p => p.status.toLowerCase() === filters.status);
    if (filters.location) result = result.filter(p => p.location.toLowerCase().replace(' ', '-') === filters.location);
    if (filters.type) result = result.filter(p => p.category.toLowerCase() === filters.type);
    if (filters.search.trim()) {
      const query = filters.search.toLowerCase();
      result = result.filter(p => p.title.toLowerCase().includes(query) || p.location.toLowerCase().includes(query));
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
    <div className="min-h-screen bg-brick-white pt-24">
      <div className="mx-auto max-w-7xl px-8 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="mb-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <p className="text-brick-gold text-xs tracking-[0.2em] uppercase mb-3">Browse</p>
            <h1 className="font-serif text-5xl md:text-6xl text-brick-black">
              {pageTitle}
            </h1>
            <p className="mt-3 text-sm text-brick-muted">
              {filteredProperties.length} properties found in Accra
              {filters.location && ` • ${filters.location.replace('-', ' ')}`}
            </p>
          </div>

          <div className="flex w-full gap-3 lg:w-auto">
            <div className="flex flex-1 border border-brick-subtle bg-brick-white lg:w-80">
              <input
                type="text"
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
                placeholder="Search location or title..."
                className="flex-1 bg-transparent px-4 py-3 text-sm text-brick-charcoal outline-none placeholder:text-brick-muted"
              />
              {filters.search? (
                <button onClick={() => setFilters({...filters, search: ''})} className="p-3 text-brick-muted hover:text-brick-charcoal">
                  <X className="h-4 w-4" />
                </button>
              ) : (
                <div className="p-3 text-brick-gold">
                  <Search className="h-4 w-4" />
                </div>
              )}
            </div>
            <button
              onClick={() => setShowFilters(true)}
              className="flex items-center gap-2 border border-brick-subtle bg-brick-white px-5 py-3 text-xs font-medium uppercase tracking-[0.15em] text-brick-charcoal transition-luxe hover:border-brick-charcoal lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filter
            </button>
          </div>
        </motion.div>

        {/* Status Tabs */}
        <div className="mb-12 flex gap-8 border-b border-brick-subtle">
          {['all', 'sale', 'rent', 'new build'].map(status => (
            <button
              key={status}
              onClick={() => setFilters({...filters, status})}
              className={`pb-4 text-sm font-medium uppercase tracking-[0.15em] transition-luxe ${
                filters.status === status
                ? 'text-brick-black border-b-2 border-brick-gold'
                  : 'text-brick-muted hover:text-brick-charcoal'
              }`}
            >
              {status === 'all'? 'All' : status === 'new build'? 'New Builds' : `For ${status}`}
            </button>
          ))}
        </div>

        <div className="flex gap-12">
          {/* Sidebar - Desktop */}
          <div className="hidden lg:block w-72">
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
                  className="fixed inset-0 z-40 bg-brick-black/60 backdrop-blur-sm lg:hidden"
                />
                <motion.div
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ duration: 0.5, ease }}
                  className="fixed right-0 top-0 z-50 h-full w-full max-w-sm bg-brick-white lg:hidden"
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
                <p className="font-serif text-2xl text-brick-black mb-4">No properties found</p>
                <button
                  onClick={clearFilters}
                  className="text-sm font-medium uppercase tracking-[0.15em] text-brick-gold hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
                  {visibleProperties.map((property, i) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>

                {hasMore && (
                  <div className="mt-16 text-center">
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setVisibleCount(prev => prev + INITIAL_SHOW)}
                      className="border border-brick-charcoal px-10 py-4 text-xs font-medium uppercase tracking-[0.2em] text-brick-charcoal transition-luxe hover:bg-brick-charcoal hover:text-brick-white"
                    >
                      Load More Properties
                    </motion.button>
                    <p className="mt-4 text-xs text-brick-muted">
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