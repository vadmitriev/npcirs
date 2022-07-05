import React, { useState, useEffect } from 'react';
import {
  Container,
  List,
  Input,
  Card,
  InputOnChangeData,
  Icon,
  ListItemProps,
  Header,
  Message,
  Segment,
} from 'semantic-ui-react';
import useDebounce from '../../hooks/useDebounce';
import { IRegion } from '../../interfaces/Region';

interface RegionsListProps {
  onChange: (regionId: string) => void;
  data: IRegion[];
}

declare var Ext: any;

const RegionsList: React.FC<RegionsListProps> = ({
  onChange,
  data = [],
}) => {
  const [items, setItems] = useState(data);
  const [filteredItems, setFilteredItems] = useState(data);
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    setItems(data);
    setFilteredItems(data);
  }, [data]);

  const store = Ext.create('Ext.data.Store', {
    autoLoad: true,
    data: filteredItems,
    sorters: ['p01'],
  });

  const handleSearch = (
    _: React.ChangeEvent<HTMLInputElement>,
    data: InputOnChangeData,
  ) => {
    const text = data.value.toLowerCase();
    setQuery(text);
  };

  useEffect(() => {
    const newItems = items.filter((item) => {
      return (
        item.p01 && item.p01.toLowerCase().includes(debouncedQuery)
      );
    });
    setFilteredItems(newItems);
  }, [debouncedQuery]);

  const handleSelect = (
    _: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    data: ListItemProps,
  ) => {
    onChange(data.name);
  };

  const clearSearch = () => {
    setQuery('');
    setFilteredItems(items);
  };

  const clearIcon = query.length && (
    <Icon
      name="x"
      style={{ cursor: 'pointer', zIndex: 10, pointerEvents: 'auto' }}
      onClick={clearSearch}
    />
  );

  return (
    <div style={{ maxWidth: '200px' }}>
      <Container textAlign="center">
        <Message attached size="small">
          <Message.Header>Субъект РФ</Message.Header>
          <Message.Content>
            <Input
              icon={clearIcon || 'search'}
              placeholder="Поиск"
              onChange={handleSearch}
              style={{ maxWidth: '170px', marginTop: '10px' }}
              value={query}
            />
          </Message.Content>
        </Message>
        <Segment
          style={{
            marginTop: '0',
            overflow: 'auto',
            maxHeight: '70vh',
          }}
        >
          <List>
            {filteredItems.map((item) => (
              <Card key={item.p00}>
                <List.Item
                  name={item.p00}
                  style={{ margin: '1px', cursor: 'pointer' }}
                  onClick={handleSelect}
                >
                  {item.p01}
                </List.Item>
              </Card>
            ))}
          </List>
        </Segment>
      </Container>
    </div>
  );
};

export default RegionsList;
