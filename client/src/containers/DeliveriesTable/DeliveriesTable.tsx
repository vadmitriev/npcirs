import React, { useState, useEffect, useRef } from 'react';

import { Grid, Container } from '@sencha/ext-react-modern';
import { Menu, Button } from 'semantic-ui-react';

import { IOrganization } from '../../interfaces/Organization';

declare var Ext: any;

interface DeliveriesTableProps {
  data: IOrganization[];
  onAddItem: () => void;
  onDeleteItem: (id: string) => void;
  onChangeItem: (item: IOrganization) => void;
}

const DeliveriesTable: React.FC<DeliveriesTableProps> = ({
  data,
  onAddItem,
  onChangeItem,
  onDeleteItem,
}) => {
  const store = Ext.create('Ext.data.Store', {
    autoLoad: true,
    data,
  });

  const gridRef = useRef<any>(null);

  const handleDelete = () => {
    const records = gridRef.current.cmp.getSelections(); //.getSelections());
    if (!records || !records.length) {
      return;
    }

    records.forEach((record) => {
      console.log(record.data);
      const item: IOrganization = record.data;
      onDeleteItem(item.id);
    });
    // onDeleteItem()
  };

  const columns = [
    {
      text: 'Организация-исполнитель',
      menuDisabled: true,
      columns: [
        {
          text: 'Наименование',
          dataIndex: 'naim_org',
          editable: true,
          draggable: false,
        },
        {
          text: 'Местонахождение',
          dataIndex: 'adr_fact',
          editable: true,
          draggable: false,
        },
        {
          text: 'ИНН',
          dataIndex: 'inn',
          editable: true,
          draggable: false,
        },
      ],
    },
    {
      text: 'Плазма свежезамор.',
      menuDisabled: true,
      columns: [
        {
          text: 'Макс. об. (тыс. литров)',
          dataIndex: 'plazma_max',
          editable: true,
          draggable: false,
        },
        {
          text: 'Цена (тыс. руб. за один литр)',
          dataIndex: 'plazma_cena',
          editable: true,
          draggable: false,
        },
      ],
    },
    {
      text: 'Эритроцитарная масса',
      menuDisabled: true,
      columns: [
        {
          text: 'Макс. об. (тыс. литров)',
          dataIndex: 'erm_max',
          editable: true,
          draggable: false,
        },
        {
          text: 'Цена (тыс. руб. за один литр)',
          dataIndex: 'erm_cena',
          editable: true,
          draggable: false,
        },
      ],
    },
    {
      text: 'Иммуноглобулин человека',
      menuDisabled: true,
      columns: [
        {
          text: 'Макс. об. (тыс. литров)',
          dataIndex: 'immg_max',
          editable: true,
          draggable: false,
        },
        {
          text: 'Цена (тыс. руб. за один литр)',
          dataIndex: 'immg_cena',
          editable: true,
          draggable: false,
        },
      ],
    },
    {
      text: 'Альбумин 10-процентный',
      menuDisabled: true,
      columns: [
        {
          text: 'Макс. об. (тыс. литров)',
          dataIndex: 'alb_max',
          editable: true,
          draggable: false,
        },
        {
          text: 'Цена (тыс. руб. за один литр)',
          dataIndex: 'alb_cena',
          editable: true,
          draggable: false,
        },
      ],
    },
  ];

  return (
    <div
      style={{
        marginLeft: '20px',
        width: '87%',
        position: 'relative',
      }}
    >
      <Menu>
        <Menu.Item>
          <Button primary onClick={onAddItem}>
            Добавить
          </Button>
        </Menu.Item>

        <Menu.Item>
          <Button negative onClick={handleDelete}>
            Удалить
          </Button>
        </Menu.Item>
      </Menu>
      <Grid
        ref={gridRef}
        store={store}
        plugins={{ cellediting: true }}
        height="100%"
        width="100%"
        columnLines={true}
        selectable={{ checkbox: true }}
        style={{
          marginLeft: '20px',
          width: '100%',
          display: 'inline-flex',
        }}
        columns={columns}
      />
    </div>
  );
};

export default DeliveriesTable;
