import React, { useState, useEffect } from 'react';

import {
  Button,
  Header,
  Image,
  InputOnChangeData,
  Modal,
  Form,
  Segment,
} from 'semantic-ui-react';
import { IOrganization } from '../../interfaces/Organization';

interface OrganizationModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: IOrganization) => void;
}

const OrganizationModal: React.FC<OrganizationModalProps> = ({
  visible,
  onClose,
  onSubmit,
}) => {
  const [inputData, setInputData] = useState<IOrganization>(null);
  const [isValid, setIsValid] = useState(false);

  const validate = () => {
    return false;
    return true;
  };

  useEffect(() => {
    setIsValid(validate());
  }, [inputData]);

  const handleChange = (
    _: React.ChangeEvent<HTMLInputElement>,
    { name, value }: InputOnChangeData,
  ) => {
    setInputData({ ...inputData, [name]: value });
  };

  const handleSubmit = () => {
    onSubmit(inputData);
  };

  return (
    <div>
      <Modal
        onClose={onClose}
        open={visible}
        // trigger={<Button>Show Modal</Button>}
      >
        <Modal.Header>Карточка объекта</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            {/* <Segment stacked> */}
            <Form.Input
              required
              fluid
              name="email"
              type="email"
              icon="user"
              iconPosition="left"
              placeholder="E-mail адрес"
              onChange={handleChange}
            />
            <Form.Input
              required
              fluid
              name="name"
              icon="user"
              iconPosition="left"
              placeholder="Логин"
              onChange={handleChange}
            />
            {/* </Segment> */}
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
