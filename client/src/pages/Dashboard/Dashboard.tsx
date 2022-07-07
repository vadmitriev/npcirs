import React from 'react';

import {
  Card,
  Grid,
  Segment,
  Placeholder,
  Statistic,
  Message,
} from 'semantic-ui-react';

const cards = [
  {
    text: 'Matthew Harri',
    meta: 'Co-Worker',
    description: 'Matthew is a pianist living in Nashville.',
  },
  {
    text: 'Jake Smith',
    meta: 'Musicians',
    description: 'Jake is a drummer living in New York.',
  },
  {
    text: 'Elliot Baker',
    meta: 'Friend',
    description: 'Elliot is a music producer living in Chicago.',
  },
  {
    text: 'Jenny Hess',
    meta: 'Friend',
    description:
      'Jenny is a student studying Media Management at the New School',
  },
];

const Dashboard: React.FC = () => {
  return (
    <div>
      <Message>
        <Message.Header>Главная страница</Message.Header>
        <p>Контроль ведения возможностей поставок</p>
      </Message>

      <Statistic.Group>
        <Statistic label="Saves" value="22" />
        <Statistic label="Signups" value="Three Thousand" text />
        <Statistic label="Flights" value="5" />
        <Statistic label="Team Members" value="42" />
      </Statistic.Group>

      <Grid columns={4} stackable>
        {cards.map((item, idx) => (
          <Grid.Column key={idx}>
            <Card
              key={idx}
              header={item.text}
              meta={item.meta}
              description={item.description}
            />
          </Grid.Column>
        ))}
      </Grid>
      <Grid columns={4} stackable>
        {cards.map((_, idx) => (
          <Grid.Column key={idx}>
            <Segment raised>
              <Placeholder>
                <Placeholder.Header image>
                  <Placeholder.Line />
                  <Placeholder.Line />
                </Placeholder.Header>
                <Placeholder.Paragraph>
                  <Placeholder.Line length="medium" />
                  <Placeholder.Line length="short" />
                </Placeholder.Paragraph>
              </Placeholder>
            </Segment>
          </Grid.Column>
        ))}
      </Grid>
    </div>
  );
};

export default Dashboard;
