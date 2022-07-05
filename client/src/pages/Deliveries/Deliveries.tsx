import React from 'react';

import { Message } from 'semantic-ui-react';

const Deliveries: React.FC = () => {
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
    </div>
  );
};

export default Deliveries;
