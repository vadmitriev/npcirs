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
import { IOrganization } from '../../interfaces/Organization';

declare var Ext: any;

interface DeliveriesTableProps {
  onAddItem: () => void;
  onDeleteItem: (item: IOrganization | null) => void;
  onChangeItem: (item: IOrganization) => void;
}

const DeliveriesTable: React.FC<DeliveriesTableProps> = ({
  onAddItem,
  onChangeItem,
  onDeleteItem,
}) => {
  const store = Ext.create('Ext.data.Store', {
    autoLoad: true,
    proxy: {
      type: 'rest',
      url: 'resources/data/people.json',
    },
    sorters: ['last_name', 'first_name'],
  });

  return (
    <Grid
      store={store}
      plugins={{ cellediting: true }}
      height="100%"
      width="100%"
      columnLines={true}
      selectable={{ checkbox: true }}
      columns={[
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
      ]}
    >
      <Toolbar docked="top">
        <Button
          text="Добавить"
          ui="confirm alt"
          onTap={onAddItem}
        />
        <Spacer />
        <Button text="Удалить" ui="action" onTap={onDeleteItem} />
      </Toolbar>
    </Grid>
  );
};

export default DeliveriesTable;
