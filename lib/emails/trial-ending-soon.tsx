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

interface TrialEndingSoonEmailProps {
  userName: string;
  daysRemaining: number;
  subscriptionUrl: string;
}

export const TrialEndingSoonEmail = ({
  userName,
  daysRemaining,
  subscriptionUrl,
}: TrialEndingSoonEmailProps) => {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const isUrgent = daysRemaining <= 1;

  return (
    <Html>
      <Head />
      <Preview>{`Your Pro trial ends in ${daysRemaining} days - Don't lose your benefits!`}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            {isUrgent && <Text style={urgentBadge}>URGENT</Text>}
            <Heading style={heading}>Your Pro Trial is Ending Soon</Heading>
          </Section>

          <Section style={content}>
            <Text style={paragraph}>Hi {userName},</Text>

            <Text style={paragraph}>
              Your Pro trial is ending in{' '}
              <strong style={{ color: isUrgent ? '#EF4444' : '#F59E0B' }}>
                {daysRemaining} {daysRemaining === 1 ? 'day' : 'days'}
              </strong>
              . Don't lose access to the benefits that have been helping you stand out!
            </Text>

            <Section style={warningBox}>
              <Text style={warningTitle}>What You'll Lose:</Text>
              <Text style={warningItem}>❌ Priority placement in search results</Text>
              <Text style={warningItem}>❌ Your PRO badge</Text>
              <Text style={warningItem}>❌ Featured homepage placement</Text>
              <Text style={warningItem}>❌ Email notifications for reviews</Text>
            </Section>

            <Section style={statsBox}>
              <Text style={statsTitle}>Your Pro Performance</Text>
              <Text style={statsText}>
                During your trial, Pro members like you typically see:
              </Text>
              <Text style={statItem}>
                <span style={statNumber}>3-5x</span> more profile views
              </Text>
              <Text style={statItem}>
                <span style={statNumber}>4x</span> more customer inquiries
              </Text>
              <Text style={statItem}>
                <span style={statNumber}>Top 10%</span> search placement
              </Text>
            </Section>

            <Text style={paragraph}>
              <strong>Continue your Pro membership for just $19/month.</strong> Cancel anytime,
              no long-term commitment required.
            </Text>

            <Section style={buttonContainer}>
              <Button style={button} href={subscriptionUrl}>
                Keep My Pro Benefits
              </Button>
            </Section>

            <Hr style={hr} />

            <Section style={testimonialBox}>
              <Text style={testimonialQuote}>
                "I almost let my Pro subscription lapse, but I'm so glad I kept it. The
                visibility and leads I get are absolutely worth it!"
              </Text>
              <Text style={testimonialAuthor}>- Jennifer K., Pampered Chef Consultant</Text>
            </Section>

            <Hr style={hr} />

            <Text style={paragraph}>
              <strong>What happens if you don't renew?</strong>
            </Text>

            <Text style={infoText}>
              • Your profile will remain active but lose Pro benefits
              <br />
              • You'll drop in search rankings
              <br />
              • Your PRO badge will be removed
              <br />
              • You can upgrade again anytime
            </Text>

            <Hr style={hr} />

            <Text style={footer}>
              Have questions? Visit your{' '}
              <Link href={`${appUrl}/dashboard/subscription`} style={link}>
                subscription settings
              </Link>{' '}
              or reply to this email.
            </Text>

            <Text style={footer}>
              We hope to see you continue with Pro!
              <br />
              The IBI Directory Team
            </Text>

            <Text style={unsubscribe}>
              To cancel your trial,{' '}
              <Link href={`${appUrl}/dashboard/subscription`} style={link}>
                visit your subscription settings
              </Link>
              .
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default TrialEndingSoonEmail;

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
  background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
  textAlign: 'center' as const,
};

const urgentBadge = {
  display: 'inline-block',
  backgroundColor: '#FEE2E2',
  color: '#991B1B',
  fontSize: '12px',
  fontWeight: 'bold',
  padding: '4px 12px',
  borderRadius: '12px',
  marginBottom: '12px',
  letterSpacing: '0.5px',
};

const heading = {
  fontSize: '28px',
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

const warningBox = {
  backgroundColor: '#FEE2E2',
  border: '2px solid #EF4444',
  borderRadius: '12px',
  padding: '24px',
  margin: '24px 0',
};

const warningTitle = {
  fontSize: '18px',
  fontWeight: '700',
  color: '#991B1B',
  margin: '0 0 16px 0',
};

const warningItem = {
  fontSize: '15px',
  lineHeight: '28px',
  color: '#991B1B',
  margin: '4px 0',
};

const statsBox = {
  backgroundColor: '#EFF6FF',
  border: '2px solid #3B82F6',
  borderRadius: '12px',
  padding: '24px',
  margin: '24px 0',
  textAlign: 'center' as const,
};

const statsTitle = {
  fontSize: '20px',
  fontWeight: '700',
  color: '#1E40AF',
  margin: '0 0 12px 0',
};

const statsText = {
  fontSize: '15px',
  color: '#1E40AF',
  margin: '0 0 20px 0',
};

const statItem = {
  fontSize: '16px',
  lineHeight: '32px',
  color: '#1E40AF',
  margin: '4px 0',
};

const statNumber = {
  fontSize: '24px',
  fontWeight: '700',
  color: '#3B82F6',
  marginRight: '8px',
};

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const button = {
  backgroundColor: '#EF4444',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '18px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '16px 48px',
};

const hr = {
  borderColor: '#e5e7eb',
  margin: '32px 0',
};

const testimonialBox = {
  backgroundColor: '#FEF3C7',
  borderLeft: '4px solid #F59E0B',
  borderRadius: '4px',
  padding: '20px 24px',
  margin: '24px 0',
};

const testimonialQuote = {
  fontSize: '16px',
  fontStyle: 'italic',
  color: '#92400E',
  margin: '0 0 12px 0',
};

const testimonialAuthor = {
  fontSize: '14px',
  fontWeight: '600',
  color: '#92400E',
  margin: '0',
};

const infoText = {
  fontSize: '15px',
  lineHeight: '28px',
  color: '#6B7280',
  margin: '12px 0',
};

const footer = {
  fontSize: '14px',
  lineHeight: '24px',
  color: '#6b7280',
  marginTop: '24px',
};

const link = {
  color: '#EF4444',
  textDecoration: 'underline',
};

const unsubscribe = {
  fontSize: '12px',
  lineHeight: '20px',
  color: '#9CA3AF',
  marginTop: '32px',
  textAlign: 'center' as const,
};
