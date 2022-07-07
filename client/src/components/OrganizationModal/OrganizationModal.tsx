import React, { useState } from 'react';

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

  const [errorData, setErrorData] =
    useState<KeysEnum<IOrganization>>(null);

  const [isValid, setIsValid] = useState<boolean>(false);

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

  const handleChange = ({
    target: { id, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setInputData({ ...inputData, [id]: value });
  };

  const handleSubmit = () => {
    const valid = validate();
    setIsValid(valid);

    if (valid) {
      onSubmit(inputData);
    }
  };

  const handleOnlyNumbers = (event) => {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
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

  return (
    <div>
      <Modal onClose={onClose} open={visible}>
        <Modal.Header>Карточка объекта</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form onSubmit={handleSubmit}>
              <Form.Group widths="equal">
                <Form.Field
                  required
                  id="npp"
                  control="input"
                  type="number"
                  label="Номер п.п"
                  placeholder="Порядковый номер"
                  onKeyPress={handleOnlyNumbers}
                  onChange={handleChange}
                  error={isErrorField('npp')}
                />
                <Popup
                  trigger={
                    <Form.Field
                      required
                      id="inn"
                      control="input"
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
              <Form.Field
                required
                id="naim_org"
                control="input"
                type="text"
                label="Наименование"
                placeholder="Наименование организации"
                onChange={handleChange}
                error={isErrorField('naim_org')}
              />
              <Form.Field
                required
                id="adr_fact"
                control="input"
                type="text"
                label="Фактический адрес"
                placeholder="Адрес организации"
                onChange={handleChange}
                error={isErrorField('adr_fact')}
              />
              <Form.Group widths="equal">
                <Form.Field
                  id="plazma_max"
                  control="input"
                  type="number"
                  label="Плазма макс"
                  onKeyPress={handleOnlyNumbers}
                  onChange={handleChange}
                  placeholder="Введите число"
                />
                <Form.Field
                  id="plazma_cena"
                  control="input"
                  type="number"
                  label="Плазма цена"
                  onKeyPress={handleOnlyNumbers}
                  onChange={handleChange}
                  placeholder="Введите число"
                />
                <Form.Field
                  id="erm_max"
                  control="input"
                  type="number"
                  label="Эр масса макс"
                  onKeyPress={handleOnlyNumbers}
                  onChange={handleChange}
                  placeholder="Введите число"
                />
                <Form.Field
                  id="erm_cena"
                  control="input"
                  type="number"
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
                  type="number"
                  label="Им макс"
                  onKeyPress={handleOnlyNumbers}
                  onChange={handleChange}
                  placeholder="Введите число"
                />
                <Form.Field
                  id="immg_cena"
                  control="input"
                  type="number"
                  label="Им цена"
                  onKeyPress={handleOnlyNumbers}
                  onChange={handleChange}
                  placeholder="Введите число"
                />
                <Form.Field
                  id="alb_max"
                  control="input"
                  type="number"
                  label="Альб макс"
                  onKeyPress={handleOnlyNumbers}
                  onChange={handleChange}
                  placeholder="Введите число"
                />
                <Form.Field
                  id="alb_cena"
                  control="input"
                  type="number"
                  label="Альб цена"
                  onKeyPress={handleOnlyNumbers}
                  onChange={handleChange}
                  placeholder="Введите число"
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
