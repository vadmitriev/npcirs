import React, { useState, useEffect } from 'react';

import {
  Button,
  Modal,
  Form,
  Popup,
  Message,
} from 'semantic-ui-react';
import { IOrganization } from '../../interfaces/Organization';

import isInn from 'is-inn-js';

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

  const [currentField, setCurrentField] =
    useState<keyof IOrganization>(null);

  const [errorData, setErrorData] =
    useState<KeysEnum<IOrganization>>(null);

  const [isValid, setIsValid] = useState<boolean>(false);

  const validate = () => {
    if (!inputData) {
      return false;
    }

    const clearErr = (key) => {
      setErrorData({ ...errorData, [key]: null });
    };

    let hasErrors: boolean = false;
    let key: keyof IOrganization = 'inn';

    if (currentField === key) {
      if (!inputData[key]) {
        setErrorData({ ...errorData, [key]: 'Не заполнен ИНН' });
        hasErrors = true;
      }
      if (!isInn(inputData.inn)) {
        setErrorData({
          ...errorData,
          [key]: 'Неправильно указан ИНН',
        });
        hasErrors = true;
      } else {
        // clearErr(key)
      }
    }

    key = 'naim_org';
    if (currentField === key) {
      setErrorData({
        ...errorData,
        [key]: 'Не указано название организации',
      });
      hasErrors = true;
    } else {
      // clearErr(key)
    }

    key = 'adr_fact';
    if (currentField === key) {
      setErrorData({
        ...errorData,
        [key]: 'Не указан адрес организации',
      });
      hasErrors = true;
    } else {
      // clearErr(key)
    }

    return !hasErrors;
  };

  useEffect(() => {
    setIsValid(validate());
  }, [inputData]);

  const handleChange = ({
    target: { id, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentField(id as keyof IOrganization);
    setInputData({ ...inputData, [id]: value });
  };

  const handleSubmit = () => {
    onSubmit(inputData);
  };

  const handleOnlyNumbers = (event) => {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  };

  return (
    <div>
      <Modal onClose={onClose} open={visible}>
        <Modal.Header>Карточка объекта</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form>
              <Form.Group widths="equal">
                <Form.Field
                  required
                  id="npp"
                  control="input"
                  label="Номер п.п"
                  placeholder="Порядковый номер"
                  onKeyPress={handleOnlyNumbers}
                  onChange={handleChange}
                  error={
                    errorData &&
                    errorData.npp &&
                    errorData.npp.length > 0
                  }
                />
                <Popup
                  trigger={
                    <Form.Field
                      required
                      id="inn"
                      control="input"
                      label="ИНН"
                      placeholder="ИНН организации"
                      onKeyPress={handleOnlyNumbers}
                      onChange={handleChange}
                      error={
                        errorData &&
                        errorData.inn &&
                        errorData.inn.length > 0
                      }
                    />
                  }
                  content="Идентификационный номер налогоплательщика"
                />
              </Form.Group>
              <Form.Field
                required
                id="naim_org"
                control="input"
                label="Наименование"
                placeholder="Наименование организации"
                onChange={handleChange}
                error={
                  errorData &&
                  errorData.naim_org &&
                  errorData.naim_org.length > 0
                }
              />
              <Form.Field
                required
                id="adr_fact"
                control="input"
                label="Фактический адрес"
                placeholder="Адрес организации"
                onChange={handleChange}
                error={
                  errorData &&
                  errorData.adr_fact &&
                  errorData.adr_fact.length > 0
                }
              />
              <Form.Group widths="equal">
                <Form.Field
                  id="plazma_max"
                  control="input"
                  label="Плазма макс"
                  onKeyPress={handleOnlyNumbers}
                  onChange={handleChange}
                  placeholder="Введите число"
                />
                <Form.Field
                  id="plazma_cena"
                  control="input"
                  label="Плазма цена"
                  onKeyPress={handleOnlyNumbers}
                  onChange={handleChange}
                  placeholder="Введите число"
                />
                <Form.Field
                  id="erm_max"
                  control="input"
                  label="Эр масса макс"
                  onKeyPress={handleOnlyNumbers}
                  onChange={handleChange}
                  placeholder="Введите число"
                />
                <Form.Field
                  id="erm_cena"
                  control="input"
                  label="Эр масса цена"
                  onKeyPress={handleOnlyNumbers}
                  onChange={handleChange}
                  placeholder="Введите число"
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Field
                  id="immg_max"
                  control="input"
                  label="Им макс"
                  onKeyPress={handleOnlyNumbers}
                  onChange={handleChange}
                  placeholder="Введите число"
                />
                <Form.Field
                  id="immg_cena"
                  control="input"
                  label="Им цена"
                  onKeyPress={handleOnlyNumbers}
                  onChange={handleChange}
                  placeholder="Введите число"
                />
                <Form.Field
                  id="alb_max"
                  control="input"
                  label="Альб макс"
                  onKeyPress={handleOnlyNumbers}
                  onChange={handleChange}
                  placeholder="Введите число"
                />
                <Form.Field
                  id="alb_cena"
                  control="input"
                  label="Альб цена"
                  onKeyPress={handleOnlyNumbers}
                  onChange={handleChange}
                  placeholder="Введите число"
                />
              </Form.Group>
            </Form>
            {errorData && (
              <Message
                error
                header="Ошибки в заполнении формы"
                content={Object.keys(errorData).map(
                  (key) =>
                    errorData[key] && (
                      <React.Fragment key={key}>
                        <div>{errorData[key]}</div>
                      </React.Fragment>
                    ),
                )}
              />
            )}
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
