import React, { useState, useEffect } from 'react';
import { toast } from 'react-semantic-toasts';

import {
  Message,
  Dimmer,
  Loader,
  SemanticICONS,
  Header,
} from 'semantic-ui-react';

import { saveAs } from 'file-saver';

import OrganizationService from '../../services/OrganizationService';
import RegionService from '../../services/RegionService';
import {
  DeliveriesTable,
  OrganizationModal,
  RegionsList,
} from '../../components';

import { IOrganization } from '../../interfaces/Organization';
import { IRegion } from '../../interfaces/Region';
import DocumentCreator from '../../packages/DocumentCreator';
import { Packer } from 'docx';
import {
  achievements,
  education,
  experiences,
  skills,
} from '../../services/data';
import {
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { routeNames } from '../../routes/routes';

const Deliveries: React.FC = () => {
  const navigator = useNavigate();
  const params = useParams();

  const [modalVisible, setModalVisible] = useState(false);
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

  useEffect(() => {
    if (!params.id) {
      setCurrentRegion(null);
    }

    if (regionData && params.id) {
      const region = regionData.find((r) => r.p00 === params.id);
      if (region) {
        setCurrentRegion(region);
      }
    }
  }, [params, regionData]);

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
        console.log(err);
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
        console.log(err);
        showToast('Произошла ошибка');
      })
      .finally(() => setIsLoading(false));
  }, [currentRegion]);

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleModalSubmit = (data: IOrganization) => {
    setModalVisible(true);

    OrganizationService.create(data.r1022, data)
      .then(() => {
        showToast('Организация добавлена', 'success');
      })
      .then(loadOrganizationData)
      .catch((err) => {
        setError(err);
        console.log(err);
        showToast('Произошла ошибка');
      })
      .finally(() => setIsLoading(false));

    setModalVisible(false);
  };

  const handleRegionChange = (region: IRegion) => {
    setCurrentRegion(region);
    const url = `${routeNames.DELIVERIES}/${region.p00}`;
    navigator(url);
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
        console.log(err);
        showToast('Произошла ошибка при удалении', 'error');
      });
  };

  const handleTableChange = (newItem: IOrganization) => {
    console.log('update', newItem);
    OrganizationService.update(currentRegion.p00, newItem).catch(
      (err) => {
        setError(err);
        console.log(err);
        showToast('Произошла ошибка');
      },
    );
  };

  const handleSaveFile = async () => {
    if (!currentRegion) {
      showToast('Не выбран регион', 'info');
      return;
    }
    setIsLoading(true);

    const documentCreator = new DocumentCreator();
    const table = documentCreator.create(
      currentRegion,
      organizationData,
    );

    Packer.toBlob(table)
      .then((blob) => {
        setIsLoading(false);

        const fileName = `${
          currentRegion.p01
        }-донорские-организации-${new Date()
          .toISOString()
          .slice(0, 10)}.docx`;

        saveAs(blob, fileName);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
        console.log(err);
        showToast('Произошла ошибка');
      });
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
        {/* <div style={{ width: '100%' }}> */}
        {currentRegion ? (
          <DeliveriesTable
            data={organizationData}
            onAddItem={() => setModalVisible(true)}
            onDeleteItem={handleDeleteItem}
            onChangeItem={handleTableChange}
            onRefresh={loadOrganizationData}
            onSaveFile={handleSaveFile}
            currentRegion={currentRegion}
          />
        ) : (
          <div
            style={{
              width: '80%',
              height: '100%',
              position: 'relative',
            }}
          >
            <Header
              as="h2"
              style={{
                width: '100%',
                textAlign: 'center',
                // position: 'absolute',
                // top: '50%',
                transform: 'translate(0, -50%)',
                marginTop: '10%',
              }}
            >
              Выберите регион из списка
            </Header>
          </div>
        )}

        {/* </div> */}

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
