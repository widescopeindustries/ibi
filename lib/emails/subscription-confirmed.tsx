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

interface SubscriptionConfirmedEmailProps {
  userName: string;
  dashboardUrl: string;
}

export const SubscriptionConfirmedEmail = ({
  userName,
  dashboardUrl,
}: SubscriptionConfirmedEmailProps) => {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  return (
    <Html>
      <Head />
      <Preview>Welcome to Pro! Your subscription is confirmed.</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Text style={badge}>PRO</Text>
            <Heading style={heading}>You&apos;re Now a Pro!</Heading>
          </Section>

          <Section style={content}>
            <Text style={paragraph}>Hi {userName},</Text>

            <Text style={paragraph}>
              Congratulations! Your Pro subscription has been confirmed. You now have access
              to all Pro features that will help you stand out and connect with more
              customers.
            </Text>

            <Section style={successBox}>
              <Text style={successTitle}>Your Pro Benefits Are Active</Text>
              <Text style={successDescription}>
                Your profile has been upgraded and you&apos;re now enjoying all Pro features!
              </Text>
            </Section>

            <Text style={paragraph}>
              <strong>Here&apos;s what&apos;s now active on your account:</strong>
            </Text>

            <Section style={featureList}>
              <Text style={featureItem}>
                <span style={checkmark}>✓</span> <strong>Priority Search Placement</strong> -
                You&apos;ll appear at the top of search results
              </Text>

              <Text style={featureItem}>
                <span style={checkmark}>✓</span> <strong>PRO Badge</strong> - Your profile now
                displays the verified Pro badge
              </Text>

              <Text style={featureItem}>
                <span style={checkmark}>✓</span> <strong>Featured Homepage Placement</strong> -
                You&apos;re now eligible for homepage features
              </Text>

              <Text style={featureItem}>
                <span style={checkmark}>✓</span> <strong>Email Notifications</strong> - Get
                alerts for profile views and new reviews
              </Text>
            </Section>

            <Section style={buttonContainer}>
              <Button style={button} href={dashboardUrl}>
                View Your Dashboard
              </Button>
            </Section>

            <Hr style={hr} />

            <Section style={tipsBox}>
              <Text style={tipsHeading}>Pro Tips to Maximize Your Visibility</Text>

              <Text style={tipItem}>
                1. <strong>Keep your profile updated</strong> - Regular updates show you&apos;re
                active
              </Text>

              <Text style={tipItem}>
                2. <strong>Respond to reviews</strong> - Engage with customers who leave
                feedback
              </Text>

              <Text style={tipItem}>
                3. <strong>Add detailed company info</strong> - The more info, the better
                your SEO
              </Text>

              <Text style={tipItem}>
                4. <strong>Share your profile</strong> - Promote your IBI profile on social
                media
              </Text>
            </Section>

            <Hr style={hr} />

            <Text style={paragraph}>
              <strong>Subscription Details:</strong>
            </Text>

            <Text style={detailText}>Plan: Pro Membership</Text>
            <Text style={detailText}>Price: $19/month</Text>
            <Text style={detailText}>Billing: Monthly</Text>
            <Text style={detailText}>
              Manage subscription:{' '}
              <Link href={`${appUrl}/dashboard/subscription`} style={link}>
                Subscription Settings
              </Link>
            </Text>

            <Hr style={hr} />

            <Text style={footer}>
              Questions about your Pro subscription? Visit your{' '}
              <Link href={dashboardUrl} style={link}>
                dashboard
              </Link>{' '}
              or reply to this email.
            </Text>

            <Text style={footer}>
              Thank you for choosing Pro!
              <br />
              The IBI Directory Team
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default SubscriptionConfirmedEmail;

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
  background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
  textAlign: 'center' as const,
};

const badge = {
  display: 'inline-block',
  backgroundColor: '#FFFFFF',
  color: '#10B981',
  fontSize: '14px',
  fontWeight: 'bold',
  padding: '6px 16px',
  borderRadius: '20px',
  marginBottom: '16px',
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

const successBox = {
  backgroundColor: '#D1FAE5',
  border: '2px solid #10B981',
  borderRadius: '8px',
  padding: '24px',
  margin: '24px 0',
  textAlign: 'center' as const,
};

const successTitle = {
  fontSize: '20px',
  fontWeight: '700',
  color: '#065F46',
  margin: '0 0 8px 0',
};

const successDescription = {
  fontSize: '16px',
  color: '#065F46',
  margin: '0',
};

const featureList = {
  backgroundColor: '#f9fafb',
  borderRadius: '8px',
  padding: '24px',
  margin: '24px 0',
};

const featureItem = {
  fontSize: '15px',
  lineHeight: '28px',
  color: '#374151',
  margin: '8px 0',
};

const checkmark = {
  color: '#10B981',
  fontSize: '18px',
  fontWeight: 'bold',
  marginRight: '8px',
};

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const button = {
  backgroundColor: '#10B981',
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

const tipsBox = {
  backgroundColor: '#FEF3C7',
  borderRadius: '8px',
  padding: '24px',
  margin: '24px 0',
};

const tipsHeading = {
  fontSize: '18px',
  fontWeight: '700',
  color: '#92400E',
  margin: '0 0 16px 0',
};

const tipItem = {
  fontSize: '15px',
  lineHeight: '24px',
  color: '#92400E',
  margin: '12px 0',
};

const detailText = {
  fontSize: '14px',
  lineHeight: '24px',
  color: '#6b7280',
  margin: '4px 0',
};

const footer = {
  fontSize: '14px',
  lineHeight: '24px',
  color: '#6b7280',
  marginTop: '24px',
};

const link = {
  color: '#10B981',
  textDecoration: 'underline',
};
