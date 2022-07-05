import React, { useState, useEffect } from 'react';

import { Message } from 'semantic-ui-react';
import {
  DeliveriesTable,
  OrganizationModal,
  RegionsList,
} from '../../containers';

import { small, medium } from '../../utils/responsiveFormulas';

declare var Ext: any;
// const Ext = window['Ext'];

const Deliveries: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [regionData, setRegionData] = useState([]);
  const [organizationData, setOrganizationData] = useState([]);
  const [currentRegion, setCurrentRegion] = useState(null);

  const openModal = () => {
    console.log('open modal');
  };

  const deleteRows = (d1, d2) => {
    console.log('delete rows', d1, d2);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleModalSubmit = (data) => {
    // TODO: save data
    setModalVisible(false);
  };

  const handleRegionChange = (region) => {
    setCurrentRegion(region);
  };

  const handleDeleteItem = () => {};

  const handleTableChange = (selected) => {
    console.log('table change', selected);
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

      <div style={{ display: 'flex' }}>
        <RegionsList
          onChange={handleRegionChange}
          data={regionData}
        />
        <DeliveriesTable
          onAddItem={() => setModalVisible(true)}
          onDeleteItem={handleDeleteItem}
          onChangeItem={handleTableChange}
        />

        <OrganizationModal
          visible={modalVisible}
          onClose={handleModalClose}
          onSubmit={handleModalSubmit}
        />
      </div>
    </div>
  );
};

export default Deliveries;
