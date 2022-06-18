import { createTemplate } from '@brail/core';
import { Container, EmailTemplate, Text } from '@brail/react';

interface GrantsEmailTemplateProps {
  name: string;
  email: string;
}

const GrantsEmailTemplateComponent: React.FC<GrantsEmailTemplateProps> = ({
  name,
  email,
}) => {
  return (
    <EmailTemplate>
      <Container>
        <Text variant="h3">thanks for applying {name}!</Text>
      </Container>
    </EmailTemplate>
  );
};

const GrantsEmailTemplate = createTemplate(GrantsEmailTemplateComponent, {
  generateMeta: () => ({ subject: 'Thanks for applying!' }),
});

export default GrantsEmailTemplate;
