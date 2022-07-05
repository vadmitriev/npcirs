import React, { useState, useEffect } from 'react';
import {
  Grid,
  Toolbar,
  SearchField,
  Column,
  Spacer,
  Button,
  List,
} from '@sencha/ext-react-modern';
import { IRegion } from '../../interfaces/Region';

interface RegionsListProps {
  onChange: (item: IRegion) => void;
  data: IRegion[];
}

declare var Ext: any;

const RegionsList: React.FC<RegionsListProps> = ({
  onChange,
  data = [],
}) => {
  const [items, setItems] = useState(data);
  const [filteredItems, setFilteredItems] = useState(data);

  useEffect(() => {
    setItems(data);
    setFilteredItems(data);
  }, [data]);

  const store = Ext.create('Ext.data.Store', {
    autoLoad: true,
    data: filteredItems,
    sorters: ['p01'],
  });

  const handleSearch = (query) => {
    setFilteredItems((prev) =>
      prev.filter((item) =>
        item.p01.toLowerCase().includes(query.toLowerCase()),
      ),
    );
  };

  const handleSelect = ({ selected: { data } }) => {
    onChange(data);
  };

  const clearSearch = () => {
    setFilteredItems(items);
  };

  const tpl = (item) => (
    <div>
      <div style={{ fontSize: '16px', marginBottom: '5px' }}>
        {item.p01}
      </div>
    </div>
  );

  return (
    <List
      shadow
      itemTpl={tpl}
      store={store}
      onSelect={handleSelect}
      platformConfig={{
        '!phone': {
          height: 450,
          width: 300,
        },
      }}
    />
  );
};

export default RegionsList;
