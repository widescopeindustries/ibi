import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface ProfileIncompleteReminderProps {
  userName: string;
  profileUrl: string;
}

export const ProfileIncompleteReminder = ({
  userName,
  profileUrl,
}: ProfileIncompleteReminderProps) => {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  return (
    <Html>
      <Head />
      <Preview>Your profile is almost ready - just a few more steps!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={heading}>Complete Your Profile</Heading>
          </Section>

          <Section style={content}>
            <Text style={paragraph}>Hi {userName},</Text>

            <Text style={paragraph}>
              We noticed your IBI Directory profile isn&apos;t quite complete yet. You&apos;re so close
              to being discoverable by customers looking for representatives like you!
            </Text>

            <Section style={highlightBox}>
              <Text style={highlightText}>
                Complete profiles get <strong>3x more views</strong> than incomplete ones.
              </Text>
            </Section>

            <Text style={paragraph}>
              <strong>Here&apos;s what you might be missing:</strong>
            </Text>

            <Section style={checklistContainer}>
              <Text style={checklistItem}>Profile photo</Text>
              <Text style={checklistItem}>Bio and introduction</Text>
              <Text style={checklistItem}>Contact information</Text>
              <Text style={checklistItem}>Company associations</Text>
              <Text style={checklistItem}>Service areas (cities/states)</Text>
            </Section>

            <Section style={buttonContainer}>
              <Button style={button} href={profileUrl}>
                Complete My Profile
              </Button>
            </Section>

            <Hr style={hr} />

            <Text style={paragraph}>
              <strong>Pro Tip:</strong> Adding a professional photo and detailed bio makes
              customers 5x more likely to reach out to you!
            </Text>

            <Text style={footer}>
              Need help? We&apos;re here for you at{' '}
              <Link href={`${appUrl}/help`} style={link}>
                our Help Center
              </Link>
              .
            </Text>

            <Text style={footer}>
              Best regards,
              <br />
              The IBI Directory Team
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default ProfileIncompleteReminder;

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  maxWidth: '600px',
};

const header = {
  padding: '32px 20px',
  backgroundColor: '#06B6D4',
};

const heading = {
  fontSize: '32px',
  lineHeight: '1.3',
  fontWeight: '700',
  color: '#ffffff',
  textAlign: 'center' as const,
  margin: '0',
};

const content = {
  padding: '0 48px',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
  color: '#1f2937',
};

const highlightBox = {
  backgroundColor: '#FEF3C7',
  borderLeft: '4px solid #F59E0B',
  borderRadius: '4px',
  padding: '16px 20px',
  margin: '24px 0',
};

const highlightText = {
  fontSize: '16px',
  lineHeight: '24px',
  color: '#92400E',
  margin: '0',
};

const checklistContainer = {
  backgroundColor: '#f9fafb',
  borderRadius: '8px',
  padding: '20px 24px',
  margin: '24px 0',
};

const checklistItem = {
  fontSize: '15px',
  lineHeight: '28px',
  color: '#374151',
  margin: '4px 0',
  paddingLeft: '20px',
  position: 'relative' as const,
};

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const button = {
  backgroundColor: '#06B6D4',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 32px',
};

const hr = {
  borderColor: '#e5e7eb',
  margin: '32px 0',
};

const footer = {
  fontSize: '14px',
  lineHeight: '24px',
  color: '#6b7280',
  marginTop: '24px',
};

const link = {
  color: '#06B6D4',
  textDecoration: 'underline',
};
