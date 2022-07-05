import React from 'react';

import { Message } from 'semantic-ui-react';
import {
  Grid,
  Toolbar,
  SearchField,
  Column,
  Spacer,
  Button,
} from '@sencha/ext-react-modern';
import { small, medium } from '../../utils/responsiveFormulas';

import data from './data';

// declare var Ext: any;
const Ext = window['Ext'];

const Deliveries: React.FC = () => {
  let query;

  const store = Ext.create('Ext.data.Store', {
    fields: [
      'name',
      'email',
      'phone',
      'hoursTaken',
      'hoursRemaining',
    ],
    data,
  });

  const onSearch = (d1, d2, d3) => {
    console.log('search', d1, d2, d3);
    // const query1 = query.cmp.getValue().toLowerCase();
    // store.clearFilter();
    // if (query1.length)
    //   store.filterBy((record) => {
    //     const { name, email, phone } = record.data;
    //     return (
    //       name.toLowerCase().indexOf(query1) !== -1 ||
    //       email.toLowerCase().indexOf(query1) !== -1 ||
    //       phone.toLowerCase().indexOf(query1) !== -1
    //     );
    //   });
  };

  const openModal = () => {
    console.log('open modal');
  };

  const deleteRows = (d1, d2) => {
    console.log('delete rows', d1, d2);
  };

  return (
    <div>
      <Message>
        <Message.Header>
          Форма МПЭ 1гем - Номенклатура продукции и возможности
          подведомственных организаций по заготовке компонентов
          донорской крови
        </Message.Header>
        <p>
          слева - список субъектов РФ, справа - перечень организаций
          этого субъекта
        </p>
      </Message>

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
            onTap={() => openModal()}
          />
          <Spacer />
          <Button text="Удалить" ui="action" onTap={deleteRows} />
        </Toolbar>
      </Grid>
    </div>
  );
};

export default Deliveries;
