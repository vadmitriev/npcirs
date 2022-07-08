import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Button,
  Modal,
  Form,
  Popup,
  Message,
} from 'semantic-ui-react';
import { IOrganization } from '../../interfaces/Organization';

import isInn from 'is-inn-js';
import { isNumeric } from '../../utils/validation';

import './OrganizationModal.css';

interface OrganizationModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: IOrganization) => void;
}

type KeysEnum<T> = { [P in keyof Required<T>]: string | null };

const OrganizationModal: React.FC<OrganizationModalProps> = ({
  visible,
  onClose,
  onSubmit,
}) => {
  const [inputData, setInputData] = useState<IOrganization>(null);
  const [errorData, setErrorData] =
    useState<KeysEnum<IOrganization>>(null);

  const params = useParams();

  const handleClose = () => {
    setErrorData(null);
    setInputData(null);
    onClose();
  };

  const validate = () => {
    const notEmptyErrors = {
      npp: 'Не указан порядковый номер',
      inn: 'Не заполнен ИНН',
      adr_fact: 'Не указано название организации',
      naim_org: 'Не указан адрес организации',
    };

    const setEmptyErrors = () => {
      const errors = {};
      Object.keys(notEmptyErrors).forEach((key) => {
        if (!inputData || !inputData[key]) {
          errors[key] = notEmptyErrors[key];
        } else {
          errors[key] = '';
        }
      });
      setErrorData({ ...errorData, ...errors });
      return errors;
    };

    if (!inputData) {
      setEmptyErrors();
      return false;
    }

    const emptyErrors = setEmptyErrors();

    if (!isInn(inputData.inn) && !emptyErrors['inn']) {
      setErrorData({ ...errorData, inn: 'Неправильно указан ИНН' });
      return false;
    }

    const errors = Object.keys(emptyErrors).filter(
      (key) => emptyErrors[key] !== '',
    );

    return errors.length === 0;
  };

  const setNonRequiredFields = () => {
    const newData = { ...inputData };

    newData.r1022 = params.id;

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
    // setIsValid(valid);

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

  const ErrorMessage = () => {
    if (!errorData) {
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

  return (
    <div>
      <Modal onClose={handleClose} open={visible}>
        <Modal.Header>Карточка объекта</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form onSubmit={handleSubmit}>
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
            // disabled={!isValid}
          />
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default OrganizationModal;
