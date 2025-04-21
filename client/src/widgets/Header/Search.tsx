'use client';
import { Input } from '@/shared/ui';
import { SearchIcon, XIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Search = () => {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/catalog?search=${search}`);
  };

  return (
    <div>
      {isOpen ? (
        <div className="flex items-center gap-2">
          <form onSubmit={handleSubmit}>
            <Input
              className="text-white"
              type="text"
              placeholder="Search"
              value={search}
              onChange={handleSearch}
            />
          </form>
          <XIcon
            onClick={() => setIsOpen(!isOpen)}
            className="text-white size-6"
          />
        </div>
      ) : (
        <SearchIcon
          onClick={() => setIsOpen(!isOpen)}
          className="text-white size-6"
        />
      )}
    </div>
  );
};

export { Search };
