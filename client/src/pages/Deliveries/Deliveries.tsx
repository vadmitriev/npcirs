import React, { useState, useEffect } from 'react';
import { toast } from 'react-semantic-toasts';

import {
  Message,
  Dimmer,
  Loader,
  SemanticICONS,
} from 'semantic-ui-react';
import OrganizationService from '../../api/OrganizationService';
import RegionService from '../../api/RegionService';
import {
  DeliveriesTable,
  OrganizationModal,
  RegionsList,
} from '../../components';
import { IOrganization } from '../../interfaces/Organization';
import { IRegion } from '../../interfaces/Region';

const Deliveries: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(true);
  const [regionData, setRegionData] = useState<IRegion[]>([]);
  const [organizationData, setOrganizationData] = useState([]);
  const [currentRegion, setCurrentRegion] = useState<IRegion>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [, setError] = useState(null);

  const showToast = (
    title: string,
    type: 'success' | 'error' | 'info' = 'error',
  ) => {
    let icon: SemanticICONS;
    switch (type) {
      case 'success':
        icon = 'check';
        break;
      case 'error':
        icon = 'bug';
        break;
      default:
        icon = 'info';
        break;
    }

    toast({
      type,
      title,
      icon,
      animation: 'bounce',
      size: 'large',
      time: 5000,
    });
  };

  const loadOrganizationData = async () => {
    if (!currentRegion) {
      return;
    }
    return await OrganizationService.load(currentRegion.p00).then(
      (res) => setOrganizationData(res.data.data),
    );
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

    loadOrganizationData()
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

    OrganizationService.create(currentRegion.p00, data)
      .then(loadOrganizationData)
      .then(() => {
        showToast('Организация добавлена', 'success');
      })
      .catch((err) => {
        setError(err);
        showToast('Произошла ошибка');
      })
      .finally(() => setIsLoading(false));

    setModalVisible(false);
  };

  const handleRegionChange = (region) => {
    setCurrentRegion(region);
  };

  const handleDeleteItem = async (ids: string[]) => {
    const regionId = currentRegion.p00;

    const promises = ids.map((id) => {
      OrganizationService.delete(regionId, id);
    });

    Promise.all(promises)
      .then(() => {
        showToast('Элементы удалены', 'success');
      })
      .then(loadOrganizationData)
      .then(() => setIsLoading(false))
      .catch((err) => {
        setIsLoading(false);
        setError(err);
        showToast('Произошла ошибка при удалении', 'error');
      });
  };

  const handleTableChange = (newItem: IOrganization) => {
    console.log('update', newItem);
    OrganizationService.update(currentRegion.p00, newItem).catch(
      (err) => {
        setError(err);
        showToast('Произошла ошибка');
      },
    );
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

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
        }}
      >
        <RegionsList
          onChange={handleRegionChange}
          data={regionData}
          activeItem={currentRegion}
        />
        <div style={{ width: '100%' }}>
          <DeliveriesTable
            data={organizationData}
            onAddItem={() => setModalVisible(true)}
            onDeleteItem={handleDeleteItem}
            onChangeItem={handleTableChange}
            onRefresh={loadOrganizationData}
          />
        </div>

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
