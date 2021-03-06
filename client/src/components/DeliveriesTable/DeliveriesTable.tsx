import React, { useRef } from 'react';

import { Grid } from '@sencha/ext-react-modern';
import {
  Button,
  Message,
  ButtonGroup,
  Segment,
  Icon,
} from 'semantic-ui-react';

import { IOrganization } from '../../interfaces/Organization';

import { IRegion } from '../../interfaces/Region';
import isInn from 'is-inn-js';

import './DeliveriesTable.css';

declare let Ext: any;

interface DeliveriesTableProps {
  data: IOrganization[];
  onAddItem: () => void;
  onDeleteItem: (ids: string[]) => void;
  onChangeItem: (item: IOrganization) => void;
  onRefresh: () => void;
  onSaveFile: () => void;
  currentRegion: IRegion;
}

const DeliveriesTable: React.FC<DeliveriesTableProps> = ({
  data,
  onAddItem,
  onChangeItem,
  onDeleteItem,
  onRefresh,
  onSaveFile,
  currentRegion,
}) => {
  const handleUpdateRecord = (_, record, operation) => {
    if (operation === 'edit') {
      const item: IOrganization = record.data;
      onChangeItem(item);
    }
  };

  const store = Ext.data.Store({
    data,
    listeners: {
      update: handleUpdateRecord,
    },
  });

  const gridRef = useRef<any>(null);

  const handleDelete = () => {
    const grid = gridRef.current.cmp;
    const records = grid.getSelections();
    if (!records || !records.length) {
      return;
    }

    const ids: string[] = records.map((record) => {
      const item: IOrganization = record.data;
      return item.id;
    });

    onDeleteItem(ids);
  };

  const handleUpdate = (hm, hm2, hm3) => {
    console.log(hm, hm2, hm3);
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
          width: '130px',
        },
        {
          text: 'Местонахождение',
          dataIndex: 'adr_fact',
          editable: true,
          draggable: false,
          width: '150px',
        },
        {
          text: 'ИНН',
          dataIndex: 'inn',
          editable: true,
          draggable: false,
          editor: {
            xtype: 'numberfield',
            allowBlank: false,
            flex: 1,
            validator: function (value) {
              return isInn(value) || 'Неправильный формат ИНН';
            },
          },
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
          editor: {
            xtype: 'numberfield',
            allowBlank: false,
            flex: 1,
          },
        },
        {
          text: 'Цена (тыс. руб. за один литр)',
          dataIndex: 'plazma_cena',
          editable: true,
          draggable: false,
          editor: {
            xtype: 'numberfield',
            allowBlank: false,
            flex: 1,
          },
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
          editor: {
            xtype: 'numberfield',
            allowBlank: false,
            flex: 1,
          },
        },
        {
          text: 'Цена (тыс. руб. за один литр)',
          dataIndex: 'erm_cena',
          editable: true,
          draggable: false,
          editor: {
            xtype: 'numberfield',
            allowBlank: false,
            flex: 1,
          },
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
          editor: {
            xtype: 'numberfield',
            allowBlank: false,
            flex: 1,
          },
        },
        {
          text: 'Цена (тыс. руб. за один литр)',
          dataIndex: 'immg_cena',
          editable: true,
          draggable: false,
          editor: {
            xtype: 'numberfield',
            allowBlank: false,
            flex: 1,
          },
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
          editor: {
            xtype: 'numberfield',
            allowBlank: false,
            flex: 1,
          },
        },
        {
          text: 'Цена (тыс. руб. за один литр)',
          dataIndex: 'alb_cena',
          editable: true,
          draggable: false,
          editor: {
            xtype: 'numberfield',
            allowBlank: false,
            flex: 1,
          },
        },
      ],
    },
  ];

  return (
    <div className="table-wrapper">
      <Message style={{ backgroundColor: 'white' }}>
        <ButtonGroup>
          <Button primary onClick={onAddItem}>
            Добавить
          </Button>
          <Button
            negative
            onClick={handleDelete}
            style={{ marginLeft: '10px' }}
          >
            Удалить
          </Button>
        </ButtonGroup>
        <ButtonGroup floated="right">
          {currentRegion && (
            <Button
              primary
              icon
              onClick={onSaveFile}
              style={{ marginLeft: '10px' }}
            >
              <Icon name="save" />
            </Button>
          )}
          <Button
            icon
            onClick={onRefresh}
            style={{ marginLeft: '10px' }}
          >
            <Icon name="refresh" />
          </Button>
        </ButtonGroup>
      </Message>
      <Segment style={{ height: '75vh' }}>
        <Grid
          ref={gridRef}
          store={store}
          data={data}
          plugins={{ cellediting: true }}
          height="100%"
          width="100%"
          rowNumbers={true}
          columnLines={true}
          selectable={{ checkbox: true }}
          columnResize={false}
          columns={columns}
          onUpdateData={handleUpdate}
        />
      </Segment>
    </div>
  );
};

export default DeliveriesTable;
