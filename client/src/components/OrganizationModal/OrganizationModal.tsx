import React, { useEffect, useState } from 'react';

import {
  Button,
  Modal,
  Form,
  Popup,
  Message,
} from 'semantic-ui-react';
import { IOrganization } from '../../interfaces/Organization';

import isInn from 'is-inn-js';
import { IRegion } from '../../interfaces/Region';
import { isNumeric } from '../../utils/validation';

interface OrganizationModalProps {
  regionsData: IRegion[];
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: IOrganization) => void;
}

type KeysEnum<T> = { [P in keyof Required<T>]: string | null };

const OrganizationModal: React.FC<OrganizationModalProps> = ({
  visible,
  onClose,
  onSubmit,
  regionsData = [],
}) => {
  const [inputData, setInputData] = useState<IOrganization>(null);

  const [errorData, setErrorData] =
    useState<KeysEnum<IOrganization>>(null);

  const [isValid, setIsValid] = useState<boolean>(false);

  useEffect(() => {
    if (inputData) {
      const fieldsNotEmpty =
        !!inputData['npp'] &&
        !!inputData['inn'] &&
        !!inputData['adr_fact'] &&
        !!inputData['naim_org'];
      setIsValid(fieldsNotEmpty);
    }
  }, [inputData]);

  const validate = () => {
    if (!inputData) {
      return false;
    }

    let hasErrors = false;

    const setErr = (key: keyof IOrganization, text: string) => {
      setErrorData({ ...errorData, [key]: text });
      hasErrors = true;
    };

    const setEmptyErr = (key: keyof IOrganization, text: string) => {
      if (!inputData[key]) {
        setErr(key, text);
      }
    };

    setEmptyErr('npp', 'Не указан порядковый номер');

    setEmptyErr('inn', 'Не заполнен ИНН');

    if (!isInn(inputData.inn)) {
      setErr('inn', 'Неправильно указан ИНН');
    }

    setEmptyErr('naim_org', 'Не указано название организации');

    setEmptyErr('adr_fact', 'Не указан адрес организации');

    return !hasErrors;
  };

  const setNonRequiredFields = () => {
    const newData = { ...inputData };

    const numericFields = [
      'plazma_max',
      'plazma_cena',
      'erm_max',
      'erm_cena',
      'immg_max',
      'immg_cena',
      'alb_max',
      'alb_cena',
    ];

    numericFields.forEach((field) => {
      if (!newData[field]) {
        newData[field] = 0;
      }
    });

    return newData;
  };

  const handleChange = ({
    target: { id, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setInputData({ ...inputData, [id]: value });
  };

  const handleSubmit = () => {
    const valid = validate();
    setIsValid(valid);

    if (valid) {
      const newData = setNonRequiredFields();
      setErrorData(null);
      onSubmit(newData);
    }
  };

  const handleOnlyNumbers = (event) => {
    if (isNumeric(event.key)) {
      event.preventDefault();
    }
  };

  const handleSearchChange = (_, data) => {
    if (data.value) {
      const region = regionsData[data.value];
      setInputData({ ...inputData, r1022: region.p00 });
    }
  };

  const ErrorMessage = () => {
    if (isValid || !errorData) {
      return null;
    }
    return (
      <Message
        error
        header="Ошибки в заполнении формы"
        content={Object.keys(errorData).map(
          (key) =>
            errorData[key] && (
              <React.Fragment key={key}>
                <span>{errorData[key]}</span> <br />
              </React.Fragment>
            ),
        )}
      />
    );
  };

  const isErrorField = (key: keyof IOrganization): boolean => {
    return errorData && errorData[key] && errorData[key].length > 0;
  };

  const regionOptions = regionsData.map((region, idx) => ({
    key: region.p00,
    text: region.p01,
    value: idx,
  }));

  return (
    <div>
      <Modal onClose={onClose} open={visible}>
        <Modal.Header>Карточка объекта</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form onSubmit={handleSubmit}>
              <Form.Dropdown
                id="r1022"
                label="Субъект"
                placeholder="Выбор субъекта РФ"
                clearable
                fluid
                search
                selection
                options={regionOptions}
                onChange={handleSearchChange}
                noResultsMessage="Не удалось ничего найти"
              />
              <Form.Group widths="equal">
                <Form.Input
                  required
                  id="npp"
                  type="number"
                  label="Номер п.п"
                  placeholder="Порядковый номер"
                  onKeyPress={handleOnlyNumbers}
                  onChange={handleChange}
                  error={isErrorField('npp')}
                />
                <Popup
                  trigger={
                    <Form.Input
                      required
                      id="inn"
                      type="number"
                      label="ИНН"
                      placeholder="ИНН организации"
                      onKeyPress={handleOnlyNumbers}
                      onChange={handleChange}
                      error={isErrorField('inn')}
                    />
                  }
                  content="Идентификационный номер налогоплательщика"
                />
              </Form.Group>
              <Form.Input
                required
                id="naim_org"
                type="text"
                label="Наименование"
                placeholder="Наименование организации"
                onChange={handleChange}
                error={isErrorField('naim_org')}
              />
              <Form.Input
                required
                id="adr_fact"
                type="text"
                label="Фактический адрес"
                placeholder="Адрес организации"
                onChange={handleChange}
                error={isErrorField('adr_fact')}
              />
              <Form.Group widths="equal">
                <Popup
                  trigger={
                    <Form.Input
                      id="plazma_max"
                      type="number"
                      label="Плазма макс"
                      onKeyPress={handleOnlyNumbers}
                      onChange={handleChange}
                      placeholder="Введите число"
                    />
                  }
                  header="Плазма свежезамор."
                  content="Макс. об. (тыс. литров)"
                />
                <Popup
                  trigger={
                    <Form.Input
                      id="plazma_cena"
                      type="number"
                      label="Плазма цена"
                      onKeyPress={handleOnlyNumbers}
                      onChange={handleChange}
                      placeholder="Введите число"
                    />
                  }
                  header="Плазма свежезамор."
                  content="Цена (тыс. руб. за один литр)"
                />
                <Popup
                  trigger={
                    <Form.Input
                      id="erm_max"
                      type="number"
                      label="Эр масса макс"
                      onKeyPress={handleOnlyNumbers}
                      onChange={handleChange}
                      placeholder="Введите число"
                    />
                  }
                  header="Эритроцитарная масса"
                  content="Макс. об. (тыс. литров)"
                />
                <Popup
                  trigger={
                    <Form.Input
                      id="erm_cena"
                      type="number"
                      label="Эр масса цена"
                      onKeyPress={handleOnlyNumbers}
                      onChange={handleChange}
                      placeholder="Введите число"
                    />
                  }
                  header="Эритроцитарная масса"
                  content="Цена (тыс. руб. за один литр)"
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Popup
                  trigger={
                    <Form.Input
                      id="immg_max"
                      type="number"
                      label="Им макс"
                      onKeyPress={handleOnlyNumbers}
                      onChange={handleChange}
                      placeholder="Введите число"
                    />
                  }
                  header="Иммуноглобулин человека"
                  content="Макс. об. (тыс. литров)"
                />
                <Popup
                  trigger={
                    <Form.Input
                      id="immg_cena"
                      type="number"
                      label="Им цена"
                      onKeyPress={handleOnlyNumbers}
                      onChange={handleChange}
                      placeholder="Введите число"
                    />
                  }
                  header="Иммуноглобулин человека"
                  content="Цена (тыс. руб. за один литр)"
                />
                <Popup
                  trigger={
                    <Form.Input
                      id="alb_max"
                      type="number"
                      label="Альб макс"
                      onKeyPress={handleOnlyNumbers}
                      onChange={handleChange}
                      placeholder="Введите число"
                    />
                  }
                  header="Альбумин 10-процентный"
                  content="Макс. об. (тыс. литров)"
                />
                <Popup
                  trigger={
                    <Form.Input
                      id="alb_cena"
                      type="number"
                      label="Альб цена"
                      onKeyPress={handleOnlyNumbers}
                      onChange={handleChange}
                      placeholder="Введите число"
                    />
                  }
                  header="Альбумин 10-процентный"
                  content="Цена (тыс. руб. за один литр)"
                />
              </Form.Group>
            </Form>
            <ErrorMessage />
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button
            content="Закрыть"
            icon="times"
            onClick={onClose}
            negative
          />
          <Button
            content="Сохранить"
            labelPosition="right"
            icon="checkmark"
            onClick={handleSubmit}
            positive
            disabled={!isValid}
          />
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default OrganizationModal;
