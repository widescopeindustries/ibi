import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface UpgradeToProEmailProps {
  userName: string;
  pricingUrl: string;
}

export const UpgradeToProEmail = ({ userName, pricingUrl }: UpgradeToProEmailProps) => {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  return (
    <Html>
      <Head />
      <Preview>Boost your visibility with Pro - Get more customers!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={heading}>Ready to Stand Out?</Heading>
            <Text style={headerSubtext}>Upgrade to Pro and Get Noticed</Text>
          </Section>

          <Section style={content}>
            <Text style={paragraph}>Hi {userName},</Text>

            <Text style={paragraph}>
              You&apos;ve taken the first step by creating your IBI Directory profile. Now,
              imagine getting <strong>3-5x more visibility</strong> and connecting with even
              more customers!
            </Text>

            <Section style={promoBox}>
              <Text style={promoHeading}>Pro Membership Benefits</Text>

              <Section style={benefitsList}>
                <Row style={benefitRow}>
                  <Column style={iconColumn}>
                    <Text style={icon}>⭐</Text>
                  </Column>
                  <Column>
                    <Text style={benefitTitle}>Priority Search Placement</Text>
                    <Text style={benefitDescription}>
                      Appear at the top of search results in your area
                    </Text>
                  </Column>
                </Row>

                <Row style={benefitRow}>
                  <Column style={iconColumn}>
                    <Text style={icon}>🏆</Text>
                  </Column>
                  <Column>
                    <Text style={benefitTitle}>PRO Badge</Text>
                    <Text style={benefitDescription}>
                      Stand out with a verified Pro badge on your profile
                    </Text>
                  </Column>
                </Row>

                <Row style={benefitRow}>
                  <Column style={iconColumn}>
                    <Text style={icon}>✨</Text>
                  </Column>
                  <Column>
                    <Text style={benefitTitle}>Featured Homepage Placement</Text>
                    <Text style={benefitDescription}>
                      Get featured on our homepage for maximum exposure
                    </Text>
                  </Column>
                </Row>

                <Row style={benefitRow}>
                  <Column style={iconColumn}>
                    <Text style={icon}>📧</Text>
                  </Column>
                  <Column>
                    <Text style={benefitTitle}>Email Notifications</Text>
                    <Text style={benefitDescription}>
                      Get instant alerts when customers view your profile
                    </Text>
                  </Column>
                </Row>
              </Section>

              <Section style={pricingSection}>
                <Text style={pricingText}>
                  <span style={priceAmount}>$19</span>
                  <span style={pricePeriod}>/month</span>
                </Text>
                <Text style={pricingSubtext}>Cancel anytime</Text>
              </Section>
            </Section>

            <Section style={buttonContainer}>
              <Button style={button} href={pricingUrl}>
                Upgrade to Pro Now
              </Button>
            </Section>

            <Hr style={hr} />

            <Section style={testimonialBox}>
              <Text style={testimonialQuote}>
                &quot;Since upgrading to Pro, I&apos;ve received 4x more inquiries from customers.
                It&apos;s been a game-changer for my business!&quot;
              </Text>
              <Text style={testimonialAuthor}>- Sarah M., Mary Kay Representative</Text>
            </Section>

            <Hr style={hr} />

            <Text style={footer}>
              Have questions? Visit our{' '}
              <Link href={`${appUrl}/pricing`} style={link}>
                pricing page
              </Link>{' '}
              or reply to this email.
            </Text>

            <Text style={footer}>
              To your success,
              <br />
              The IBI Directory Team
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default UpgradeToProEmail;

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
  background: 'linear-gradient(135deg, #4F46E5 0%, #06B6D4 100%)',
};

const heading = {
  fontSize: '32px',
  lineHeight: '1.3',
  fontWeight: '700',
  color: '#ffffff',
  textAlign: 'center' as const,
  margin: '0 0 8px 0',
};

const headerSubtext = {
  fontSize: '18px',
  color: '#E0E7FF',
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

const promoBox = {
  backgroundColor: '#F9FAFB',
  border: '2px solid #4F46E5',
  borderRadius: '12px',
  padding: '32px',
  margin: '32px 0',
};

const promoHeading = {
  fontSize: '24px',
  fontWeight: '700',
  color: '#4F46E5',
  textAlign: 'center' as const,
  marginBottom: '24px',
};

const benefitsList = {
  margin: '24px 0',
};

const benefitRow = {
  marginBottom: '20px',
};

const iconColumn = {
  width: '40px',
  verticalAlign: 'top',
};

const icon = {
  fontSize: '24px',
  margin: '0',
};

const benefitTitle = {
  fontSize: '16px',
  fontWeight: '600',
  color: '#1f2937',
  margin: '0 0 4px 0',
};

const benefitDescription = {
  fontSize: '14px',
  color: '#6b7280',
  margin: '0',
};

const pricingSection = {
  textAlign: 'center' as const,
  marginTop: '32px',
  paddingTop: '24px',
  borderTop: '1px solid #E5E7EB',
};

const pricingText = {
  margin: '0',
};

const priceAmount = {
  fontSize: '48px',
  fontWeight: '700',
  color: '#4F46E5',
};

const pricePeriod = {
  fontSize: '20px',
  color: '#6b7280',
};

const pricingSubtext = {
  fontSize: '14px',
  color: '#6b7280',
  marginTop: '8px',
};

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const button = {
  backgroundColor: '#4F46E5',
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
