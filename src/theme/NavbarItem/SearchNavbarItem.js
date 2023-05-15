import React from 'react';
import SearchBar from '@theme/SearchBar';
export default function SearchNavbarItem({mobile}) {
  if (mobile) {
    return null;
  }

  return <SearchBar />;
}
