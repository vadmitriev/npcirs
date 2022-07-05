import React, { useState, useEffect } from 'react';
import { toast, SemanticToastContainer } from 'react-semantic-toasts';

import { Message, Dimmer, Loader } from 'semantic-ui-react';
import OrganizationService from '../../api/OrganizationService';
import RegionService from '../../api/RegionService';
import {
  DeliveriesTable,
  OrganizationModal,
  RegionsList,
} from '../../containers';
import { IOrganization } from '../../interfaces/Organization';
import { IRegion } from '../../interfaces/Region';

const Deliveries: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [regionData, setRegionData] = useState<IRegion[]>([]);
  const [organizationData, setOrganizationData] = useState([]);
  const [currentRegion, setCurrentRegion] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const showToast = (
    title: string,
    type: 'success' | 'error' | 'info' = 'error',
  ) => {
    toast({
      type,
      title,
      icon: 'time',
      animation: 'bounce',
      size: 'small',
      time: 5000,
    });
  };

  useEffect(() => {
    setIsLoading(true);

    RegionService.load()
      .then((result) => {
        setRegionData(result.data.data);
      })
      .catch((err) => {
        setError(err);
        showToast('Произошла ошибка');
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (!currentRegion) {
      return;
    }

    setIsLoading(true);

    OrganizationService.load(currentRegion)
      .then((res) => {
        setOrganizationData(res.data.data);
      })
      .catch((err) => {
        setError(err);
        showToast('Произошла ошибка');
      })
      .finally(() => setIsLoading(false));
  }, [currentRegion]);

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleModalSubmit = (data: IOrganization) => {
    setModalVisible(true);

    OrganizationService.create(currentRegion, data)
      .then(() => OrganizationService.load(currentRegion))
      .then((res) => {
        setOrganizationData(res.data.data);
        showToast('Организация добавлена', 'success');
      })
      .catch((err) => {
        setError(err);
        showToast('Произошла ошибка');
      })
      .finally(() => setIsLoading(false));

    setModalVisible(false);
  };

  const handleRegionChange = (regionId: string) => {
    setCurrentRegion(regionId);
  };

  const handleDeleteItem = (id: string) => {
    setIsLoading(true);

    OrganizationService.delete(currentRegion, id)
      .then(() => OrganizationService.load(currentRegion))
      .then((res) => {
        setOrganizationData(res.data.data);
        showToast('Организация удалена', 'success');
      })
      .catch((err) => {
        setError(err);
        showToast('Произошла ошибка');
      });
  };

  const handleTableChange = (newItem: IOrganization) => {
    OrganizationService.update(currentRegion, newItem);
  };

  return (
    <div>
      <Dimmer active={isLoading}>
        <Loader>Идет загрузка</Loader>
      </Dimmer>
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
          data={organizationData}
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
      <SemanticToastContainer position="bottom-right" />
    </div>
  );
};

export default Deliveries;
