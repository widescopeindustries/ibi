import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface WelcomeEmailProps {
  userName: string;
}

export const WelcomeEmail = ({ userName }: WelcomeEmailProps) => {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  return (
    <Html>
      <Head />
      <Preview>Welcome to IBI Directory - Let&apos;s get you started!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={heading}>Welcome to IBI Directory!</Heading>
          </Section>

          <Section style={content}>
            <Text style={paragraph}>Hi {userName},</Text>

            <Text style={paragraph}>
              Welcome to IBI Directory! We&apos;re thrilled to have you join our community of
              direct sales representatives. You&apos;re now part of a platform that connects you
              with customers actively looking for representatives like you.
            </Text>

            <Text style={paragraph}>
              <strong>Here&apos;s what to do next:</strong>
            </Text>

            <Section style={stepContainer}>
              <Text style={step}>
                <strong>1. Complete Your Profile</strong> - Add your photo, bio, and contact
                information so customers can find and connect with you.
              </Text>

              <Text style={step}>
                <strong>2. Add Your Companies</strong> - Link the direct sales companies you
                represent (Mary Kay, Pampered Chef, Avon, etc.)
              </Text>

              <Text style={step}>
                <strong>3. Get Discovered</strong> - Once your profile is complete, you&apos;ll
                appear in search results when customers look for representatives in your area.
              </Text>
            </Section>

            <Section style={buttonContainer}>
              <Button style={button} href={`${appUrl}/dashboard/profile`}>
                Complete Your Profile
              </Button>
            </Section>

            <Hr style={hr} />

            <Text style={paragraph}>
              <strong>Want more visibility?</strong> Consider upgrading to Pro for priority
              placement in search results, a Pro badge, and featured homepage placement.
            </Text>

            <Section style={buttonContainer}>
              <Button style={buttonSecondary} href={`${appUrl}/pricing`}>
                Learn About Pro
              </Button>
            </Section>

            <Hr style={hr} />

            <Text style={footer}>
              Need help? Visit our{' '}
              <Link href={`${appUrl}/help`} style={link}>
                Help Center
              </Link>{' '}
              or reply to this email.
            </Text>

            <Text style={footer}>
              Happy selling,
              <br />
              The IBI Directory Team
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default WelcomeEmail;

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
  backgroundColor: '#4F46E5',
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

const stepContainer = {
  backgroundColor: '#f9fafb',
  borderRadius: '8px',
  padding: '24px',
  margin: '24px 0',
};

const step = {
  fontSize: '15px',
  lineHeight: '24px',
  color: '#374151',
  margin: '12px 0',
};

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const button = {
  backgroundColor: '#4F46E5',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 32px',
};

const buttonSecondary = {
  backgroundColor: '#ffffff',
  border: '2px solid #4F46E5',
  borderRadius: '8px',
  color: '#4F46E5',
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
  color: '#4F46E5',
  textDecoration: 'underline',
};
